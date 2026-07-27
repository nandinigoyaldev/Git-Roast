<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:0d1117,100:238636&text=GitRoast%20%F0%9F%94%A5&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&descAlignY=55&desc=Playful%20GitHub%20Profile%20Roaster%20%26%20Open%20Source%20Mentor" alt="GitRoast Banner"/>

  <h1>GitRoast 🔥 — Playful GitHub Profile Roaster & Open Source Mentor</h1>

  <p>
    Turn your GitHub profile into a hilariously honest roasting session,
    generate an impressive <code>README.md</code>, master conventional Git commits,
    and audit open-source repositories for hackathons & recruiter impression.
  </p>

  <p>
    <strong>GitHub Stats → Playful Roasts</strong> •
    <strong>Toxic Traits Badge Matrix</strong> •
    <strong>Impression Grade (A+ to F)</strong> •
    <strong>Interactive README Builder</strong> •
    <strong>Git Commit Helper</strong>
  </p>

  <br />

  <div style="display: flex; gap: 8px; justify-content: center;">
    <a href="https://github.com/nandinigoyaldev/Developer-rpg-profile-generator" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/GitHub-GitRoast-238636?style=for-the-badge&logo=github" alt="GitHub Repo"/>
    </a>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite" alt="Vite"/>
    </a>
    <a href="https://react.dev" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react" alt="React 19"/>
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
    </a>
  </div>
</div>

---

## 🌟 What is GitRoast?

**GitRoast** was born from a common challenge in open source: developers constantly ask:
1. *"How to judge my GitHub profile?"* — **Profile Roaster & Grade Engine** evaluates your profile stats, bio, pinned repos, and commit streaks with playful roasts and actionable feedback.
2. *"How to create a README like yours?"* — **Interactive README Generator** compiles your stats into customizable Markdown templates with live `.md` export.
3. *"How to make my profile impressive?"* — **Impression Score Breakdown** gives category ratings (Bio, Activity, Repositories, Social) and step-by-step tips.
4. *"How to do a commit?"* — **Git Commit Helper & CLI Simulator** guides beginners through Conventional Commits (`feat:`, `fix:`, `docs:`) with step-by-step terminal execution commands.

---

## 🚀 Key Features

- <strong>🔥 Playful Profile Roaster</strong>
  - Fetch any public GitHub username (or test with preset profiles like `@octocat`, `@torvalds`, `@gaearon`).
  - Receive an Impression Grade (`A+` to `F`), custom headline roast, breakdown scores out of 100, and toxic trait badges.
- <strong>📝 Impressive README Builder</strong>
  - Render themed markdown READMEs automatically populated with live stats.
  - One-click copy or `.md` file download.
- <strong>💡 Interactive Git Commit Helper</strong>
  - Visual builder for Conventional Commits with scope, description, and breaking change flags.
  - Step-by-step CLI command snippets (`git status`, `git add .`, `git commit -m "..."`, `git push origin main`).
- <strong>🔍 Open-Source Repository Auditor</strong>
  - Audit public repositories for health standards: `CONTRIBUTING.md`, license, issue templates, CI badges, and documentation completeness.
- <strong>⚔️ Profile PvP Battle & Wrapped</strong>
  - Compare two developer profiles head-to-head or generate shareable GitHub Wrapped slides.
- <strong>🎨 Embeddable Dynamic SVG Badges</strong>
  - Serverless API endpoint (`/api/badge`) to render live status cards directly on GitHub profile READMEs.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript 6, Vite 8, Recharts (Radar charts), React Markdown, Rehype Raw.
- **Styling**: Native Vanilla GitHub Dark Theme CSS system (`#0d1117`, `#161b22`, `#238636`, `#58a6ff`).
- **Serverless API Layer** (`/api`):
  - `/api/github.ts` — Fetches profile metadata, repositories, PR ratios, commit history from GitHub REST API.
  - `/api/readme.ts` — Serverless Markdown generator engine.
  - `/api/badge.ts` — Dynamic SVG card generator for profile embeds.
  - `/api/repo.ts` — Repository health auditor.

---

## 💻 Quick Start & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nandinigoyaldev/Developer-rpg-profile-generator.git
   cd Developer-rpg-profile-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 API Endpoints Overview

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/github?username={user}` | `GET` | Fetches GitHub profile details, commits, PRs, and repos. |
| `/api/readme` | `POST` | Generates formatted profile README markdown. |
| `/api/badge?username={user}` | `GET` | Returns embeddable SVG status card. |
| `/api/repo?url={url}` | `POST` | Audits open-source repository health. |

---

## 📄 License

Distributed under the MIT License. Built for open-source contributors & hackathons with ❤️.
