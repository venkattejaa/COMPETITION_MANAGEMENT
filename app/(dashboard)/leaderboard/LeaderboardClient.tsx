"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function LeaderboardClient({ teams, users, currentUserId }: LeaderboardClientProps) {
  const [activeTab, setActiveTab] = useState<"teams" | "individuals">("teams");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1>Leaderboard</h1>
          <p>Top performers across all eYRC themes</p>
        </div>
      </motion.div>
    </div>
  );
}