# Parse YouTube Studio Inspiration HTML
# Extracts topics and their volume indicators

param(
    [string]$InputFile = "Ai coding.html",
    [string]$OutputFile = "parsed_topics.md"
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlPath = Join-Path $scriptDir $InputFile
$outputPath = Join-Path $scriptDir $OutputFile

Write-Host "Reading HTML file..." -ForegroundColor Cyan
$content = Get-Content $htmlPath -Raw -Encoding UTF8

# Pattern 1: Extract topic text from <p> tags inside topic cards
$topicPattern = '<p\s+class="style-scope yta-content-inspiration-freeform-topic-card">\s*([^<]+?)\s*</p>'
$topics = [regex]::Matches($content, $topicPattern) | ForEach-Object { $_.Groups[1].Value.Trim() }

# Pattern 2: Extract volume indicators (Low volume, Medium volume, High volume)
$volumePattern = '<div\s+class="additional-label[^"]*">\s*(Low volume|Medium volume|High volume|Content gap)\s*</div>'
$volumes = [regex]::Matches($content, $volumePattern) | ForEach-Object { $_.Groups[1].Value.Trim() }

Write-Host "Found $($topics.Count) topics and $($volumes.Count) volume indicators" -ForegroundColor Green

# Build results - pair topics with volumes
$results = @()
$volumeIndex = 0

for ($i = 0; $i -lt $topics.Count; $i++) {
    $topic = $topics[$i]
    $volume = if ($volumeIndex -lt $volumes.Count) { $volumes[$volumeIndex++] } else { "Unknown" }
    
    $results += [PSCustomObject]@{
        Topic = $topic
        Volume = $volume
    }
}

# Sort by volume priority (High > Medium > Low)
$volumePriority = @{
    "High volume" = 1
    "Medium volume" = 2
    "Content gap" = 3
    "Low volume" = 4
    "Unknown" = 5
}

$sorted = $results | Sort-Object { $volumePriority[$_.Volume] }

# Generate markdown output
$md = @"
# YouTube Studio Inspiration - AI Coding Topics
> Parsed from YouTube Studio on $(Get-Date -Format "yyyy-MM-dd HH:mm")

## Summary
- **Total Topics**: $($results.Count)
- **High Volume**: $(($results | Where-Object { $_.Volume -eq "High volume" }).Count)
- **Medium Volume**: $(($results | Where-Object { $_.Volume -eq "Medium volume" }).Count)
- **Content Gap**: $(($results | Where-Object { $_.Volume -eq "Content gap" }).Count)
- **Low Volume**: $(($results | Where-Object { $_.Volume -eq "Low volume" }).Count)

---

## 🔥 High & Medium Volume Topics (Priority)

| Topic | Volume |
|-------|--------|
"@

$highMed = $sorted | Where-Object { $_.Volume -in @("High volume", "Medium volume") }
foreach ($item in $highMed) {
    $md += "`n| $($item.Topic) | **$($item.Volume)** |"
}

$md += @"

---

## 📊 Content Gaps (Opportunity)

| Topic | Volume |
|-------|--------|
"@

$gaps = $sorted | Where-Object { $_.Volume -eq "Content gap" }
foreach ($item in $gaps) {
    $md += "`n| $($item.Topic) | $($item.Volume) |"
}

$md += @"

---

## 📉 Low Volume Topics (For Reference)

| Topic | Volume |
|-------|--------|
"@

$low = $sorted | Where-Object { $_.Volume -eq "Low volume" }
foreach ($item in $low) {
    $md += "`n| $($item.Topic) | $($item.Volume) |"
}

# Write output
$md | Out-File $outputPath -Encoding UTF8
Write-Host "`nResults saved to: $outputPath" -ForegroundColor Green
Write-Host "`nTop 10 High/Medium Volume Topics:" -ForegroundColor Yellow
$highMed | Select-Object -First 10 | Format-Table -AutoSize
