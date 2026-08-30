"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function DashboardClient({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1>Welcome back, {user.name?.split(" ")[0]}</h1>
          <p>Here's your eYRC journey progress</p>
        </div>
      </motion.div>
    </div>
  );
}