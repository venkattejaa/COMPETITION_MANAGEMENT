"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Trophy, Target, Users, BookOpen, Clock, Flame, ArrowRight,
  CheckCircle, Circle, AlertCircle, ChevronRight, Star, TrendingUp,
  Bot, Code, Rocket, Award
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { cn, getThemeColor, formatDate, getXpForNextLevel, formatNumber } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  avatar: string | null;
  xp: number;
  level: number;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  stage: string;
  taskNumber: string;
  status: string;
  maxXp: number;
  deadline: string | null;
  submissionUrl: string | null;
}

interface Team {
  id: string;
  name: string;
  code: string;
  assignedTheme: string | null;
  currentStage: string;
  currentTask: string;
  progressPercent: number;
  totalXp: number;
  members: TeamMember[];
  tasks: Task[];
}

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  xp: number;
  level: number;
  streakDays: number;
  team: Team | null;
}

const stageLabels: Record<string, string> = {
  STAGE_1: "Stage 1",
  STAGE_2: "Stage 2",
  FINALE: "Finale",
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  NOT_STARTED: { label: "Not Started", color: "text-text-muted", icon: Circle },
  IN_PROGRESS: { label: "In Progress", color: "text-brand-accent", icon: Clock },
  SUBMITTED: { label: "Submitted", color: "text-brand-secondary", icon: AlertCircle },
  COMPLETED: { label: "Completed", color: "text-green-400", icon: CheckCircle },
  BLOCKED: { label: "Blocked", color: "text-brand-danger", icon: AlertCircle },
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
});

export function DashboardClient({ user }: { user: DashboardUser }) {
  const team = user.team;
  const xpInfo = getXpForNextLevel(user.xp);
  const completedTasks = team?.tasks.filter((t) => t.status === "COMPLETED").length || 0;
  const totalTasks = team?.tasks.length || 0;
  const inProgressTasks = team?.tasks.filter((t) => t.status === "IN_PROGRESS").length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-display-md font-display font-bold text-foreground">
              Welcome back, {user.name?.split(" ")[0]}
            </h1>
            <p className="text-body text-text-secondary mt-1">
              Here&apos;s your eYRC journey progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="primary" size="lg">
              <Zap className="h-3.5 w-3.5" />
              Level {user.level}
            </Badge>
            <Badge variant="secondary" size="lg">
              <Flame className="h-3.5 w-3.5" />
              {user.streakDays}d streak
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total XP", value: formatNumber(user.xp), icon: Zap, color: "text-brand-primary", bg: "bg-brand-primary/15" },
          { label: "Team XP", value: formatNumber(team?.totalXp || 0), icon: Trophy, color: "text-brand-secondary", bg: "bg-brand-secondary/15" },
          { label: "Tasks Done", value: `${completedTasks}/${totalTasks}`, icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/15" },
          { label: "Team Rank", value: team ? "#--" : "N/A", icon: TrendingUp, color: "text-brand-accent", bg: "bg-brand-accent/15" },
        ].map((stat, i) => (
          <motion.div key={stat.label} {...stagger(i)}>
            <Card className="p-5">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
                <p className="text-display-sm font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-body-sm text-text-muted mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* XP Progress + Team Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* XP Progress */}
        <motion.div {...stagger(4)}>
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-brand-primary" />
                XP Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-body-sm mb-2">
                    <span className="text-text-secondary">Level {user.level}</span>
                    <span className="text-text-muted">{user.xp} / {xpInfo.next} XP</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-elevated overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpInfo.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-border/30">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-body-lg font-bold text-foreground">{user.level}</p>
                      <p className="text-body-xs text-text-muted">Level</p>
                    </div>
                    <div>
                      <p className="text-body-lg font-bold text-foreground">{xpInfo.next - user.xp}</p>
                      <p className="text-body-xs text-text-muted">XP to Next</p>
                    </div>
                    <div>
                      <p className="text-body-lg font-bold text-foreground">{Math.round(xpInfo.progress)}%</p>
                      <p className="text-body-xs text-text-muted">Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Overview */}
        <motion.div {...stagger(5)}>
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-secondary" />
                Team Overview
              </h3>
              {team ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getThemeColor(team.assignedTheme || "LQ")}20` }}>
                      <Bot className="h-6 w-6" style={{ color: getThemeColor(team.assignedTheme || "LQ") }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{team.name}</p>
                      <p className="text-body-sm text-text-muted">{team.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm">
                    <span className="text-text-muted">Stage:</span>
                    <Badge variant="primary" size="sm">{stageLabels[team.currentStage] || team.currentStage}</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-body-sm mb-1">
                      <span className="text-text-secondary">Progress</span>
                      <span className="text-text-muted">{team.progressPercent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-brand-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${team.progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm text-text-muted">Members:</span>
                    <AvatarGroup max={4}>
                      {team.members.map((m) => (
                        <Avatar key={m.id} src={m.avatar} name={m.name} size="sm" />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="h-10 w-10 text-text-muted mx-auto mb-3" />
                  <p className="text-body-sm text-text-muted mb-3">You haven&apos;t joined a team yet</p>
                  <Link href="/teams">
                    <Button variant="primary" size="sm">
                      Find a Team
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div {...stagger(6)}>
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-brand-accent" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Explore Themes", desc: "Browse eYRC themes", href: "/themes", icon: BookOpen, color: "text-brand-primary" },
                  { label: "Team Hub", desc: "Manage your team", href: team ? `/teams/${team.id}` : "/teams", icon: Users, color: "text-brand-secondary" },
                  { label: "Forum", desc: "Ask questions", href: "/forum", icon: Code, color: "text-brand-accent" },
                  { label: "Leaderboard", desc: "See rankings", href: "/leaderboard", icon: Award, color: "text-brand-secondary" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-elevated/50 transition-colors group cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-surface-elevated flex items-center justify-center group-hover:bg-brand-primary/15 transition-colors">
                        <action.icon className={cn("h-5 w-5 group-hover:text-brand-primary transition-colors", action.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-body-sm">{action.label}</p>
                        <p className="text-body-xs text-text-muted">{action.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-brand-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tasks Section */}
      {team && team.tasks.length > 0 && (
        <motion.div {...stagger(7)}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-heading-sm font-semibold text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-brand-primary" />
                  Recent Tasks
                </h3>
                <Badge variant="outline" size="sm">
                  {completedTasks} of {totalTasks} completed
                </Badge>
              </div>
              <div className="space-y-3">
                {team.tasks.slice(0, 5).map((task, i) => {
                  const sc = statusConfig[task.status] || statusConfig.NOT_STARTED;
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <sc.icon className={cn("h-5 w-5", sc.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-body-sm">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" size="sm">{task.stage.replace("_", " ")}</Badge>
                          <span className="text-body-xs text-text-muted">{task.taskNumber}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <Badge
                          variant={task.status === "COMPLETED" ? "primary" : task.status === "IN_PROGRESS" ? "accent" : "outline"}
                          size="sm"
                        >
                          {sc.label}
                        </Badge>
                        <p className="text-body-xs text-text-muted mt-1">{task.maxXp} XP</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* No Team CTA */}
      {!team && (
        <motion.div {...stagger(7)}>
          <Card variant="double-bezel">
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 rounded-2xl bg-brand-primary/15 flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-heading-md font-semibold text-foreground mb-2">Start Your eYRC Journey</h3>
                <p className="text-body text-text-secondary mb-6">
                  Join a team to compete in eYRC 2026-27. Choose from 7 exciting robotics themes.
                </p>
                <Link href="/teams">
                  <Button variant="primary" size="lg">
                    <Users className="h-5 w-5" />
                    Find or Create a Team
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
