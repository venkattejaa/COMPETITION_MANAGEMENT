# eYRC Team Command Center — System Architecture

**Version:** 1.0  
**Date:** August 2026  
**Author:** College eYRC Coordinator  

---

## 1. Architecture Overview

The eYRC Team Command Center follows a **modern 3-tier architecture** optimized for rapid development, real-time collaboration, and horizontal scalability. The system is designed as a **Single-Page Application (SPA)** with a robust backend API, real-time communication layer, and managed database.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Web App    │  │   Mobile     │  │   PWA        │  │   Admin      │   │
│  │   (React)    │  │   (Responsive)│  │   (Installable)│  │   Dashboard  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└─────────┼─────────────────┼─────────────────┼─────────────────┼───────────┘
          │                 │                 │                 │
          └─────────────────┴─────────────────┴─────────────────┘
                                    │
                         ┌──────────▼──────────┐
                         │   CDN / Vercel      │
                         │   (Static Assets)   │
                         └──────────┬──────────┘
                                    │ HTTPS
┌───────────────────────────────────▼─────────────────────────────────────────┐
│                            API GATEWAY LAYER                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js API Routes / Express                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │   │
│  │  │   Auth      │  │   Teams     │  │   Forum     │  │  Progress  │ │   │
│  │  │   Router    │  │   Router    │  │   Router    │  │  Router    │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │   │
│  │  │   Themes    │  │   Resources │  │   Gamify    │  │   Admin    │ │   │
│  │  │   Router    │  │   Router    │  │   Router    │  │   Router   │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              Rate Limiter                                   │
│                              JWT Validation                                 │
│                              Request Logging                                │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                           SERVICE LAYER                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐     │
│  │ Auth Service │ │ Team Service │ │ Forum Service│ │ Progress Svc │     │
│  │              │ │              │ │              │ │              │     │
│  │ • OAuth      │ │ • CRUD       │ │ • Posts      │ │ • Tasks      │     │
│  │ • JWT        │ │ • Invites    │ │ • Answers    │ │ • Roadmaps   │     │
│  │ • RBAC       │ │ • Themes     │ │ • Votes      │ │ • Analytics  │     │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐     │
│  │ Gamification │ │ Notification │ │ Search Svc   │ │ Export Svc   │     │
│  │ Service      │ │ Service      │ │              │ │              │     │
│  │              │ │              │ │ • Full-text  │ │ • CSV/Excel  │     │
│  │ • XP Engine  │ │ • Email      │ │ • Filters    │ │ • PDF        │     │
│  │ • Badges     │ │ • WebSocket  │ │ • Ranking    │ │ • Reports    │     │
│  │ • Leaderboard│ │ • Push       │ │              │ │              │     │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘     │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                         REAL-TIME LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    Socket.io / WebSocket Server                        │   │
│  │  • Live forum updates    • Team activity feed    • Chat messages    │   │
│  │  • Leaderboard changes   • Notification push     • Presence status  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                          DATA LAYER                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  PostgreSQL  │  │    Redis     │  │  Cloudinary  │  │   Bull MQ    │   │
│  │  (Primary)   │  │   (Cache)    │  │   (Media)    │  │  (Queues)    │   │
│  │              │  │              │  │              │  │              │   │
│  │ • Users      │  │ • Sessions   │  │ • Avatars    │  │ • Emails     │   │
│  │ • Teams      │  │ • Leaderboard│  │ • Screenshots│  │ • Digest     │   │
│  │ • Tasks      │  │ • Hot data   │  │ • Resources  │  │ • XP calc    │   │
│  │ • Forum      │  │ • Rate limit │  │ • Submissions│  │ • Notifs     │   │
│  │ • Roadmaps   │  │ • Pub/Sub    │  │              │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend
| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | **Next.js 14+** (App Router) | SSR/SSG, API routes, file-based routing, Vercel-native |
| Language | **TypeScript** | Type safety, better DX, fewer runtime bugs |
| Styling | **Tailwind CSS** | Rapid UI development, design system consistency |
| Components | **shadcn/ui** + **Radix UI** | Accessible, customizable primitives |
| State | **Zustand** (global) + **React Query** (server) | Lightweight, minimal boilerplate, caching |
| Real-time | **Socket.io-client** | Bidirectional event-based communication |
| Charts | **Recharts** | React-native, customizable |
| Forms | **React Hook Form** + **Zod** | Performance, validation |
| Icons | **Lucide React** | Clean, consistent icon set |
| Animations | **Framer Motion** | Smooth transitions, gamification feel |

### 2.2 Backend
| Layer | Technology | Reason |
|-------|-----------|--------|
| Runtime | **Node.js 20+** | Non-blocking I/O, vast ecosystem |
| Framework | **Next.js API Routes** / **Express** | Unified stack, or separate if needed |
| ORM | **Prisma** | Type-safe queries, migrations, great DX |
| Validation | **Zod** | Shared schemas between frontend and backend |
| Auth | **NextAuth.js v5** | OAuth (Google), JWT, session management |
| Real-time | **Socket.io** | Rooms, namespaces, fallback support |
| Queue | **Bull MQ** + **Redis** | Background jobs, email digests, XP calculations |
| Search | **PostgreSQL Full-Text Search** (v1) → **Meilisearch** (v2) | Fast, typo-tolerant search |

### 2.3 Database
| Layer | Technology | Reason |
|-------|-----------|--------|
| Primary DB | **PostgreSQL 15+** | ACID compliance, complex queries, JSON support |
| Cache | **Redis** | Sessions, leaderboards, rate limiting, pub/sub |
| Media | **Cloudinary** | Image optimization, transformations, CDN |
| File Storage | **AWS S3** / **Cloudflare R2** | Resource PDFs, code backups |

### 2.4 Infrastructure
| Layer | Technology | Reason |
|-------|-----------|--------|
| Hosting | **Vercel** (frontend) + **Railway / Render** (backend) | Free tier generous, easy deploy |
| Database | **Neon** (serverless Postgres) / **Supabase** | Free tier, branching, great DX |
| Redis | **Upstash** (serverless Redis) | Free tier, HTTP-based, no connection limits |
| Email | **Resend** / **SendGrid** | Transactional emails, free tier |
| Monitoring | **Sentry** (error tracking) + **Vercel Analytics** | Catch bugs early, performance insights |
| CI/CD | **GitHub Actions** | Automated testing, deployment |

---

## 3. Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USERS & AUTH ─────────────────────────────────────────────
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  avatar        String?
  role          UserRole  @default(MEMBER)
  year          Int?      // 1-4
  branch        String?
  githubUrl     String?
  linkedinUrl   String?
  skills        String[]  // Array of skill tags

  // Gamification
  xp            Int       @default(0)
  level         Int       @default(1)
  streakDays    Int       @default(0)
  lastActive    DateTime  @default(now())

  // Relations
  team          Team?     @relation(fields: [teamId], references: [id])
  teamId        String?
  isTeamLeader  Boolean   @default(false)

  forumPosts    ForumPost[]
  forumAnswers  ForumAnswer[]
  votes         Vote[]
  progressLogs  ProgressLog[]
  notifications Notification[]
  achievements  UserAchievement[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum UserRole {
  COORDINATOR
  TEAM_LEADER
  MEMBER
}

// ─── TEAMS ──────────────────────────────────────────────────────
model Team {
  id            String    @id @default(cuid())
  name          String
  code          String    @unique // EYRC-CSE-01
  description   String?

  // Theme preferences & assignment
  preferredTheme1 String?
  preferredTheme2 String?
  assignedTheme   String?   // Final assigned theme
  committedTheme  String?   // From Task 3 onwards

  // Progress
  currentStage    Stage     @default(STAGE_1)
  currentTask     String    @default("TASK_0")
  progressPercent Int       @default(0)

  // Gamification
  totalXp         Int       @default(0)
  rank            Int?

  // Relations
  members         User[]
  tasks           Task[]
  progressLogs    ProgressLog[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum Stage {
  STAGE_1
  STAGE_2
  FINALE
}

// ─── TASKS ──────────────────────────────────────────────────────
model Task {
  id            String      @id @default(cuid())
  title         String
  description   String?
  stage         Stage
  taskNumber    String      // TASK_0, TASK_1, etc.
  themeCode     String?     // Optional theme-specific task

  deadline      DateTime?
  maxXp         Int         @default(100)

  // Relations
  team          Team        @relation(fields: [teamId], references: [id])
  teamId        String

  status        TaskStatus  @default(NOT_STARTED)
  submissionUrl String?
  submissionNotes String?
  submittedAt   DateTime?
  completedAt   DateTime?

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

enum TaskStatus {
  NOT_STARTED
  IN_PROGRESS
  SUBMITTED
  COMPLETED
  BLOCKED
}

// ─── THEMES & ROADMAPS ─────────────────────────────────────────
model Theme {
  id            String    @id @default(cuid())
  code          String    @unique // LQ, KD, SC, HE, NV, EB, PB
  name          String
  tagline       String
  description   String    @db.Text
  difficulty    Difficulty
  years         Int[]     // [1,2,3,4] eligible years
  mode          String    // "Simulator + Hardware"

  techStack     String[]  // ["ROS2", "OpenCV", "SLAM"]
  objectives    Json      // Array of objective objects

  // Relations
  roadmaps      RoadmapNode[]
  resources     Resource[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

model RoadmapNode {
  id            String    @id @default(cuid())
  theme         Theme     @relation(fields: [themeId], references: [id])
  themeId       String

  title         String
  description   String?
  weekNumber    Int
  estimatedHours Int

  resources     Resource[]
  prerequisites String[]  // IDs of prerequisite nodes

  createdAt     DateTime  @default(now())
}

model Resource {
  id            String    @id @default(cuid())
  title         String
  type          ResourceType
  url           String?
  content       String?   @db.Text // For inline text resources

  theme         Theme?    @relation(fields: [themeId], references: [id])
  themeId       String?
  roadmapNode   RoadmapNode? @relation(fields: [roadmapNodeId], references: [id])
  roadmapNodeId String?

  tags          String[]
  createdAt     DateTime  @default(now())
}

enum ResourceType {
  VIDEO
  ARTICLE
  DOCUMENTATION
  CODE_TEMPLATE
  CHEAT_SHEET
  PDF
  LINK
}

// ─── FORUM ──────────────────────────────────────────────────────
model ForumPost {
  id            String    @id @default(cuid())
  title         String
  content       String    @db.Text

  author        User      @relation(fields: [authorId], references: [id])
  authorId      String
  isAnonymous   Boolean   @default(false)

  themeTag      String?   // e.g., "PB", "ROS2"
  category      ForumCategory @default(GENERAL)
  urgency       Urgency   @default(LOW)

  views         Int       @default(0)
  upvotes       Int       @default(0)
  isSolved      Boolean   @default(false)
  bestAnswerId  String?   @unique

  answers       ForumAnswer[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum ForumCategory {
  CONCEPT
  CODE_BUG
  HARDWARE
  SUBMISSION
  GENERAL
}

enum Urgency {
  LOW
  MEDIUM
  HIGH
  BLOCKER
}

model ForumAnswer {
  id            String    @id @default(cuid())
  content       String    @db.Text

  author        User      @relation(fields: [authorId], references: [id])
  authorId      String

  post          ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId        String

  isBestAnswer  Boolean   @default(false)
  upvotes       Int       @default(0)

  votes         Vote[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Vote {
  id            String    @id @default(cuid())
  user          User      @relation(fields: [userId], references: [id])
  userId        String
  answer        ForumAnswer @relation(fields: [answerId], references: [id], onDelete: Cascade)
  answerId      String
  type          VoteType

  createdAt     DateTime  @default(now())

  @@unique([userId, answerId])
}

enum VoteType {
  UP
  DOWN
}

// ─── GAMIFICATION ───────────────────────────────────────────────
model Achievement {
  id            String    @id @default(cuid())
  code          String    @unique // e.g., "first_blood"
  name          String
  description   String
  icon          String    // Lucide icon name or URL
  xpBonus       Int       @default(0)
  conditionType String    // "task_count", "answer_count", "streak", etc.
  conditionValue Int

  users         UserAchievement[]

  createdAt     DateTime  @default(now())
}

model UserAchievement {
  id            String    @id @default(cuid())
  user          User      @relation(fields: [userId], references: [id])
  userId        String
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  achievementId String
  earnedAt      DateTime  @default(now())

  @@unique([userId, achievementId])
}

model XpLog {
  id            String    @id @default(cuid())
  userId        String
  teamId        String?
  amount        Int
  reason        String    // "task_submitted", "best_answer", etc.
  metadata      Json?     // Additional context
  createdAt     DateTime  @default(now())
}

// ─── NOTIFICATIONS ──────────────────────────────────────────────
model Notification {
  id            String    @id @default(cuid())
  user          User      @relation(fields: [userId], references: [id])
  userId        String
  type          NotificationType
  title         String
  message       String
  link          String?
  isRead        Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

enum NotificationType {
  TASK_DEADLINE
  TASK_COMPLETED
  FORUM_REPLY
  BEST_ANSWER
  ACHIEVEMENT_UNLOCKED
  ANNOUNCEMENT
  TEAM_INVITE
  MENTION
}

// ─── PROGRESS LOGS ──────────────────────────────────────────────
model ProgressLog {
  id            String    @id @default(cuid())
  user          User      @relation(fields: [userId], references: [id])
  userId        String
  team          Team      @relation(fields: [teamId], references: [id])
  teamId        String

  action        String    // "task_started", "resource_viewed", "module_completed"
  details       Json?
  xpEarned      Int       @default(0)

  createdAt     DateTime  @default(now())
}

// ─── ANNOUNCEMENTS ──────────────────────────────────────────────
model Announcement {
  id            String    @id @default(cuid())
  title         String
  content       String    @db.Text
  target        AnnouncementTarget @default(ALL)
  themeCode     String?   // If theme-specific
  isPinned      Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

enum AnnouncementTarget {
  ALL
  COORDINATORS
  TEAM_LEADERS
  THEME_SPECIFIC
}
```

---

## 4. API Design (REST + WebSocket)

### 4.1 REST Endpoints

#### Authentication
```
POST   /api/auth/signin          → Google OAuth callback
POST   /api/auth/signout         → Clear session
GET    /api/auth/session         → Current user info
```

#### Teams
```
GET    /api/teams                → List all teams (coordinator)
POST   /api/teams                → Create team
GET    /api/teams/:id            → Team detail
PATCH  /api/teams/:id            → Update team info
POST   /api/teams/:id/invite     → Generate invite link
POST   /api/teams/join           → Join via code/link
POST   /api/teams/:id/themes    → Submit theme preferences
PATCH  /api/teams/:id/commit    → Commit to single theme (Task 3+)
DELETE /api/teams/:id            → Delete team (coordinator)
```

#### Tasks & Progress
```
GET    /api/teams/:id/tasks      → All tasks for team
PATCH  /api/teams/:id/tasks/:tid → Update task status
POST   /api/teams/:id/tasks/:tid/submit → Submit task
GET    /api/progress/leaderboard → Team + individual leaderboard
GET    /api/progress/dashboard   → Coordinator overview
```

#### Forum
```
GET    /api/forum/posts          → List posts (paginated, filterable)
POST   /api/forum/posts          → Create post
GET    /api/forum/posts/:id      → Post detail with answers
PATCH  /api/forum/posts/:id      → Update post
DELETE /api/forum/posts/:id      → Delete post
POST   /api/forum/posts/:id/answers → Add answer
PATCH  /api/forum/answers/:id  → Update answer
POST   /api/forum/answers/:id/vote → Upvote/downvote
POST   /api/forum/answers/:id/best → Mark best answer
```

#### Themes & Resources
```
GET    /api/themes               → List all themes
GET    /api/themes/:code         → Theme detail with roadmap
GET    /api/themes/:code/resources → Theme resources
GET    /api/themes/:code/roadmap → Roadmap nodes
```

#### Gamification
```
GET    /api/gamification/xp      → Current user XP & level
GET    /api/gamification/achievements → All achievements
GET    /api/gamification/leaderboard → Leaderboard data
GET    /api/gamification/streak  → Current streak info
```

#### Admin
```
GET    /api/admin/analytics      → Platform analytics
POST   /api/admin/announcements  → Create announcement
GET    /api/admin/export         → Export data
POST   /api/admin/bulk-message   → Send bulk message
```

### 4.2 WebSocket Events

```javascript
// Client → Server
"forum:post:create"      → { title, content, tags }
"forum:answer:create"   → { postId, content }
"forum:answer:vote"     → { answerId, type: "up" | "down" }
"team:progress:update"  → { taskId, status, notes }
"user:presence"         → { status: "online" | "away" | "offline" }
"chat:message"          → { roomId, content }

// Server → Client
"forum:post:new"        → { post }
"forum:answer:new"      → { answer }
"forum:answer:voted"    → { answerId, upvotes }
"leaderboard:update"    → { type, data }
"notification:new"      → { notification }
"team:progress:sync"   → { teamId, taskId, status }
"announcement:new"     → { announcement }
"xp:earned"            → { amount, reason, newTotal }
"achievement:unlocked" → { achievement }
```

---

## 5. Real-Time Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client A  │     │   Client B  │     │   Client C  │
│  (Team 01)  │     │  (Team 02)  │     │ (Coordinator)│
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │ WebSocket
              ┌────────────▼────────────┐
              │    Socket.io Server       │
              │  ┌─────────────────────┐  │
              │  │  Room: "team:01"    │  │
              │  │  Room: "team:02"    │  │
              │  │  Room: "forum:all"  │  │
              │  │  Room: "leaderboard"│  │
              │  └─────────────────────┘  │
              └────────────┬──────────────┘
                           │
              ┌────────────▼────────────┐
              │    Redis Adapter        │
              │  (Multi-server support)   │
              └─────────────────────────┘
```

**Room Strategy:**
- `user:{userId}` — Personal notifications, DMs
- `team:{teamId}` — Team progress sync, internal chat
- `theme:{themeCode}` — Theme-specific announcements, discussions
- `forum:all` — New posts, trending questions
- `leaderboard` — Score updates (throttled to 30s)
- `coordinators` — Admin alerts, at-risk team flags

---

## 6. Gamification Engine

### 6.1 XP Calculation Flow
```
User Action → API Endpoint → Prisma Transaction → XP Log Created
                                    ↓
                           Redis Leaderboard Update (Sorted Set)
                                    ↓
                           Level Check (thresholds)
                                    ↓
                           Achievement Engine (async via Bull)
                                    ↓
                           WebSocket Push (real-time notification)
                                    ↓
                           Weekly Digest Queue (if applicable)
```

### 6.2 Leaderboard (Redis Sorted Sets)
```redis
# Team Leaderboard
ZADD leaderboard:teams {xp} {teamId}
ZREVRANGE leaderboard:teams 0 9 WITHSCORES  # Top 10

# Individual Leaderboard  
ZADD leaderboard:users {xp} {userId}
ZREVRANGE leaderboard:users 0 9 WITHSCORES

# Theme-specific Leaderboard
ZADD leaderboard:theme:{code} {xp} {teamId}
```

### 6.3 Achievement Engine (Bull MQ Jobs)
```javascript
// achievement-processor.js
queue.process('check-achievements', async (job) => {
  const { userId, action, metadata } = job.data;

  const achievements = await prisma.achievement.findMany();

  for (const achievement of achievements) {
    const earned = await checkCondition(userId, achievement, action, metadata);
    if (earned) {
      await awardAchievement(userId, achievement);
      await notifyUser(userId, 'achievement:unlocked', achievement);
    }
  }
});
```

---

## 7. Security Architecture

### 7.1 Authentication Flow
```
User clicks "Sign in with Google"
         ↓
NextAuth.js redirects to Google OAuth
         ↓
Google returns ID token + profile
         ↓
NextAuth creates JWT (HTTP-only cookie)
         ↓
Every API request: validate JWT via middleware
         ↓
Attach user object to request context
```

### 7.2 Authorization (RBAC)
```typescript
// middleware.ts
const rolePermissions = {
  COORDINATOR: ['*'],
  TEAM_LEADER: [
    'team:read', 'team:update', 'task:update', 
    'forum:all', 'progress:read'
  ],
  MEMBER: [
    'team:read', 'task:read', 'forum:all', 
    'progress:read', 'user:update:self'
  ]
};
```

### 7.3 Data Protection
- **SQL Injection:** Prisma ORM (parameterized queries)
- **XSS:** Input sanitization + CSP headers + React's built-in escaping
- **CSRF:** SameSite cookies + CSRF tokens for state-changing ops
- **Rate Limiting:** Redis-based (100 req/min per IP, 1000 req/min per user)
- **File Upload:** Cloudinary with type validation, size limits (5MB max)

---

## 8. Deployment Architecture

### 8.1 Development Environment
```
Local Machine
├── Next.js dev server (localhost:3000)
├── PostgreSQL via Docker (localhost:5432)
├── Redis via Docker (localhost:6379)
└── ngrok (for webhook testing)
```

### 8.2 Production Environment
```
Vercel Edge Network
├── Static Assets (CDN)
├── Serverless Functions (API Routes)
└── ISR (Incremental Static Regeneration)

Railway / Render
├── Node.js App (Socket.io server)
└── Background Workers (Bull MQ)

Neon / Supabase
├── PostgreSQL (Primary + Read Replicas)

Upstash
├── Redis (Primary + Replicas)

Cloudinary
├── Images & Media CDN

Resend
├── Transactional Email API
```

### 8.3 Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."  # For migrations

# Redis
REDIS_URL="redis://..."

# Auth
NEXTAUTH_URL="https://eyrc-command.vercel.app"
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Media
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email
RESEND_API_KEY="re_..."

# App
APP_NAME="eYRC Command Center"
APP_URL="https://eyrc-command.vercel.app"
```

---

## 9. Scalability Considerations

| Scenario | Solution |
|----------|----------|
| 50+ teams, 200+ users | Current architecture handles this easily |
| 500+ teams (multi-college v2) | Add read replicas, CDN caching, horizontal scaling |
| High forum activity | Implement pagination (cursor-based), add Meilisearch |
| Real-time overload | Socket.io Redis adapter, room sharding, message batching |
| Database growth | Partition old data, archive completed seasons |
| Image/media storage | Cloudinary auto-optimization, lazy loading |

---

## 10. Monitoring & Observability

```
┌─────────────────────────────────────────────────────────────┐
│                      Sentry                                   │
│  • Error tracking & alerting                                 │
│  • Performance monitoring (API response times)                │
│  • Release tracking                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Vercel Analytics                         │
│  • Web Vitals (LCP, FID, CLS)                                │
│  • Traffic & geographic data                                  │
│  • Build performance                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Custom Dashboard                         │
│  • Active users (real-time)                                  │
│  • Forum health (questions/answers ratio)                    │
│  • Task completion velocity                                   │
│  • At-risk team predictions                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. Data Flow Diagrams

### 11.1 Task Submission Flow
```
Team Leader opens Task Card
         ↓
Updates status → "In Progress" / "Submitted"
         ↓
Attaches GitHub link + notes
         ↓
PATCH /api/teams/:id/tasks/:tid
         ↓
Server validates → updates PostgreSQL
         ↓
Triggers XP calculation (if submitted)
         ↓
Updates Redis leaderboard
         ↓
WebSocket emits "team:progress:sync" to room
         ↓
Coordinator dashboard auto-updates
         ↓
Email notification sent to coordinator (async via Bull)
```

### 11.2 Forum Question Resolution Flow
```
Student clicks "Ask a Question"
         ↓
Fills form (title, description, tags, urgency)
         ↓
POST /api/forum/posts
         ↓
Server saves to PostgreSQL
         ↓
Full-text index updated
         ↓
WebSocket emits "forum:post:new" to relevant rooms
         ↓
Notifications sent to theme experts (async)
         ↓
Peer sees question → writes answer
         ↓
POST /api/forum/posts/:id/answers
         ↓
Asker marks "Best Answer"
         ↓
XP awarded to answerer (async via Bull)
         ↓
Achievement engine checks for "Mentor" badge
         ↓
Notifications sent to all participants
```

---

*End of Architecture Document*
