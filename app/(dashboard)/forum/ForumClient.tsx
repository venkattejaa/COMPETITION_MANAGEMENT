"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, formatRelativeTime, truncate } from "@/lib/utils";
import { MessageSquare, Search, Filter, ChevronDown, ChevronUp, ArrowUp, ArrowDown, CheckCircle, Flag, Clock, BookOpen, Users, Zap, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge, Tag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";

const categories = ["ALL", "CONCEPT", "CODE_BUG", "HARDWARE", "SUBMISSION", "GENERAL"];
const urgencies = ["ALL", "LOW", "MEDIUM", "HIGH", "BLOCKER"];
const sorts = ["RECENT", "OLDEST", "MOST_VOTES", "MOST_ANSWERS", "UNANSWERED"];

interface Post {
  id: string;
  title: string;
  content: string;
  isAnonymous: boolean;
  themeTag: string | null;
  category: string;
  urgency: string;
  views: number;
  upvotes: number;
  isSolved: boolean;
  createdAt: string;
  author: { id: string; name: string; avatar: string | null; xp: number; level: number };
  answers: { id: string; content: string; author: { id: string; name: string; avatar: string | null } }[];
  _count: { answers: number };
}

interface Theme {
  code: string;
  name: string;
}

interface ForumClientProps {
  posts: Post[];
  themes: Theme[];
  userId: string;
}

export function ForumClient({ posts, themes, userId }: ForumClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedUrgency, setSelectedUrgency] = useState("ALL");
  const [selectedTheme, setSelectedTheme] = useState("ALL");
  const [sortBy, setSortBy] = useState("RECENT");
  const [showFilters, setShowFilters] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || post.category === selectedCategory;
    const matchesUrgency = selectedUrgency === "ALL" || post.urgency === selectedUrgency;
    const matchesTheme = selectedTheme === "ALL" || post.themeTag === selectedTheme;
    return matchesSearch && matchesCategory && matchesUrgency && matchesTheme;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "OLDEST":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "MOST_VOTES":
        return b.upvotes - a.upvotes;
      case "MOST_ANSWERS":
        return b._count.answers - a._count.answers;
      case "UNANSWERED":
        return a._count.answers - b._count.answers;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-foreground">Discussion Forum</h1>
          <p className="text-body text-text-secondary mt-1">Ask questions, share knowledge, help peers</p>
        </div>
        <Button onClick={() => setCreatingPost(true)} className="whitespace-nowrap">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          New Post
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search questions, tags, content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-base min-w-[140px] appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat === "ALL" ? "All Categories" : cat.replace("_", " ")}</option>
                ))}
              </select>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="input-base min-w-[120px] appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8"
              >
                {urgencies.map((urg) => (
                  <option key={urg} value={urg}>{urg === "ALL" ? "All Urgency" : urg}</option>
                ))}
              </select>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="input-base min-w-[140px] appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8"
              >
                <option value="ALL">All Themes</option>
                {themes.map((t) => (
                  <option key={t.code} value={t.code}>{t.code} - {t.name}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-base min-w-[160px] appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8"
              >
                <option value="RECENT">Newest First</option>
                <option value="OLDEST">Oldest First</option>
                <option value="MOST_VOTES">Most Upvotes</option>
                <option value="MOST_ANSWERS">Most Answers</option>
                <option value="UNANSWERED">Unanswered</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {creatingPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setCreatingPost(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface backdrop-blur-2xl border border-border/50 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-lg font-semibold text-foreground">Create New Post</h2>
                <button onClick={() => setCreatingPost(false)} className="btn-icon text-text-secondary hover:text-foreground">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <form className="space-y-4">
                <Input label="Title" placeholder="What's your question?" required />
                <select className="input-base appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8">
                  <option value="">Select Category</option>
                  {categories.filter(c => c !== "ALL").map((cat) => (
                    <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
                  ))}
                </select>
                <select className="input-base appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8">
                  <option value="">Select Theme (optional)</option>
                  {themes.map((t) => (
                    <option key={t.code} value={t.code}>{t.code} - {t.name}</option>
                  ))}
                </select>
                <select className="input-base appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394A3B8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 pr-8">
                  <option value="LOW">Low Urgency</option>
                  <option value="MEDIUM">Medium Urgency</option>
                  <option value="HIGH">High Urgency</option>
                  <option value="BLOCKER">Blocker - Critical</option>
                </select>
                <div>
                  <label className="label-base">Description (Markdown supported)</label>
                  <textarea className="input-base min-h-[200px] font-mono text-sm" placeholder="Describe your issue in detail..." required />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-border text-brand-primary focus:ring-brand-primary" />
                  <span className="text-sm text-text-secondary">Post anonymously</span>
                </label>
                <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                  <Button variant="secondary" type="button" onClick={() => setCreatingPost(false)}>Cancel</Button>
                  <Button type="submit">Post Question</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={sortedPosts.length === 0 ? "hidden" : ""}
      >
        <div className="space-y-3">
          {sortedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
              className="card-double-bezel group"
            >
              <Link href={`/forum/${post.id}`} className="block">
                <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5 transition-all duration-300 ease-spring hover:border-brand-primary/50 hover:shadow-card-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 text-center">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-1 font-bold text-sm",
                        post.isSolved ? "bg-brand-secondary/20 text-brand-secondary" : "bg-brand-primary/20 text-brand-primary"
                      )}>
                        {post.isSolved ? <CheckCircle className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                      </div>
                      <span className="text-xs text-text-muted">{post._count.answers} answers</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className="font-semibold text-foreground line-clamp-1 flex-1">{post.title}</h3>
                        {post.isSolved && <Badge variant="secondary" className="text-xs flex-shrink-0"><CheckCircle className="h-3 w-3" /> Solved</Badge>}
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-3">{truncate(post.content, 200)}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                        {post.themeTag && (
                          <Tag variant="primary">{post.themeTag}</Tag>
                        )}
                        <Tag variant="outline">{post.category.replace("_", " ")}</Tag>
                        <Tag variant={post.urgency === "BLOCKER" ? "danger" : post.urgency === "HIGH" ? "accent" : "outline"}>{post.urgency}</Tag>
                        {post.isAnonymous && <Tag variant="outline">Anonymous</Tag>}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {formatRelativeTime(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" aria-hidden="true" />
                          {post.upvotes} votes
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar src={post.author.avatar} name={post.author.name} size="sm" />
                      <div className="text-right hidden sm:block">
                        <p className="font-medium text-foreground">{post.isAnonymous ? "Anonymous" : post.author.name}</p>
                        <p className="text-xs text-text-muted">Level {post.author.level} • {post.author.xp} XP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {sortedPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card-double-bezel text-center py-16"
        >
          <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8">
            <MessageSquare className="h-16 w-16 mx-auto text-text-muted mb-4" aria-hidden="true" />
            <h3 className="text-heading-md font-semibold text-foreground mb-2">No posts found</h3>
            <p className="text-text-secondary mb-6">Try adjusting your filters or be the first to ask a question!</p>
            <Button onClick={() => setCreatingPost(true)}>
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Create First Post
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}