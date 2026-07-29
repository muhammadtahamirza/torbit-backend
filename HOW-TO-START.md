# 🏁 How to Start — Your First Steps as a Torbit Contributor

New here? Follow these steps in order. Don't skip ahead — each step sets you up for the next one.

---

## Step 1: Set Up the Project Locally

Head over to [`CONTRIBUTING.md`](./CONTRIBUTING.md) and follow the setup instructions for **both** the backend and frontend repos.

Once it's running, don't just stare at it — **play with it**:
- Register a user
- Log in
- Create a post / ride offer
- View posts, edit your profile, try out the features

Everything runs on your **local PostgreSQL database** (via Docker), so nothing you do touches real production data. Break things, poke around, get comfortable. This is the best way to actually understand how the app works before you touch any code.

> 💡 Not sure what a button or feature is supposed to do? Try it and see. That curiosity is exactly how you'll start noticing bugs and improvement ideas — which is often where your first contribution idea comes from.

---

## Step 2: Make Your First (Easy) Contribution

Go to the repo's **Issues** tab and look for an issue titled something like **"How to contribute to open source"** (or similar beginner-tagged issue).

This issue is intentionally simple — it exists purely to walk you through the mechanics of contributing (forking, branching, opening a PR) with almost zero code involved.

Follow it step by step. Once your PR is merged:

🎉 **Congratulations — you're now an official Torbit contributor!**

Your name is on record, and you've proven the full contribution loop works end-to-end for you.

---

## Step 3: Pick a Real Issue

Now that you've done a practice run, browse the **Issues** tab again and pick a real task that matches your interest and skill level — check the tracks listed in [`README.md`](./README.md#-project-roadmap--open-tasks) (Database, Ride Matching, Testing, UI/UX).

Before you start coding, make sure you're comfortable with:
- **Git & GitHub basics** — forking, branching, committing, opening a PR
- **The specific part of the stack the issue touches** — backend (Express/Prisma), frontend (React), or database (PostgreSQL)

If any of that feels unfamiliar, check [`RESOURCES.md`](./RESOURCES.md) — it has curated learning links for every part of our stack.

---

## Step 4: Write the Code & Submit Your PR

Once you understand the issue and have the concepts down, it's time to actually write the fix or feature.

The **exact git workflow** — forking the repo, creating a branch, committing with the right prefix (`feat:`, `fix:`, `docs:`), pushing, and opening a Pull Request — is fully explained at the bottom of [`CONTRIBUTING.md`](./CONTRIBUTING.md#-how-to-contribute-fork--branch--pr). Follow it exactly.

Quick recap:
1. Fork the repo
2. Create a branch (`feature/your-feature-name`)
3. Write your code and test it locally
4. Commit with a clean message
5. Push your branch and open a PR against `main`
6. A maintainer reviews it, you address any feedback, and it gets merged 🚀

---

## 🗺️ Quick Reference

| I want to... | Go to... |
|---|---|
| Understand the project and its goals | [`README.md`](./README.md) |
| Set up the project locally | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Learn PERN, Git/GitHub fundamentals | [`RESOURCES.md`](./RESOURCES.md) |
| Know what to do first | You're already here 🙂 |

Welcome aboard — we're glad you're here. See you in the PRs! 🚗💨