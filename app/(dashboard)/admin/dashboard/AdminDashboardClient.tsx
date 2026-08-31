"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Bot, CheckCircle2, Sparkles, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getThemeColor } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isTeamLeader: boolean;
}

interface Team {
  id: string;
  code: string;
  name: string;
  description: string | null;
  preferredTheme1: string | null;
  preferredTheme2: string | null;
  assignedTheme: string | null;
  currentStage: string;
  currentTask: string;
  members: TeamMember[];
}

interface AdminDashboardClientProps {
  teams: Team[];
  themes: { code: string; name: string }[];
}

export default function AdminDashboardClient({ teams: initialTeams, themes }: AdminDashboardClientProps) {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const totalParticipants = teams.reduce((acc, t) => acc + t.members.length, 0);
  const prefsSubmitted = teams.filter((t) => t.preferredTheme1 && t.preferredTheme2).length;

  const handleAssignTheme = async (teamId: string, themeCode: string) => {
    setUpdatingId(teamId);
    try {
      const res = await fetch("/api/admin/teams/assign-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, themeCode }),
      });
      if (res.ok) {
        setTeams((prev) =>
          prev.map((t) => (t.id === teamId ? { ...t, assignedTheme: themeCode } : t))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 border-b border-slate-200 dark:border-zinc-800 pb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Coordinator Control Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Competition Management Panel
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 text-xs font-semibold">
          Manage all 8 official teams, verify Task 0 theme preferences, and assign themes.
        </p>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl p-6 bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            TOTAL TEAMS
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{teams.length}</h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Registered Teams</p>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            TOTAL PARTICIPANTS
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{totalParticipants}</h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Registered Students</p>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            TASK 0 SUBMISSIONS
          </p>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{prefsSubmitted}</h2>
            <span className="text-xs font-bold text-slate-400 dark:text-zinc-500">/ {teams.length} teams</span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Preferences Selected</p>
        </div>
      </div>

      {/* Teams Overview Table */}
      <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">All Registered Teams</h3>
          <span className="text-xs font-mono font-bold text-slate-400">8 Teams Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-[10px] font-black">
                <th className="pb-3 px-2">Team Code</th>
                <th className="pb-3 px-2">Leader / Members</th>
                <th className="pb-3 px-2">Stage</th>
                <th className="pb-3 px-2">Task 0 Preferences</th>
                <th className="pb-3 px-2">Assigned Theme</th>
                <th className="pb-3 px-2 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-900 font-semibold text-slate-700 dark:text-zinc-300">
              {teams.map((t) => {
                const leader = t.members.find((m) => m.isTeamLeader) || t.members[0];
                return (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 px-2 font-mono font-black text-slate-900 dark:text-white">
                      {t.code}
                    </td>

                    <td className="py-4 px-2">
                      <p className="font-bold text-slate-900 dark:text-white">{leader?.name || "N/A"}</p>
                      <p className="text-[10px] text-slate-400">{t.members.length} member(s)</p>
                    </td>

                    <td className="py-4 px-2">
                      <span className="px-2 py-0.5 rounded-lg bg-orange-500/10 text-[#F05438] text-[10px] font-bold font-mono">
                        {t.currentStage} • {t.currentTask}
                      </span>
                    </td>

                    <td className="py-4 px-2">
                      {t.preferredTheme1 && t.preferredTheme2 ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-[10px]">
                            1: {t.preferredTheme1}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-bold text-[10px]">
                            2: {t.preferredTheme2}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">Pending selection</span>
                      )}
                    </td>

                    <td className="py-4 px-2">
                      {t.assignedTheme ? (
                        <span
                          className="px-2.5 py-1 rounded-xl text-xs font-black font-mono border"
                          style={{
                            backgroundColor: `${getThemeColor(t.assignedTheme)}15`,
                            color: getThemeColor(t.assignedTheme),
                            borderColor: `${getThemeColor(t.assignedTheme)}40`,
                          }}
                        >
                          {t.assignedTheme}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">Not assigned</span>
                      )}
                    </td>

                    <td className="py-4 px-2 text-right">
                      <select
                        value={t.assignedTheme || ""}
                        disabled={updatingId === t.id}
                        onChange={(e) => handleAssignTheme(t.id, e.target.value)}
                        className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-white rounded-xl px-2 py-1 focus:outline-none"
                      >
                        <option value="" disabled>Assign Theme</option>
                        {themes.map((th) => (
                          <option key={th.code} value={th.code}>
                            {th.code} - {th.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
