<#
.SYNOPSIS
    Clean all node_modules across the monorepo
.DESCRIPTION
    Removes all node_modules directories and Turborepo cache
#>

Write-Host "🧹 Cleaning monorepo..." -ForegroundColor Cyan

# Remove all node_modules
Get-ChildItem -Path . -Recurse -Directory -Filter "node_modules" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force

# Remove root node_modules
if (Test-Path ".\node_modules") {
    Remove-Item -Recurse -Force ".\node_modules"
}

# Remove Turborepo cache
if (Test-Path ".\.turbo") {
    Remove-Item -Recurse -Force ".\.turbo"
}

Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host "Run 'pnpm install' to reinstall dependencies." -ForegroundColor Yellow
