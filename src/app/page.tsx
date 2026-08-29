"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Shield, Rocket, UserCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-50 selection:bg-blue-500/30 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[0%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <nav className="flex justify-between items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 font-bold text-2xl tracking-tighter"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span>eYRC<span className="text-blue-400">Command</span></span>
          </motion.div>
        </nav>

        <main className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-400"></span>
              <span className="text-sm font-medium text-slate-300">Phase 1: Testing Environment Live</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
                eYRC Journey
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
              The centralized command center for your eYantra Robotics Competition tasks, themes, and gamified progress. Currently restricted to Team Leaders for initial testing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login-leader">
                <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(99,102,241,0.3)] hover:-translate-y-1">
                  <UserCheck className="w-5 h-5" />
                  <span>Team Leader Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <button disabled className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-800/50 text-slate-500 px-8 py-4 rounded-2xl font-semibold border border-slate-700/50 cursor-not-allowed">
                <span>Member Login</span>
                <span className="text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded-md">Coming Soon</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square relative flex items-center justify-center">
              {/* Abstract decorative elements simulating a dashboard/robotics vibe */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-400 to-amber-500" />
                
                <div className="p-8 h-full flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-slate-700 rounded-full animate-pulse" />
                    <div className="h-8 w-8 rounded-full border-2 border-blue-500/50 border-t-blue-500 animate-spin" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                      <Shield className="w-8 h-8 text-blue-400 mb-3" />
                      <div className="h-3 w-16 bg-slate-700 rounded-full mb-2" />
                      <div className="h-6 w-24 bg-slate-600 rounded-full" />
                    </div>
                    <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                      <Rocket className="w-8 h-8 text-orange-400 mb-3" />
                      <div className="h-3 w-16 bg-slate-700 rounded-full mb-2" />
                      <div className="h-6 w-24 bg-slate-600 rounded-full" />
                    </div>
                  </div>

                  <div className="flex-1 bg-slate-800/30 rounded-2xl border border-slate-700/30 p-5 mt-auto">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-700/50" />
                          <div className="flex-1 space-y-2">
                            <div className="h-2 w-full bg-slate-700/50 rounded-full" />
                            <div className="h-2 w-2/3 bg-slate-700/50 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-16 bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md"
              >
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">+100 XP</div>
                  <div className="text-xs text-slate-400">Task Completed</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
