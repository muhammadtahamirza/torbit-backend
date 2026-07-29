# 🚗 Torbit — Pakistan's Campus Carpooling Platform

Torbit is a community-driven, **open-source carpooling and fuel-sharing web app** built for university students. It started at FAST-NU to help students traveling similar routes team up, split fuel costs, and make daily campus commutes cheaper and easier.

**Live app:** [torbit.vercel.app](https://torbit.vercel.app)

---

## 🎯 Our Vision

We're starting with the FAST community, but the goal is bigger: bring Torbit to **every major university in Pakistan**. To get there, we're moving from a free-tier serverless setup to a proper VPS-based architecture that can handle nationwide student traffic.

If that sounds exciting, we'd love your help building it. 🙌

---

## 🛠️ Tech Stack (PERN)

Torbit is built on the PERN stack — a great sandbox for students who want real-world, full-stack experience:

| Layer | Tech | Role |
|---|---|---|
| **P** | PostgreSQL | Stores user profiles, ride offers, and route/matching data |
| **E** | Express.js | Backend REST API — routing, auth, and business logic |
| **R** | React.js | Frontend UI — mobile-friendly, fast, responsive |
| **N** | Node.js | JavaScript runtime powering the whole backend |

---

## 📦 Repositories

Torbit is split across two repos:

- **Frontend:** [torbit-frontend](https://github.com/your-username/torbit-frontend) — React app
- **Backend:** [torbit-backend](https://github.com/your-username/torbit-backend) — Express API + PostgreSQL

> Both repos are open source. Pick whichever one matches the feature you want to work on — many contributions will touch both.

---

## 🚀 Why Contribute?

Torbit isn't a toy project — it's a **live app used by real students**. Contributing here gives you:

1. **Real industry simulation** — branches, code review, CI/CD checks, and clean git workflows, just like at an actual tech company.
2. **A permanent portfolio entry** — once your PR merges, GitHub records you as an official contributor on the project.
3. **Visibility for your career** — every month we publish a **"Contributors of the Month"** post on LinkedIn, tagging active contributors (3+ merged PRs) and showcasing what they built to recruiters.

New to full-stack dev? No problem — see [CONTRIBUTING.md](./CONTRIBUTING.md) for a beginner-friendly setup guide, learning resources, and a step-by-step walkthrough of how to submit your first pull request.

---

## 🗺️ Project Roadmap & Open Tasks

These tracks are all live as GitHub Issues — pick one and jump in!

### 📊 Database & ORM
- [ ] Set up and initialize Prisma ORM in the project
- [ ] Migrate the database schema from raw SQL to Prisma Schema models
- [ ] Refactor backend controllers to use Prisma queries instead of raw `pool.query()` calls

### 🚗 Ride Intelligence & Matching
- [ ] Build a notification/alert engine for new relevant routes
- [ ] Implement location-based matching to auto-suggest close-proximity routes
- [ ] Redesign the booking flow for a smoother driver ↔ passenger connection

### 🧪 Quality Assurance & Testing
- [ ] Write unit, mock, and integration tests
- [ ] Add code coverage requirements for new features
- [ ] Set up GitHub Actions CI/CD to automatically validate incoming code

### 🎨 UI/UX
- [ ] Replace placeholder AI-generated styling with a polished, intuitive mobile-first UI

---

## 📢 Support the Project

If you believe in what we're building, please:
- ⭐ **Star** this repo
- 📣 Share it in your campus groups and social media
- 🤝 Bring in your batchmates who want real-world dev experience

Let's make daily campus travel smart, safe, and collaborative — together.

---

## 📄 License

This project is open source. Check the repository's `LICENSE` file for details.