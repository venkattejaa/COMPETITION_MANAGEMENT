"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, generateTeamCode } from "@/lib/utils";
import { Users, Plus, Search, Mail, Loader2, CheckCircle, XCircle, AlertCircle, Copy, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";

interface Team {
  id: string;
  name: string;
  code: string;
  description: string | null;
  totalXp: number;
  progressPercent: number;
  currentStage: string;
  currentTask: string;
  assignedTheme: string | null;
  members: { id: string; name: string; avatar: string | null; xp: number; level: number }[];
  createdAt: string;
}

interface TeamsClientProps {
  teams: Team[];
  userTeam: Team | null;
  currentUserId: string;
}

export function TeamsClient({ teams, userTeam, currentUserId }: TeamsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.members.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create team");
      }
      setShowCreateModal(false);
      window.location.reload();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create team");
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJoinError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/teams/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: formData.get("code") }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to join team");
      }
      setShowJoinModal(false);
      window.location.reload();
    } catch (err) {
      setJoinError(err instanceof Error ? err.message : "Failed to join team");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Teams Directory
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mt-1">
            Discover eYRC teams, inspect members, and check progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!userTeam && (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowJoinModal(true)}
                className="rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs font-bold"
              >
                <Mail className="h-4 w-4" />
                Join Team
              </Button>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold"
              >
                <Plus className="h-4 w-4" />
                Create Team
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {/* User's Team Spotlight Card */}
      {userTeam && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Link href={`/teams/${userTeam.id}`} className="block">
            <div className="rounded-3xl bg-white dark:bg-[#121215] border-2 border-[#F05438]/40 dark:border-[#F05438]/50 p-6 shadow-lg shadow-[#F05438]/5 hover:border-[#F05438] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#F05438]/10 text-[#F05438] flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{userTeam.name}</h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-mono">
                      {userTeam.code}
                    </span>
                    {userTeam.assignedTheme && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#F05438]/10 text-[#F05438]">
                        {userTeam.assignedTheme}
                      </span>
                    )}
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Your Team
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 mb-2">
                    {userTeam.description || "No description provided"}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                    <span>{userTeam.members.length}/4 Members</span>
                    <span>•</span>
                    <span>{userTeam.progressPercent}% Progress</span>
                    <span>•</span>
                    <span>{userTeam.currentStage.replace("_", " ")}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-xl font-black text-[#F05438]">{userTeam.totalXp} XP</p>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Total XP</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Search Input Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search teams by name, code, or member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 pl-11 pr-4 py-3 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#F05438] transition-colors"
          />
        </div>
      </motion.div>

      {/* Teams Grid */}
      <div className="space-y-3">
        {filteredTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Link href={`/teams/${team.id}`} className="block">
              <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-5 hover:border-[#F05438] transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-zinc-800/60 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-zinc-300 font-bold group-hover:bg-[#F05438]/10 group-hover:text-[#F05438] transition-colors">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm truncate">
                          {team.name}
                        </h3>
                        {team.assignedTheme && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-mono">
                            {team.assignedTheme}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1">
                        {team.description || "No description"}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 dark:text-zinc-500 mt-1">
                        <span className="font-mono">{team.code}</span>
                        <span>•</span>
                        <span>{team.members.length}/4 Members</span>
                        <span>•</span>
                        <span>{team.progressPercent}% Progress</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-zinc-800">
                    <AvatarGroup max={4}>
                      {team.members.map((m) => (
                        <Avatar key={m.id} src={m.avatar} name={m.name} size="sm" />
                      ))}
                    </AvatarGroup>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-black text-[#F05438]">{team.totalXp} XP</p>
                      <p className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Total XP</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12 rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80">
          <Users className="h-12 w-12 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
            {searchQuery ? "No matching teams found" : "No teams created yet"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            {searchQuery ? "Try searching with a different name or team code" : "Be the first to form a team for eYRC 2026-27"}
          </p>
          {!searchQuery && (
            <div className="flex justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowJoinModal(true)}
                className="rounded-2xl text-xs font-bold"
              >
                Join Team
              </Button>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold"
              >
                Create Team
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Create New Team</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Team Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Robo Warriors"
                    required
                    className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Description (Optional)</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Brief description of your robotics team"
                    className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                  />
                </div>

                {createError && (
                  <p className="text-xs font-bold text-red-500">{createError}</p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)} className="rounded-2xl text-xs font-bold">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating} className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold">
                    {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Team"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Team Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Join a Team</h2>
                <button onClick={() => setShowJoinModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleJoinTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Team Code</label>
                  <input
                    type="text"
                    name="code"
                    placeholder="e.g. EYRC-CSE-001"
                    required
                    className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Ask your team leader for your unique 12-character team code</p>
                </div>

                {joinError && (
                  <p className="text-xs font-bold text-red-500">{joinError}</p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setShowJoinModal(false)} className="rounded-2xl text-xs font-bold">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold">
                    Join Team
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}