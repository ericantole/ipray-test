# Development Workflow Guide

## ⚠️ Important: How to Avoid Losing Your Changes

### Before Pulling from GitHub:

1. **Always check your changes first:**
   ```bash
   git status                    # See what files you've changed
   git diff                      # See what changes you made
   ```

2. **Save your work BEFORE pulling:**
   ```bash
   # Option 1: Commit your changes (RECOMMENDED)
   git add .
   git commit -m "Your descriptive message"
   git pull
   
   # Option 2: Stash your changes
   git stash push -m "Description of changes"
   git pull
   git stash pop                 # Restore your changes after pull
   ```

3. **If conflicts occur:**
   ```bash
   git status                     # See conflicted files
   # Edit files to resolve conflicts
   git add .
   git commit -m "Resolve merge conflicts"
   ```

### Daily Workflow:

1. **Start of day:**
   ```bash
   git pull                      # Get latest changes
   ```

2. **While working:**
   ```bash
   git status                    # Check what you're changing
   git add <file>                # Stage specific files
   git commit -m "Description"   # Commit frequently
   ```

3. **End of day:**
   ```bash
   git add .
   git commit -m "End of day: what you accomplished"
   git push                      # Push to GitHub
   ```

### Best Practices:

✅ **DO:**
- Commit frequently (every feature/change)
- Write clear commit messages
- Pull before starting new work
- Check `git status` regularly

❌ **DON'T:**
- Pull without saving your work first
- Work for hours without committing
- Ignore `git status` warnings
- Force push to main branch

### Quick Commands Reference:

```bash
# Check what changed
git status
git diff

# Save your work
git add .
git commit -m "Description"

# Get latest changes
git pull

# Push your work
git push

# See commit history
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what's different from GitHub
git fetch
git diff HEAD origin/main
```

