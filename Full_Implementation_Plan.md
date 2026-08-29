# eYRC Team Command Center — Full Implementation Plan

**Version:** 1.0  
**Date:** August 2026  
**Duration:** 6 Weeks to MVP  
**Team Size:** 2–3 developers (or 1 dedicated + contributors)

---

## Phase 0: Pre-Development (Week 0)

### Day 1–2: Setup & Planning
| Task | Owner | Output |
|------|-------|--------|
| Create GitHub repo with branch protection rules | Lead Dev | `eyrc-command-center` repo |
| Set up project board (GitHub Projects / Notion) | Coordinator | Kanban board |
| Define coding standards (ESLint, Prettier, commit conventions) | Lead Dev | `.eslintrc`, `.prettierrc` |
| Create Figma wireframes for key screens | UI Dev | Figma link |
| Set up Discord/Slack for team communication | Coordinator | Channel created |
| Register domain (optional) or decide on Vercel subdomain | Coordinator | `eyrc-command.vercel.app` |

### Day 3–4: Infrastructure Setup
| Task | Owner | Output |
|------|-------|--------|
| Create Vercel project & link repo | Lead Dev | Deployed empty Next.js app |
| Set up Neon PostgreSQL database | Lead Dev | DB connection string |
| Set up Upstash Redis | Lead Dev | Redis URL |
| Set up Cloudinary account | Lead Dev | API credentials |
| Set up Resend account | Lead Dev | API key |
| Set up Google OAuth credentials | Lead Dev | Client ID & Secret |
| Configure environment variables | Lead Dev | `.env.local` template |

### Day 5–7: Foundation
| Task | Owner | Output |
|------|-------|--------|
| Initialize Next.js 14 with App Router, TypeScript, Tailwind | Lead Dev | Working scaffold |
| Configure Prisma with PostgreSQL | Lead Dev | `schema.prisma` base |
| Set up NextAuth.js v5 with Google provider | Lead Dev | Working auth flow |
| Set up shadcn/ui components | UI Dev | Button, Card, Input, Dialog |
| Set up Zustand store | Lead Dev | Global state scaffold |
| Set up React Query | Lead Dev | Query client setup |
| Set up Socket.io server | Lead Dev | Basic connection working |
| Set up Bull MQ + Redis | Lead Dev | Queue processor running |
| Write initial tests (Jest + React Testing Library) | All | 5 passing tests |

**Week 0 Deliverable:** ✅ Working auth, connected DB, deployed "Hello World" app

---

## Phase 1: Core Foundation (Week 1)

### Sprint Goal: Users can register, create teams, and browse themes

### Day 1–2: Authentication & User Management
```
□ Implement Google OAuth sign-in/sign-out
□ Create user profile page (view + edit)
□ Role selection flow (first-time login)
□ Profile setup: year, branch, GitHub, LinkedIn
□ Avatar upload to Cloudinary
□ Middleware for route protection (RBAC)
□ API: GET /api/auth/session
□ API: PATCH /api/user/profile
```

### Day 3–4: Team Management
```
□ Team creation form (name, description)
□ Auto-generate team code (EYRC-{BRANCH}-{###})
□ Invite system: link + code
□ Join team flow (accept invite / enter code)
□ Team detail page (members, progress overview)
□ Transfer team leadership
□ Leave team / Remove member
□ API: POST /api/teams
□ API: POST /api/teams/:id/invite
□ API: POST /api/teams/join
□ API: GET /api/teams/:id
```

### Day 5–7: Theme System
```
□ Seed database with all 7 eYRC 2026-27 themes
□ Theme card component (name, code, difficulty, tech stack)
□ Theme detail page (full description, objectives, tech stack)
□ Theme comparison view (side-by-side table)
□ Theme preference submission (top 2)
□ Coordinator theme assignment view
□ API: GET /api/themes
□ API: GET /api/themes/:code
□ API: POST /api/teams/:id/themes (submit preferences)
□ API: PATCH /api/teams/:id (assign theme)
```

**Week 1 Deliverable:** ✅ Users can auth, create/join teams, browse themes, submit preferences

---

## Phase 2: Progress & Tasks (Week 2)

### Sprint Goal: Teams can track tasks; coordinators can monitor all teams

### Day 1–2: Task System
```
□ Seed default tasks for Stage 1 (Tasks 0, 1, 2)
□ Task model with status enum
□ Task checklist UI (team dashboard)
□ Status update flow (Not Started → In Progress → Submitted → Completed)
□ Submission attachment (URL + notes)
□ Task deadline display with countdown
□ API: GET /api/teams/:id/tasks
□ API: PATCH /api/teams/:id/tasks/:tid
□ API: POST /api/teams/:id/tasks/:tid/submit
```

### Day 3–4: Coordinator Dashboard
```
□ Grid view: Teams × Tasks matrix
□ Color coding: Green (completed), Yellow (in progress), Red (not started/overdue)
□ Filter bar: by theme, stage, status, risk level
□ Sort options: progress %, last active, deadline proximity
□ At-risk team detection (heuristic: no update in 5 days)
□ Quick actions: "Send reminder", "Schedule check-in", "Flag for review"
□ Export to CSV
□ API: GET /api/progress/dashboard
□ API: POST /api/admin/bulk-message
```

### Day 5–7: Timeline & Roadmaps
```
□ Competition timeline visualization (horizontal)
□ Current stage indicator with "days until next deadline"
□ Theme-specific roadmap nodes (seed data for all 7 themes)
□ Roadmap view: locked/unlocked nodes
□ Resource links per node
□ Progress tracking per node (mark as complete)
□ API: GET /api/themes/:code/roadmap
□ API: POST /api/progress/roadmap/:nodeId/complete
```

**Week 2 Deliverable:** ✅ Task tracking live, coordinator dashboard functional, roadmaps seeded

---

## Phase 3: Forum & Collaboration (Week 3)

### Sprint Goal: Students can ask questions, answer, and learn from each other

### Day 1–2: Forum Core
```
□ Forum post creation (title, content, tags, urgency, anonymous toggle)
□ Rich text editor (Markdown support)
□ Code syntax highlighting (Prism.js or highlight.js)
□ Image attachment (Cloudinary)
□ Post list view with filters (unanswered, solved, hot, recent)
□ Search by keyword (PostgreSQL full-text)
□ API: POST /api/forum/posts
□ API: GET /api/forum/posts
□ API: GET /api/forum/posts/:id
```

### Day 3–4: Answers & Voting
```
□ Threaded answers (2 levels)
□ Upvote/downvote system
□ Mark as "Best Answer"
□ Answer sorting: Best first, then upvotes, then recent
□ Real-time updates via WebSocket
□ API: POST /api/forum/posts/:id/answers
□ API: POST /api/forum/answers/:id/vote
□ API: POST /api/forum/answers/:id/best
```

### Day 5–7: Forum Polish & Discovery
```
□ Related questions sidebar
□ Trending topics section
□ Tag cloud (themes, categories)
□ User reputation display (XP + level)
□ "Ask a Question" floating button
□ Forum notifications (replies, best answer, upvotes)
□ Digest: Daily unanswered questions in your themes
□ API: GET /api/forum/trending
□ API: GET /api/forum/related/:postId
```

**Week 3 Deliverable:** ✅ Full Q&A forum operational with real-time updates

---

## Phase 4: Gamification (Week 4)

### Sprint Goal: Platform feels like a game; students are motivated

### Day 1–2: XP System
```
□ XP calculation engine
□ XP log table (audit trail)
□ XP events:
  - Complete learning module: 50 XP
  - Submit task: 100 XP
  - Task approved: 200 XP
  - Post question: 10 XP
  - Answer question: 25 XP
  - Best answer: 100 XP
  - Upvoted answer: +5 XP
  - 7-day streak: 50 XP bonus
□ Level thresholds (1–25)
□ Level-up animation (Framer Motion)
□ API: POST /api/gamification/xp/award
□ API: GET /api/gamification/xp
```

### Day 3–4: Leaderboards
```
□ Team leaderboard (total XP, progress %)
□ Individual leaderboard (XP, helpfulness score)
□ Theme-specific leaderboard
□ Weekly/Monthly/All-time toggle
□ Podium view for top 3 (animated)
□ Personal rank indicator ("You are #5 out of 42")
□ Redis sorted sets for O(log n) ranking
□ API: GET /api/gamification/leaderboard
```

### Day 5–7: Badges & Achievements
```
□ Achievement definitions (seed 15+ badges)
□ Achievement unlock detection (async via Bull)
□ Badge showcase on profile
□ Unlock notification (toast + email)
□ Achievement categories: Task, Forum, Streak, Social
□ Progress bars for "in-progress" achievements
□ API: GET /api/gamification/achievements
□ API: GET /api/gamification/achievements/:userId
```

**Week 4 Deliverable:** ✅ XP, levels, leaderboards, and badges fully functional

---

## Phase 5: Communication & Polish (Week 5)

### Sprint Goal: Everyone stays informed; UI feels premium

### Day 1–2: Notifications
```
□ In-app notification bell with dropdown
□ Notification types: task deadline, forum reply, achievement, announcement
□ Mark all as read
□ Notification preferences (email vs in-app)
□ Email templates (React Email or MJML)
□ API: GET /api/notifications
□ API: PATCH /api/notifications/:id/read
□ API: POST /api/notifications/preferences
```

### Day 3–4: Announcements
```
□ Coordinator announcement creation (rich text)
□ Target audience: all / theme-specific / team leaders
□ Pin important announcements
□ Read receipts (who viewed)
□ Announcement banner on dashboard
□ API: POST /api/admin/announcements
□ API: GET /api/announcements
```

### Day 5–7: UI/UX Polish
```
□ Dark mode implementation (default)
□ Light mode toggle
□ Loading skeletons for all pages
□ Empty states (illustrations + CTAs)
□ Error boundaries + friendly error pages
□ Mobile responsiveness audit
□ Accessibility audit (keyboard nav, ARIA labels, color contrast)
□ Page transitions (Framer Motion)
□ Micro-interactions (button hovers, card flips, XP pop)
□ SEO meta tags
□ PWA manifest + service worker
```

**Week 5 Deliverable:** ✅ Notifications, announcements, polished UI, PWA-ready

---

## Phase 6: Launch Prep & Testing (Week 6)

### Sprint Goal: Platform is stable, documented, and ready for 200+ users

### Day 1–2: Testing
```
□ Unit tests: All API routes (Jest + Supertest)
□ Integration tests: Auth flow, team creation, task submission
□ E2E tests: Critical user journeys (Playwright)
  - User registers → creates team → submits task
  - User asks question → gets answer → marks best
  - Coordinator views dashboard → sends reminder
□ Load testing: 50 concurrent users (k6 or Artillery)
□ Bug bash: Invite 5 beta testers, collect feedback
```

### Day 3–4: Performance & Security
```
□ Database query optimization (add indexes, N+1 fixes)
□ Image optimization (Cloudinary auto-transform)
□ API response caching (Redis)
□ Security audit:
  - XSS prevention (CSP headers)
  - Rate limiting verification
  - JWT expiration check
  - Input validation (Zod schemas)
□ Lighthouse audit: Target 90+ on all metrics
```

### Day 5–6: Documentation & Onboarding
```
□ Write README.md (setup, deploy, contribute)
□ Write USER_GUIDE.md (for students)
□ Write COORDINATOR_GUIDE.md (for you)
□ Create onboarding video (2 min Loom)
□ Seed production data:
  - All 7 themes with roadmaps
  - 15+ starter resources per theme
  - 20+ achievement definitions
  - Sample announcements
```

### Day 7: Launch 🚀
```
□ Final deployment to production
□ Domain configuration (if custom domain)
□ Google Analytics + Sentry enabled
□ Send launch email to all registered teams
□ Post in college groups with invite link
□ Monitor error logs and user feedback
□ Be available for hotfixes (first 48 hours)
```

**Week 6 Deliverable:** ✅ Production-ready platform, documented, launched

---

## Post-Launch: Iteration (Ongoing)

### Week 7+: Monitor & Improve
| Week | Focus | Tasks |
|------|-------|-------|
| 7 | Feedback Loop | Collect user feedback, fix critical bugs, optimize slow queries |
| 8 | Content | Add more resources, create video tutorials, invite alumni mentors |
| 9 | Advanced Features | AI chatbot tutor (OpenAI API), plagiarism checker, code review bot |
| 10 | Analytics | Build custom analytics dashboard, predict at-risk teams |
| 11 | Community | Host weekly AMAs, theme-specific study groups, peer mentoring pairs |
| 12 | Stage 2 Prep | Hardware task tracking, kit inventory, remote lab booking |

---

## Resource Allocation

### If You Have 1 Developer (You)
| Week | Focus | Hours/Week |
|------|-------|-----------|
| 0 | Setup | 10 |
| 1 | Auth + Teams | 15 |
| 2 | Tasks + Dashboard | 15 |
| 3 | Forum | 15 |
| 4 | Gamification | 15 |
| 5 | Polish | 15 |
| 6 | Testing + Launch | 20 |

**Total: ~105 hours over 6 weeks (~17 hrs/week)**

### If You Have 2 Developers
| Developer | Primary Focus |
|-----------|--------------|
| Dev 1 (Backend) | Auth, API, DB, Gamification engine, Notifications |
| Dev 2 (Frontend) | UI components, Dashboard, Forum, Animations |

### If You Have 3 Developers
| Developer | Primary Focus |
|-----------|--------------|
| Dev 1 (Full-stack) | Auth, Teams, Tasks, Dashboard |
| Dev 2 (Full-stack) | Forum, Roadmaps, Resources |
| Dev 3 (Frontend/UI) | Gamification UI, Animations, Mobile, PWA |

---

## Budget Estimate (Free Tier First)

| Service | Free Tier | Paid (if needed) |
|---------|-----------|-----------------|
| Vercel Pro | $0 (hobby) | $20/mo |
| Neon PostgreSQL | $0 (500 MB) | $19/mo |
| Upstash Redis | $0 (10k cmds/day) | $10/mo |
| Cloudinary | $0 (25 GB) | $25/mo |
| Resend | $0 (3k emails/mo) | $20/mo |
| GitHub | $0 (public repo) | $0 |
| Sentry | $0 (5k errors/mo) | $26/mo |
| Domain (optional) | — | $12/yr |
| **Total** | **$0** | **~$100/mo** |

> 💡 **Pro Tip:** Start completely free. Only upgrade if you hit limits. For 200 users, free tiers should last the entire 6-month competition.

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Developer drops out | High | Document everything; use simple stack; modular code |
| Scope creep | Medium | Strict MVP definition; "v2" bucket for nice-to-haves |
| Students don't adopt | High | Gamification + mandatory check-ins; coordinator enforcement |
| Platform bugs during competition | High | Thorough testing; hotfix pipeline; rollback plan |
| Database corruption | Critical | Daily automated backups; point-in-time recovery |
| eYantra changes rules | Medium | Keep theme data configurable; avoid hardcoding |

---

## Success Checklist (Launch Day)

- [ ] Google OAuth login works for all college emails
- [ ] Team creation + invite flow is smooth (< 2 min)
- [ ] All 7 themes display with correct info
- [ ] Teams can submit theme preferences
- [ ] Task checklist is functional for Stage 1
- [ ] Coordinator dashboard shows all teams
- [ ] Forum: can post, answer, vote, mark best
- [ ] XP is awarded for key actions
- [ ] Leaderboard updates in real-time
- [ ] Notifications deliver (in-app + email)
- [ ] Mobile view is usable
- [ ] Dark mode looks good
- [ ] No console errors
- [ ] Lighthouse score > 85
- [ ] All team members can access and use platform

---

## Future Roadmap (Post-MVP)

### v1.1 (Month 2)
- [ ] AI-powered doubt assistant (RAG on theme resources)
- [ ] Calendar integration (Google Calendar for deadlines)
- [ ] File upload for submissions (not just links)
- [ ] Team internal chat (replace WhatsApp)

### v1.2 (Month 3)
- [ ] Video room integration (Jitsi) for team meetings
- [ ] Code snippet sharing with syntax highlighting
- [ ] Peer mentoring matching algorithm
- [ ] Automated weekly progress reports

### v1.3 (Month 4)
- [ ] Hardware task tracking (kit status, sensor logs)
- [ ] Integration with eYantra portal (if API available)
- [ ] Alumni network (past eYRC participants)
- [ ] Multi-college support (white-label)

### v2.0 (Next Year)
- [ ] AI code review bot
- [ ] Plagiarism detection
- [ ] Advanced analytics (predicting finalists)
- [ ] Mobile native app (React Native)
- [ ] Open source the platform

---

## Key Decisions Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | Next.js over MERN stack | Unified frontend + backend, Vercel deploy, less boilerplate | Aug 2026 |
| 2 | PostgreSQL over MongoDB | ACID compliance, relational data (teams, tasks, forum), Prisma ORM | Aug 2026 |
| 3 | Socket.io over SSE | Bidirectional needed for chat + real-time updates, room support | Aug 2026 |
| 4 | Bull MQ over custom queues | Battle-tested, Redis-backed, retry logic built-in | Aug 2026 |
| 5 | No AI tutor in v1 | Scope control; can add OpenAI API later without architecture change | Aug 2026 |
| 6 | PWA over native app | Faster to build, cross-platform, installable, sufficient for v1 | Aug 2026 |

---

## Appendix A: Theme Data (Seed Script)

All 7 themes with complete metadata should be seeded on first deploy. See PRD Section 7 for full theme details.

### Seed Order
1. Themes (with objectives, tech stack)
2. Roadmap nodes (per theme, 6–8 weeks)
3. Resources (linked to roadmap nodes)
4. Achievements (15+ definitions)
5. Default tasks (Tasks 0, 1, 2 for Stage 1)

### Sample Seed Command
```bash
npx prisma db seed
# or
npm run db:seed
```

---

## Appendix B: Folder Structure

```
eyrc-command-center/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── teams/
│   │   ├── themes/
│   │   ├── forum/
│   │   ├── leaderboard/
│   │   └── profile/
│   ├── (admin)/
│   │   ├── dashboard/
│   │   ├── announcements/
│   │   └── analytics/
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── teams/
│   │   ├── themes/
│   │   ├── forum/
│   │   ├── progress/
│   │   ├── gamification/
│   │   └── admin/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── auth/
│   ├── teams/
│   ├── themes/
│   ├── forum/
│   ├── gamification/
│   └── layout/
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── socket.ts                 # Socket.io client
│   ├── redis.ts                  # Redis client
│   ├── queue.ts                  # Bull MQ setup
│   └── utils.ts                  # Helpers
├── hooks/
│   ├── use-auth.ts
│   ├── use-team.ts
│   ├── use-forum.ts
│   └── use-gamification.ts
├── types/
│   └── index.ts                  # Shared TypeScript types
├── prisma/
│   └── schema.prisma             # Database schema
├── public/
│   ├── images/
│   └── fonts/
├── scripts/
│   └── seed.ts                   # Database seeding
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Appendix C: Weekly Standup Template

Every week, ask the team:
1. What did you complete last week?
2. What are you working on this week?
3. Any blockers or risks?
4. Do we need to adjust the timeline?

---

## Appendix D: Emergency Contacts

| Role | Name | Contact | Responsibility |
|------|------|---------|--------------|
| Lead Developer | TBD | — | Technical decisions, code reviews |
| UI Developer | TBD | — | Frontend, animations, mobile |
| DevOps | TBD | — | Deployments, monitoring |
| Coordinator (You) | You | — | Requirements, testing, user feedback |

---

*End of Implementation Plan*
*Now go build it. Your juniors are counting on you. 🚀*
