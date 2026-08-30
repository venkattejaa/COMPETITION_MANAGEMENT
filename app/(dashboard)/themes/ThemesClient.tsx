"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, getThemeColor, getDifficultyColor } from "@/lib/utils";
import { Bot, ArrowRight, Target, Users, BookOpen, Clock, Zap, Shield, CheckCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-foreground">eYRC 2026-27 Themes</h1>
          <p className="text-body text-text-secondary mt-1">Explore all 7 competition themes and find your perfect match</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode("grid")} aria-pressed={viewMode === "grid"}>
            <div className="h-5 w-5 grid grid-cols-2 gap-1" aria-hidden="true">
              <div className="bg-brand-primary/20 rounded" />
              <div className="bg-brand-primary/20 rounded" />
              <div className="bg-brand-primary/20 rounded" />
              <div className="bg-brand-primary/20 rounded" />
            </div>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode("list")} aria-pressed={viewMode === "list"}>
            <div className="h-5 w-5 flex flex-col gap-1" aria-hidden="true">
              <div className="h-1 bg-brand-primary/20 rounded w-full" />
              <div className="h-1 bg-brand-primary/20 rounded w-full" />
              <div className="h-1 bg-brand-primary/20 rounded w-full" />
            </div>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="card-double-bezel overflow-hidden"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Theme</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden md:table-cell">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden lg:table-cell">Tech Stack</th>
                  <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Difficulty</th>
                  <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted hidden sm:table-cell">Years</th>
                  <th className="text-center px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Mode</th>
                  <th className="text-right px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Action</th>
                </tr>
              </thead>
              <tbody>
                {themes.map((theme, index) => (
                  <motion.tr
                    key={theme.code}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                    className={cn("border-b border-border/20 transition-colors", selectedTheme === theme.code && "bg-brand-primary/5")}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getThemeColor(theme.code)}20` }}>
                          <span className="text-xl font-bold" style={{ color: getThemeColor(theme.code) }}>{theme.code}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{theme.name}</p>
                          <p className="text-sm text-text-muted">{theme.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <p className="text-sm text-text-secondary max-w-xs truncate">{theme.description}</p>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {theme.techStack.slice(0, 4).map((tech) => (
                          <Tag key={tech} variant="default" className="text-[0.55rem]">{tech}</Tag>
                        ))}
                        {theme.techStack.length > 4 && (
                          <Tag variant="default" className="text-[0.55rem]">+{theme.techStack.length - 4} more</Tag>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="outline" className="text-xs" style={{ borderColor: getDifficultyColor(theme.difficulty), color: getDifficultyColor(theme.difficulty) }}>
                        {difficultyLabels[theme.difficulty as keyof typeof difficultyLabels]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <span className="text-sm text-text-secondary">{theme.years.join(", ")}<sup className="text-xs">th</sup> Year</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="outline" className="text-xs">{theme.mode}</Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button size="sm" variant={selectedTheme === theme.code ? "primary" : "outline"} onClick={() => handleThemeClick(theme.code)}>
                        {selectedTheme === theme.code ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                            Collapse
                          </>
                        ) : (
                          <>
                            Details
                            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        )}
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedTheme && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            {themes.map((theme) =>
              theme.code === selectedTheme && (
                <motion.div
                  key={theme.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="card-double-bezel">
                    <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getThemeColor(theme.code)}20` }}>
                            <span className="text-2xl font-bold" style={{ color: getThemeColor(theme.code) }}>{theme.code}</span>
                          </div>
                          <div>
                            <h2 className="text-display-sm font-display font-bold text-foreground">{theme.name}</h2>
                            <p className="text-body text-text-secondary mt-1">{theme.tagline}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                              <Badge variant="outline" style={{ borderColor: getDifficultyColor(theme.difficulty), color: getDifficultyColor(theme.difficulty) }}>
                                {difficultyLabels[theme.difficulty as keyof typeof difficultyLabels]}
                              </Badge>
                              <Badge variant="outline">{theme.mode}</Badge>
                              <Badge variant="outline">{theme.years.join(", ")}<sup>th</sup> Year Eligible</Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="lg" asChild className="md:w-auto">
                          <Link href={`/themes/${theme.code}`}>
                            View Full Details
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </Button>
                      </div>

                      <div className="prose max-w-none">
                        <p className="text-body text-text-secondary">{theme.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="card-double-bezel">
                      <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          <h3 className="text-heading-sm font-semibold text-foreground">Mission Objectives</h3>
                        </div>
                        <ol className="space-y-3">
                          {theme.objectives.map((obj, i) => (
                            <li key={obj.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border/30">
                              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary text-sm font-bold">{i + 1}</span>
                              <div>
                                <p className="font-medium text-foreground">{obj.title}</p>
                                <p className="text-sm text-text-secondary">{obj.description}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="card-double-bezel">
                      <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="h-5 w-5 text-brand-secondary" aria-hidden="true" />
                          <h3 className="text-heading-sm font-semibold text-foreground">Learning Roadmap</h3>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {theme.roadmaps.map((week) => (
                            <div key={week.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border/30">
                              <div className="flex-shrink-0 w-14 text-center">
                                <div className="h-7 w-7 rounded-full bg-brand-secondary/15 flex items-center justify-center mx-auto mb-1 text-brand-secondary font-bold text-sm">W{week.weekNumber}</div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">{week.title}</p>
                                <p className="text-sm text-text-secondary">{week.description}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">{week.estimatedHours}h</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-double-bezel">
                    <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                          <h3 className="text-heading-sm font-semibold text-foreground">Tech Stack</h3>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/themes/${theme.code}/resources`}>
                            View All Resources
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {theme.techStack.map((tech) => (
                          <Tag key={tech} variant="primary">{tech}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card-double-bezel">
                    <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-brand-secondary" aria-hidden="true" />
                          <h3 className="text-heading-sm font-semibold text-foreground">Curated Resources</h3>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/themes/${theme.code}/resources`}>
                            Browse All
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {theme.resources.slice(0, 6).map((resource) => (
                          <Link key={resource.id} href={resource.url || `#`} className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border/30 hover:bg-surface-elevated/50 hover:border-brand-primary/50 transition-all duration-300 ease-spring group" target={resource.url ? "_blank" : undefined} rel={resource.url ? "noopener noreferrer" : undefined}>
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getThemeColor(theme.code)}20` }}>
                              <ExternalLink className="h-4 w-4" color={getThemeColor(theme.code)} aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground group-hover:text-brand-primary transition-colors truncate">{resource.title}</p>
                              <p className="text-xs text-text-muted capitalize">{resource.type.toLowerCase()}</p>
                            </div>
                          </Link>
                        ))}
                        {theme.resources.length > 6 && (
                          <Link href={`/themes/${theme.code}/resources`} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface/50 border border-border/30 hover:bg-surface-elevated/50 hover:border-brand-primary/50 transition-all duration-300 ease-spring">
                            <span className="text-sm font-medium text-text-secondary">+{theme.resources.length - 6} more resources</span>
                            <ExternalLink className="h-4 w-4 text-text-muted" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="h-6 w-6 text-brand-primary" aria-hidden="true" />
            <h3 className="text-heading-lg font-semibold text-foreground">Ready to Choose?</h3>
          </div>
          <p className="text-body text-text-secondary max-w-2xl mx-auto mb-6">
            Each theme offers a unique journey. Discuss with your team, review the roadmaps, and submit your top 2 preferences before the deadline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/teams/preferences">
                Submit Preferences
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/forum?tag=theme-selection">
                Discuss with Peers
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}