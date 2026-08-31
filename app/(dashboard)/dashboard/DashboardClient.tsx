"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Trophy, Target, Users, BookOpen, Clock, Flame, ArrowRight,
  CheckCircle, Circle, AlertCircle, ChevronRight, Star, TrendingUp,
  Bot, Code, Rocket, Award, Calendar, MapPin, ExternalLink, Sparkles,
  GraduationCap, MessageSquare
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { cn, getThemeColor, getXpForNextLevel, formatNumber } from "@/lib/utils";

interface TeamMember { id: string; name: string; avatar: string | null; xp: number; level: number; }
interface Task { id: string; title: string; description: string | null; stage: string; taskNumber: string; status: string; maxXp: number; deadline: string | null; submissionUrl: string | null; }
interface Team { id: string; name: string; code: string; assignedTheme: string | null; currentStage: string; currentTask: string; progressPercent: number; totalXp: number; members: TeamMember[]; tasks: Task[]; }
interface DashboardUser { id: string; name: string; email: string; avatar: string | null; role: string; xp: number; level: number; streakDays: number; team: Team | null; }

const stageLabels: Record<string, string> = { STAGE_1: "Stage 1", STAGE_2: "Stage 2", FINALE: "Finale" };
const themeNames: Record<string, string> = { LQ: "Logic Quest", KD: "Khoj-o-Drone", SC: "Strata Cobot", HE: "Hola The Explorer", NV: "Niti Vahan", EB: "Echo Balancer", PB: "PacBot" };

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  NOT_STARTED: { label: "Not Started", color: "text-slate-400", bg: "bg-slate-400/10", icon: Circle },
  IN_PROGRESS: { label: "In Progress", color: "text-amber-400", bg: "bg-amber-400/10", icon: Clock },
  SUBMITTED: { label: "Submitted", color: "text-blue-400", bg: "bg-blue-400/10", icon: AlertCircle },
  COMPLETED: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: CheckCircle },
  BLOCKED: { label: "Blocked", color: "text-red-400", bg: "bg-red-400/10", icon: AlertCircle },
};

const deadlines = [
  { label: "Stage 1 End", date: "Nov 30, 2026", daysLeft: 91 },
  { label: "Stage 2 Start", date: "Dec 1, 2026", daysLeft: 92 },
  { label: "National Finale", date: "Mar 15, 2027", daysLeft: 196 },
];

export function DashboardClient({ user }: { user: DashboardUser }) {
  const team = user.team;
  const xpInfo = getXpForNextLevel(user.xp);
  const completedTasks = team?.tasks.filter((t) => t.status === "COMPLETED").length || 0;
  const totalTasks = team?.tasks.length || 0;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#1E40AF] p-6 sm:p-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">eYRC 2026-27 Season Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {user.name?.split(" ")[0]} 👋
              </h1>
              <p className="text-blue-100 mt-1 text-sm sm:text-base">
                {team ? `${team.name} • ${themeNames[team.assignedTheme || ""] || "No theme assigned"} • ${stageLabels[team.currentStage]}` : "Join a team to begin your robotics journey"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-sm font-bold text-white">Lv. {user.level}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Flame className="h-3.5 w-3.5 text-orange-300" />
                <span className="text-sm font-bold text-white">{user.streakDays}d</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Star className="h-3.5 w-3.5 text-yellow-300" />
                <span className="text-sm font-bold text-white">{formatNumber(user.xp)} XP</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Your XP", value: formatNumber(user.xp), sub: `Level ${user.level}`, icon: Zap, gradient: "from-blue-500/20 to-indigo-500/20", iconColor: "text-blue-400", border: "border-blue-500/20" },
          { label: "Team XP", value: formatNumber(team?.totalXp || 0), sub: team?.name || "No team", icon: Trophy, gradient: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400", border: "border-amber-500/20" },
          { label: "Tasks", value: `${completedTasks}/${totalTasks}`, sub: `${taskProgress}% complete`, icon: Target, gradient: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400", border: "border-emerald-500/20" },
          { label: "Streak", value: `${user.streakDays}`, sub: "days active", icon: Flame, gradient: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400", border: "border-orange-500/20" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
          >
            <div className={cn("rounded-xl border p-4 sm:p-5 bg-gradient-to-br", stat.gradient, stat.border)}>
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className={cn("h-4 w-4", stat.iconColor)} />
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: XP + Team + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* XP Progress */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                XP Progress
              </h3>
              <span className="text-xs font-mono text-slate-400">{Math.round(xpInfo.progress)}%</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Level {user.level}</span>
                  <span className="text-slate-500">{formatNumber(user.xp)} / {formatNumber(xpInfo.next)}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-700/80 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpInfo.progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-700/50">
                {[
                  { label: "Level", value: user.level, icon: "⚡" },
                  { label: "To Next", value: formatNumber(xpInfo.next - user.xp), icon: "🎯" },
                  { label: "Progress", value: `${Math.round(xpInfo.progress)}%`, icon: "📊" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <span className="text-base">{item.icon}</span>
                    <p className="text-sm font-bold text-white mt-1">{item.value}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Overview */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                  <Users className="h-4 w-4 text-emerald-400" />
                </div>
                Team
              </h3>
              {team && (
                <Link href={`/teams/${team.id}`}>
                  <span className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                    View <ExternalLink className="h-3 w-3" />
                  </span>
                </Link>
              )}
            </div>
            {team ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${getThemeColor(team.assignedTheme || "LQ")}15`, borderColor: `${getThemeColor(team.assignedTheme || "LQ")}30` }}>
                    <span className="text-sm font-extrabold" style={{ color: getThemeColor(team.assignedTheme || "LQ") }}>{team.assignedTheme || "?"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{team.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{team.code}</p>
                  </div>
                  <Badge variant="primary" size="sm">{stageLabels[team.currentStage]}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Overall Progress</span>
                    <span className="font-bold text-white">{team.progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700/80 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${getThemeColor(team.assignedTheme || "LQ")}, ${getThemeColor(team.assignedTheme || "LQ")}cc)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${team.progressPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500">Members:</span>
                    <AvatarGroup max={4}>
                      {team.members.map((m) => (
                        <Avatar key={m.id} src={m.avatar} name={m.name} size="sm" />
                      ))}
                    </AvatarGroup>
                  </div>
                  <span className="text-xs text-slate-500">{team.members.length} members</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="h-12 w-12 rounded-xl bg-slate-700/50 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-slate-500" />
                </div>
                <p className="text-sm text-slate-400 mb-4">You haven&apos;t joined a team yet</p>
                <Link href="/teams">
                  <Button variant="primary" size="sm">
                    Find a Team <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Competition Timeline */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-purple-400" />
                </div>
                Timeline
              </h3>
            </div>
            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div key={d.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30 border border-slate-700/30">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center text-xs font-extrabold",
                    i === 0 ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
                    i === 1 ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" :
                    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  )}>
                    {d.daysLeft}d
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">{d.label}</p>
                    <p className="text-xs text-slate-500">{d.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-xs font-bold",
                      d.daysLeft < 30 ? "text-red-400" : d.daysLeft < 100 ? "text-amber-400" : "text-emerald-400"
                    )}>
                      {d.daysLeft} days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tasks Section */}
      {team && team.tasks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h3 className="font-bold text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
                  <Target className="h-4 w-4 text-orange-400" />
                </div>
                Competition Tasks
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 sm:w-32 rounded-full bg-slate-700/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${taskProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-300 whitespace-nowrap">{completedTasks}/{totalTasks}</span>
              </div>
            </div>
            <div className="space-y-2">
              {team.tasks.map((task, i) => {
                const sc = statusConfig[task.status] || statusConfig.NOT_STARTED;
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
                    className={cn(
                      "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all",
                      task.status === "IN_PROGRESS" ? "bg-amber-500/5 border-amber-500/20" :
                      task.status === "COMPLETED" ? "bg-emerald-500/5 border-emerald-500/20" :
                      "bg-slate-700/20 border-slate-700/30"
                    )}
                  >
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", sc.bg)}>
                      <sc.icon className={cn("h-4 w-4", sc.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500 font-mono uppercase">{task.taskNumber}</span>
                        {task.deadline && (
                          <span className="text-[10px] text-slate-500">
                            Due: {new Date(task.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", sc.bg, sc.color)}>
                        {sc.label}
                      </span>
                      <span className="text-xs text-slate-500 hidden sm:block">{task.maxXp} XP</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Navigation */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Themes", desc: "Browse all 7 themes", href: "/themes", icon: Bot, gradient: "from-indigo-500/15 to-blue-500/15", iconColor: "text-indigo-400", border: "border-indigo-500/20" },
            { label: "Resources", desc: "Learning roadmaps", href: "/resources", icon: BookOpen, gradient: "from-emerald-500/15 to-teal-500/15", iconColor: "text-emerald-400", border: "border-emerald-500/20" },
            { label: "Forum", desc: "Ask & help peers", href: "/forum", icon: MessageSquare, gradient: "from-purple-500/15 to-pink-500/15", iconColor: "text-purple-400", border: "border-purple-500/20" },
            { label: "Leaderboard", desc: "See rankings", href: "/leaderboard", icon: Award, gradient: "from-amber-500/15 to-orange-500/15", iconColor: "text-amber-400", border: "border-amber-500/20" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <div className={cn(
                "rounded-xl border p-4 bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer h-full",
                item.gradient, item.border
              )}>
                <item.icon className={cn("h-6 w-6 mb-3 group-hover:scale-110 transition-transform", item.iconColor)} />
                <p className="font-bold text-white text-sm">{item.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* No Team CTA */}
      {!team && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}>
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/15 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                <GraduationCap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Your eYRC Journey</h3>
              <p className="text-sm text-slate-400 mb-6">
                Join a team to compete in eYRC 2026-27. Choose from 7 exciting robotics themes from IIT Bombay.
              </p>
              <Link href="/teams">
                <Button variant="primary" size="lg">
                  <Users className="h-5 w-5" />
                  Find or Create a Team
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
