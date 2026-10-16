<#
.SYNOPSIS
  Visual research helper: save reference images LOCALLY so the designer can actually look at them.
  Downloads only (nothing is uploaded). Output goes to docs/design/research/refs/ (git-ignored:
  third-party images are for internal reference, never committed or published).

.EXAMPLE
  # Render a public web page with local headless Chrome (desktop)
  powershell -ExecutionPolicy Bypass -File docs\design\tools\capture-ref.ps1 -Url "https://dribbble.com/search/invoice-app-mobile" -Name dribbble-invoice-mobile

.EXAMPLE
  # Same page at phone size
  powershell -ExecutionPolicy Bypass -File docs\design\tools\capture-ref.ps1 -Url "https://www.tradifyhq.com/uk" -Name tradify-site-mobile -Width 390 -Height 2400

.EXAMPLE
  # Download App Store screenshots of an app by its Apple ID (UK store)
  powershell -ExecutionPolicy Bypass -File docs\design\tools\capture-ref.ps1 -AppId 984378901 -Name tradify
#>
param(
  [string]$Url = "",
  [string]$AppId = "",
  [Parameter(Mandatory = $true)][string]$Name,
  [int]$Width = 1440,
  [int]$Height = 2000,
  [int]$Max = 6
)

$ErrorActionPreference = "Stop"
$designDir = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $designDir "research\refs"
New-Item -ItemType Directory -Force $outDir | Out-Null

if ($AppId) {
  $r = Invoke-RestMethod "https://itunes.apple.com/lookup?id=$AppId&country=gb"
  if ($r.resultCount -eq 0) { throw "App $AppId not found in the UK store." }
  $app = $r.results[0]
  $urls = @($app.screenshotUrls) + @($app.ipadScreenshotUrls) | Where-Object { $_ } | Select-Object -First $Max
  $i = 1
  foreach ($u in $urls) {
    $out = Join-Path $outDir ("{0}-appstore-{1}.jpg" -f $Name, $i)
    Invoke-WebRequest $u -OutFile $out
    Write-Output "OK   $out   ($($app.trackName))"
    $i++
  }
  exit 0
}

if (-not $Url) { throw "Pass -Url or -AppId." }
$browser = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw "Chrome or Edge not found." }

$out = Join-Path $outDir "$Name.png"
# Unique throwaway profile per run: parallel runs (several agents) must not share a Chrome profile.
$profileDir = Join-Path $env:TEMP ("pricebrush-shot-" + [guid]::NewGuid().ToString("N"))
$chromeArgs = @(
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--user-data-dir=$profileDir",
  "--window-size=$Width,$Height",
  "--virtual-time-budget=12000",
  "--screenshot=$out",
  $Url
)
Start-Process -FilePath $browser -ArgumentList $chromeArgs -Wait -WindowStyle Hidden | Out-Null
if (Test-Path $out) { Write-Output "OK   $out" } else { Write-Output "FAIL $out" }
Remove-Item -Recurse -Force $profileDir -ErrorAction SilentlyContinue
