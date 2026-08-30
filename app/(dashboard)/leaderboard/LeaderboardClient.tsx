"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, Users, Zap, TrendingUp, ChevronRight, Star, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { cn, getThemeColor, formatNumber, getInitials } from "@/lib/utils";

interface Team {
  id: string;
  name: string;
  code: string;
  totalXp: number;
  progressPercent: number;
  assignedTheme: string | null;
  members: { id: string; name: string; avatar: string | null; xp: number; level: number }[];
}

interface User {
  id: string;
  name: string;
  avatar: string | null;
  xp: number;
  level: number;
  team: { name: string; code: string } | null;
}

interface LeaderboardClientProps {
  teams: Team[];
  users: User[];
  currentUserId: string;
}

const rankIcons: Record<number, { icon: typeof Trophy; color: string; bg: string }> = {
  0: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/15" },
  1: { icon: Medal, color: "text-gray-300", bg: "bg-gray-300/15" },
  2: { icon: Medal, color: "text-amber-600", bg: "bg-amber-600/15" },
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function LeaderboardClient({ teams, users, currentUserId }: LeaderboardClientProps) {
  const [activeTab, setActiveTab] = useState<"teams" | "individuals">("teams");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeIn}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-display-md font-display font-bold text-foreground">Leaderboard</h1>
            <p className="text-body text-text-secondary mt-1">Top performers across all eYRC themes</p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-surface-elevated/50 border border-border/50">
            {(["teams", "individuals"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-xl text-body-sm font-medium transition-all duration-300",
                  activeTab === tab
                    ? "bg-brand-primary text-white shadow-brand"
                    : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
                )}
              >
                {tab === "teams" ? "Teams" : "Individuals"}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === "teams" ? (
          <motion.div
            key="teams"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Team Leaderboard */}
            {teams.length > 0 ? (
              <div className="space-y-4">
                {/* Top 3 Podium */}
                {teams.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 0, 2].map((idx) => {
                      const team = teams[idx];
                      const isCurrent = team.members.some((m) => m.id === currentUserId);
                      const rankInfo = rankIcons[idx];
                      return (
                        <motion.div
                          key={team.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx === 0 ? 0 : 0.2 }}
                          className={cn(
                            "card-double-bezel overflow-hidden",
                            idx === 0 && "order-2",
                            idx === 1 && "order-1",
                            idx === 2 && "order-3"
                          )}
                        >
                          <div className="rounded-2xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 text-center">
                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-3", rankInfo.bg)}>
                              <rankInfo.icon className={cn("h-7 w-7", rankInfo.color)} />
                            </div>
                            <p className="text-body-sm text-text-muted mb-1">#{idx + 1}</p>
                            <p className="font-bold text-foreground text-body-lg mb-1">{team.name}</p>
                            <p className="text-body-xs text-text-muted mb-3">{team.code}</p>
                            <div className="flex items-center justify-center gap-1 mb-3">
                              <Zap className="h-4 w-4 text-brand-primary" />
                              <span className="font-bold text-brand-primary">{formatNumber(team.totalXp)} XP</span>
                            </div>
                            <div className="flex justify-center">
                              <AvatarGroup max={3}>
                                {team.members.map((m) => (
                                  <Avatar key={m.id} src={m.avatar} name={m.name} size="sm" />
                                ))}
                              </AvatarGroup>
                            </div>
                            {isCurrent && (
                              <Badge variant="primary" size="sm" className="mt-3">Your Team</Badge>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Full Rankings Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full" role="table">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Rank</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Team</th>
                            <th className="text-center px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden md:table-cell">Members</th>
                            <th className="text-center px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden lg:table-cell">Progress</th>
                            <th className="text-right px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">XP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teams.map((team, index) => {
                            const isCurrent = team.members.some((m) => m.id === currentUserId);
                            return (
                              <motion.tr
                                key={team.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className={cn(
                                  "border-b border-border/20 transition-colors hover:bg-surface-elevated/30",
                                  isCurrent && "bg-brand-primary/5"
                                )}
                              >
                                <td className="px-6 py-4">
                                  <span className={cn(
                                    "text-body-sm font-bold",
                                    index === 0 && "text-yellow-400",
                                    index === 1 && "text-gray-300",
                                    index === 2 && "text-amber-600",
                                    index > 2 && "text-text-muted"
                                  )}>
                                    #{index + 1}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getThemeColor(team.assignedTheme || "LQ")}20` }}>
                                      <span className="text-sm font-bold" style={{ color: getThemeColor(team.assignedTheme || "LQ") }}>{team.code.slice(-3)}</span>
                                    </div>
                                    <div>
                                      <p className="font-semibold text-foreground text-body-sm">{team.name}</p>
                                      <p className="text-body-xs text-text-muted">{team.code}</p>
                                    </div>
                                    {isCurrent && <Badge variant="primary" size="sm">You</Badge>}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-center hidden md:table-cell">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <Users className="h-4 w-4 text-text-muted" />
                                    <span className="text-body-sm text-text-secondary">{team.members.length}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
                                      <div className="h-full rounded-full bg-brand-secondary" style={{ width: `${team.progressPercent}%` }} />
                                    </div>
                                    <span className="text-body-xs text-text-muted w-10 text-right">{team.progressPercent}%</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <span className="font-bold text-foreground">{formatNumber(team.totalXp)}</span>
                                  <span className="text-body-xs text-text-muted ml-1">XP</span>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Trophy className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <p className="text-body text-text-muted">No teams registered yet</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="individuals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Individual Leaderboard */}
            {users.length > 0 ? (
              <div className="space-y-4">
                {/* Top 3 Podium */}
                {users.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 0, 2].map((idx) => {
                      const user = users[idx];
                      const isCurrent = user.id === currentUserId;
                      const rankInfo = rankIcons[idx];
                      return (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx === 0 ? 0 : 0.2 }}
                          className={cn(
                            "card-double-bezel overflow-hidden",
                            idx === 0 && "order-2",
                            idx === 1 && "order-1",
                            idx === 2 && "order-3"
                          )}
                        >
                          <div className="rounded-2xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 text-center">
                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-3", rankInfo.bg)}>
                              <rankInfo.icon className={cn("h-7 w-7", rankInfo.color)} />
                            </div>
                            <p className="text-body-sm text-text-muted mb-1">#{idx + 1}</p>
                            <Avatar src={user.avatar} name={user.name} size="lg" className="mx-auto mb-3" />
                            <p className="font-bold text-foreground text-body-lg mb-1">{user.name}</p>
                            <p className="text-body-xs text-text-muted mb-3">
                              {user.team ? user.team.name : "No team"}
                            </p>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              <Zap className="h-4 w-4 text-brand-primary" />
                              <span className="font-bold text-brand-primary">{formatNumber(user.xp)} XP</span>
                            </div>
                            <Badge variant="primary" size="sm">Level {user.level}</Badge>
                            {isCurrent && (
                              <Badge variant="secondary" size="sm" className="mt-2">You</Badge>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Full Rankings Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full" role="table">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Rank</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">User</th>
                            <th className="text-center px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden md:table-cell">Level</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden lg:table-cell">Team</th>
                            <th className="text-right px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">XP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => {
                            const isCurrent = user.id === currentUserId;
                            return (
                              <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className={cn(
                                  "border-b border-border/20 transition-colors hover:bg-surface-elevated/30",
                                  isCurrent && "bg-brand-primary/5"
                                )}
                              >
                                <td className="px-6 py-4">
                                  <span className={cn(
                                    "text-body-sm font-bold",
                                    index === 0 && "text-yellow-400",
                                    index === 1 && "text-gray-300",
                                    index === 2 && "text-amber-600",
                                    index > 2 && "text-text-muted"
                                  )}>
                                    #{index + 1}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar src={user.avatar} name={user.name} size="md" />
                                    <div>
                                      <p className="font-semibold text-foreground text-body-sm">{user.name}</p>
                                      {isCurrent && <Badge variant="primary" size="sm">You</Badge>}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-center hidden md:table-cell">
                                  <Badge variant="primary" size="sm">
                                    <Star className="h-3 w-3" />
                                    Level {user.level}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                  {user.team ? (
                                    <span className="text-body-sm text-text-secondary">{user.team.name}</span>
                                  ) : (
                                    <span className="text-body-sm text-text-muted">--</span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <span className="font-bold text-foreground">{formatNumber(user.xp)}</span>
                                  <span className="text-body-xs text-text-muted ml-1">XP</span>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <p className="text-body text-text-muted">No users registered yet</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
