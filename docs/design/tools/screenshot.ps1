<#
.SYNOPSIS
  Render PriceBrush design HTML files to PNG locally with headless Chrome/Edge.
  Nothing is uploaded anywhere: the browser runs on this machine with a throwaway profile.

.EXAMPLE
  # All prototypes, phone size, light + dark
  powershell -ExecutionPolicy Bypass -File docs\design\tools\screenshot.ps1

.EXAMPLE
  # Design-system board at desktop width, tall page
  powershell -ExecutionPolicy Bypass -File docs\design\tools\screenshot.ps1 -Files docs\design\design-system.html -Width 1200 -Height 3000

.NOTES
  Requirements for each HTML file:
  - Wrap the visible screen in a fixed-width container (e.g. <div style="width:360px">), because
    headless Chrome lays pages out wider than the window and would crop the right side.
  - Support ?theme=dark (add the "dark" class to <html> when present) for the dark screenshot.
#>
param(
  [string[]]$Files = @(),
  [int]$Width = 360,
  [int]$Height = 800,
  [int]$Scale = 2,
  [string[]]$Themes = @("light", "dark"),
  [string]$OutDir = ""
)

$ErrorActionPreference = "Stop"
$designDir = Split-Path -Parent $PSScriptRoot
if (-not $OutDir) { $OutDir = Join-Path $designDir "images" }
if ($Files.Count -eq 0) {
  $Files = Get-ChildItem (Join-Path $designDir "prototypes") -Filter *.html | ForEach-Object { $_.FullName }
}

$browser = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw "Chrome or Edge not found." }

New-Item -ItemType Directory -Force $OutDir | Out-Null
# Unique throwaway profile per run: parallel runs (several agents) must not share a Chrome profile.
$profileDir = Join-Path $env:TEMP ("pricebrush-shot-" + [guid]::NewGuid().ToString("N"))

foreach ($file in $Files) {
  $full = (Resolve-Path $file).Path
  $name = [IO.Path]::GetFileNameWithoutExtension($full)
  $url = "file:///" + ($full -replace '\\', '/')
  foreach ($theme in $Themes) {
    $out = Join-Path $OutDir "$name-$theme.png"
    $chromeArgs = @(
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
      "--user-data-dir=$profileDir",
      "--window-size=$Width,$Height",
      "--force-device-scale-factor=$Scale",
      "--virtual-time-budget=8000",
      "--screenshot=$out",
      "$url`?theme=$theme"
    )
    Start-Process -FilePath $browser -ArgumentList $chromeArgs -Wait -WindowStyle Hidden | Out-Null
    if (Test-Path $out) { Write-Output "OK   $out" } else { Write-Output "FAIL $out" }
  }
}
Remove-Item -Recurse -Force $profileDir -ErrorAction SilentlyContinue
