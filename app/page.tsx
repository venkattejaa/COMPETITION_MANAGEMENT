"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, ArrowRight, Users, Trophy, BookOpen, Zap, Shield, Clock, ArrowUpRight, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Users,
    title: "Team Command Center",
    description: "Create teams, manage theme assignments, track student participation, and streamline coordinator workflows.",
  },
  {
    icon: BookOpen,
    title: "6-Week Theme Roadmaps",
    description: "Structured learning paths for all 7 eYRC competition themes with curated hardware/software checkpoints.",
  },
  {
    icon: Trophy,
    title: "Gamified XP Engine",
    description: "XP points, live leaderboards, activity badges, and daily streaks to keep teams motivated till the Finale.",
  },
  {
    icon: Zap,
    title: "Real-time Q&A Forum",
    description: "Peer-to-peer technical help with theme tags, upvoting, solution verification, and mentor answers.",
  },
  {
    icon: Shield,
    title: "Coordinator Analytics",
    description: "Bird's-eye view across all competing teams, progress monitoring, and automated deadline tracking.",
  },
  {
    icon: Clock,
    title: "Milestone Deadlines",
    description: "Visual timeline and countdown timers for Stage 1, Stage 2, and the National Finale at IIT Bombay.",
  },
];

const stats = [
  { value: "7", label: "eYRC Themes" },
  { value: "500+", label: "Registered Teams" },
  { value: "2,000+", label: "Active Students" },
  { value: "100%", label: "Automated Tracking" },
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-[#0B132B] text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 border-b border-slate-800/80">
        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex flex-wrap items-center gap-2"
              >
                <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                  eYRC 2026-27 Season
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
                  Phase 1 Testing Live
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6"
              >
                Command Center for{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-orange-400 bg-clip-text text-transparent">
                  e-Yantra Robotics
                </span>{" "}
                Teams
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-lg text-slate-300 max-w-xl mb-8 leading-relaxed"
              >
                Supercharge your robotics team's progression. Track 6-week roadmaps, submit simulation tasks, earn XP, and secure your place at the National Finale at IIT Bombay.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>Team Captain Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <span>Explore Dashboard</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-800"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-extrabold text-orange-400">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dashboard Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-900/80 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">eYRC Live Status</h3>
                      <p className="text-xs text-slate-400">Team #2409 • Stage 1 Active</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
                    <div className="flex justify-between items-center text-xs mb-2 font-medium">
                      <span className="text-slate-400">Active Theme: Logic Quest (LQ)</span>
                      <span className="text-orange-400 font-bold">45% Complete</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full w-[45%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl text-center">
                      <div className="text-lg font-bold text-blue-400">2,450</div>
                      <div className="text-[11px] text-slate-400">Earned XP</div>
                    </div>
                    <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl text-center">
                      <div className="text-lg font-bold text-orange-400">#4</div>
                      <div className="text-[11px] text-slate-400">Rank</div>
                    </div>
                    <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl text-center">
                      <div className="text-lg font-bold text-emerald-400">3 Days</div>
                      <div className="text-[11px] text-slate-400">Next Task</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/40 border-b border-slate-800">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Everything Teams Need to Win</h2>
            <p className="text-slate-400 text-sm">Built specifically for the e-Yantra competition workflow from IIT Bombay.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 p-6 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Themes Showcase */}
      <section className="py-20 border-b border-slate-800">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">The 7 eYRC Competition Themes</h2>
            <p className="text-slate-400 text-sm">From line-following logic to multi-robot exploration.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "PB", name: "PacBot", tagline: "Maze-solving with game theory", difficulty: "BEGINNER" },
              { code: "NV", name: "Niti Vahan", tagline: "Autonomous vehicle navigation", difficulty: "INTERMEDIATE" },
              { code: "LQ", name: "Logic Quest", tagline: "RFID decryption & path planning", difficulty: "INTERMEDIATE" },
              { code: "EB", name: "Echo Balancer", tagline: "Self-balancing two-wheel robot", difficulty: "INTERMEDIATE" },
              { code: "KD", name: "Khoj-o-Drone", tagline: "Autonomous search drone", difficulty: "ADVANCED" },
              { code: "SC", name: "Strata Cobot", tagline: "Mobile base + robotic arm", difficulty: "ADVANCED" },
              { code: "HE", name: "Hola The Explorer", tagline: "Multi-robot swarm exploration", difficulty: "EXPERT" },
            ].map((theme) => (
              <div
                key={theme.code}
                className="bg-slate-800/30 border border-slate-700/50 hover:border-orange-500/50 p-5 rounded-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-blue-600/20 text-blue-400 font-extrabold rounded text-xs border border-blue-500/30">
                    {theme.code}
                  </span>
                  <span className="text-[10px] font-bold text-orange-400 px-2 py-0.5 bg-orange-500/10 rounded border border-orange-500/20">
                    {theme.difficulty}
                  </span>
                </div>
                <h4 className="font-bold text-slate-100 mb-1">{theme.name}</h4>
                <p className="text-xs text-slate-400">{theme.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}