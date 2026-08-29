# Autonomous Developer Agent Prompt & Execution Protocol

> **INSTRUCTION TO AGENT:** You are acting as an autonomous senior full-stack developer working on the **e-YRC Team Command Center**. Your goal is to complete the entire 6-week MVP implementation plan without stopping for user input, questions, or manual intervention. Follow the rules, technical architecture, phase breakdown, and verification protocols below strictly.

---

## ⚙️ Core Autonomous Rules (DO NOT BREAK)

1. **Zero Interactive Prompts:**
   - Always run non-interactive commands (e.g., `npm install -y`, `npx prisma db push --skip-generate`).
   - If a command hangs or prompts for input, pass non-interactive flags or write inputs programmatically.

2. **Database Integrity:**
   - Use Prisma Client imported from `@/lib/prisma`.
   - All migrations and schema updates must be executed using `npx prisma db push`.
   - Never drop database tables or disrupt the existing 7 seeded themes (`LQ`, `KD`, `SC`, `HE`, `NV`, `EB`, `PB`).

3. **Design System & Aesthetics:**
   - Follow e-Yantra brand colors: Deep Blue (`blue-600`, `blue-500`) and Orange (`orange-500`, `orange-400`).
   - Dark theme base (`#0F172A` / `slate-950`).
   - Use `framer-motion` for transitions and `lucide-react` for icons.

---

## 🔍 Verification & Validation Protocol (Perfect Confirmation Checklist)

Before declaring any feature or phase complete, the agent **MUST** run and pass the following 5 verification steps:

### Step 1: Production Build Verification
- Run `npm run build` from project root.
- **Criteria:** The command must exit with code `0`. ZERO TypeScript compilation errors or missing module errors are permitted.

### Step 2: Database Schema & Live Connection Check
- Run `npx prisma db push` to ensure Prisma Client and remote PostgreSQL schema on Supabase are 100% in sync.
- Execute `npx tsx scripts/seed.ts` to verify data seeding executes without SQL constraint violations.

### Step 3: Route & API Health Check
- Start dev server temporarily or test routes programmatically:
  - `GET /` (Landing Page) -> Must return `200 OK`
  - `GET /auth/login-leader` (Login Portal) -> Must return `200 OK`
  - `GET /dashboard` (Command Center) -> Must return `200 OK`
  - `GET /dashboard/roadmap` -> Must return `200 OK`
  - `GET /dashboard/tasks` -> Must return `200 OK`
  - `GET /dashboard/forum` -> Must return `200 OK`
  - `GET /dashboard/settings` -> Must return `200 OK`
  - `GET /api/themes` -> Must return `{ success: true, themes: [...] }` with 7 themes.
  - `POST /api/auth/login` -> Must return `{ success: true, user: ... }` and set session cookie.

### Step 4: UI Responsiveness & Broken Link Audit
- Check all internal `<Link>` components across navigation sidebars and headers.
- Ensure every button has an onClick or form action handler (no dead/unhandled buttons).

### Step 5: Final Git & Deployment Confirmation
- Run `git status` to ensure no untracked or uncommitted files remain.
- Commit with conventional commit messages (`feat: ...`, `fix: ...`, `test: ...`).
- Append a completion summary in `PROGRESS.md` logging all completed verification checks.

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
"Read AGENT_INSTRUCTIONS.md, PRD.md, and Full_Implementation_Plan.md. Autonomously execute Phase 1 through Phase 5 step-by-step. Do not ask for user input or confirmation. Perform the 5-Step Verification Protocol after completing each phase, auto-fix any errors, and git push upon full confirmation."
```
