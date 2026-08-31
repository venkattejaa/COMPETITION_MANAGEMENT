"use client";

import { motion } from "framer-motion";
import { Bell, Megaphone, CheckCircle2, AlertTriangle, Calendar, Info } from "lucide-react";

interface NotificationsClientProps {
  user: any;
}

const ANNOUNCEMENTS = [
  {
    id: "n1",
    title: "Task 0 Submission Open",
    category: "TASK_UPDATE",
    date: "Aug 31, 2026",
    content: "Team leaders can now select their top 2 preferred competition themes for Task 0. Please ensure choices are submitted before the deadline.",
    type: "important",
  },
  {
    id: "n2",
    title: "Resource Vault Uploaded for All 7 Themes",
    category: "RESOURCES",
    date: "Aug 30, 2026",
    content: "Official learning materials, Gazebo models, OpenCV templates, and PID tuning notebooks are now live in the Resource Vault.",
    type: "info",
  },
  {
    id: "n3",
    title: "Welcome to eYRC 2026-27 Season",
    category: "GENERAL",
    date: "Aug 28, 2026",
    content: "Welcome to the e-Yantra Robotics Competition Command Center! Check your team status and complete onboarding.",
    type: "success",
  },
];

export default function NotificationsClient({ user }: NotificationsClientProps) {
  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-white/5 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Activity & Alerts</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications</h1>
        <p className="text-slate-400 text-sm mt-1">Official eYRC competition announcements and team updates.</p>
      </div>

      <div className="space-y-4">
        {ANNOUNCEMENTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm p-5 sm:p-6 hover:bg-slate-800/70 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex-shrink-0">
                {item.type === "important" && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {item.type === "info" && <Info className="w-5 h-5 text-blue-400" />}
                {item.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-white text-base sm:text-lg">{item.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">{item.content}</p>

                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/50 text-slate-400">
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
