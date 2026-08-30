"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, generateTeamCode, formatRelativeTime } from "@/lib/utils";
import { Users, Plus, Search, ChevronDown, Mail, Lock, Loader2, CheckCircle, XCircle, AlertCircle, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge, Tag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-foreground">Teams</h1>
          <p className="text-body text-text-secondary mt-1">Manage teams, view progress, and collaborate</p>
        </div>
        <div className="flex items-center gap-2">
          {!userTeam && (
            <>
              <Button variant="outline" onClick={() => setShowJoinModal(true)}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Join Team
              </Button>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Create Team
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {userTeam && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="card-double-bezel"
        >
          <Link href={`/teams/${userTeam.id}`} className="block">
            <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5 hover:border-brand-primary/50 hover:shadow-card-hover transition-all duration-300 ease-spring">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-brand-primary/15 flex items-center justify-center">
                  <Users className="h-7 w-7 text-brand-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-heading-md font-bold text-foreground">{userTeam.name}</h3>
                    <Badge variant="outline">{userTeam.code}</Badge>
                    {userTeam.assignedTheme && <Badge variant="primary">{userTeam.assignedTheme}</Badge>}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{userTeam.description || "No description"}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" aria-hidden="true" />
                      {userTeam.members.length}/4 members
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-brand-secondary" aria-hidden="true" />
                      {userTeam.progressPercent}% progress
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
                      Stage: {userTeam.currentStage.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-accent">{userTeam.totalXp} XP</div>
                  <div className="text-xs text-text-muted">Total Team XP</div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5">
          <div className="flex items-center gap-4 mb-4">
            <Search className="h-5 w-5 text-text-muted flex-shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search teams, members, codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:outline-none text-foreground placeholder:text-text-muted"
            />
          </div>

          <div className={filteredTeams.length === 0 ? "hidden" : ""}>
            <div className="space-y-3">
              {filteredTeams.map((team, index) => (
                <motion.article
                  key={team.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.03 }}
                  className="card-double-bezel group"
                >
                  <Link href={`/teams/${team.id}`} className="block">
                    <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-4 transition-all duration-300 ease-spring hover:border-brand-primary/50 hover:shadow-card-hover">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 text-center">
                          <div className="h-10 w-10 rounded-xl bg-brand-primary/15 flex items-center justify-center mx-auto mb-1">
                            <Users className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          </div>
                          <span className="text-xs font-mono text-text-muted">{team.code}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{team.name}</h3>
                            {team.assignedTheme && <Badge variant="primary" className="text-xs">{team.assignedTheme}</Badge>}
                          </div>
                          <p className="text-sm text-text-secondary line-clamp-1 mb-2">{team.description || "No description"}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" aria-hidden="true" />
                              {team.members.length}/4
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" aria-hidden="true" />
                              {team.progressPercent}%
                            </span>
                            <span className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" aria-hidden="true" />
                              {team.currentStage.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <AvatarGroup max={3}>
                            {team.members.map((m) => (
                              <Avatar key={m.id} src={m.avatar} name={m.name} size="sm" />
                            ))}
                          </AvatarGroup>
                          <div className="text-right hidden sm:block">
                            <p className="font-bold text-brand-accent">{team.totalXp} XP</p>
                            <p className="text-xs text-text-muted">Total XP</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
              <h3 className="text-heading-sm font-semibold text-foreground mb-2">
                {searchQuery ? "No teams found" : "No teams yet"}
              </h3>
              <p className="text-text-secondary mb-4">
                {searchQuery ? "Try adjusting your search" : "Be the first to create a team!"}
              </p>
              {!searchQuery && (
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => setShowJoinModal(true)}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Join Team
                  </Button>
                  <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Create Team
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md rounded-2xl bg-surface backdrop-blur-2xl border border-border/50 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-lg font-semibold text-foreground">Create New Team</h2>
                <button onClick={() => setShowCreateModal(false)} className="btn-icon text-text-secondary hover:text-foreground">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <Input label="Team Name" name="name" placeholder="e.g., Team Alpha" required autoComplete="off" />
                <Input label="Description (optional)" name="description" placeholder="Brief description of your team" />
                <div className="p-4 rounded-xl bg-surface-elevated/50 border border-border/30">
                  <p className="text-sm font-medium text-foreground mb-2">Your team code will be:</p>
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono font-bold text-brand-primary">{generateTeamCode("CSE")}</code>
                    <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(generateTeamCode("CSE"))}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-text-muted mt-2">Share this code with teammates to join</p>
                </div>
                {createError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-danger/10 border border-brand-danger/30 text-brand-danger text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {createError}
                  </div>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Creating...
                      </>
                    ) : (
                      "Create Team"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showJoinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md rounded-2xl bg-surface backdrop-blur-2xl border border-border/50 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-lg font-semibold text-foreground">Join a Team</h2>
                <button onClick={() => setShowJoinModal(false)} className="btn-icon text-text-secondary hover:text-foreground">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleJoinTeam} className="space-y-4">
                <Input label="Team Code" name="code" placeholder="EYRC-CSE-123" required autoComplete="off" helperText="Enter the team code shared by your team leader" />
                {joinError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-danger/10 border border-brand-danger/30 text-brand-danger text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {joinError}
                  </div>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" type="button" onClick={() => setShowJoinModal(false)}>Cancel</Button>
                  <Button type="submit">Join Team</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}