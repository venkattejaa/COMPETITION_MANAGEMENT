"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Loader2, Bot, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, getThemeColor } from "@/lib/utils";

interface Theme {
  id: string;
  code: string;
  name: string;
  tagline: string;
  mode: string;
  difficulty: string;
}

interface Team {
  id: string;
  name: string;
  code: string;
  preferredTheme1: string | null;
  preferredTheme2: string | null;
  assignedTheme: string | null;
}

interface PreferencesClientProps {
  themes: Theme[];
  userTeam: Team | null;
  isTeamLeader: boolean;
}

export function PreferencesClient({ themes, userTeam, isTeamLeader }: PreferencesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPref1 = searchParams.get("theme") || userTeam?.preferredTheme1 || "LQ";
  const initialPref2 = userTeam?.preferredTheme2 || (initialPref1 === "KD" ? "LQ" : "KD");

  const [pref1, setPref1] = useState<string>(initialPref1);
  const [pref2, setPref2] = useState<string>(initialPref2);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pref1 === pref2) {
      setErrorMsg("Preference 1 and Preference 2 must be different themes.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/teams/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferredTheme1: pref1, preferredTheme2: pref2 }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit preferences");
      }

      setSuccessMsg("Theme preferences successfully saved for your team!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Link href="/themes">
          <Button variant="secondary" size="icon" className="rounded-2xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Task 0: Theme Selection
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mt-0.5">
            Select 2 theme preferences for Team {userTeam?.code || "Unassigned"}
          </p>
        </div>
      </motion.div>

      {!userTeam ? (
        <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-8 text-center space-y-4">
          <ShieldAlert className="h-12 w-12 mx-auto text-amber-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Team Required</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
            You must be a member or leader of an eYRC team to select theme preferences for Task 0.
          </p>
          <Link href="/teams">
            <Button className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold">
              Join or Create Team
            </Button>
          </Link>
        </div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Preference 1 */}
          <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-[#F05438] text-white text-xs font-black flex items-center justify-center">1</span>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                First Preference (Primary Choice)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.map((theme) => {
                const color = getThemeColor(theme.code);
                const isSelected = pref1 === theme.code;
                return (
                  <div
                    key={`p1-${theme.code}`}
                    onClick={() => setPref1(theme.code)}
                    className={cn(
                      "cursor-pointer rounded-2xl p-4 border transition-all relative",
                      isSelected
                        ? "bg-[#F05438]/10 border-[#F05438] shadow-md"
                        : "bg-slate-50/50 dark:bg-zinc-900/50 border-slate-200/60 dark:border-zinc-800/60 hover:border-slate-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
                        {theme.code}
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#F05438]" />}
                    </div>
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm">{theme.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1">{theme.tagline}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preference 2 */}
          <div className="rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-slate-700 text-white text-xs font-black flex items-center justify-center">2</span>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Second Preference (Alternative Choice)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.map((theme) => {
                const color = getThemeColor(theme.code);
                const isSelected = pref2 === theme.code;
                const isDisabled = pref1 === theme.code;
                return (
                  <div
                    key={`p2-${theme.code}`}
                    onClick={() => !isDisabled && setPref2(theme.code)}
                    className={cn(
                      "rounded-2xl p-4 border transition-all relative",
                      isDisabled ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-zinc-900/20 border-transparent" :
                      isSelected ? "bg-slate-900 text-white dark:bg-zinc-800 border-slate-900 dark:border-zinc-700 shadow-md cursor-pointer" :
                      "bg-slate-50/50 dark:bg-zinc-900/50 border-slate-200/60 dark:border-zinc-800/60 hover:border-slate-300 dark:hover:border-zinc-700 cursor-pointer"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
                        {theme.code}
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                    </div>
                    <p className={cn("font-extrabold text-sm", isSelected ? "text-white" : "text-slate-900 dark:text-white")}>{theme.name}</p>
                    <p className={cn("text-[11px] line-clamp-2 mt-1", isSelected ? "text-slate-300" : "text-slate-500 dark:text-zinc-400")}>{theme.tagline}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs font-bold text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="text-xs font-bold text-emerald-500 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
              {successMsg}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/dashboard">
              <Button type="button" variant="secondary" className="rounded-2xl text-xs font-bold">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-[#F05438] text-white hover:bg-[#D94328] rounded-2xl text-xs font-bold px-6"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Theme Preferences"}
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
