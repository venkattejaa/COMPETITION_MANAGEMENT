"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
  members: { id: string; name: string; avatar: string | null; xp: number; level: number; streakDays: number; githubUrl: string | null; linkedinUrl: string | null; skills: string[] }[];
  tasks: { id: string; title: string; description: string | null; stage: string; taskNumber: string; status: string; maxXp: number; deadline: string | null; submissionUrl: string | null }[];
}

interface TeamDetailClientProps {
  team: Team;
  isMember: boolean;
  isLeader: boolean;
  currentUserId: string;
}

export function TeamDetailClient({ team, isMember, isLeader, currentUserId }: TeamDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "members" | "settings">("overview");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-4"
      >
        <div>
          <h1>{team.name}</h1>
        </div>
      </motion.div>
    </div>
  );
}