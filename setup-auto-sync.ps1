# Setup Auto-Sync for Git
# This configures Git to automatically push after commits

Write-Host "🔧 Setting up Auto-Sync..." -ForegroundColor Cyan

# Create post-commit hook for Windows
$hookContent = @"
@echo off
echo ⬆️  Auto-pushing to GitHub...
git push origin main
"@

$hookPath = ".git\hooks\post-commit"
$hookContent | Out-File -FilePath $hookPath -Encoding ASCII -Force

Write-Host "✅ Auto-sync configured!" -ForegroundColor Green
Write-Host ""
Write-Host "Now every time you commit, it will automatically push to GitHub." -ForegroundColor Yellow
Write-Host ""
Write-Host "To test:" -ForegroundColor Cyan
Write-Host "  1. Make a change to any file"
Write-Host "  2. Run: git add ."
Write-Host "  3. Run: git commit -m 'test'"
Write-Host "  4. Watch it auto-push! 🚀"
Write-Host ""
Write-Host "To disable auto-sync, delete: .git\hooks\post-commit" -ForegroundColor Gray

