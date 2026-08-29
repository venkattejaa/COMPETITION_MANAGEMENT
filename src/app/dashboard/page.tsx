"use client";

import { motion } from "framer-motion";
import { Award, Target, Zap, Clock, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Captain!</h1>
          <p className="text-slate-400">Here is your team's current standing and progress in Phase 1.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800/50 px-5 py-3 rounded-2xl border border-slate-700/50">
          <Award className="w-6 h-6 text-orange-400" />
          <div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total XP</div>
            <div className="text-lg font-bold text-slate-100">2,450 <span className="text-orange-400 text-sm">XP</span></div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Theme Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Target className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Active Theme
            </div>
            
            <h2 className="text-4xl font-bold mb-2">Logic Quest (LQ)</h2>
            <p className="text-slate-300 mb-8 max-w-md line-clamp-2">
              Explore the arena by following the marked path. Scan and decrypt RFID data on each block.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-400">Phase 1 Completion</span>
                <span className="text-blue-400">45%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                />
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
              Resume Roadmap
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Up Next Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">Next Objectives</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              { title: "Complete Python Basics", time: "2 hrs ago", done: true },
              { title: "Setup Ubuntu & ROS2", time: "In Progress", done: false },
              { title: "Submit Task 1A", time: "Due in 3 days", done: false },
            ].map((task, i) => (
              <div key={i} className="flex gap-3">
                <div className={`mt-1 shrink-0 w-5 h-5 rounded border ${task.done ? "bg-orange-500 border-orange-500" : "border-slate-600"} flex items-center justify-center`}>
                  {task.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <div>
                  <p className={`font-medium ${task.done ? "text-slate-400 line-through" : "text-slate-200"}`}>{task.title}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 bg-slate-700/50 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-sm font-medium transition-colors">
            View All Tasks
          </button>
        </motion.div>
      </div>
    </div>
  );
}
