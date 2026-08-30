"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, getThemeColor, getDifficultyColor } from "@/lib/utils";
import { ArrowLeft, Target, BookOpen, Zap, Clock, Users, ExternalLink, CheckCircle, ChevronRight, Download, Play, FileCode, BookMarked } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, Tag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";

const resourceTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  VIDEO: Play,
  ARTICLE: BookOpen,
  DOCUMENTATION: BookMarked,
  CODE_TEMPLATE: FileCode,
  CHEAT_SHEET: FileCode,
  PDF: FileCode,
  LINK: ExternalLink,
};

const difficultyLabels = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

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
  roadmaps: { id: string; title: string; description: string | null; weekNumber: number; estimatedHours: number; resources: { id: string; title: string; type: string; url: string | null }[] }[];
  resources: { id: string; title: string; type: string; url: string | null; tags: string[] }[];
}

interface ThemeDetailClientProps {
  theme: Theme;
}

export function ThemeDetailClient({ theme }: ThemeDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "roadmap" | "resources" | "objectives">("overview");
  const themeColor = getThemeColor(theme.code);
  const difficultyColor = getDifficultyColor(theme.difficulty);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" asChild>
          <Link href="/themes">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
        <div>
          <Badge variant="primary" className="text-sm mb-2">{theme.code}</Badge>
          <h1 className="text-display-md font-display font-bold text-foreground">{theme.name}</h1>
          <p className="text-body text-text-secondary mt-1">{theme.tagline}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${themeColor}20` }}>
                <span className="text-2xl font-bold" color={themeColor}>{theme.code}</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className={cn("border-" + difficultyColor.replace("text-", ""), "text-" + difficultyColor.replace("text-", ""))}>
                    {difficultyLabels[theme.difficulty as keyof typeof difficultyLabels]}
                  </Badge>
                  <Badge variant="outline">{theme.mode}</Badge>
                  <Badge variant="outline">{theme.years.join(", ")}<sup>th</sup> Year Eligible</Badge>
                </div>
                <p className="text-body text-text-secondary max-w-2xl">{theme.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:ml-auto">
              <Button variant="outline" asChild>
                <Link href={`/themes/${theme.code}/resources`}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  All Resources
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/forum?tag={theme.code}">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Discuss
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-surface/50 border border-border/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5" color={themeColor} aria-hidden="true" />
                <span className="font-medium text-foreground">Objectives</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{theme.objectives.length}</div>
              <div className="text-xs text-text-muted">Mission Objectives</div>
            </div>
            <div className="p-4 rounded-xl bg-surface/50 border border-border/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5" color={themeColor} aria-hidden="true" />
                <span className="font-medium text-foreground">Roadmap</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{theme.roadmaps.length}</div>
              <div className="text-xs text-text-muted">Weeks of Learning</div>
            </div>
            <div className="p-4 rounded-xl bg-surface/50 border border-border/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-5 w-5" color={themeColor} aria-hidden="true" />
                <span className="font-medium text-foreground">Resources</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{theme.resources.length}</div>
              <div className="text-xs text-text-muted">Curated Resources</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6" role="tablist">
            {["overview", "objectives", "roadmap", "resources"].map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
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
                className="prose max-w-none"
              >
                <p className="text-body text-text-secondary">{theme.description}</p>
              </motion.div>
            )}

            {activeTab === "objectives" && (
              <motion.div
                key="objectives"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ol className="space-y-4">
                  {theme.objectives.map((obj, i) => (
                    <motion.li
                      key={obj.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                      className="card-double-bezel group"
                    >
                      <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5 transition-all duration-300 ease-spring hover:border-brand-primary/50">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary font-bold text-lg">{i + 1}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{obj.title}</h3>
                            <p className="text-text-secondary">{obj.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-text-muted group-hover:text-brand-primary transition-colors" aria-hidden="true" />
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}

            {activeTab === "roadmap" && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="space-y-4">
                  {theme.roadmaps.map((week, i) => (
                    <motion.div
                      key={week.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                      className="card-double-bezel"
                    >
                      <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-16 text-center">
                            <div className="h-10 w-10 rounded-xl bg-brand-secondary/15 flex items-center justify-center mx-auto mb-2 text-brand-secondary font-bold">W{week.weekNumber}</div>
                            <Badge variant="outline" className="text-xs">{week.estimatedHours}h</Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1">{week.title}</h3>
                            <p className="text-text-secondary mb-3">{week.description || "No description available"}</p>
                            {week.resources.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {week.resources.slice(0, 3).map((resource) => {
                                  const Icon = resourceTypeIcons[resource.type] || ExternalLink;
                                  return (
                                    <a key={resource.id} href={resource.url || "#"} target={resource.url ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-elevated/50 border border-border/30 text-xs text-text-secondary hover:bg-surface-elevated hover:border-brand-primary/50 hover:text-brand-primary transition-all">
                                      <Icon className="h-3 w-3" aria-hidden="true" />
                                      {resource.title}
                                    </a>
                                  );
                                })}
                                {week.resources.length > 3 && (
                                  <span className="px-3 py-1 rounded-full bg-surface-elevated/50 border border-border/30 text-xs text-text-muted">+{week.resources.length - 3} more</span>
                                )}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">Start Week</Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "resources" && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {theme.resources.map((resource, i) => {
                    const Icon = resourceTypeIcons[resource.type] || ExternalLink;
                    return (
                      <motion.article
                        key={resource.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.03 }}
                        className="card-double-bezel group"
                      >
                        <Link href={resource.url || "#"} target={resource.url ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                          <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5 h-full transition-all duration-300 ease-spring hover:border-brand-primary/50 hover:shadow-card-hover">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${themeColor}20` }}>
                                <span style={{ color: themeColor }} aria-hidden="true">
                                  <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <Badge variant="outline" className="text-[0.55rem] capitalize">{resource.type.toLowerCase().replace("_", " ")}</Badge>
                              </div>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">{resource.title}</h3>
                            {resource.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {resource.tags.slice(0, 3).map((tag) => (
                                  <Tag key={tag} variant="default" className="text-[0.5rem]">{tag}</Tag>
                                ))}
                                {resource.tags.length > 3 && <Tag variant="default" className="text-[0.5rem]">+{resource.tags.length - 3}</Tag>}
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                  {theme.resources.length === 0 && (
                    <div className="col-span-full card-double-bezel text-center py-12">
                      <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8">
                        <BookOpen className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
                        <h3 className="text-heading-sm font-semibold text-foreground mb-2">No Resources Yet</h3>
                        <p className="text-text-secondary">Resources will be added by coordinators</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6" color={themeColor} aria-hidden="true" />
            <h3 className="text-heading-lg font-semibold text-foreground">Join the {theme.name} Community</h3>
          </div>
          <p className="text-body text-text-secondary max-w-2xl mx-auto mb-6">
            Connect with other teams working on {theme.name}, share progress, ask questions, and collaborate on solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/forum?tag={theme.code}">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Join Discussion
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/teams/preferences?theme={theme.code}">
                Select as Preference
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Need to import MessageSquare
import { MessageSquare } from "lucide-react";