"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatRelativeTime, formatNumber, getXpForNextLevel } from "@/lib/utils";
import {
  User, Settings, Trophy, Flame, Zap, Award, Calendar, CheckCircle, Loader2, X,
  Edit2, Camera, Github, Linkedin, Mail, MapPin, BookOpen, MessageSquare, Code,
  Star, Users, ExternalLink, AlertCircle, Upload, Image as ImageIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";

interface UserProfile {
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
  user: UserProfile;
  isOwnProfile: boolean;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
];

export function ProfileClient({ user, isOwnProfile }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "activity" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState(user.avatar || "");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    avatar: user.avatar || "",
    year: user.year?.toString() || "",
    branch: user.branch || "",
    githubUrl: user.githubUrl || "",
    linkedinUrl: user.linkedinUrl || "",
    skills: user.skills.join(", "),
  });

  const { progress } = getXpForNextLevel(user.xp);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCustomAvatarUrl(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = async (selectedAvatar: string) => {
    setIsUploading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: selectedAvatar }),
      });
      if (res.ok) {
        setShowAvatarModal(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to update avatar", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          avatar: formData.avatar || null,
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
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Profile Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-shrink-0 mx-auto md:mx-0">
            <Avatar src={user.avatar} name={user.name} size="xl" className="h-24 w-24 border-2 border-[#F05438]/40" />
            {isOwnProfile && (
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#F05438] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{user.name}</h1>
              <Badge variant="primary" className="bg-[#F05438] text-white text-xs">{user.role}</Badge>
              <Badge variant="accent" className="text-xs">Level {user.level}</Badge>
              {user.team && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                  {user.team.code}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-400 flex-wrap">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </span>
              {user.year && <span>Year {user.year}</span>}
              {user.branch && <span>• {user.branch}</span>}
            </div>

            {isOwnProfile && !isEditing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="rounded-2xl text-xs font-bold border border-slate-200 dark:border-zinc-800"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 md:w-64 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-zinc-800">
            <div className="text-center md:text-right">
              <div className="text-2xl font-black text-[#F05438]">{formatNumber(user.xp)} XP</div>
              <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Total Points</div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-zinc-400 font-semibold">Level Progress</span>
                <span className="font-bold text-[#F05438]">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#F05438] rounded-full" style={{ width: `${Math.min(100, progress)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isOwnProfile && isEditing && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 pt-6 border-t border-slate-100 dark:border-zinc-800">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Profile Picture URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.png"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Year</label>
                <input
                  type="number"
                  min={1}
                  max={4}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Skills</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Python, ROS2, C++"
                  className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" type="button" onClick={() => setIsEditing(false)} className="rounded-2xl text-xs font-bold">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold">
                Save Profile
              </Button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-zinc-800 pb-2">
        {["overview", "achievements", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-4 py-2 rounded-2xl text-xs font-bold transition-colors capitalize",
              activeTab === tab
                ? "bg-[#F05438] text-white"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {user.team && (
            <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-6 space-y-4 shadow-sm">
              <h3 className="font-black text-slate-900 dark:text-white text-base">Your Team: {user.team.name}</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900">
                  <p className="text-lg font-black text-[#F05438]">{user.team.totalXp} XP</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Team XP</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900">
                  <p className="text-lg font-black text-emerald-500">{user.team.progressPercent}%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Progress</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900">
                  <p className="text-lg font-black text-slate-900 dark:text-white">{user.team.members.length}/4</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Members</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-6 space-y-3 shadow-sm">
            <h3 className="font-black text-slate-900 dark:text-white text-sm">Skills</h3>
            {user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {user.skills.map((skill) => (
                  <span key={skill} className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No skills added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Picture Uploader Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Change Profile Picture</h2>
                <button onClick={() => setShowAvatarModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Upload File */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300">Upload Image File</label>
                <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 hover:border-[#F05438] cursor-pointer transition-colors bg-slate-50/50 dark:bg-zinc-900/50">
                  <Upload className="h-6 w-6 text-[#F05438] mb-2" />
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">Click to choose image file</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP up to 2MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>

              {/* Preset Avatars */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300">Or Select a Preset Avatar</label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {PRESET_AVATARS.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Preset"
                      onClick={() => setCustomAvatarUrl(url)}
                      className={cn(
                        "h-12 w-12 rounded-full object-cover cursor-pointer border-2 transition-all flex-shrink-0",
                        customAvatarUrl === url ? "border-[#F05438] scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Custom Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#F05438]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" onClick={() => setShowAvatarModal(false)} className="rounded-2xl text-xs font-bold">
                  Cancel
                </Button>
                <Button
                  disabled={!customAvatarUrl || isUploading}
                  onClick={() => handleSaveAvatar(customAvatarUrl)}
                  className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold"
                >
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Avatar"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}