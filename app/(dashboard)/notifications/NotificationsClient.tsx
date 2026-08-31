"use client";

import { motion } from "framer-motion";
import { Bell, AlertTriangle, Calendar, Info, CheckCircle2 } from "lucide-react";

interface NotificationsClientProps {
  user: any;
}

const OFFICIAL_ANNOUNCEMENTS = [
  {
    id: "n1",
    title: "Task 0 Theme Preferences Now Open",
    category: "TASK_0",
    date: "Aug 31, 2026",
    content: "Team leaders can select their top 2 preferred competition themes for Task 0. Choices can be edited under the Themes & Team Preferences menu.",
    type: "important",
  },
  {
    id: "n2",
    title: "Resource Vault & Theme Portals Online",
    category: "RESOURCES",
    date: "Aug 30, 2026",
    content: "Official eYRC learning resources, Gazebo simulation models, OpenCV starter notebooks, and ROS2 tutorials are now accessible for all 7 themes.",
    type: "info",
  },
  {
    id: "n3",
    title: "Welcome to eYRC 2026-27 Season",
    category: "WELCOME",
    date: "Aug 28, 2026",
    content: "Welcome to the e-Yantra Robotics Competition Command Center! Verify your team profile and track your progress in the student dashboard.",
    type: "success",
  },
];

export default function NotificationsClient({ user }: NotificationsClientProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="border-b border-slate-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-[#F05438]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#F05438]">Activity & Alerts</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Official Announcements</h1>
        <p className="text-slate-500 dark:text-zinc-400 text-xs font-semibold mt-1">Official eYRC competition announcements and team updates.</p>
      </div>

      <div className="space-y-4">
        {OFFICIAL_ANNOUNCEMENTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 sm:p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex-shrink-0">
                {item.type === "important" && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {item.type === "info" && <Info className="w-5 h-5 text-blue-500" />}
                {item.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">{item.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-300 leading-relaxed mb-3">{item.content}</p>

                <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400">
                  #{item.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
