# eYRC Team Command Center — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** August 2026  
**Author:** College eYRC Coordinator  
**Status:** Draft — Ready for Development

---

## 1. Executive Summary

The **eYRC Team Command Center** is a centralized web platform designed to manage, mentor, and gamify the journey of all college teams participating in the e-Yantra Robotics Competition (eYRC) 2026–27. The platform replaces fragmented WhatsApp groups, scattered Google Sheets, and ad-hoc doubt resolution with a structured, game-like experience that drives teams toward the National Finale at IIT Bombay.

**Core Value Proposition:**
- One dashboard to monitor all teams across 7 themes
- Structured roadmaps and curated resources per theme
- Peer-to-peer Q&A forum for doubt resolution
- Progress tracking with XP, leaderboards, and milestone badges
- Automated alerts for deadlines, task submissions, and mentor interventions

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals
| # | Goal | Metric |
|---|------|--------|
| G1 | 100% team onboarding within 48 hours of registration | Onboarding rate |
| G2 | Reduce coordinator overhead by 70% via automation | Hours saved/week |
| G3 | Increase task completion rate from baseline | Stage 1 pass-through rate |
| G4 | Foster peer learning — 80% of doubts answered by peers | Peer resolution ratio |
| G5 | Drive at least 3 teams to National Finale | Finalist count |

### 2.2 Secondary Goals
- Build a reusable knowledge base for future eYRC editions
- Create a portfolio of learning resources per theme
- Establish a culture of collaborative problem-solving

---

## 3. User Personas

### 3.1 Coordinator (Admin)
- **Name:** Senior Mentor / You
- **Role:** Oversees all teams, assigns themes, reviews progress, intervenes when stuck
- **Pain Points:** Too many juniors, can't teach everyone individually, no visibility into who is stuck
- **Needs:** Dashboard overview, automated alerts, bulk messaging, resource management

### 3.2 Team Leader
- **Name:** 3rd/4th Year Student
- **Role:** Manages team of 2–4 members, reports progress, raises blockers
- **Pain Points:** Unclear where to start, no structured learning path, gets stuck often
- **Needs:** Theme-specific roadmaps, progress checklists, quick doubt posting, team management

### 3.3 Team Member
- **Name:** 1st/2nd Year Student
- **Role:** Learns, implements, contributes to tasks
- **Pain Points:** Overwhelmed by new tech (ROS, CV, embedded), afraid to ask "dumb" questions
- **Needs:** Beginner-friendly resources, safe space to ask questions, gamified motivation

### 3.4 Peer Helper
- **Name:** Any student who has cleared a concept
- **Role:** Answers doubts, shares resources, mentors juniors
- **Pain Points:** No recognition for helping, answers get lost in chat
- **Needs:** Reputation system (karma/XP), visibility for contributions

---

## 4. Feature Requirements

### 4.1 Authentication & Onboarding

**FR-AUTH-01:** Google OAuth 2.0 login (college email preferred, personal Gmail fallback)
**FR-AUTH-02:** Role selection on first login: Coordinator / Team Leader / Team Member
**FR-AUTH-03:** Team creation flow: Team Leader creates team → invites members via email/link → members join
**FR-AUTH-04:** Team code system for quick joining (e.g., `EYRC-CSE-01`)
**FR-AUTH-05:** Profile setup: Name, Year, Branch, GitHub, LinkedIn, skills self-assessment

### 4.2 Theme Management

**FR-THEME-01:** Display all 7 eYRC 2026-27 themes with:
- Theme name, code, and tagline
- Tech stack icons (ROS 2, OpenCV, Embedded, etc.)
- Difficulty indicator (Beginner / Intermediate / Advanced)
- Year eligibility (1st–4th year suitability)
- Simulator vs Hardware badge

**FR-THEME-02:** Theme detail page with:
- Full problem statement summary
- 5–7 mission objectives (gamified narrative)
- Required skills checklist
- Estimated learning hours
- Recommended team composition

**FR-THEME-03:** Theme selection workflow:
- Teams browse all 7 themes
- Can "favorite" up to 3 themes
- Submit top 2 preferences (as per eYRC rules)
- Coordinator reviews and locks assignments
- From Task 3 onwards, teams commit to 1 theme (platform enforces this milestone)

**FR-THEME-04:** Per-theme resource hub:
- Curated learning path (ordered modules)
- Video links (YouTube playlists, eYantra MOOC)
- Documentation links (ROS wiki, OpenCV docs)
- Code templates and starter repos
- Previous year solutions (if available and permitted)
- Cheat sheets and quick-reference cards

### 4.3 Progress Tracking

**FR-PROG-01:** Competition timeline visualization:
- Stage 1: Tasks 0, 1, 2 (Sep–Nov 2026)
- Stage 2: Tasks 3, 4, 5, 6 (Nov 2026–Feb 2027)
- National Finale: March 2027
- Current date indicator with "days until next deadline"

**FR-PROG-02:** Per-team task checklist:
- Pre-populated with all eYRC tasks per stage
- Teams mark tasks as: Not Started / In Progress / Submitted / Completed
- Attach submission links (Google Drive, GitHub, eYantra portal)
- Add notes/remarks per task

**FR-PROG-03:** Coordinator dashboard:
- Grid view: Teams × Tasks matrix (color-coded: green/yellow/red)
- Filter by: Theme, Stage, Task status, Risk level
- Sort by: Progress %, Last active, Deadline proximity
- Bulk actions: Send reminder, Schedule check-in, Flag for review

**FR-PROG-04:** Individual contribution tracking:
- GitHub-style contribution graph per team member
- Skills learned log (auto-populated from completed modules)
- Time spent estimates (self-reported)

### 4.4 Issue Reporting & Discussion (Q&A Forum)

**FR-FORUM-01:** Post a doubt/issue:
- Title, description (Markdown supported)
- Tag with theme (e.g., `#pacbot`, `#ros2`)
- Tag with category: Concept / Code Bug / Hardware / Submission / General
- Attach screenshots, code snippets, error logs
- Set urgency: Low / Medium / High / Blocker
- Anonymous option (posts as "Team X Member")

**FR-FORUM-02:** Answer and discuss:
- Threaded replies (2 levels deep)
- Upvote/downvote answers
- Mark as "Best Answer" (by asker or coordinator)
- Code syntax highlighting
- LaTeX support for math/equations

**FR-FORUM-03:** Discovery:
- Search by keyword, theme, tag, or category
- Filter: Unanswered / Solved / Hot / Recent
- Related questions sidebar
- Trending topics section

**FR-FORUM-04:** Notifications:
- Email + in-app alerts for: replies, upvotes, best answer, mentions (@username)
- Digest mode: Daily summary of unanswered questions in your themes

### 4.5 Gamification System

**FR-GAME-01:** XP (Experience Points):
| Action | XP |
|--------|-----|
| Complete a learning module | 50 XP |
| Submit a task | 100 XP |
| Task approved by coordinator | 200 XP |
| Post a question | 10 XP |
| Answer a question | 25 XP |
| Answer marked as Best | 100 XP |
| Upvoted answer | +5 XP |
| Streak: 7 days active | 50 XP bonus |
| Help a peer in person (verified) | 30 XP |

**FR-GAME-02:** Leaderboards:
- Team Leaderboard: Total XP, Progress %, Task completion speed
- Individual Leaderboard: XP, Helpfulness score, Streaks
- Theme-specific Leaderboard: Compete within your theme
- Weekly/Monthly/All-time views

**FR-GAME-03:** Badges & Achievements:
- **First Blood:** First task submission
- **Speed Demon:** Submit task 48h before deadline
- **Bug Hunter:** Report a critical blocker and get it resolved
- **Mentor:** Answer 10 questions with 5+ upvotes each
- **Theme Master:** Complete all Stage 1 tasks for a theme
- **Finalist Hopeful:** Reach Stage 2
- **Unstoppable:** 30-day activity streak
- **Night Owl:** Active after 11 PM (lighthearted)
- **Team Player:** All 4 members contribute equally

**FR-GAME-04:** Levels:
- Level 1–5: Novice (0–1,000 XP)
- Level 6–10: Explorer (1,001–3,000 XP)
- Level 11–15: Builder (3,001–6,000 XP)
- Level 16–20: Expert (6,001–10,000 XP)
- Level 21+: Legend (10,000+ XP)
- Each level unlocks: new badge slots, profile themes, "expert" tag in forum

**FR-GAME-05:** Team Challenges:
- Weekly mini-challenges (e.g., "Complete 3 learning modules this week")
- Theme-specific sprints
- Inter-team friendly competitions
- Coordinator can create custom challenges

### 4.6 Roadmap & Resources

**FR-ROAD-01:** Theme-specific learning roadmaps:
- Visual roadmap (horizontal timeline with nodes)
- Each node: Topic name, estimated time, resource links, mini-quiz
- Locked/unlocked nodes (progressive disclosure)
- Dependency graph (e.g., must learn Python before ROS)

**FR-ROAD-02:** Resource types per theme:
- **Starter Pack:** "Zero to Hero" — basics for complete beginners
- **Theme Deep Dive:** Core concepts specific to the theme
- **Simulation Guide:** Gazebo/RViz setup, world files, testing
- **Hardware Guide:** Kit assembly, sensor calibration, troubleshooting
- **Submission Checklist:** What to submit, how to format, common mistakes
- **Previous Year Analysis:** What worked, what didn't, time estimates

**FR-ROAD-03:** Personalized recommendations:
- Based on: current level, theme, struggling areas, peer activity
- "Because you're working on PacBot, you might need: A* algorithm tutorial"
- "Teams like yours also studied: Dynamic programming for pathfinding"

### 4.7 Communication & Alerts

**FR-COMM-01:** Announcements:
- Coordinator can post college-wide or theme-specific announcements
- Pin important announcements to top
- Read receipts (who has seen it)

**FR-COMM-02:** Direct Messaging:
- Team-internal chat (group DM)
- Coordinator ↔ Team Leader DM
- Peer-to-peer DM for mentoring

**FR-COMM-03:** Automated Alerts:
- Task deadline approaching (72h, 24h, 4h)
- Team inactive for 3+ days
- New resource added to your theme
- Your question got an answer
- Coordinator flagged your team for review

**FR-COMM-04:** Weekly Digest Email:
- Your team's progress this week
- Upcoming deadlines
- Top forum posts you might have missed
- Leaderboard changes
- Motivational quote + tip of the week

### 4.8 Admin / Coordinator Panel

**FR-ADMIN-01:** Team Management:
- View all teams with details (members, themes, progress)
- Add/remove teams manually
- Reassign themes (if needed)
- Export data to CSV/Excel

**FR-ADMIN-02:** Content Management:
- Create/edit theme roadmaps
- Upload resources (PDF, video links, code)
- Moderate forum posts (pin, edit, delete, ban)
- Create announcements

**FR-ADMIN-03:** Analytics:
- Platform engagement: DAU/MAU, session duration
- Learning analytics: Most viewed resources, completion rates
- Forum analytics: Questions asked, resolution time, top contributors
- Risk prediction: Teams likely to fall behind (ML-based or heuristic)

**FR-ADMIN-04:** Bulk Actions:
- Send message to all teams / theme-specific teams / at-risk teams
- Schedule check-in meetings
- Assign mini-challenges

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Page load time < 2s on 3G
- Real-time updates via WebSockets (forum, chat, notifications)
- Support 50+ teams (200+ users) concurrently
- Search results in < 500ms

### 5.2 Security
- Google OAuth + JWT tokens (HTTP-only cookies)
- Role-based access control (RBAC)
- Input sanitization (XSS prevention)
- Rate limiting on API endpoints
- No plagiarism: Flag similar code submissions (optional v2)

### 5.3 Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Dark mode (essential for late-night coding)
- Mobile-responsive (teams will use phones to check updates)

### 5.4 Reliability
- 99.5% uptime during competition season
- Daily automated backups
- Graceful degradation if real-time features fail

---

## 6. User Stories

### US-01: Team Onboarding
> As a Team Leader, I want to create my team and invite members so that we can start tracking our eYRC journey together.

**Acceptance Criteria:**
- Team creation takes < 2 minutes
- Invite link works for 7 days
- Members see team dashboard immediately after joining

### US-02: Theme Selection
> As a Team, we want to browse all 7 themes and submit our top 2 preferences so that the coordinator can assign us the best fit.

**Acceptance Criteria:**
- Theme comparison table available
- Preference submission is reversible before deadline
- Coordinator sees all preferences in one view

### US-03: Progress Update
> As a Team Leader, I want to mark our current task as "In Progress" and attach our GitHub repo so that the coordinator knows we're active.

**Acceptance Criteria:**
- Status change reflects immediately on coordinator dashboard
- GitHub link is validated (must be a valid URL)
- Team gets XP for status update

### US-04: Ask a Doubt
> As a 1st-year member, I want to ask a question about ROS2 installation anonymously so that I don't feel embarrassed.

**Acceptance Criteria:**
- Anonymous toggle available
- Question posted within 10 seconds
- Relevant seniors notified based on theme tags

### US-05: Answer & Earn
> As a 3rd-year student, I want to answer a junior's question about PID tuning so that I earn XP and build my reputation.

**Acceptance Criteria:**
- Answer editor supports code blocks
- XP credited immediately upon posting
- Best answer bonus credited when marked

### US-06: Coordinator Intervention
> As a Coordinator, I want to see which teams haven't updated progress in 5 days so that I can send them a motivational nudge.

**Acceptance Criteria:**
- At-risk teams highlighted in red on dashboard
- One-click "Send reminder" action
- Reminder delivered via email + in-app

### US-07: Weekly Sprint
> As a Team, we want to see our weekly challenge ("Complete Task 1 simulation") so that we stay motivated and compete with other teams.

**Acceptance Criteria:**
- Challenge visible on dashboard
- Progress bar updates in real-time
- Completion unlocks badge + XP

---

## 7. Theme Details (eYRC 2026-27)

### Theme 1: Logic Quest (LQ)
**Tagline:** An alien civilization has left behind a mysterious message scattered across four RFID blocks.
**Code:** LQ  
**Difficulty:** Intermediate  
**Years:** 2nd, 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** RFID Decryption, CPU Design, Path Planning  
**Objectives:**
1. Explore the arena by following the marked path
2. Scan and decrypt RFID data on each block
3. Determine the correct destination for the block
4. Pick up the block and transport it to its designated location
5. Repeat until all four blocks are placed correctly

**Learning Roadmap:**
- Week 1: Python basics + GPIO programming
- Week 2: RFID module (MFRC522) interfacing
- Week 3: Path planning algorithms (DFS, BFS)
- Week 4: CPU design basics (if applicable to decryption)
- Week 5: Simulation in Gazebo
- Week 6: Hardware integration & testing

---

### Theme 2: Khoj-o-Drone (KD)
**Tagline:** A quadcopter looking for survivors in a disaster-stricken area.
**Code:** KD  
**Difficulty:** Advanced  
**Years:** 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** Drone Flight Control, Path Planning, Computer Vision  
**Objectives:**
1. Autonomously explore the disaster zone
2. Navigate through hazardous, cluttered environments
3. Detect trapped survivors
4. Estimate and record survivor locations
5. Maintain stable flight throughout
6. Transmit coordinates to ground station
7. Prioritize critical survivors within mission time

**Learning Roadmap:**
- Week 1: Drone dynamics & physics
- Week 2: PX4/ArduPilot basics
- Week 3: MAVLink protocol & QGroundControl
- Week 4: Computer vision for object detection (YOLO/OpenCV)
- Week 5: GPS coordinate systems & GIS basics
- Week 6: Gazebo drone simulation (iris model)
- Week 7: Path planning in 3D space
- Week 8: Hardware flight testing (if kit available)

---

### Theme 3: Strata Cobot (SC)
**Tagline:** A mobile robot and robotic arm working in sync on an extraterrestrial planet.
**Code:** SC  
**Difficulty:** Advanced  
**Years:** 2nd, 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** SLAM, Robotic Arm Control, Autonomous Exploration, Image Processing  
**Objectives:**
1. Build control logic for dual-robot autonomous coordination
2. Mobile robot: global/local path planning, obstacle avoidance, trajectory control
3. Robotic arm: image processing, pose estimation, motion planning, grasp planning
4. Coordinate both robots as a single system
5. Achieve synchronized handoff from field to containers

**Learning Roadmap:**
- Week 1: ROS2 fundamentals & workspace setup
- Week 2: SLAM (gmapping / Cartographer)
- Week 3: MoveIt2 for arm motion planning
- Week 4: OpenCV for ore detection & classification
- Week 5: Pose estimation (ArUco / AprilTags)
- Week 6: Multi-robot coordination (topic sharing)
- Week 7: Gazebo simulation with both robots
- Week 8: Grasp planning & hardware integration

---

### Theme 4: Hola The Explorer (HE)
**Tagline:** Three robots. One buried city. A vault that only opens for a team.
**Code:** HE  
**Difficulty:** Expert  
**Years:** 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** Multi-Robot Coordination, Multi-Agent Path Planning, Collision Avoidance, Task Allocation  
**Objectives:**
1. Three robots independently explore arena and avoid obstacles
2. Each robot discovers hidden checkpoints and collects clue fragments
3. Robots share clue fragments with main server to decode treasure location
4. Coordinate motion to transport weighted objects (teamwork scales with weight)

**Learning Roadmap:**
- Week 1: Multi-agent systems theory
- Week 2: Distributed path planning (ORCA, RVO)
- Week 3: Communication protocols between robots
- Week 4: Task allocation algorithms (auction-based, market-based)
- Week 5: Sensor fusion for clue detection
- Week 6: Centralized vs decentralized decision making
- Week 7: Gazebo multi-robot simulation
- Week 8: System integration & stress testing

---

### Theme 5: Niti Vahan (NV)
**Tagline:** An autonomous vehicle that uses camera-based lane detection and control to navigate a city arena.
**Code:** NV  
**Difficulty:** Beginner–Intermediate  
**Years:** 1st, 2nd, 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** Computer Vision, Traffic Signal Logic, Path Optimization, Control Systems  
**Objectives:**
1. Encode traffic rules as mathematical constraints for predictive control
2. Generate disciplined path: stops at junctions, signals turns, completes milestones
3. Maintain dynamic stability respecting tire physical limits
4. Execute precise parking in designated zone
5. Prove smart control logic produces safer, orderly movement

**Learning Roadmap:**
- Week 1: Python + OpenCV basics
- Week 2: Lane detection (Hough transform, color filtering)
- Week 3: Traffic sign recognition (template matching / CNN)
- Week 4: PID controller for lane keeping
- Week 5: Model Predictive Control (MPC) basics
- Week 6: Path optimization (A*, Dijkstra)
- Week 7: Gazebo autonomous vehicle simulation
- Week 8: Parking algorithm & hardware integration

---

### Theme 6: Echo Balancer (EB)
**Tagline:** An autonomous two-wheel self-balancing bike navigating cave-like environments.
**Code:** EB  
**Difficulty:** Intermediate  
**Years:** 2nd, 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** Balance Control, Ultrasonic Sensing, PID Tuning, Furuta Pendulum  
**Objectives:**
1. Maintain stable balance on two wheels without touching ground
2. Navigate cave-like environment using wall-following algorithm
3. Detect magnet polarity along the path to verify correct direction

**Learning Roadmap:**
- Week 1: Control systems basics (transfer functions, stability)
- Week 2: PID controller theory & tuning (Ziegler-Nichols)
- Week 3: Inverted pendulum physics & modeling
- Week 4: IMU (MPU6050) interfacing & Kalman filtering
- Week 5: Ultrasonic sensor (HC-SR04) wall following
- Week 6: Magnetometer (HMC5883L) polarity detection
- Week 7: Simulation in MATLAB/Python
- Week 8: Hardware balancing & tuning

---

### Theme 7: PacBot (PB)
**Tagline:** A Pac-Man inspired bot — escape the maze without getting caught while maximizing points.
**Code:** PB  
**Difficulty:** Beginner  
**Years:** 1st, 2nd, 3rd, 4th  
**Mode:** Simulator + Hardware  
**Tech Stack:** Maze Solving, Pathfinding Algorithms, Grid Navigation, Game Theory  
**Objectives:**
1. Find path collecting maximum points while avoiding Ghosts
2. Decide how aggressively to collect points before heading to exit
3. Reach exit before escape routes are cut off
4. Reroute in real-time as Ghost positions change every second
5. Balance between chasing points and surviving

**Learning Roadmap:**
- Week 1: Python programming + data structures
- Week 2: Graph theory (BFS, DFS, Dijkstra, A*)
- Week 3: Maze representation (2D arrays, adjacency lists)
- Week 4: Game AI basics (minimax, greedy algorithms)
- Week 5: Real-time path replanning (D* Lite, ARA*)
- Week 6: Sensor integration (encoders, IR sensors)
- Week 7: Gazebo maze simulation
- Week 8: Hardware maze runner & optimization

---

## 8. UI/UX Requirements

### 8.1 Design Principles
- **Game-like:** Dark theme with neon accents (inspired by gaming UIs)
- **Progressive Disclosure:** Don't overwhelm beginners; unlock complexity as they advance
- **Mobile-First:** Many students will access via phone between classes
- **Instant Feedback:** Every action gives immediate visual/auditory feedback (subtle)

### 8.2 Key Screens
1. **Login/Onboarding:** Animated robot mascot, Google sign-in, role selection
2. **Team Dashboard:** Hero section with team XP, level badge, current task, deadline countdown
3. **Coordinator Dashboard:** Kanban-style team cards, risk heatmap, quick actions
4. **Theme Explorer:** Card grid with hover effects, comparison modal
5. **Roadmap View:** Horizontal scrollable timeline, node unlock animations
6. **Forum:** StackOverflow-inspired, clean, searchable
7. **Leaderboard:** Podium view for top 3, scrollable list below
8. **Profile:** XP bar, badges showcase, contribution graph, skills tree

### 8.3 Color Palette
- **Primary:** `#6366F1` (Indigo — trust, tech)
- **Secondary:** `#10B981` (Emerald — success, progress)
- **Accent:** `#F59E0B` (Amber — warnings, XP, achievements)
- **Danger:** `#EF4444` (Red — blockers, deadlines, at-risk)
- **Background:** `#0F172A` (Slate 900 — dark mode base)
- **Surface:** `#1E293B` (Slate 800 — cards, panels)
- **Text Primary:** `#F8FAFC` (Slate 50)
- **Text Secondary:** `#94A3B8` (Slate 400)

---

## 9. Out of Scope (V2 / Future)

| Feature | Reason |
|---------|--------|
| Video conferencing | Use Google Meet/Zoom integration instead |
| Code editor/IDE | Link to GitHub Codespaces / Replit |
| Live robot telemetry | Too complex for v1; use manual logs |
| Plagiarism detection | Important but complex; manual review for v1 |
| AI chatbot tutor | Can be added later using LLM APIs |
| Mobile native app | PWA (Progressive Web App) is sufficient for v1 |
| Payment integration | Not needed for internal college use |
| Multi-college support | Scope to your college first; expand later |

---

## 10. Open Questions

1. Should we integrate with the official eYantra portal API (if available) for auto-syncing task statuses?
2. What's the budget for hosting? (Free tier vs paid)
3. Do we need a custom domain or college subdomain?
4. Should forum content be searchable by Google (public) or private to college?
5. Any specific college branding requirements?

---

*End of PRD*
