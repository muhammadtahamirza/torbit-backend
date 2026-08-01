# 🤝 Contributing to Torbit

Welcome! This guide walks you through everything you need to start contributing to Torbit — from setting up the project locally to submitting your first pull request. It's written for beginners, so don't worry if this is your first open-source contribution. 🎉

---

## 📚 New to Full-Stack Dev? Start Here

If any of the terms below are unfamiliar, watch these first — they'll make the rest of this guide much easier to follow:

- **Git & GitHub Basics:** [Git & GitHub Crash Course for Beginners](https://youtube.com) — forking, cloning, commits, and pull requests
- **React Basics:** [ReactJS Crash Course Essentials](https://youtube.com) — components, `useState`, `useEffect`
- **Express API Basics:** [Build an Express.js REST API](https://youtube.com) — `GET`, `POST`, `PUT`, `DELETE`, status codes
- **Prisma ORM Basics:** [Prisma ORM Complete Beginner Guide](https://youtube.com) — schemas and database interaction

---

## 💻 Local Setup

### 1. Install Prerequisites

Install these on your machine before doing anything else:

- **Git** → [git-scm.com](https://git-scm.com)
- **Node.js** (v18 or v20 LTS) → [nodejs.org](https://nodejs.org)
- **Docker Desktop** → [docker.com](https://docker.com)

### 2. Set Up the Local Database

We use **Docker Compose** to run a local PostgreSQL instance, completely separate from production data.

Open a terminal inside the `torbit-backend/` folder and run the commands for your OS:

#### 🪟 Windows (PowerShell)
```powershell
docker compose up -d
docker compose ps   # confirm the container is running on port 5432
```
> Make sure Docker Desktop is open and running before this step.

#### 🐧 Linux / 🍏 macOS (Terminal)
```bash
sudo systemctl start docker   # Linux only
docker compose up -d
docker compose ps
```

This automatically creates the database tables and seeds them with safe, mock campus data — no manual setup needed.

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and confirm it looks like this:

```text
PORT=5000
DATABASE_URL="postgresql://torbit_user:torbit_password@localhost:5432/torbit_local?schema=public"
JWT_SECRET="local_development_secret_key_dont_leak"
NODE_ENV="development"
```

**Developer Bypass Mode:** since `NODE_ENV=development`, the app won't send real emails. When you register a test user, the OTP prints straight to your terminal — copy it into the browser. You can also just type `123456`, which always works as a master OTP for local testing.

### 4. Run the App

**Backend** (in `torbit-backend/`):
```bash
npm install
npm run dev
```

**Frontend** (in a separate `torbit-frontend/` terminal):
```bash
npm install
npm start
```

Your local app is now running at **http://localhost:3000** 🎉

### 🚨 Reset Your Local Database

If your local data ever gets messy or corrupted, wipe it and start fresh:

```bash
docker compose down -v && docker compose up -d
```

---

## 🐙 How to Contribute (Fork → Branch → PR)

We use the standard **Forking Workflow** to keep the main codebase safe and organized.

### 1. Fork the Repo
Go to the repo on GitHub and click **Fork** (top right corner). This creates your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 3. Create a Feature Branch
Never commit directly to `main`. Branch names must start with one of the following prefixes, followed by a short, hyphenated description of the task:

| Prefix | When to use it | Example |
|---|---|---|
| `feat/` | Adding a new feature | `feat/add-endpoint-user` |
| `fix/` | Fixing a bug or crash | `fix/mobile-nav-crash` |
| `docs/` | Editing docs/markdown | `docs/update-readme-setup` |

```bash
git checkout -b feat/your-feature-name
# example: git checkout -b feat/prisma-user-migration
```

### 4. Make Your Changes
Pick an open issue from the [README roadmap](./README.md#-project-roadmap--open-tasks) or the GitHub Issues tab, and start coding.

### 5. Write a Clean Commit Message
We follow semantic commit prefixes with a scope, in this format:

```
<type>(<topic>): <brief description>
```

| Prefix | When to use it | Example |
|---|---|---|
| `feat(topic):` | Adding a new feature | `feat(users): calculate location proximity matches` |
| `fix(topic):` | Fixing a bug or crash | `fix(nav): mobile navigation menu crash` |
| `docs(topic):` | Editing docs/markdown | `docs(readme): improve resources readme` |

```bash
git add .
git commit -m "feat(auth): migrate raw SQL authentication paths to Prisma ORM"
git push origin feat/your-feature-name
```

### 6. Open a Pull Request
1. Go to your fork on GitHub.
2. Click **"Compare & Pull Request"** on your pushed branch.
3. Clearly describe:
   - What you changed and why
   - How you tested it
   - A screenshot, if you changed anything visual
4. Submit! A maintainer will review your PR, leave feedback if needed, and merge it once it's ready.

---

## ✅ Contribution Checklist

Before opening a PR, double check:

- [ ] My branch is based on the latest `main`
- [ ] My branch name starts with `feat/`, `fix/`, or `docs/`
- [ ] My code runs locally without errors
- [ ] I followed the commit message format (`feat(topic):`, `fix(topic):`, `docs(topic):`)
- [ ] I described my changes clearly in the PR
- [ ] I didn't commit `.env` or any secrets

---

## 🙋 Need Help?

Stuck on setup or unsure where to start? Open a GitHub Issue with the `question` label, or ask in the repo's discussion tab — we're happy to help you get unstuck.

Welcome to the team, and happy coding! 🚀