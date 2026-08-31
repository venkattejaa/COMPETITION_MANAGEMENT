"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Trophy, Target, Users, BookOpen, Clock, Flame, ArrowRight,
  CheckCircle, Circle, AlertCircle, ChevronRight, Star, TrendingUp,
  Bot, Code, Rocket, Award, Calendar, MapPin, ExternalLink, Sparkles,
  GraduationCap, MessageSquare, ShieldCheck, Check, Info
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

export function DashboardClient({ user }: { user: DashboardUser }) {
  const team = user.team;
  const xpInfo = getXpForNextLevel(user.xp);
  const completedTasks = team?.tasks.filter((t) => t.status === "COMPLETED").length || 0;
  const totalTasks = team?.tasks.length || 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Welcome back, {user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
          eYRC 2026-27 • Team {team?.code || "eYRC#1051"}
        </p>
      </motion.div>

      {/* 3 Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TEAM Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-3xl p-6 bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm space-y-2"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            TEAM
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {team?.code || "eYRC#1051"}
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            Student Track
          </p>
        </motion.div>

        {/* PAYMENT Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl p-6 bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm space-y-2"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            PAYMENT
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Paid
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            Payment received.
          </p>
        </motion.div>

        {/* STATUS Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-3xl p-6 bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm space-y-2"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            STATUS
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Registered
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            Verification completed
          </p>
        </motion.div>
      </div>

      {/* REGISTRATION STEPS Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm space-y-6"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
          REGISTRATION STEPS
        </p>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                1. Team Registered
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                2. Payment
              </p>
              <p className="text-xs font-medium text-slate-400 dark:text-zinc-400">
                Payment received.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  3. Team Profile
                </p>
                <p className="text-xs font-medium text-slate-400 dark:text-zinc-400">
                  Personal details, academic info, and preferences verified.
                </p>
              </div>
            </div>
            {team && (
              <Link href={`/teams/${team.id}`}>
                <Button variant="secondary" size="sm" className="rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold">
                  View team
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Task 0 Notification Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-3xl p-5 bg-[#FDE8E5] dark:bg-[#2A1512] border border-[#F8B3A8] dark:border-[#5C231B] flex items-center gap-4 text-[#B92A1A] dark:text-[#FF8A7A]"
      >
        <div className="h-10 w-10 rounded-2xl bg-[#F05438] text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black uppercase tracking-wider">Task 0 Announcement</p>
          <p className="text-sm font-bold mt-0.5">
            Task 0 launches on Sep 1, 2026 at 12:01 AM. Theme selections & submission roadmaps will be available in the Themes section.
          </p>
        </div>
        <Link href="/themes">
          <Button variant="primary" size="sm" className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-xl text-xs font-bold flex-shrink-0">
            Explore Themes
          </Button>
        </Link>
      </motion.div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {[
          { label: "Themes", desc: "Browse 7 competition themes", href: "/themes", icon: Bot },
          { label: "Resources", desc: "Roadmaps & learning kits", href: "/resources", icon: BookOpen },
          { label: "Forum", desc: "Discussion & query portal", href: "/forum", icon: MessageSquare },
          { label: "Leaderboard", desc: "View team rankings", href: "/leaderboard", icon: Trophy },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="rounded-3xl p-5 bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:border-[#F05438] hover:shadow-md transition-all group h-full">
              <item.icon className="h-6 w-6 text-[#F05438] mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-extrabold text-slate-900 dark:text-white text-sm">{item.label}</p>
              <p className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
