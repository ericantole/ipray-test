# Quick Save and Push Script
# Usage: .\save-and-push.ps1 "Your commit message"

param(
    [Parameter(Mandatory=$false)]
    [string]$Message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

Write-Host "💾 Saving your changes..." -ForegroundColor Cyan

# Check if there are changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ No changes to save!" -ForegroundColor Green
    exit
}

# Stage all changes
git add .

# Commit
Write-Host "📝 Committing: $Message" -ForegroundColor Yellow
git commit -m $Message

# Push
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "✅ Done! Your changes are saved locally and on GitHub!" -ForegroundColor Green


