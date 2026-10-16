<#
.SYNOPSIS
  Free keyword discovery for PriceBrush: expands seed phrases with Google UK autocomplete
  (the same suggestions people see while typing). Read-only requests; nothing is uploaded.

.DESCRIPTION
  For each seed it queries the seed itself plus "seed a" ... "seed z" (and optional question
  prefixes), then writes a de-duplicated CSV: seed, suggestion, source.
  Autocomplete shows what people really type, but NOT search volume. Use it to find and
  prioritise phrases; confirm volume later with Google Search Console / Keyword Planner.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File docs\seo\tools\keywords.ps1 -Seeds "painting quote template","how much paint" -Name quotes-and-paint

.EXAMPLE
  # Add question prefixes (how / what / can / do / is ...)
  powershell -ExecutionPolicy Bypass -File docs\seo\tools\keywords.ps1 -Seeds "decorator invoice" -Name invoice -Questions
#>
param(
  [Parameter(Mandatory = $true)][string[]]$Seeds,
  [Parameter(Mandatory = $true)][string]$Name,
  [switch]$Questions,
  [string]$Lang = "en-GB",
  [string]$Country = "uk",
  [int]$DelayMs = 400
)

$ErrorActionPreference = "Stop"
$seoDir = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $seoDir "data"
New-Item -ItemType Directory -Force $outDir | Out-Null

function Get-Suggestions([string]$q) {
  $u = "https://suggestqueries.google.com/complete/search?client=firefox&hl=$Lang&gl=$Country&q=" + [uri]::EscapeDataString($q)
  try { return @((Invoke-RestMethod $u)[1]) } catch { return @() }
}

$rows = New-Object System.Collections.Generic.List[object]
$seen = @{}
$prefixes = @("how", "what", "can", "do", "is", "best", "free", "cheap", "uk")

foreach ($seed in $Seeds) {
  $queries = @($seed) + ([char[]](97..122) | ForEach-Object { "$seed $_" })
  if ($Questions) { $queries += $prefixes | ForEach-Object { "$_ $seed" } }
  foreach ($q in $queries) {
    foreach ($s in (Get-Suggestions $q)) {
      $key = $s.ToLowerInvariant().Trim()
      if (-not $seen.ContainsKey($key)) {
        $seen[$key] = $true
        $rows.Add([pscustomobject]@{ seed = $seed; suggestion = $key; source = "google-uk-autocomplete:$q" })
      }
    }
    Start-Sleep -Milliseconds $DelayMs
  }
}

$out = Join-Path $outDir "$Name.csv"
$rows | Export-Csv -NoTypeInformation -Encoding UTF8 $out
Write-Output "OK   $($rows.Count) unique suggestions -> $out"
