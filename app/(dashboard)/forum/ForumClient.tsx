"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, formatRelativeTime, truncate } from "@/lib/utils";
import { MessageSquare, Search, CheckCircle, Clock, Zap, Plus, X } from "lucide-react";
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
  const [creatingPost, setCreatingPost] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Community Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Discussion Forum</h1>
          <p className="text-slate-400 text-sm mt-1">Ask questions, share code snippets, resolve bugs with peers.</p>
        </div>
        <Button onClick={() => setCreatingPost(true)} className="whitespace-nowrap bg-purple-600 hover:bg-purple-700 text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-1" />
          New Discussion
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm p-4 space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions, code bugs, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat.replace("_", " ")}
              </option>
            ))}
          </select>

          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            {urgencies.map((urg) => (
              <option key={urg} value={urg}>
                {urg === "ALL" ? "All Urgency" : urg}
              </option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Themes</option>
            {themes.map((t) => (
              <option key={t.code} value={t.code}>
                {t.code} - {t.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="RECENT">Newest First</option>
            <option value="OLDEST">Oldest First</option>
            <option value="MOST_VOTES">Most Upvotes</option>
            <option value="MOST_ANSWERS">Most Answers</option>
            <option value="UNANSWERED">Unanswered</option>
          </select>
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {creatingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setCreatingPost(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white">Ask Community / Post Bug</h2>
                <button onClick={() => setCreatingPost(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setCreatingPost(false); }}>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="E.g., MFRC522 RFID read error on Logic Quest"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white">
                      {categories.filter(c => c !== "ALL").map((cat) => (
                        <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Theme (Optional)</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white">
                      <option value="">General</option>
                      {themes.map((t) => (
                        <option key={t.code} value={t.code}>{t.code}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Detailed Explanation</label>
                  <textarea
                    rows={4}
                    placeholder="Provide relevant details, error logs, or code blocks..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCreatingPost(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <div className="space-y-3">
        {sortedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Link href={`/forum/${post.id}`} className="block">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/70 p-4 sm:p-5 transition-all group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.isSolved ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Solved
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {post.category.replace("_", " ")}
                      </span>
                    )}

                    {post.themeTag && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {post.themeTag}
                      </span>
                    )}

                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                      {post.urgency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Avatar src={post.author.avatar} name={post.author.name} size="sm" />
                    <span className="font-semibold text-slate-300">{post.isAnonymous ? "Anonymous" : post.author.name}</span>
                    <span>•</span>
                    <span className="text-[11px]">{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base sm:text-lg mb-1.5 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                  {truncate(post.content, 180)}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-700/40">
                  <span className="flex items-center gap-1 font-semibold text-purple-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {post._count.answers} answers
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {post.upvotes} votes
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}

        {sortedPosts.length === 0 && (
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-1">No forum posts found</h3>
            <p className="text-slate-400 text-sm mb-4">Try clearing search filters or create a new question.</p>
            <Button onClick={() => setCreatingPost(true)} className="bg-purple-600 hover:bg-purple-700">
              Post Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumClient;