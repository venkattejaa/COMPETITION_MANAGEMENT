-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('COORDINATOR', 'TEAM_LEADER', 'MEMBER');

-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('STAGE_1', 'STAGE_2', 'FINALE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('VIDEO', 'ARTICLE', 'DOCUMENTATION', 'CODE_TEMPLATE', 'CHEAT_SHEET', 'PDF', 'LINK');

-- CreateEnum
CREATE TYPE "ForumCategory" AS ENUM ('CONCEPT', 'CODE_BUG', 'HARDWARE', 'SUBMISSION', 'GENERAL');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'BLOCKER');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TASK_DEADLINE', 'TASK_COMPLETED', 'FORUM_REPLY', 'BEST_ANSWER', 'ACHIEVEMENT_UNLOCKED', 'ANNOUNCEMENT', 'TEAM_INVITE', 'MENTION');

-- CreateEnum
CREATE TYPE "AnnouncementTarget" AS ENUM ('ALL', 'COORDINATORS', 'TEAM_LEADERS', 'THEME_SPECIFIC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "year" INTEGER,
    "branch" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "skills" TEXT[],
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" TEXT,
    "isTeamLeader" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "preferredTheme1" TEXT,
    "preferredTheme2" TEXT,
    "assignedTheme" TEXT,
    "committedTheme" TEXT,
    "currentStage" "Stage" NOT NULL DEFAULT 'STAGE_1',
    "currentTask" TEXT NOT NULL DEFAULT 'TASK_0',
    "progressPercent" INTEGER NOT NULL DEFAULT 0,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "stage" "Stage" NOT NULL,
    "taskNumber" TEXT NOT NULL,
    "themeCode" TEXT,
    "deadline" TIMESTAMP(3),
    "maxXp" INTEGER NOT NULL DEFAULT 100,
    "teamId" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "submissionUrl" TEXT,
    "submissionNotes" TEXT,
    "submittedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "years" INTEGER[],
    "mode" TEXT NOT NULL,
    "techStack" TEXT[],
    "objectives" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapNode" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "weekNumber" INTEGER NOT NULL,
    "estimatedHours" INTEGER NOT NULL,
    "prerequisites" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadmapNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "url" TEXT,
    "content" TEXT,
    "themeId" TEXT,
    "roadmapNodeId" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "themeTag" TEXT,
    "category" "ForumCategory" NOT NULL DEFAULT 'GENERAL',
    "urgency" "Urgency" NOT NULL DEFAULT 'LOW',
    "views" INTEGER NOT NULL DEFAULT 0,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,
    "bestAnswerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumAnswer" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "isBestAnswer" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "xpBonus" INTEGER NOT NULL DEFAULT 0,
    "conditionType" TEXT NOT NULL,
    "conditionValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XpLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XpLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "target" "AnnouncementTarget" NOT NULL DEFAULT 'ALL',
    "themeCode" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_code_key" ON "Team"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_code_key" ON "Theme"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ForumPost_bestAnswerId_key" ON "ForumPost"("bestAnswerId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_answerId_key" ON "Vote"("userId", "answerId");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_code_key" ON "Achievement"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapNode" ADD CONSTRAINT "RoadmapNode_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_roadmapNodeId_fkey" FOREIGN KEY ("roadmapNodeId") REFERENCES "RoadmapNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumAnswer" ADD CONSTRAINT "ForumAnswer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumAnswer" ADD CONSTRAINT "ForumAnswer_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "ForumAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressLog" ADD CONSTRAINT "ProgressLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressLog" ADD CONSTRAINT "ProgressLog_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
