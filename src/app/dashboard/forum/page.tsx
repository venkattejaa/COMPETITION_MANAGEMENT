"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Plus, Search, Tag, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  title: string;
  author: string;
  themeTag: string;
  upvotes: number;
  replies: number;
  time: string;
  isSolved: boolean;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "CoppeliaSim Python API: Exception 1254 when fetching robot handle",
      author: "Team #1042 (LQ)",
      themeTag: "LQ",
      upvotes: 14,
      replies: 5,
      time: "3 hours ago",
      isSolved: true,
    },
    {
      id: "2",
      title: "PID anti-windup clamping threshold for 2-wheel self balancing",
      author: "Team #2409 (EB)",
      themeTag: "EB",
      upvotes: 9,
      replies: 3,
      time: "6 hours ago",
      isSolved: false,
    },
    {
      id: "3",
      title: "ROS2 Humble publisher dropping messages over WiFi bridge",
      author: "Team #0512 (KD)",
      themeTag: "KD",
      upvotes: 22,
      replies: 8,
      time: "1 day ago",
      isSolved: true,
    },
  ]);

  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("LQ");

  const filteredPosts = selectedTag === "ALL" ? posts : posts.filter(p => p.themeTag === selectedTag);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newPost: Post = {
      id: Date.now().toString(),
      title: newTitle,
      author: "You (Captain)",
      themeTag: newTag,
      upvotes: 1,
      replies: 0,
      time: "Just now",
      isSolved: false,
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setShowNewPostModal(false);
  };

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            eYRC Forum & Discussions
          </h1>
          <p className="text-slate-400">Ask questions, share code solutions, and get help from mentors and peers.</p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Ask Question
        </button>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["ALL", "LQ", "KD", "SC", "HE", "NV", "EB", "PB"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                selectedTag === tag
                  ? "bg-orange-500 text-slate-950 shadow"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all flex items-start gap-5"
          >
            {/* Upvote Button */}
            <button
              onClick={() => handleUpvote(post.id)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-blue-500 text-slate-400 hover:text-blue-400 transition-all shrink-0 w-14"
            >
              <ThumbsUp className="w-4 h-4 mb-1" />
              <span className="text-xs font-bold">{post.upvotes}</span>
            </button>

            {/* Post Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                  {post.themeTag}
                </span>
                {post.isSolved && (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                    Solved ✓
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto">{post.time}</span>
              </div>

              <h3 className="text-base font-bold text-slate-100 hover:text-blue-400 cursor-pointer transition-colors mb-2">
                {post.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>By <strong className="text-slate-300">{post.author}</strong></span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" /> {post.replies} replies
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-bold">Ask the eYRC Community</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Theme Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white"
                >
                  {["LQ", "KD", "SC", "HE", "NV", "EB", "PB"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Describe your issue concise and clear..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
