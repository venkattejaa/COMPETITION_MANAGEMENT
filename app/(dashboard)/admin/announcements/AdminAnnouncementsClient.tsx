"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Send, Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminAnnouncementsClientProps {
  user: any;
}

export default function AdminAnnouncementsClient({ user }: AdminAnnouncementsClientProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ANNOUNCEMENT");
  const [content, setContent] = useState("");
  const [type, setType] = useState("important");
  const [successMsg, setSuccessMsg] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSuccessMsg(true);
    setTimeout(() => {
      setTitle("");
      setContent("");
      setSuccessMsg(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="border-b border-slate-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="h-5 w-5 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Coordinator Broadcasting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Broadcast Official Announcement
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 text-xs font-semibold mt-1">
          Post competition updates, deadline extensions, or resource releases to all student portals.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handlePost}
        className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Announcement Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Task 0 Theme Preferences Deadline Extended"
            className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Category Tag
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="ANNOUNCEMENT">Announcement</option>
              <option value="TASK_0">Task 0 Update</option>
              <option value="DEADLINE">Deadline Alert</option>
              <option value="RESOURCES">Resource Release</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Severity Level
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="important">Important (Warning)</option>
              <option value="info">Informational (Blue)</option>
              <option value="success">Success (Green)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Announcement Content
          </label>
          <textarea
            required
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter announcement details, instructions, or links for participants..."
            className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
          />
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Announcement successfully broadcasted to all team portals!
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-[#F05438] hover:bg-[#D94328] text-white font-bold text-xs rounded-2xl px-6 py-3 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Broadcast Announcement
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
