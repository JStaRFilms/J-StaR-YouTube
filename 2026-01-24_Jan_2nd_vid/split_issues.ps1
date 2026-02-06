# Split ALL_ISSUES.md into individual issue files
# Usage: .\split_issues.ps1

$issuesDir = "docs\issues"
$sourceFile = "$issuesDir\ALL_ISSUES.md"

# Read the file
$content = Get-Content $sourceFile -Raw

# Split by the --- separator between issues
$sections = $content -split '\r?\n---\r?\n'

$issueNum = 1

foreach ($section in $sections) {
    # Skip sections that don't have "## Title"
    if ($section -notmatch '## Title') {
        continue
    }
    
    # Extract title line
    if ($section -match '## Title\r?\n\[([^\]]+)\]\s*(.+)') {
        $type = $Matches[1].Trim()
        $title = $Matches[2].Trim()
        
        # Create safe filename
        $safeTitle = $title -replace '[^\w\s-]', '' -replace '\s+', '-'
        $safeTitle = $safeTitle.Substring(0, [Math]::Min(40, $safeTitle.Length))
        
        # Determine category from labels
        $category = "general"
        if ($section -match '`infrastructure`') { $category = "infrastructure" }
        elseif ($section -match '`auth`') { $category = "auth" }
        elseif ($section -match '`payments`') { $category = "payments" }
        elseif ($section -match '`dashboard`') { $category = "dashboard" }
        elseif ($section -match '`projects`') { $category = "projects" }
        elseif ($section -match '`strategy`') { $category = "phase1-strategy" }
        elseif ($section -match '`packaging`') { $category = "phase2-packaging" }
        elseif ($section -match '`scripting`') { $category = "phase3-scripting" }
        elseif ($section -match '`shorts`') { $category = "phase35-shorts" }
        elseif ($section -match '`production`') { $category = "phase4-production" }
        elseif ($section -match '`distribution`') { $category = "phase5-distribution" }
        elseif ($section -match '`export`') { $category = "export" }
        elseif ($section -match '`ui`|`editor`|`wizard`') { $category = "ui" }
        elseif ($section -match '`skill-pack`') { $category = "skill-pack" }
        elseif ($section -match '`future-scope`') { $category = "future" }
        
        $filename = "{0:D3}-{1}-{2}.md" -f $issueNum, $category, $safeTitle
        $filepath = Join-Path $issuesDir $filename
        
        # Write the issue file
        $issueContent = $section.Trim()
        Set-Content -Path $filepath -Value $issueContent -Encoding UTF8
        
        Write-Host "Created: $filename"
        $issueNum++
    }
}

Write-Host "`n====================================="
Write-Host "Total issues created: $($issueNum - 1)"
Write-Host "====================================="
