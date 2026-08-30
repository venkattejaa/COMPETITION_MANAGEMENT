"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatRelativeTime, formatNumber, getXpForNextLevel } from "@/lib/utils";
import { User, Settings, Trophy, Flame, Zap, Award, Calendar, CheckCircle, Loader2, X, Edit2, Camera, Github, Linkedin, Mail, MapPin, BookOpen, MessageSquare, Code, Star, Users, ExternalLink, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  year: number | null;
  branch: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  skills: string[];
  xp: number;
  level: number;
  streakDays: number;
  lastActive: string;
  team: {
    id: string;
    name: string;
    code: string;
    totalXp: number;
    progressPercent: number;
    assignedTheme: string | null;
    members: { id: string; name: string; avatar: string | null; xp: number; level: number }[];
  } | null;
  achievements: { achievement: { id: string; code: string; name: string; description: string; icon: string; xpBonus: number }; earnedAt: string }[];
  forumPosts: { id: string; title: string; createdAt: string; _count: { answers: number } }[];
  xpLogs?: { amount: number; reason: string; createdAt: string }[];
}

interface ProfileClientProps {
  user: User;
  isOwnProfile: boolean;
}

const achievementIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  trophy: Trophy,
  flame: Flame,
  "graduation-cap": User,
  flag: BookOpen,
  moon: Award,
  users: MessageSquare,
  "book-open": BookOpen,
  code: Code,
  calendar: Calendar,
  "message-square": MessageSquare,
  sunrise: Award,
  star: Star,
};

export function ProfileClient({ user, isOwnProfile }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "activity" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    year: user.year?.toString() || "",
    branch: user.branch || "",
    githubUrl: user.githubUrl || "",
    linkedinUrl: user.linkedinUrl || "",
    skills: user.skills.join(", "),
  });

  const { current: currentThreshold, next: nextThreshold, progress } = getXpForNextLevel(user.xp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          year: formData.year ? parseInt(formData.year) : null,
          branch: formData.branch || null,
          githubUrl: formData.githubUrl || null,
          linkedinUrl: formData.linkedinUrl || null,
          skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="relative flex-shrink-0">
              <Avatar src={user.avatar} name={user.name} size="xl" />
              {isOwnProfile && isEditing && (
                <label className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-brand-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <Camera className="h-5 w-5 text-white" aria-hidden="true" />
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => console.log("Upload avatar", e.target.files?.[0])} />
                </label>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3 flex-wrap">
                <h1 className="text-display-sm font-display font-bold text-foreground">{formData.name || user.name}</h1>
                {isOwnProfile && isEditing && (
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap mb-4">
                <Badge variant="primary">{user.role}</Badge>
                <Badge variant="accent">Level {user.level}</Badge>
                {user.team && <Badge variant="secondary">{user.team.code}</Badge>}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-text-secondary flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {user.email}
                </span>
                {user.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Year {user.year}
                  </span>
                )}
                {user.branch && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {user.branch}
                  </span>
                )}
              </div>
              {isOwnProfile && !isEditing && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" aria-hidden="true" />
                  Edit Profile
                </Button>
              )}
            </div>
            <div className="flex flex-col items-center md:items-end gap-4 md:w-64">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-accent">{formatNumber(user.xp)}</div>
                <div className="text-sm text-text-muted">Total XP</div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Level {user.level} Progress</span>
                  <span className="text-sm font-bold text-brand-primary">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progress)}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary w-full border-t border-border/30 pt-4">
                <span className="flex items-center gap-1">
                  <Flame className="h-4 w-4" aria-hidden="true" />
                  {user.streakDays}d streak
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  {user.achievements.length} badges
                </span>
              </div>
            </div>
          </div>

          {isOwnProfile && isEditing && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Full Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <Input label="Email" value={user.email} disabled />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Input label="Year" name="year" type="number" min={1} max={4} value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
                <Input label="Branch" name="branch" value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} />
                <Input label="Skills (comma separated)" name="skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="GitHub URL" name="githubUrl" type="url" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/username" icon={Github} />
                <Input label="LinkedIn URL" name="linkedinUrl" type="url" value={formData.linkedinUrl} onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/username" icon={Linkedin} />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                <Button variant="secondary" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["overview", "achievements", "activity", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-spring whitespace-nowrap",
              activeTab === tab
                ? "bg-brand-primary/20 text-brand-primary"
                : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid lg:grid-cols-3 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-2 space-y-6"
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Stats Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total XP", value: formatNumber(user.xp), icon: Zap, color: "text-brand-accent" },
                    { label: "Level", value: user.level, icon: Trophy, color: "text-brand-primary" },
                    { label: "Streak", value: `${user.streakDays}d`, icon: Flame, color: "text-brand-secondary" },
                    { label: "Badges", value: user.achievements.length, icon: Award, color: "text-brand-accent" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-surface/50 border border-border/30">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stat.color.replace("text-", "bg-")}20` }}>
                        <stat.icon className="h-5 w-5" color={stat.color.replace("text-", "")} aria-hidden="true" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-text-muted">{stat.label}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {user.team && (
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                      Your Team: {user.team.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 rounded-xl bg-surface/50 border border-border/30">
                          <div className="text-2xl font-bold text-brand-accent">{user.team.totalXp} XP</div>
                          <div className="text-xs text-text-muted">Team XP</div>
                        </div>
                        <div className="p-4 rounded-xl bg-surface/50 border border-border/30">
                          <div className="text-2xl font-bold text-brand-secondary">{user.team.progressPercent}%</div>
                          <div className="text-xs text-text-muted">Progress</div>
                        </div>
                        <div className="p-4 rounded-xl bg-surface/50 border border-border/30">
                          <div className="text-2xl font-bold text-foreground">{user.team.members.length}/4</div>
                          <div className="text-xs text-text-muted">Members</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Team Members</h4>
                        <div className="flex flex-wrap gap-3">
                          {user.team.members.map((member) => (
                            <Link key={member.id} href={`/profile/${member.id}`} className="flex items-center gap-2 p-3 rounded-xl bg-surface/50 border border-border/30 hover:bg-surface-elevated/50 transition-colors">
                              <Avatar src={member.avatar} name={member.name} size="sm" />
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">{member.name}</p>
                                <p className="text-xs text-text-muted">Level {member.level} • {member.xp} XP</p>
                              </div>
                              {member.id === user.id && <Badge variant="primary" className="text-xs ml-auto">You</Badge>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!user.team && (
                <Card variant="elevated">
                  <CardContent className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
                    <h3 className="text-heading-sm font-semibold text-foreground mb-2">No Team Yet</h3>
                    <p className="text-text-secondary mb-4">Create or join a team to start your eYRC journey</p>
                    <div className="flex justify-center gap-3">
                      <Button asChild>
                        <a href="/teams">Create Team</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/teams">Join Team</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="space-y-6"
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-secondary text-center py-4">No skills added yet</p>
                  )}
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.githubUrl && (
                    <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border/30 hover:bg-surface-elevated/50 transition-colors group">
                      <div className="h-8 w-8 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                        <Github className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-brand-primary transition-colors">GitHub</p>
                        <p className="text-xs text-text-muted truncate">{user.githubUrl}</p>
                      </div>
                    </a>
                  )}
                  {user.linkedinUrl && (
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border/30 hover:bg-surface-elevated/50 transition-colors group">
                      <div className="h-8 w-8 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                        <Linkedin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-brand-primary transition-colors">LinkedIn</p>
                        <p className="text-xs text-text-muted truncate">{user.linkedinUrl}</p>
                      </div>
                    </a>
                  )}
                  {!user.githubUrl && !user.linkedinUrl && (
                    <p className="text-text-secondary text-center py-4">No links added yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.achievements.map((ua, index) => {
                const Icon = achievementIcons[ua.achievement.icon] || Trophy;
                return (
                  <motion.div
                    key={ua.achievement.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                    className="card-double-bezel"
                  >
                    <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-xl bg-brand-primary/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-7 w-7 text-brand-primary" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{ua.achievement.name}</h4>
                            <CheckCircle className="h-4 w-4 text-brand-secondary" aria-hidden="true" />
                          </div>
                          <p className="text-sm text-text-secondary mb-2">{ua.achievement.description}</p>
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <Badge variant="accent" className="text-xs">+{ua.achievement.xpBonus} XP</Badge>
                            <span>{formatRelativeTime(ua.earnedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {user.achievements.length === 0 && (
                <div className="col-span-full card-double-bezel text-center py-12">
                  <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8">
                    <Award className="h-16 w-16 mx-auto text-text-muted mb-4" aria-hidden="true" />
                    <h3 className="text-heading-sm font-semibold text-foreground mb-2">No Achievements Yet</h3>
                    <p className="text-text-secondary mb-4">Complete tasks, answer questions, and maintain streaks to unlock badges</p>
                    <Button asChild>
                      <a href="/forum">Start Participating</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-4"
          >
            {(user.xpLogs?.length ?? 0) > 0 && (
              <div className="space-y-3">
                <h3 className="text-heading-sm font-semibold text-foreground">XP History</h3>
                {(user.xpLogs || []).map((log, index) => (
                  <motion.div
                    key={log.createdAt}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/30"
                  >
                    <div className="h-10 w-10 rounded-xl bg-brand-primary/15 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{log.reason.replace("_", " ")}</p>
                      <p className="text-xs text-text-muted">{formatRelativeTime(log.createdAt)}</p>
                    </div>
                    <Badge variant="accent" className="font-bold">+{log.amount} XP</Badge>
                  </motion.div>
                ))}
              </div>
            )}
            {user.forumPosts.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-heading-sm font-semibold text-foreground">Recent Forum Posts</h3>
                {user.forumPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/30"
                  >
                    <div className="h-10 w-10 rounded-xl bg-brand-secondary/15 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-brand-secondary" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{post.title}</p>
                      <p className="text-xs text-text-muted">{formatRelativeTime(post.createdAt)} • {post._count.answers} answers</p>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/forum/${post.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
            {(user.xpLogs?.length ?? 0) === 0 && user.forumPosts.length === 0 && (
              <div className="card-double-bezel text-center py-12">
                <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8">
                  <BookOpen className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
                  <h3 className="text-heading-sm font-semibold text-foreground mb-2">No Activity Yet</h3>
                  <p className="text-text-secondary">Your activity will appear here as you participate</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "settings" && isOwnProfile && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6 max-w-2xl"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Task deadline reminders", description: "Get notified 72h, 24h, and 4h before deadlines" },
                      { label: "Forum replies", description: "Notifications when someone replies to your posts" },
                      { label: "Best answer alerts", description: "When your answer is marked as best" },
                      { label: "Achievement unlocks", description: "Celebrate your badge earnings" },
                      { label: "Weekly digest", description: "Summary of your week's progress every Monday" },
                    ].map((item) => (
                      <label key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-surface/50 border border-border/30 cursor-pointer">
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-text-muted">{item.description}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-border text-brand-primary focus:ring-brand-primary" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border/30 pt-6">
                  <h4 className="font-medium text-foreground mb-3">Theme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["dark", "light", "system"].map((theme) => (
                      <button key={theme} className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300 ease-spring",
                        theme === "dark" ? "border-brand-primary bg-brand-primary/10" : "border-border hover:border-brand-primary/50"
                      )}>
                        <span className="text-sm font-medium text-foreground capitalize">{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated" className="border-brand-danger/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-danger">
                  <AlertCircle className="h-5 w-5" aria-hidden="true" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-brand-danger/10 border border-brand-danger/30">
                  <div>
                    <p className="font-medium text-brand-danger">Leave Team</p>
                    <p className="text-xs text-text-muted">You will be removed from your current team</p>
                  </div>
                  <Button variant="danger" size="sm">Leave Team</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}