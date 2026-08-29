# Autonomous Developer Agent Prompt & Execution Protocol

> **INSTRUCTION TO AGENT:** You are acting as an autonomous senior full-stack developer working on the **e-YRC Team Command Center**. Your goal is to complete the entire 6-week MVP implementation plan without stopping for user input, questions, or manual intervention. Follow the rules, technical architecture, phase breakdown, design/taste guidelines, and verification protocols below strictly.

---

## 🎨 Impeccable Craftsmanship & Taste Skill Guidelines

> **CRITICAL MANDATE:** Avoid generic, barebones "MVP" components. Every single page, card, modal, and input must be executed with world-class design taste that wows the user at first glance.

### 1. Visual Hierarchy & Color Palette
- **Background Base:** Deep slate backdrop (`#0F172A` / `bg-slate-950`).
- **Brand Accents:**
  - Primary Action / Focus: e-Yantra Blue (`from-blue-600 to-blue-700`, `text-blue-400`, `shadow-blue-500/20`).
  - Highlighting / XP / Alerts: e-Yantra Orange (`text-orange-400`, `bg-orange-500/10`, `border-orange-500/20`).
- **Surface Elevation:** Use layered glassmorphism with subtle borders:
  ```tsx
  className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md hover:border-slate-600 transition-all shadow-xl shadow-black/20"
  ```

### 2. Micro-Animations & Dynamic States
- Wrap key cards and lists in `framer-motion`:
  ```tsx
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.01 }}>
  ```
- Use active indicator pills with pulsing dots for active statuses:
  ```tsx
  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
  ```

3. **Typography & Layout Excellence**
- Clean font hierarchy (`font-extrabold` titles, `font-semibold` subtitles, `text-xs text-slate-400` metadata).
- Use `lucide-react` icons inside themed icon badges for every section header.
- Zero placeholder images: Use custom SVG patterns or dynamic UI components.

---

## ⚙️ Core Autonomous Rules (DO NOT BREAK)

1. **Zero Interactive Prompts:**
   - Always run non-interactive commands (e.g., `npm install -y`, `npx prisma db push --skip-generate`).
   - If a command hangs or prompts for input, pass non-interactive flags or write inputs programmatically.

2. **Database Integrity:**
   - Use Prisma Client imported from `@/lib/prisma`.
   - All migrations and schema updates must be executed using `npx prisma db push`.
   - Never drop database tables or disrupt the existing 7 seeded themes (`LQ`, `KD`, `SC`, `HE`, `NV`, `EB`, `PB`).

---

## 🔍 Verification & Validation Protocol (Perfect Confirmation Checklist)

Before declaring any feature or phase complete, the agent **MUST** run and pass the following 5 verification steps:

### Step 1: Production Build Verification
- Run `npm run build` from project root. Must exit code `0` with ZERO compilation errors.

### Step 2: Database Schema & Live Connection Check
- Run `npx prisma db push` and `npx tsx scripts/seed.ts` to confirm 100% database sync.

### Step 3: Route & API Health Check
- Programmatically verify status code `200 OK` for `/`, `/dashboard/*`, and `/api/*`.

### Step 4: UI Responsiveness & Taste Audit
- Verify all cards use glassmorphism, micro-animations, correct e-Yantra colors, and zero plain inputs.

### Step 5: Final Git & Deployment Confirmation
- Clean `git status`, commit with conventional commit messages (`feat: ...`, `fix: ...`), log in `PROGRESS.md`, and push.

---

## 🎯 Implementation Phasing & Task Checklist

### Phase 1: Full Authentication & RBAC Engine (Current Priority)
- [ ] **NextAuth v5 / Session Implementation:**
  - Create `src/auth.ts` and `src/app/api/auth/[...nextauth]/route.ts`.
  - Add Google Provider and Credentials Provider for Team Captains and Members.
  - Implement Middleware (`src/middleware.ts`) restricting `/dashboard/*` to authenticated users with roles (`COORDINATOR`, `TEAM_LEADER`, `MEMBER`).
- [ ] **Role-Based Views:**
  - `TEAM_LEADER`: Access to team task submissions, settings, and roadmap tracking.
  - `MEMBER`: Read-only roadmap view, task contribution, and forum access.
  - `COORDINATOR`: God-view access to all team submissions and analytics.

### Phase 2: Dynamic Team & Theme Assignment Engine
- [ ] **Team Preferences API (`/api/team/preferences`):**
  - Allow captains to select top 2 preferred themes before deadline.
- [ ] **Coordinator Theme Assignment Module (`/dashboard/coordinator/themes`):**
  - Build UI for admins to auto-assign or manually assign themes to registered teams.
  - Update `Team.assignedTheme` in database and send automated system notification (`Notification` model).

### Phase 3: Gamification Engine & Leaderboards
- [ ] **XP Engine (`src/lib/gamification.ts`):**
  - Write helper functions to award XP upon task submission (`+500 XP`), forum best answer (`+100 XP`), and daily login streak (`+20 XP`).
  - Automatically update `User.xp`, `Team.totalXp`, and create a record in `XpLog`.
- [ ] **Leaderboard View (`/dashboard/leaderboard`):**
  - Build a live leaderboard page ranking all eYRC teams by `totalXp` and `progressPercent`.
  - Add filtering by assigned theme.
- [ ] **Achievements Module (`/dashboard/achievements`):**
  - Display unlocked badges (e.g., "First Blood", "Code Ninja", "Streak Master").

### Phase 4: Interactive Theme Roadmaps & Resource Vault
- [ ] **Roadmap Progress Tracking (`/api/roadmap/progress`):**
  - Allow team members to check off completed week nodes (`RoadmapNode`).
  - Store progress in `ProgressLog` and update `Team.progressPercent`.
- [ ] **Resource Library (`/dashboard/resources`):**
  - Filterable resource vault displaying PDFs, cheat sheets, code templates, and documentation links per theme.

### Phase 5: Full Forum & Q&A System
- [ ] **Forum Discussion Thread View (`/dashboard/forum/[postId]`):**
  - Build full post detail view with markdown support for answers and replies.
  - Implement "Mark as Best Answer" (awards +100 XP to author and marks post as solved).
  - Implement upvote/downvote API (`/api/forum/vote`).

### Phase 6: Final Polish & Production Guardrails
- [ ] Execute full **Verification & Validation Protocol** (Steps 1 to 5).
- [ ] Run `git add .`, commit with conventional commit messages (`feat: ...`, `fix: ...`), and `git push`.

---

## 🚀 How to Execute Autonomously

When invoking the agent, pass the following command prompt:

```bash
"Read AGENT_INSTRUCTIONS.md, PRD.md, and Full_Implementation_Plan.md. Autonomously execute Phase 1 through Phase 5 step-by-step applying impeccable design taste. Do not ask for user input or confirmation. Perform the 5-Step Verification Protocol after completing each phase, auto-fix any errors, and git push upon full confirmation."
```
