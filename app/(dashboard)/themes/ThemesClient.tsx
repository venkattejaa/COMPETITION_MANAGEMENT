"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, getThemeColor, getDifficultyColor } from "@/lib/utils";
import {
  Bot, ArrowRight, Target, BookOpen, Zap, Shield, ChevronDown, ChevronUp,
  ExternalLink, Layers, Cpu, Award
} from "lucide-react";
import { Badge, Tag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Theme {
  code: string;
  name: string;
  tagline: string;
  description: string;
  difficulty: string;
  years: number[];
  mode: string;
  techStack: string[];
  objectives: { id: string; title: string; description: string; order: number }[];
  roadmaps: { id: string; title: string; description: string | null; weekNumber: number; estimatedHours: number }[];
  resources: { id: string; title: string; type: string; url: string | null }[];
}

interface ThemesClientProps {
  themes: Theme[];
}

const difficultyLabels = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

export function ThemesClient({ themes }: ThemesClientProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleThemeClick = (code: string) => {
    setSelectedTheme(selectedTheme === code ? null : code);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot className="h-5 w-5 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">eYRC 2026-27</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Competition Themes</h1>
          <p className="text-slate-400 text-sm mt-1">Explore all 7 robotics themes, objectives, and week-by-week roadmaps.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              viewMode === "grid" ? "bg-blue-500 text-white shadow-md" : "text-slate-400 hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              viewMode === "list" ? "bg-blue-500 text-white shadow-md" : "text-slate-400 hover:text-white"
            )}
          >
            <Cpu className="w-3.5 h-3.5" />
            Table
          </button>
        </div>
      </div>

      {/* Grid View (Mobile First & Default) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map((theme, index) => {
            const themeColor = getThemeColor(theme.code);
            const isExpanded = selectedTheme === theme.code;

            return (
              <motion.div
                key={theme.code}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col"
              >
                <div
                  className={cn(
                    "rounded-2xl border bg-slate-800/40 backdrop-blur-sm p-6 flex flex-col justify-between h-full transition-all duration-300 hover:bg-slate-800/70 hover:shadow-xl",
                    isExpanded ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-700/50 hover:border-slate-600"
                  )}
                >
                  <div>
                    {/* Badge & Code */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center font-extrabold text-xl shadow-inner"
                        style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                      >
                        {theme.code}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold px-2.5 py-0.5"
                        style={{ borderColor: getDifficultyColor(theme.difficulty), color: getDifficultyColor(theme.difficulty) }}
                      >
                        {difficultyLabels[theme.difficulty as keyof typeof difficultyLabels]}
                      </Badge>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-extrabold text-white text-xl mb-1.5">{theme.name}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">{theme.tagline}</p>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/60 border border-slate-700/50 text-slate-300 font-medium">
                        {theme.mode}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/60 border border-slate-700/50 text-slate-300 font-medium">
                        Eligible: Year {theme.years.join(", ")}
                      </span>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-1">
                        {theme.techStack.map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-700/40 mt-auto">
                    <Link
                      href={`/themes/${theme.code}`}
                      className="flex-1 py-2 rounded-xl bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20"
                    >
                      Explore Theme
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleThemeClick(theme.code)}
                      className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/40 text-slate-300 text-xs font-semibold hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      {isExpanded ? "Hide" : "Preview"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* List / Table View (Desktop & Responsive Table) */}
      {viewMode === "list" && (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="border-b border-slate-700/60 bg-slate-900/40">
                  <th className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Theme</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Tech Stack</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Difficulty</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center hidden sm:table-cell">Mode</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {themes.map((theme) => {
                  const themeColor = getThemeColor(theme.code);
                  return (
                    <tr key={theme.code} className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
                            {theme.code}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{theme.name}</p>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{theme.tagline}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {theme.techStack.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded border" style={{ borderColor: getDifficultyColor(theme.difficulty), color: getDifficultyColor(theme.difficulty) }}>
                          {difficultyLabels[theme.difficulty as keyof typeof difficultyLabels]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center hidden sm:table-cell">
                        <span className="text-xs text-slate-300">{theme.mode}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/themes/${theme.code}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300"
                        >
                          Details <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expanded Theme Preview Drawer */}
      <AnimatePresence>
        {selectedTheme && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-2xl border border-blue-500/40 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            {themes
              .filter((t) => t.code === selectedTheme)
              .map((theme) => (
                <div key={theme.code} className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Quick Preview</span>
                      <h2 className="text-2xl font-extrabold text-white">{theme.name}</h2>
                    </div>
                    <Link
                      href={`/themes/${theme.code}`}
                      className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold text-xs flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25"
                    >
                      Open Full Roadmap & Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">{theme.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Objectives */}
                    <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700/50">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-blue-400" />
                        Mission Objectives ({theme.objectives.length})
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {theme.objectives.map((obj, i) => (
                          <li key={obj.id} className="flex items-start gap-2">
                            <span className="h-4 w-4 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{obj.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learning Roadmap */}
                    <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700/50">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        Roadmap Overview ({theme.roadmaps.length} Weeks)
                      </h4>
                      <div className="space-y-2 text-xs text-slate-300 max-h-48 overflow-y-auto">
                        {theme.roadmaps.map((week) => (
                          <div key={week.id} className="flex justify-between items-center bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/40">
                            <span className="font-semibold text-white">W{week.weekNumber}: {week.title}</span>
                            <span className="text-[10px] text-slate-400">{week.estimatedHours}h</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemesClient;