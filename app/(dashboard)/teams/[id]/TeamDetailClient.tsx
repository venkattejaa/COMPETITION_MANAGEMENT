"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Users, Target, CheckCircle, Clock, AlertCircle, BookOpen, Github, Linkedin,
  Settings, Edit, Trash2, Plus, ChevronDown, ChevronUp, Copy, ExternalLink,
  Shield, Zap, Trophy, Bot, Code, ChevronRight, Mail, X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge, Tag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { cn, getThemeColor, formatDate, formatRelativeTime, getInitials, getDifficultyColor } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  avatar: string | null;
  xp: number;
  level: number;
  streakDays: number;
  githubUrl: string | null;
  linkedinUrl: string | null;
  skills: string[];
  lastActive: string;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  stage: string;
  taskNumber: string;
  status: string;
  maxXp: number;
  deadline: string | null;
  submissionUrl: string | null;
  submittedAt: string | null;
  completedAt: string | null;
}

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
  preferredTheme1: string | null;
  preferredTheme2: string | null;
  members: TeamMember[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

interface TeamDetailClientProps {
  team: Team;
  isMember: boolean;
  isLeader: boolean;
  currentUserId: string;
}

const stageLabels: Record<string, string> = {
  STAGE_1: "Stage 1",
  STAGE_2: "Stage 2",
  FINALE: "Finale",
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  NOT_STARTED: { label: "Not Started", color: "text-text-muted", icon: Clock },
  IN_PROGRESS: { label: "In Progress", color: "text-brand-accent", icon: Clock },
  SUBMITTED: { label: "Submitted", color: "text-brand-secondary", icon: AlertCircle },
  COMPLETED: { label: "Completed", color: "text-green-400", icon: CheckCircle },
  BLOCKED: { label: "Blocked", color: "text-brand-danger", icon: AlertCircle },
};

const tabs = [
  { id: "overview", label: "Overview", icon: Target },
  { id: "tasks", label: "Tasks", icon: BookOpen },
  { id: "members", label: "Members", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function TeamDetailClient({ team, isMember, isLeader, currentUserId }: TeamDetailClientProps) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]["id"]>("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeIn}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getThemeColor(team.assignedTheme || "LQ")}20` }}>
              <Bot className="h-8 w-8" style={{ color: getThemeColor(team.assignedTheme || "LQ") }} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-display-sm font-display font-bold text-foreground">{team.name}</h1>
                <Badge variant="outline" size="md">{team.code}</Badge>
              </div>
              <p className="text-body text-text-secondary">{team.description || "No description provided"}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-body-sm">
                <span className="flex items-center gap-1 text-text-muted">
                  <Users className="h-4 w-4" />
                  {team.members.length} members
                </span>
                <span className="flex items-center gap-1 text-text-muted">
                  <Zap className="h-4 w-4" />
                  {team.totalXp.toLocaleString()} XP
                </span>
                <span className="flex items-center gap-1 text-text-muted">
                  <Trophy className="h-4 w-4" />
                  {team.progressPercent}% progress
                </span>
              </div>
            </div>
          </div>
          {isMember && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(team.code)}>
                <Copy className="h-4 w-4" />
                Copy Code
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div {...fadeIn}>
        <div className="flex gap-1 p-1 rounded-2xl bg-surface-elevated/50 border border-border/50 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-body-sm font-medium whitespace-nowrap transition-all duration-300",
                activeTab === tab.id
                  ? "bg-brand-primary text-white shadow-brand"
                  : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress & Stage */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-brand-primary" />
                    Competition Progress
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-body-sm mb-2">
                        <span className="text-text-secondary">Overall Progress</span>
                        <span className="font-bold text-foreground">{team.progressPercent}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-surface-elevated overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: `${team.progressPercent}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-border/30">
                      <div>
                        <p className="text-display-sm font-display font-bold text-brand-primary">{stageLabels[team.currentStage] || team.currentStage}</p>
                        <p className="text-body-xs text-text-muted">Current Stage</p>
                      </div>
                      <div>
                        <p className="text-display-sm font-display font-bold text-brand-secondary">{team.currentTask}</p>
                        <p className="text-body-xs text-text-muted">Current Task</p>
                      </div>
                      <div>
                        <p className="text-display-sm font-display font-bold text-brand-accent">{team.members.length}</p>
                        <p className="text-body-xs text-text-muted">Team Size</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-secondary" />
                    Assigned Theme
                  </h3>
                  {team.assignedTheme ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated/30">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getThemeCode(team.assignedTheme)}20` }}>
                          <span className="text-xl font-bold" style={{ color: getThemeCode(team.assignedTheme) }}>{team.assignedTheme}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Assigned Theme</p>
                          <p className="text-body-sm text-text-muted">{team.assignedTheme}</p>
                        </div>
                      </div>
                      {team.preferredTheme1 && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-text-muted" />
                          <span className="text-body-sm text-text-secondary">Preferred: {team.preferredTheme1}</span>
                        </div>
                      )}
                      {team.preferredTheme2 && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-text-muted" />
                          <span className="text-body-sm text-text-secondary">Backup: {team.preferredTheme2}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-text-muted mx-auto mb-3" />
                      <p className="text-body text-text-muted mb-4">No theme assigned yet</p>
                      <Link href="/themes">
                        <Button variant="primary" size="sm">
                          <BookOpen className="h-4 w-4" />
                          Browse Themes
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Team Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-brand-accent" />
                    Team Statistics
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Total Team XP", value: team.totalXp.toLocaleString(), icon: Zap, color: "text-brand-primary" },
                      { label: "Tasks Completed", value: team.tasks.filter(t => t.status === "COMPLETED").length, icon: CheckCircle, color: "text-green-400" },
                      { label: "Tasks In Progress", value: team.tasks.filter(t => t.status === "IN_PROGRESS").length, icon: Clock, color: "text-brand-accent" },
                      { label: "Tasks Pending", value: team.tasks.filter(t => t.status === "NOT_STARTED").length, icon: Clock, color: "text-text-muted" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-surface-elevated/30">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                            <stat.icon className={cn("h-5 w-5", stat.color)} />
                          </div>
                          <span className="text-body-sm text-text-secondary">{stat.label}</span>
                        </div>
                        <span className="font-bold text-foreground text-body-lg">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-brand-secondary" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Link href={`/themes/${team.assignedTheme?.toLowerCase() || "lq"}`} className="block">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-brand-primary/15 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-brand-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-body-sm">View Theme Roadmap</p>
                          <p className="text-body-xs text-text-muted">Check milestones & resources</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </div>
                    </Link>
                    <Link href="/forum" className="block">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-brand-secondary/15 flex items-center justify-center">
                          <Code className="h-5 w-5 text-brand-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-body-sm">Team Forum</p>
                          <p className="text-body-xs text-text-muted">Ask questions, share progress</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </div>
                    </Link>
                    <Link href="/leaderboard" className="block">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-brand-accent/15 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-brand-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-body-sm">Leaderboard</p>
                          <p className="text-body-xs text-text-muted">See how you rank</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "tasks" && (
          <motion.div key="tasks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-heading-sm font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-brand-primary" />
                    Team Tasks
                  </h3>
                  <Badge variant="outline" size="sm">
                    {team.tasks.filter(t => t.status === "COMPLETED").length} of {team.tasks.length} completed
                  </Badge>
                </div>
                {team.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {team.tasks.map((task, i) => {
                      const sc = statusConfig[task.status] || statusConfig.NOT_STARTED;
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="group flex items-start gap-4 p-4 rounded-xl bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors"
                        >
                          <div className={cn("flex-shrink-0 mt-1", sc.color)}>
                            <sc.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-foreground text-body-sm">{task.title}</p>
                              <Badge
                                variant={task.status === "COMPLETED" ? "primary" : task.status === "IN_PROGRESS" ? "accent" : task.status === "SUBMITTED" ? "secondary" : "outline"}
                                size="sm"
                              >
                                {sc.label}
                              </Badge>
                              <Tag variant="default">{task.taskNumber}</Tag>
                              <Tag variant="default">{task.stage.replace("_", " ")}</Tag>
                            </div>
                            {task.description && (
                              <p className="text-body-sm text-text-muted mb-2 line-clamp-2">{task.description}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-2 text-body-xs text-text-muted">
                              {task.deadline && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Due: {formatDate(task.deadline)}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {task.maxXp} XP
                              </span>
                            </div>
                          </div>
                          {task.submissionUrl && (
                            <a
                              href={task.submissionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 p-2 rounded-xl bg-brand-primary/15 text-brand-primary hover:bg-brand-primary/25 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-text-muted mx-auto mb-4" />
                    <p className="text-body text-text-muted mb-4">No tasks created yet</p>
                    <p className="text-body-sm text-text-muted">Tasks will appear here as your team progresses through the competition stages.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "members" && (
          <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <div className="space-y-6">
              {/* Members Grid */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-heading-sm font-semibold text-foreground flex items-center gap-2">
                      <Users className="h-5 w-5 text-brand-primary" />
                      Team Members
                    </h3>
                    <Badge variant="outline" size="sm">
                      {team.members.length} members
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {team.members.map((member, i) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors"
                      >
                        <Avatar src={member.avatar} name={member.name} size="lg" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground text-body-sm">{member.name}</p>
                            {member.id === team.members[0]?.id && (
                              <Badge variant="primary" size="sm">Leader</Badge>
                            )}
                            {member.id === currentUserId && (
                              <Badge variant="secondary" size="sm">You</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-body-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {member.xp.toLocaleString()} XP
                            </span>
                            <Badge variant="primary" size="sm">Level {member.level}</Badge>
                            <span className="flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              {member.streakDays}d streak
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {member.githubUrl && (
                            <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-surface-elevated hover:bg-brand-primary/15 transition-colors text-text-muted hover:text-brand-primary">
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {member.linkedinUrl && (
                            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-surface-elevated hover:bg-brand-secondary/15 transition-colors text-text-muted hover:text-brand-secondary">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Overview */}
              {team.members.some(m => m.skills.length > 0) && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-brand-secondary" />
                      Team Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(team.members.flatMap(m => m.skills))).map((skill) => (
                        <Tag key={skill} variant="primary">{skill}</Tag>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <div className="space-y-6">
              {isLeader ? (
                <>
                  {/* Team Info */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Edit className="h-5 w-5 text-brand-primary" />
                        Team Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label-base">Team Name</label>
                          <input type="text" defaultValue={team.name} className="input-base" />
                        </div>
                        <div>
                          <label className="label-base">Team Code</label>
                          <input type="text" defaultValue={team.code} className="input-base" disabled />
                          <p className="text-body-xs text-text-muted mt-1">Team code cannot be changed</p>
                        </div>
                        <div>
                          <label className="label-base">Description</label>
                          <textarea defaultValue={team.description || ""} rows={3} className="input-base" />
                        </div>
                        <div className="flex justify-end">
                          <Button variant="primary">
                            <Edit className="h-4 w-4" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Theme Preferences */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-heading-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-brand-secondary" />
                        Theme Preferences
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label-base">Preferred Theme 1</label>
                          <select className="input-base" defaultValue={team.preferredTheme1 || ""}>
                            <option value="">Select theme</option>
                            <option value="LQ">Logic Quest (LQ)</option>
                            <option value="KD">Khoj-o-Drone (KD)</option>
                            <option value="SC">Strata Cobot (SC)</option>
                            <option value="HE">Hola The Explorer (HE)</option>
                            <option value="NV">Niti Vahan (NV)</option>
                            <option value="EB">Echo Balancer (EB)</option>
                            <option value="PB">PacBot (PB)</option>
                          </select>
                        </div>
                        <div>
                          <label className="label-base">Preferred Theme 2</label>
                          <select className="input-base" defaultValue={team.preferredTheme2 || ""}>
                            <option value="">Select theme</option>
                            <option value="LQ">Logic Quest (LQ)</option>
                            <option value="KD">Khoj-o-Drone (KD)</option>
                            <option value="SC">Strata Cobot (SC)</option>
                            <option value="HE">Hola The Explorer (HE)</option>
                            <option value="NV">Niti Vahan (NV)</option>
                            <option value="EB">Echo Balancer (EB)</option>
                            <option value="PB">PacBot (PB)</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="primary">
                            <Target className="h-4 w-4" />
                            Update Preferences
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card variant="elevated" className="border-brand-danger/30">
                    <CardContent className="p-6">
                      <h3 className="text-heading-sm font-semibold text-brand-danger mb-4 flex items-center gap-2">
                        <Trash2 className="h-5 w-5" />
                        Danger Zone
                      </h3>
                      <p className="text-body-sm text-text-muted mb-4">These actions are irreversible. Proceed with caution.</p>
                      <div className="flex items-center gap-4">
                        <Button variant="danger" size="sm">
                          <Trash2 className="h-4 w-4" />
                          Leave Team
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <h3 className="text-heading-sm font-semibold text-foreground mb-2">Limited Access</h3>
                  <p className="text-body text-text-muted mb-6">
                    Only team leaders can modify team settings. Contact your team leader for changes.
                  </p>
                  <Link href={`/teams/${team.id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                      Back to Overview
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getThemeCode(themeCode: string): string {
  const colors: Record<string, string> = {
    LQ: "#6366F1",
    KD: "#10B981",
    SC: "#F59E0B",
    HE: "#EF4444",
    NV: "#8B5CF6",
    EB: "#EC4899",
    PB: "#06B6D4",
  };
  return colors[themeCode] || "#6366F1";
}