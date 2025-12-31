---
title: Simple Git Workflow Guide
description:
aliases:
tags:
  - note
  - git
draft: false
created: 2025-10-12T16:21
updated: 2025-12-31T17:24
---
A minimal guide covering the essential Git commands for daily team development.

## Initial Setup (One Time)

```shell
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# Clone the repository
git clone https://github.com/company/project.git
cd project
```

---

## Daily Workflow

### 1. Start Your Day - Get Latest Changes

```shell
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main
```

### 2. Create a Feature Branch

```shell
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Start working on your files...
```

### 3. Save Your Work

```shell
# See what you changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Add user login feature"

# Push to remote (first time)
git push -u origin feature/your-feature-name

# Push to remote (after first time)
git push
```

---

## Keep Your Branch in Sync with Main

While you work, other team members merge code into main. You need to get those changes.

### Method 1: Merge (Easier, Safer)

```shell
# Switch to your feature branch
git checkout feature/your-feature-name

# Get latest main and merge it into your branch
git pull origin main

# If there are conflicts, fix them (see below)
# Then push
git push
```

### Method 2: Rebase (Cleaner History)

⚠️ Only use if you're the only person working on this branch!

```shell
# Switch to your feature branch
git checkout feature/your-feature-name

# Get latest changes
git fetch origin

# Rebase your work on top of main
git rebase origin/main

# If there are conflicts, fix them (see below)
# After fixing each conflict:
git add .
git rebase --continue

# Force push (required after rebase)
git push --force-with-lease
```

---

## Fixing Conflicts

When you see conflicts, Git will mark them in your files like this:

```
<<<<<<< HEAD
your code here
=======
their code here
>>>>>>> main
```

**To fix:**

1. Open the conflicted file
2. Choose which code to keep (or combine both)
3. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Save the file

**Then:**

```bash
# If you were merging:
git add .
git commit -m "Resolve conflicts with main"
git push

# If you were rebasing:
git add .
git rebase --continue
git push --force-with-lease
```

---

## Create a Pull Request

```bash
# Make sure everything is pushed
git push

# Go to GitHub/GitLab and click "Create Pull Request"
# Select: feature/your-feature-name → main
```

---

## After PR Is Merged

```bash
# Switch to main
git checkout main

# Pull the latest (includes your merged feature)
git pull origin main

# Delete your local feature branch
git branch -d feature/your-feature-name

# Delete remote feature branch (optional)
git push origin --delete feature/your-feature-name
```

---

## Common Commands Reference

```bash
# See what changed
git status

# See your branches
git branch

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# See commit history
git log --oneline

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Discard all local changes (careful!)
git reset --hard HEAD

# See differences
git diff
```

---

## Branch Naming Convention

```
feature/description    # New features
bugfix/description     # Bug fixes
hotfix/description     # Urgent fixes
```

Examples:

```
feature/user-authentication
feature/payment-integration
bugfix/login-error
hotfix/security-patch
```

---

## Quick Reference

### Starting Work:

```bash
git checkout main
git pull origin main
git checkout -b feature/my-feature
```

### During Work:

```bash
git add .
git commit -m "Description"
git push
```

### Keep in Sync:

```bash
git pull origin main  # merge approach
# or
git fetch origin && git rebase origin/main  # rebase approach
```

### Finish Work:

```bash
git push
# Create PR on GitHub/GitLab
# After merge:
git checkout main
git pull origin main
git branch -d feature/my-feature
```

---

## When Things Go Wrong

```bash
# Abort a merge
git merge --abort

# Abort a rebase
git rebase --abort

# Undo last commit but keep changes
git reset --soft HEAD~1

# Discard all local changes (CAREFUL!)
git reset --hard HEAD

# Get help
git status  # Always start here!
```