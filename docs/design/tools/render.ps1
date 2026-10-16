<#
.SYNOPSIS
  Measure each design HTML file's full content height with local headless Chrome, then call
  screenshot.ps1 with that height so nothing is cut at the bottom. Nothing is uploaded.
  Pages expose their height through <html data-h="..."> (set by the shared pb-head script).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File docs\design\tools\render.ps1 -Files docs\design\prototypes\review-quote.html
  powershell -ExecutionPolicy Bypass -File docs\design\tools\render.ps1 -Files docs\design\prototypes\desktop-landing.html -Width 1280
#>
param(
  [Parameter(Mandatory = $true)][string[]]$Files,
  [int]$Width = 360,
  [int]$MinHeight = 800,
  [string]$Query = ""
)
$ErrorActionPreference = "Stop"
$Files = $Files | ForEach-Object { $_ -split ',' } | Where-Object { $_ }
$browser = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
$profileDir = Join-Path $env:TEMP "pricebrush-measure-profile"
foreach ($file in $Files) {
  $full = (Resolve-Path $file).Path
  $max = $MinHeight
  foreach ($theme in @("light", "dark")) {
    $url = "file:///" + ($full -replace '\\', '/') + "?theme=$theme$Query"
    $dom = & $browser --headless=new --disable-gpu --hide-scrollbars --no-first-run "--user-data-dir=$profileDir" "--window-size=$Width,$MinHeight" --virtual-time-budget=6000 --dump-dom $url 2>$null | Out-String
    if ($dom -match 'data-h="(\d+)"') { $h = [int]$Matches[1]; if ($h -gt $max) { $max = $h } }
  }
  Write-Output "HEIGHT $max  $full"
  & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "screenshot.ps1") -Files $full -Width $Width -Height $max
}
