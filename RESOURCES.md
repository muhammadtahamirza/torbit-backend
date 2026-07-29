# 📚 Resources.md — Learn the Stack

This file is your learning companion. Torbit is built on **PERN** (PostgreSQL, Express, React, Node) plus **Git/GitHub** for collaboration. You don't need to master everything before contributing — just enough to understand what you're working on. Use this as a reference to come back to whenever you're stuck.

---

## 🌱 Absolute Fundamentals (if you're brand new)

Before PERN, make sure you're comfortable with the basics of the web:

- **HTML & CSS Basics:** [freeCodeCamp — Responsive Web Design](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
- **JavaScript Fundamentals:** [JavaScript.info](https://javascript.info/) — the best free, in-depth JS reference
- **How the Web Works:** [MDN — How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

---

## 🗄️ P — PostgreSQL (Database)

- [PostgreSQL Official Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [freeCodeCamp — SQL & PostgreSQL Full Course (YouTube)](https://youtube.com)
- **Prisma ORM** (what we're migrating to):
  - [Prisma Docs — Getting Started](https://www.prisma.io/docs/getting-started)
  - [Prisma ORM Complete Beginner Guide (YouTube)](https://youtube.com)

**Concepts to know:** tables, primary/foreign keys, relationships (one-to-many, many-to-many), basic `SELECT`/`INSERT`/`UPDATE`/`DELETE`, and how an ORM like Prisma maps JS objects to database rows.

---

## ⚙️ E + N — Express.js & Node.js (Backend)

- [Node.js Official Docs](https://nodejs.org/en/docs)
- [Express.js Official Guide](https://expressjs.com/en/starter/installing.html)
- [Build an Express.js REST API (YouTube)](https://youtube.com)
- [REST API Design Best Practices](https://restfulapi.net/)

**Concepts to know:** routes, middleware, request/response cycle, REST verbs (`GET`, `POST`, `PUT`, `DELETE`), status codes, and how JWT auth works at a high level.

---

## ⚛️ R — React.js (Frontend)

- [React Official Docs — Learn React](https://react.dev/learn)
- [ReactJS Crash Course Essentials (YouTube)](https://youtube.com)
- [React Hooks Explained (`useState`, `useEffect`)](https://react.dev/reference/react)

**Concepts to know:** components, props vs. state, hooks (`useState`, `useEffect`), conditional rendering, and calling backend APIs with `fetch`/`axios`.

---

## 🐙 Git & GitHub

- [Git & GitHub Crash Course for Beginners (YouTube)](https://youtube.com)
- [GitHub Docs — Hello World](https://docs.github.com/en/get-started/quickstart/hello-world)
- [Learn Git Branching (interactive)](https://learngitbranching.js.org/)

**Concepts to know:** clone vs. fork, branches, commits, pull requests, merge conflicts. See `CONTRIBUTING.md` for our exact fork → branch → PR workflow.

---

## 🐳 Docker (for local setup)

- [Docker Get Started Guide](https://docs.docker.com/get-started/)
- [Docker Compose in 12 Minutes (YouTube)](https://youtube.com)

You don't need to be a Docker expert — you just need to know `docker compose up -d` and `docker compose down -v`, both covered in `CONTRIBUTING.md`.

---

## 🧪 Testing (Jest & Supertest)

- [Jest Docs — Getting Started](https://jestjs.io/docs/getting-started)
- [Supertest (API testing) — GitHub README](https://github.com/ladjs/supertest)

---

## 💡 Tips for Learning Effectively

1. **Don't binge tutorials — solve issues.** Watching hours of crash courses without building anything doesn't stick. Pick a small, real GitHub issue in Torbit and learn what you need *while* solving it. You'll retain far more.
2. **Read the error message first.** 90% of beginner bugs are explained in the terminal output. Copy the exact error into Google or ask in the repo discussions.
3. **Use the official docs as your source of truth.** YouTube tutorials go outdated; official docs (React, Prisma, Express) are always current.
4. **Read existing code before writing new code.** Before implementing a feature, look at how a similar feature is already built in the codebase — follow the existing patterns.
5. **Small PRs > big PRs.** A focused, 20-line PR that does one thing well gets reviewed and merged much faster than a 500-line PR that touches everything.
6. **It's okay to ask questions.** Open a GitHub Issue with the `question` label if you're stuck — that's what the maintainers are here for.

---

## 🔗 Related Docs

- [`README.md`](./README.md) — project overview, vision, and roadmap
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — local setup and git workflow
- [`HOW-TO-START.md`](./HOW-TO-START.md) — your first steps as a new contributor