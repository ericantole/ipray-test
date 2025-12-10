# Auto-Sync Script - Watches for file changes and auto-commits/pushes
# Usage: .\auto-sync.ps1
# Press Ctrl+C to stop

Write-Host "🔄 Auto-Sync Started!" -ForegroundColor Green
Write-Host "Watching for file changes..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

$lastCommit = Get-Date
$debounceSeconds = 5  # Wait 5 seconds after last change before committing

# Function to commit and push
function Sync-Changes {
    $status = git status --porcelain
    if ($status) {
        Write-Host "`n📝 Changes detected! Committing and pushing..." -ForegroundColor Yellow
        
        git add .
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "Auto-sync: $timestamp" -q
        
        if ($LASTEXITCODE -eq 0) {
            git push origin main -q
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Synced to GitHub!" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Push failed. Check your connection." -ForegroundColor Red
            }
        }
    }
}

# Watch for file changes
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = Get-Location
$watcher.Filter = "*.*"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Exclude certain files/folders
$excludePatterns = @("node_modules", ".git", "dist", "build", "*.log")

$action = {
    $file = $Event.SourceEventArgs.FullPath
    $fileName = Split-Path $file -Leaf
    
    # Skip excluded files
    $shouldExclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($file -like "*$pattern*") {
            $shouldExclude = $true
            break
        }
    }
    
    if (-not $shouldExclude) {
        $script:lastCommit = Get-Date
        Write-Host "📁 Changed: $fileName" -ForegroundColor Gray
    }
}

Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action $action | Out-Null

# Periodic check and sync
while ($true) {
    Start-Sleep -Seconds $debounceSeconds
    
    $timeSinceLastChange = (Get-Date) - $lastCommit
    if ($timeSinceLastChange.TotalSeconds -ge $debounceSeconds) {
        Sync-Changes
        $lastCommit = Get-Date
    }
}


