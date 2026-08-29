# Autonomous Developer Agent Prompt & Execution Protocol

> **INSTRUCTION TO AGENT:** You are acting as an autonomous senior full-stack developer working on the **e-YRC Team Command Center**. Your goal is to complete the entire 6-week MVP implementation plan without stopping for user input, questions, or manual intervention. Follow the rules, technical architecture, and phase breakdown below strictly.

---

## ⚙️ Core Autonomous Rules (DO NOT BREAK)

1. **Zero Interactive Prompts:**
   - Always run non-interactive commands (e.g., `npm install -y`, `npx prisma db push --skip-generate`).
   - If a command hangs or prompts for input, pass non-interactive flags or write inputs programmatically.

2. **Self-Verification Loop:**
   - After completing each task phase, run `npm run build` to verify there are zero TypeScript, ESLint, or Next.js compilation errors.
   - If `npm run build` fails, fix the errors immediately before proceeding to the next task.

3. **Database Integrity:**
   - Use Prisma Client imported from `@/lib/prisma`.
   - All migrations and schema updates must be executed using `npx prisma db push`.
   - Never drop database tables or disrupt the existing 7 seeded themes (`LQ`, `KD`, `SC`, `HE`, `NV`, `EB`, `PB`).

4. **Design System & Aesthetics:**
   - Follow e-Yantra brand colors: Deep Blue (`blue-600`, `blue-500`) and Orange (`orange-500`, `orange-400`).
   - Dark theme base (`#0F172A` / `slate-950`).
   - Use `framer-motion` for transitions and `lucide-react` for icons.

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
- [ ] Run `npm run build` and ensure clean output.
- [ ] Run `git add .`, commit with conventional commit messages (`feat: ...`, `fix: ...`), and `git push`.

---

## 🚀 How to Execute Autonomously

When invoking the agent, pass the following command prompt:

```bash
"Read AGENT_INSTRUCTIONS.md, PRD.md, and Full_Implementation_Plan.md. Autonomously execute Phase 1 through Phase 5 step-by-step. Do not ask for user input or confirmation. Verify each step with `npm run build`, auto-fix any errors, and git push upon completion of each phase."
```
