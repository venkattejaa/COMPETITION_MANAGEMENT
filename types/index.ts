export type UserRole = "COORDINATOR" | "TEAM_LEADER" | "MEMBER";

export type Stage = "STAGE_1" | "STAGE_2" | "FINALE";

export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED" | "BLOCKED";

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export type ResourceType = "VIDEO" | "ARTICLE" | "DOCUMENTATION" | "CODE_TEMPLATE" | "CHEAT_SHEET" | "PDF" | "LINK";

export type ForumCategory = "CONCEPT" | "CODE_BUG" | "HARDWARE" | "SUBMISSION" | "GENERAL";

export type Urgency = "LOW" | "MEDIUM" | "HIGH" | "BLOCKER";

export type VoteType = "UP" | "DOWN";

export type NotificationType =
  | "TASK_DEADLINE"
  | "TASK_COMPLETED"
  | "FORUM_REPLY"
  | "BEST_ANSWER"
  | "ACHIEVEMENT_UNLOCKED"
  | "ANNOUNCEMENT"
  | "TEAM_INVITE"
  | "MENTION";

export type AnnouncementTarget = "ALL" | "COORDINATORS" | "TEAM_LEADERS" | "THEME_SPECIFIC";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: UserRole;
  year?: number | null;
  branch?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  skills: string[];
  xp: number;
  level: number;
  streakDays: number;
  lastActive: Date;
  team?: Team | null;
  teamId?: string | null;
  isTeamLeader: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  preferredTheme1?: string | null;
  preferredTheme2?: string | null;
  assignedTheme?: string | null;
  committedTheme?: string | null;
  currentStage: Stage;
  currentTask: string;
  progressPercent: number;
  totalXp: number;
  rank?: number | null;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  difficulty: Difficulty;
  years: number[];
  mode: string;
  techStack: string[];
  objectives: ThemeObjective[];
  roadmaps: RoadmapNode[];
  resources: Resource[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeObjective {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface RoadmapNode {
  id: string;
  themeId: string;
  title: string;
  description?: string | null;
  weekNumber: number;
  estimatedHours: number;
  resources: Resource[];
  prerequisites: string[];
  createdAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url?: string | null;
  content?: string | null;
  themeId?: string | null;
  roadmapNodeId?: string | null;
  tags: string[];
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  stage: Stage;
  taskNumber: string;
  themeCode?: string | null;
  deadline?: Date | null;
  maxXp: number;
  teamId: string;
  status: TaskStatus;
  submissionUrl?: string | null;
  submissionNotes?: string | null;
  submittedAt?: Date | null;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  isAnonymous: boolean;
  themeTag?: string | null;
  category: ForumCategory;
  urgency: Urgency;
  views: number;
  upvotes: number;
  isSolved: boolean;
  bestAnswerId?: string | null;
  answers: ForumAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumAnswer {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  isBestAnswer: boolean;
  upvotes: number;
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  answerId: string;
  type: VoteType;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  conditionType: string;
  conditionValue: number;
  createdAt: Date;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
  earnedAt: Date;
}

export interface XpLog {
  id: string;
  userId: string;
  teamId?: string | null;
  amount: number;
  reason: string;
  metadata?: Record<string, any> | null;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  createdAt: Date;
}

export interface ProgressLog {
  id: string;
  userId: string;
  teamId: string;
  action: string;
  details?: Record<string, any> | null;
  xpEarned: number;
  createdAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target: AnnouncementTarget;
  themeCode?: string | null;
  isPinned: boolean;
  createdAt: Date;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  rank: number;
  avatar?: string | null;
  level?: number;
  themeCode?: string;
}

export interface TeamLeaderboardEntry extends LeaderboardEntry {
  progressPercent: number;
  members: number;
  assignedTheme?: string;
}

export interface DashboardStats {
  totalTeams: number;
  totalUsers: number;
  tasksCompleted: number;
  tasksPending: number;
  forumQuestions: number;
  forumAnswers: number;
  avgProgress: number;
  atRiskTeams: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  theme?: string;
  stage?: Stage;
  status?: TaskStatus;
  category?: ForumCategory;
  urgency?: Urgency;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}