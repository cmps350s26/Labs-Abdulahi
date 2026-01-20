# CMPS350 Mobile Development

## Lab 0: Introduction to Version Control

A hands-on introduction to version control using GitHub Desktop

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites &amp; Setup](#2-prerequisites--setup)
3. [Core Concepts](#3-core-concepts)
4. [Basic Workflow](#4-basic-workflow)
5. [Branching](#5-branching)
6. [Pull Requests &amp; Merging](#6-pull-requests--merging)
7. [Handling Merge Conflicts](#7-handling-merge-conflicts)
8. [Summary &amp; Best Practices](#8-summary--best-practices)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Introduction

### What is Version Control?

Version control is a system that records changes to files over time so you can recall specific versions later. Think of it like a detailed "undo" history for your entire project that:

- **Tracks every change** made to your files
- **Records who** made each change and **when**
- **Allows you to revert** to previous versions if something goes wrong
- **Enables collaboration** by letting multiple people work on the same project

### Why Does Version Control Matter?

Without version control, you might end up with folders like:

```
project_final.zip
project_final_v2.zip
project_final_ACTUALLY_FINAL.zip
project_final_FINAL_REALLY.zip
```

Version control solves this problem by maintaining a history of all changes.

### Git vs GitHub

These terms are often confused, but they're different:

| Git                                 | GitHub                                                    |
| ----------------------------------- | --------------------------------------------------------- |
| A version control**software** | A**website/service** that hosts Git repositories    |
| Runs on your local computer         | Runs in the cloud                                         |
| Tracks changes to files             | Provides collaboration features, issue tracking, and more |
| Free and open-source                | Free for public repos, paid plans for advanced features   |

**Analogy:** Git is like Microsoft Word's "Track Changes" feature, while GitHub is like Google Drive where you store and share your documents.

### What is GitHub Desktop?

GitHub Desktop is a graphical application that makes using Git easier. Instead of typing commands in a terminal, you can:

- Click buttons to commit, push, and pull
- Visualize your branch history
- Resolve merge conflicts with a visual interface

It is a good option for beginners and also useful for developers who prefer a visual workflow.

---

## 2. Prerequisites & Setup

You should have completed the following setup tasks before this lab. If not, complete them now.

### Checklist

| Task                         | Status | Link                                                         |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| GitHub account created       | ☐     | [github.com](https://github.com)                                |
| GitHub Desktop installed     | ☐     | [desktop.github.com](https://desktop.github.com)                |
| Visual Studio Code installed | ☐     | [code.visualstudio.com](https://code.visualstudio.com/download) |

### GitHub Username Convention

Your GitHub username **must** follow this format:

```
firstname-QuUsername
```

**Example:** If your name is Ali Mohamed and your QU username is am1206290, your GitHub username should be:

```
ali-am1206290
```

> **Note:** If you already have a GitHub account, rename it to match this convention via **Settings > Account > Change username**.

### Signing Into GitHub Desktop

1. Open GitHub Desktop
2. Click **Sign in to GitHub.com**
3. Click **Continue with browser**
4. Log in with your GitHub account
5. Click **Authorize desktop**
6. Configure your Git identity when prompted:
   - **Name:** Your full name
   - **Email:** Your GitHub email

---

### GitHub Classroom Setup

In this course, we use **GitHub Classroom** to manage lab assignments. Your instructor will provide an **invitation link** for your section.

### Accepting Your Assignment

1. Click the invitation link provided by your instructor
2. Sign in to GitHub if prompted
3. Find and select your name from the roster (if shown)
4. Click **Accept this assignment**
5. Wait for your private repository to be created
6. Once ready, you'll see a link to your repository

Your repository will be created in the course organization: [**github.com/cmps350s26**](https://github.com/cmps350s26)

> **Important:** Your repository is **private**. Only you and the instructors can see it.

---

### Exercise 1: Setup, Accept Assignment, and Clone

**Objective:** Confirm your setup is complete, accept your GitHub Classroom assignment, and clone the repository.

**Steps:**

1. Open GitHub Desktop and verify you are signed in
2. Go to **GitHub Desktop > Preferences** (macOS) or **File > Options** (Windows)
3. Click the **Accounts** tab and verify your username follows the `firstname-QuUsername` format
4. Click the assignment invitation link provided by your instructor
5. Accept the assignment and wait for your repository to be created
6. In GitHub Desktop, click **File > Clone Repository**
7. Go to the **GitHub.com** tab and find your repository in the cmps350s26 organization
8. Choose a local path (e.g., `Documents/CMPS350`) and click **Clone**

**Expected Outcome:** Your repository is cloned to your computer and ready to use.

---

## 3. Core Concepts

### Repositories

A **repository** (or "repo") is a folder that Git tracks. It contains:

- Your project files
- A hidden `.git` folder with the complete history
- Configuration files

Think of a repository as a project folder with version tracking built in.

### Commits

A **commit** is a snapshot of your project at a specific point in time. Each commit includes:

- The changes you made
- A message describing the changes
- A timestamp
- The author's information
- A unique identifier (hash)

**Analogy:** Commits are like save points in a video game. You can always go back to them.

### Branches

A **branch** is an independent line of development. The default branch is usually called `main`.

Branches let you:

- Work on new features without affecting the main code
- Experiment safely
- Collaborate without conflicts

### Local vs Remote Repositories

| Local Repository                  | Remote Repository                    |
| --------------------------------- | ------------------------------------ |
| Stored on your computer           | Stored on GitHub's servers           |
| Only you can access it            | Can be shared with others            |
| Changes stay private until pushed | Visible to collaborators (or public) |

### Git Workflow

**Your Computer:**

- Working Directory --> (add) --> Staging Area --> (commit) --> Local Repository

**Syncing with GitHub:**

- Local Repository --> (push) --> Remote Repository (GitHub)
- Remote Repository (GitHub) --> (pull) --> Local Repository

**Workflow Steps:**

1. **Edit** files in your working directory
2. **Stage** the changes you want to commit
3. **Commit** to save a snapshot to your local repository
4. **Push** to upload commits to GitHub
5. **Pull** to download changes from GitHub

---

## 4. Basic Workflow

You should have already cloned your repository in Exercise 1. You can view all course repositories at: [github.com/orgs/cmps350s26/repositories](https://github.com/orgs/cmps350s26/repositories)

### Making Changes to Files

1. Open your repository folder in your code editor or file browser
2. Edit, add, or delete files as needed
3. Save your changes
4. Return to GitHub Desktop. It automatically detects changes

### Staging and Committing Changes

In GitHub Desktop, staging and committing happen together:

1. In the left panel, you'll see a list of changed files
2. **Check the boxes** next to files you want to include in the commit
3. At the bottom, enter a **Summary** (required) and **Description** (optional)
4. Click **Commit to main** (or your current branch name)

### Writing Good Commit Messages

**Good commit messages:**

- Start with a verb (Add, Fix, Update, Remove, Refactor)
- Are concise but descriptive
- Explain **what** changed and **why**

**Examples:**

| Bad         | Good                                    |
| ----------- | --------------------------------------- |
| "changes"   | "Add user login validation"             |
| "fixed bug" | "Fix crash when username is empty"      |
| "update"    | "Update README with installation steps" |

**Format:**

```
Summary line (50 chars or less)

Optional detailed description explaining why this change
was made and any relevant context. Wrap at 72 characters.
```

### Pushing Changes to GitHub

After committing locally, push to upload your commits to GitHub:

1. Click **Push origin** in the top bar (or press `Cmd+P` / `Ctrl+P`)
2. Wait for the push to complete
3. Your changes are now on GitHub

### Pulling Changes from GitHub

If changes were made on GitHub (or by collaborators), pull them to your local repo:

1. Click **Fetch origin** to check for changes
2. If changes exist, the button changes to **Pull origin**
3. Click it to download the changes

> **Tip:** Always pull before starting work to ensure you have the latest code.

---

### Exercise 2: Make Changes, Commit, and Push

**Objective:** Practice making changes, committing, and pushing to GitHub.

**Steps:**

1. **Open the repository in VS Code:**

   - In GitHub Desktop, click **Repository > Open in Visual Studio Code**
   - Or navigate to the folder manually
2. **Create a new file** called `hello.txt` with the content:

   ```
   Hello, Git!
   My name is [Your Name]
   Student ID: [Your QU ID]
   ```
3. **Return to GitHub Desktop** and observe the changes detected
4. **Commit the changes:**

   - Summary: "Add hello.txt with student info"
   - Click **Commit to main**
5. **Push to GitHub:**

   - Click **Push origin**
6. **Verify on GitHub:**

   - Click **Repository > View on GitHub**
   - Confirm your file and commit appear

**Expected Outcome:** Your `hello.txt` file should be visible in your GitHub Classroom repository.

---

## 5. Branching

### What Are Branches?

Branches allow you to diverge from the main line of development. Imagine you're writing a book:

- **main branch:** The published version
- **feature branch:** A draft where you're experimenting with a new chapter

You can work on your draft without affecting the published version, then merge it in when ready.

### Why Use Branches?

- **Isolation:** Work on features without breaking the main code
- **Experimentation:** Try ideas safely; delete the branch if it doesn't work out
- **Collaboration:** Multiple people can work on different features simultaneously
- **Code Review:** Changes can be reviewed before merging into main

### Creating a New Branch in GitHub Desktop

1. Click the **Current Branch** dropdown in the top bar
2. Click **New Branch**
3. Enter a branch name (e.g., `feature/add-navigation`)
4. Choose which branch to base it on (usually `main`)
5. Click **Create Branch**

### Branch Naming Conventions

Use descriptive names with prefixes:

| Prefix       | Purpose       | Example                   |
| ------------ | ------------- | ------------------------- |
| `feature/` | New features  | `feature/user-profile`  |
| `bugfix/`  | Bug fixes     | `bugfix/login-error`    |
| `hotfix/`  | Urgent fixes  | `hotfix/security-patch` |
| `docs/`    | Documentation | `docs/api-guide`        |

### Switching Between Branches

1. Click the **Current Branch** dropdown
2. Click the branch you want to switch to
3. Your files will update to reflect that branch's state

> **Warning:** Uncommitted changes may be lost or cause conflicts when switching branches. Commit or stash your work first!

### Making Changes on a Branch

1. Create and switch to your new branch
2. Make your changes (edit files, add new files, etc.)
3. Stage and commit as usual
4. The commits are now only on your branch, not on `main`

---

### Exercise 3: Feature Branch Workflow

**Objective:** Create a branch, make changes, and keep it separate from main.

**Steps:**

1. **In GitHub Desktop**, make sure your repository is selected
2. **Create a new branch:**

   - Click Current Branch > New Branch
   - Name: `feature/add-about`
   - Click Create Branch
3. **Verify you're on the new branch** (check the Current Branch dropdown)
4. **Add a new file** called `about.txt` with content:

   ```
   Course: CMPS350 Mobile Development
   Student: [Your Name]
   Section: [Your Section]
   Date: [Today's Date]
   ```
5. **Commit the changes:**

   - Summary: "Add about file with course info"
   - Click Commit to feature/add-about
6. **Push the branch to GitHub:**

   - Click Publish branch
7. **Switch back to main:**

   - Click Current Branch > main
   - Notice that `about.txt` does not exist on main
8. **Switch back to your feature branch:**

   - Click Current Branch > feature/add-about
   - Notice `about.txt` is back

**Expected Outcome:** You have two branches: `main` without `about.txt` and `feature/add-about` with `about.txt`.

---

## 6. Pull Requests & Merging

### What is a Pull Request?

A **pull request** (PR) is a proposal to merge changes from one branch into another. It allows:

- **Code review:** Others can review your changes before merging
- **Discussion:** Comment on specific lines of code
- **CI/CD:** Automated tests can run on the proposed changes
- **Documentation:** A record of what changed and why

### Creating a Pull Request

**From GitHub Desktop:**

1. Ensure your branch is pushed to GitHub
2. Click **Branch > Create Pull Request** (or `Cmd+R` / `Ctrl+R`)
3. GitHub opens in your browser with the PR form

**On GitHub:**

1. Fill in the PR details:
   - **Title:** Clear summary of the changes
   - **Description:** Explain what, why, and how
2. Review the **Files changed** tab to verify your changes
3. Select **Reviewers** if applicable
4. Click **Create pull request**

### Reviewing a Pull Request

1. Go to the **Files changed** tab
2. Review each file's changes (green = added, red = removed)
3. Click the `+` icon on any line to add a comment
4. When done, click **Review changes**:
   - **Comment:** General feedback without approval
   - **Approve:** Changes look good
   - **Request changes:** Issues must be addressed

### Merging a Pull Request

Once approved:

1. Go to the PR on GitHub
2. Click **Merge pull request**
3. Choose merge type:
   - **Create a merge commit:** Preserves all commits
   - **Squash and merge:** Combines all commits into one
   - **Rebase and merge:** Applies commits on top of base branch
4. Click **Confirm merge**

### Deleting Merged Branches

After merging, the branch is no longer needed:

1. On GitHub, click **Delete branch** (appears after merge)
2. In GitHub Desktop, the branch will show as deleted
3. Click **Branch > Delete** to remove it locally too

---

### Exercise 4: Create and Merge a Pull Request

**Objective:** Complete the pull request workflow.

**Steps:**

1. **Ensure you have the `feature/add-about` branch** from Exercise 3 (or create it)
2. **Create a pull request:**

   - In GitHub Desktop, click Branch > Create Pull Request
   - Title: "Add about file with course info"
   - Description:
     ```
     This PR adds an about file with:
     - Course name
     - Student information
     - Section number
     ```
   - Click Create pull request
3. **Review your own PR:**

   - Click the Files changed tab
   - Observe the changes shown
4. **Merge the pull request:**

   - Click Merge pull request
   - Click Confirm merge
   - Click Delete branch
5. **Update your local repository:**

   - In GitHub Desktop, switch to the main branch
   - Click Fetch origin, then Pull origin
   - Verify `about.txt` now exists on main
6. **Delete the local branch:**

   - Click Branch > Delete
   - Select feature/add-about
   - Confirm deletion

**Expected Outcome:** Your `about.txt` file is now on the main branch, and the feature branch is deleted both locally and on GitHub.

---

## 7. Handling Merge Conflicts

### What Causes Merge Conflicts?

Merge conflicts occur when Git can't automatically merge changes because:

- Two branches modified the **same lines** in a file
- One branch deleted a file that another branch modified
- Both branches added different files with the **same name**

### Identifying Conflicts in GitHub Desktop

When you try to merge conflicting branches, GitHub Desktop will:

1. Display a warning about conflicts
2. List the conflicting files
3. Show a "Resolve conflicts" button

### Resolving Conflicts Step-by-Step

**Step 1:** GitHub Desktop shows the conflicting files

**Step 2:** Click **Open in [Editor]** or open the file manually

**Step 3:** Look for conflict markers:

```
<<<<<<< HEAD
Your changes on the current branch
=======
Changes from the other branch
>>>>>>> other-branch
```

**Step 4:** Edit the file to resolve the conflict:

- Keep one version, the other, or combine them
- Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

**Step 5:** Save the file

**Step 6:** Return to GitHub Desktop and mark as resolved:

- The file should no longer show as conflicted
- Click **Continue merge** or **Commit merge**

### Visual Conflict Resolution

GitHub Desktop offers a visual conflict editor:

1. Click the conflicting file
2. Choose:
   - **Use the changes from [current branch]**
   - **Use the changes from [other branch]**
   - **Open in editor** for manual resolution

---

### Exercise 5: Create and Resolve a Merge Conflict

**Objective:** Intentionally create a conflict and resolve it.

**Steps:**

1. **Create two branches from main:**

   - Create `conflict-branch-a`
   - Switch back to main, then create `conflict-branch-b`
2. **On `conflict-branch-a`:**

   - Edit `hello.txt` to say:
     ```
     Hello from Branch A!
     This is my first repository.
     ```
   - Commit: "Update greeting from branch A"
3. **Switch to `conflict-branch-b`:**

   - Edit `hello.txt` to say:
     ```
     Hello from Branch B!
     This is my first repository.
     ```
   - Commit: "Update greeting from branch B"
4. **Merge branch A into main:**

   - Switch to main
   - Click Branch > Merge into Current Branch
   - Select conflict-branch-a
   - Click Merge (should succeed without conflict)
5. **Try to merge branch B into main:**

   - Click Branch > Merge into Current Branch
   - Select conflict-branch-b
   - A conflict will occur
6. **Resolve the conflict:**

   - Open `hello.txt` in your editor
   - You'll see conflict markers
   - Edit to combine both greetings:
     ```
     Hello from both Branch A and Branch B!
     This is my first repository.
     ```
   - Save the file
7. **Complete the merge:**

   - Return to GitHub Desktop
   - Click Continue Merge
   - The merge is complete

**Expected Outcome:** You've successfully resolved a merge conflict, and `hello.txt` contains your combined changes.

---

## 8. Summary & Best Practices

### Commit Message Conventions

Follow the **Conventional Commits** format:

```
<type>: <description>

[optional body]
```

**Types:**

| Type         | When to Use                 |
| ------------ | --------------------------- |
| `feat`     | New feature                 |
| `fix`      | Bug fix                     |
| `docs`     | Documentation changes       |
| `style`    | Formatting (no code change) |
| `refactor` | Code restructuring          |
| `test`     | Adding tests                |
| `chore`    | Maintenance tasks           |

**Examples:**

```
feat: add user authentication system
fix: resolve login timeout issue
docs: update API documentation
```

### Branch Naming Conventions

```
<type>/<short-description>
```

- Use lowercase
- Use hyphens to separate words
- Keep it short but descriptive

**Examples:**

- `feature/user-profile`
- `bugfix/login-crash`
- `docs/readme-update`
- `hotfix/security-vulnerability`

### When to Commit

Commit:

- After completing a logical unit of work
- Before switching branches
- Before making risky changes
- At least once per work session

Don't commit:

- Broken code (if avoidable)
- Half-finished features to main
- Sensitive information (passwords, API keys)

### Quick Reference Cheat Sheet

| Action              | GitHub Desktop Shortcut  |
| ------------------- | ------------------------ |
| Clone Repository    | `Cmd/Ctrl + Shift + O` |
| Commit              | `Cmd/Ctrl + Enter`     |
| Push                | `Cmd/Ctrl + P`         |
| Pull                | `Cmd/Ctrl + Shift + P` |
| New Branch          | `Cmd/Ctrl + Shift + N` |
| Switch Branch       | `Cmd/Ctrl + B`         |
| Create Pull Request | `Cmd/Ctrl + R`         |
| View on GitHub      | `Cmd/Ctrl + Shift + G` |

### Workflow Summary

1. Pull latest changes (always start here)
2. Create feature branch
3. Make changes
4. Stage and Commit
5. Push to GitHub
6. Create Pull Request
7. Address feedback
8. Merge
9. Delete branch
10. Pull latest changes

---

## 9. Troubleshooting

### Common Issues and Solutions

#### "Failed to push"

**Cause:** Remote has changes you don't have locally.

**Solution:**

1. Click Fetch origin
2. Click Pull origin
3. Resolve any conflicts
4. Try pushing again

#### "Authentication failed"

**Cause:** GitHub credentials expired or incorrect.

**Solution:**

1. Go to Preferences/Options > Accounts
2. Sign out of GitHub
3. Sign back in
4. Re-authorize GitHub Desktop

#### "Repository not found"

**Cause:** The repository was deleted, made private, or you lost access.

**Solution:**

1. Verify the repo still exists on GitHub
2. Check if it's now private
3. Request access from the owner if needed

#### "Merge conflicts detected"

**Cause:** Same lines were edited in both branches.

**Solution:** See [Section 7: Handling Merge Conflicts](#7-handling-merge-conflicts)

#### "Changes not showing up"

**Cause:** Files might be gitignored or not saved.

**Solution:**

1. Ensure files are saved
2. Check `.gitignore` for exclusions
3. Try clicking Repository > Refresh

#### "Accidentally committed to wrong branch"

**Solution:**

1. Don't panic
2. Use Branch > Undo Last Commit (if not pushed)
3. Switch to correct branch
4. Re-commit your changes

#### "Want to undo a commit"

**Solution (not yet pushed):**

1. Click History tab
2. Right-click the commit
3. Select Undo Commit

**Solution (already pushed):**

1. Create a new commit that reverses the changes
2. This is called a "revert"

### Where to Get Help

- **GitHub Documentation:** [docs.github.com](https://docs.github.com)
- **GitHub Desktop Docs:** [docs.github.com/desktop](https://docs.github.com/en/desktop)
- **GitHub Community:** [github.community](https://github.community)
- **Stack Overflow:** Search with tags `[github]` or `[github-desktop]`
