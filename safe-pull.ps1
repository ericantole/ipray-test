# Safe Pull Script - Prevents losing uncommitted changes
# Usage: .\safe-pull.ps1

Write-Host "🔍 Checking for uncommitted changes..." -ForegroundColor Cyan

$status = git status --porcelain

if ($status) {
    Write-Host "⚠️  WARNING: You have uncommitted changes!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Your changes:" -ForegroundColor Yellow
    git status
    Write-Host ""
    Write-Host "What would you like to do?" -ForegroundColor Yellow
    Write-Host "1. Commit changes first (RECOMMENDED)"
    Write-Host "2. Stash changes, pull, then restore"
    Write-Host "3. Discard changes and pull"
    Write-Host "4. Cancel"
    Write-Host ""
    $choice = Read-Host "Enter choice (1-4)"
    
    switch ($choice) {
        "1" {
            Write-Host "📝 Committing your changes..." -ForegroundColor Green
            git add .
            $message = Read-Host "Enter commit message"
            git commit -m $message
            Write-Host "✅ Changes committed. Now pulling..." -ForegroundColor Green
            git pull
        }
        "2" {
            Write-Host "💾 Stashing your changes..." -ForegroundColor Green
            $stashMsg = Read-Host "Enter stash message (or press Enter for default)"
            if ([string]::IsNullOrWhiteSpace($stashMsg)) {
                $stashMsg = "Stashed before pull - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
            }
            git stash push -m $stashMsg
            Write-Host "⬇️  Pulling latest changes..." -ForegroundColor Green
            git pull
            Write-Host "📦 Restoring your stashed changes..." -ForegroundColor Green
            git stash pop
            Write-Host "✅ Done! Check for any conflicts." -ForegroundColor Green
        }
        "3" {
            Write-Host "⚠️  Discarding all changes..." -ForegroundColor Red
            $confirm = Read-Host "Are you sure? Type 'yes' to confirm"
            if ($confirm -eq "yes") {
                git restore .
                git pull
                Write-Host "✅ Changes discarded and pulled." -ForegroundColor Green
            } else {
                Write-Host "❌ Cancelled." -ForegroundColor Yellow
            }
        }
        "4" {
            Write-Host "❌ Cancelled." -ForegroundColor Yellow
            exit
        }
        default {
            Write-Host "❌ Invalid choice. Cancelled." -ForegroundColor Red
            exit
        }
    }
} else {
    Write-Host "✅ No uncommitted changes. Safe to pull." -ForegroundColor Green
    git pull
}

Write-Host ""
Write-Host "✨ Done!" -ForegroundColor Green

