---
title: Simple JJ workflow guide
description:
aliases:
tags:
  - Note
  - Git
  - JJ
draft: true
created: 2025-10-12T16:27
updated: 2025-10-12T16:38
---
A minimal guide for using JJ (Jujutsu) with Git repositories in colocated mode.

## What is JJ?

JJ is a Git-compatible version control tool that simplifies common workflows. You can use it on existing Git repos and still interact with GitHub/GitLab normally.

---

## Initial Setup (One Time)

### Install JJ

```shell
# macOS
brew install jj

# Windows
scoop install jj

# Linux
brew install jj
```

### Configure JJ

```shell
# Set your identity (required)
jj config set --user user.name "Your Name"
jj config set --user user.email "your.email@example.com"

# Verify your config
jj config list
```

### Clone a Git Repository with JJ

```shell
# Clone a Git repo with JJ
jj git clone https://github.com/company/project.git
cd project
```

### Or Use JJ with Existing Git Repo (Colocate)

```shell
# In your existing Git repository
cd your-git-repo
jj git init --colocate

# Now you can use both jj and git commands!
```

---

## Daily Workflow

### 1. Start Your Day - Get Latest Changes

```shell
# Fetch latest changes from Git remote
jj git fetch

# See what changed
jj log
```

### 2. Create a New Change (Feature)

```shell
# Create a new change based on main
jj new main -m "Add user login feature"

# Start working on your files...
# JJ automatically tracks all your changes!
```

### 3. Save Your Work

```shell
# See what changed
jj status

# See detailed changes
jj diff

# Update your change description
jj describe -m "Add user login with validation"

# Push to Git remote (creates a branch automatically)
jj git push
```

**No `git add`!** JJ automatically includes all your changes.

---

## Keep Your Work in Sync with Main

### Get Latest from Main and Rebase Your Work

```shell
# Fetch latest changes
jj git fetch

# Rebase your current change on top of main
jj rebase -d main

# Push your updated work
jj git push
```

That's it! One command instead of merge/rebase complexity.

---

## Working with Multiple Changes (Stacked Work)

JJ makes it easy to work on multiple things at once:

```shell
# Start first feature
jj new main -m "Add login form"
# ... work on login ...

# Start second feature (builds on first)
jj new -m "Add password validation"
# ... work on validation ...

# Start third feature (builds on second)
jj new -m "Add remember me checkbox"
# ... work on checkbox ...

# See your stack
jj log

# Push all changes as separate branches
jj git push --change @    # Push current change
jj git push --change @-   # Push previous change
jj git push --change @--  # Push change before that

# Or push all at once
jj git push --all
```

---

## Fixing Conflicts

When you rebase and get conflicts:

```shell
jj rebase -d main
# Conflicts detected!

# See which files have conflicts
jj status

# Open conflicted files and fix them
# Look for conflict markers:
# <<<<<<< Conflict 1 of 1
# your code
# =======
# their code
# >>>>>>> Conflict 1 of 1 ends

# After fixing, JJ automatically includes your changes
# No git add needed!

# Check if conflicts are resolved
jj status

# Continue working
jj describe -m "Updated message if needed"
```

---

## Create a Pull Request

```shell
# Push your change
jj git push

# JJ creates a Git branch automatically
# Go to GitHub/GitLab and create PR from that branch
```

**Tip:** JJ creates branch names like `push-xyz123abc` by default. You can customize:

```shell
# Push with a specific branch name
jj branch create feature/my-feature
jj git push --branch feature/my-feature
```

---

## After PR is Merged

```shell
# Fetch latest (includes your merged work)
jj git fetch

# Abandon your local change (it's now in main)
jj abandon <change-id>

# Or abandon current change
jj abandon @

# Start fresh from main
jj new main
```

---

## Common Commands Reference

```shell
# See what changed
jj status

# See your changes
jj log

# See detailed diff
jj diff

# Create new change
jj new

# Update description
jj describe -m "New message"

# Rebase to main
jj rebase -d main

# Push to Git
jj git push

# Fetch from Git
jj git fetch

# Edit an older change
jj edit <change-id>

# Split current change into two
jj split

# Combine changes
jj squash

# Undo last operation
jj op undo
```

---

## Understanding JJ Concepts

### Changes vs Commits

- **Git:** You create commits
- **JJ:** You create changes (mutable until pushed)

### Working Copy

- In JJ, you're always working on a "change"
- Changes are automatically tracked (no staging area!)
- You can freely edit, split, or rewrite changes

### Change IDs

```shell
jj log
# Shows:
# @  qpvuntsm you@email 2 minutes ago my-branch 1234abcd
# │  Add user login feature
# ○  rlvkpnrz you@email 1 day ago main 5678efgh
# │  Previous work
```

- `@` = current change you're working on
- `qpvuntsm` = change ID (unique)
- `1234abcd` = Git commit hash

---

## Quick Reference

### Starting work:

```shell
jj git fetch
jj new main -m "Add feature"
# ... make changes ...
```

### During work:

```shell
jj status
jj diff
jj describe -m "Updated description"
jj git push
```

### Keep in sync:

```shell
jj git fetch
jj rebase -d main
```

### Finish work:

```shell
jj git push
# Create PR on GitHub/GitLab
# After merge:
jj git fetch
jj abandon @
```

---

## JJ vs Git Commands

|Git Command|JJ Command|What it does|
|---|---|---|
|`git status`|`jj status`|See changes|
|`git log`|`jj log`|See history|
|`git add` + `git commit`|`jj describe`|Save work|
|`git checkout -b`|`jj new`|New work|
|`git pull`|`jj git fetch`|Get updates|
|`git push`|`jj git push`|Push changes|
|`git rebase`|`jj rebase`|Rebase|
|`git merge`|`jj rebase -d`|Update branch|
|`git branch`|`jj branch list`|See branches|
|`git reset --soft HEAD~1`|`jj op undo`|Undo last action|

---

## When Things Go Wrong

```shell
# Undo last operation
jj op undo

# See operation history
jj op log

# Restore to specific operation
jj op restore <operation-id>

# Abandon current change (careful!)
jj abandon @

# Stop editing and create new change
jj new
```

**Best part:** You can't lose work in JJ! Every operation is recorded and can be undone.

---

## Colocated Mode Tips

When using `--colocate`, you can use both `git` and `jj` commands:

```shell
# Use JJ for daily work
jj new main -m "Feature"
jj describe -m "Update"
jj git push

# Still use Git for some operations
git log
git branch -a
git remote -v

# Changes sync automatically!
```

**Note:** Prefer using JJ commands when both are available for consistency.

---

## Advanced: Clean History Before PR

```shell
# Split a change into multiple changes
jj split

# Squash current change into parent
jj squash

# Edit change description
jj describe -m "Better description"

# Reorder changes (advanced)
jj rebase -r <change-id> -d <destination>
```
