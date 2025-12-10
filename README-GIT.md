# Quick Git Commands Guide

## ⚠️ Important: Git Does NOT Auto-Save

Git requires you to manually save (commit) and upload (push) your changes. Nothing happens automatically.

## 🚀 Quick Commands

### Save Everything (Local + GitHub):
```powershell
.\save-and-push.ps1 "Description of your changes"
```

### Manual Way:
```bash
git add .                    # Stage changes
git commit -m "Message"      # Save locally
git push                     # Upload to GitHub
```

## 📋 Daily Workflow

### When You Make Changes:
1. **Save locally:**
   ```bash
   git add .
   git commit -m "What you changed"
   ```

2. **Upload to GitHub:**
   ```bash
   git push
   ```

### When You Start Working:
```bash
git pull    # Get latest changes from GitHub
```

## 🎯 Remember:

- ✅ **Commit** = Save locally (you must do this)
- ✅ **Push** = Upload to GitHub (you must do this)
- ❌ **Nothing is automatic** - you need to run commands

## 💡 Tips:

1. **Commit frequently** - Don't wait until end of day
2. **Use descriptive messages** - "Add gratitude feature" not "fix"
3. **Push regularly** - At least once per day
4. **Pull before starting** - Get latest changes first

## 🔧 Using the Helper Script:

Instead of typing 3 commands, use:
```powershell
.\save-and-push.ps1 "Added new feature"
```

This does: `git add` → `git commit` → `git push` all at once!

