"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn, formatRelativeTime, truncate } from "@/lib/utils";
import { ArrowLeft, ArrowUp, ArrowDown, CheckCircle, Flag, MessageSquare, MoreHorizontal, Edit2, Trash2, Share2, Copy, ExternalLink, Loader2, BookOpen, Zap, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, Tag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Textarea } from "@/components/ui/Input";

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
  bestAnswerId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  author: { id: string; name: string; avatar: string | null; xp: number; level: number; role: string };
  answers: { id: string; content: string; isBestAnswer: boolean; upvotes: number; createdAt: string | Date; updatedAt: string | Date; author: { id: string; name: string; avatar: string | null; xp: number; level: number; role: string }; votes: { type: "UP" | "DOWN" }[] }[];
}

interface ForumPostDetailClientProps {
  post: Post;
  currentUserId: string;
}

export function ForumPostDetailClient({ post, currentUserId }: ForumPostDetailClientProps) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [voteStates, setVoteStates] = useState<Record<string, "UP" | "DOWN" | null>>({});

  const isAuthor = post.author.id === currentUserId;
  const canMarkBest = isAuthor || post.author.role === "COORDINATOR";

  const handleVote = async (answerId: string, type: "UP" | "DOWN") => {
    setVoteStates((prev) => ({ ...prev, [answerId]: type }));
    try {
      await fetch(`/api/forum/answers/${answerId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
    } catch (err) {
      setVoteStates((prev) => ({ ...prev, [answerId]: null }));
    }
  };

  const handleMarkBest = async (answerId: string) => {
    try {
      await fetch(`/api/forum/answers/${answerId}/best`, { method: "POST" });
      window.location.reload();
    } catch (err) {
      console.error("Failed to mark best answer", err);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    try {
      await fetch(`/api/forum/posts/${post.id}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setShowAnswerForm(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to post answer", err);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" asChild>
          <Link href="/forum">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
        <div>
          <Badge variant="primary" className="text-sm mb-2">{post.themeTag || "General"}</Badge>
          <h1 className="text-display-sm font-display font-bold text-foreground">{post.title}</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="card-double-bezel"
      >
        <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 text-center">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-1 font-bold",
                post.isSolved ? "bg-brand-secondary/20 text-brand-secondary" : "bg-brand-primary/20 text-brand-primary"
              )}>
                {post.isSolved ? <CheckCircle className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
              </div>
              <span className="text-xs text-text-muted">{post.answers.length} answers</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="font-semibold text-foreground">{post.title}</span>
                {post.isSolved && <Badge variant="secondary"><CheckCircle className="h-3 w-3" /> Solved</Badge>}
              </div>
              <div className="prose max-w-none text-text-secondary whitespace-pre-wrap">{post.content}</div>
            </div>
            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {post.views} views</span>
                <span className="flex items-center gap-1"><Zap className="h-4 w-4" /> {post.upvotes} votes</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {post.themeTag && <Tag variant="primary">{post.themeTag}</Tag>}
                <Tag variant="outline">{post.category.replace("_", " ")}</Tag>
                <Tag variant={post.urgency === "BLOCKER" ? "danger" : post.urgency === "HIGH" ? "accent" : "outline"}>{post.urgency}</Tag>
                {post.isAnonymous && <Tag variant="outline">Anonymous</Tag>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/30 pt-4">
            <div className="flex items-center gap-3">
              <Avatar src={post.author.avatar} name={post.author.name} size="md" />
              <div>
                <p className="font-medium text-foreground">{post.isAnonymous ? "Anonymous" : post.author.name}</p>
                <p className="text-xs text-text-muted">Level {post.author.level} • {post.author.xp} XP • {formatRelativeTime(post.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuthor && (
                <>
                  <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-brand-danger"><Trash2 className="h-4 w-4" /></Button>
                </>
              )}
              <Button variant="outline" size="sm"><Share2 className="h-4 w-4" /> Share</Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-heading-lg font-semibold text-foreground">Answers ({post.answers.length})</h2>
          {post.answers.length === 0 && (
            <Badge variant="outline">No answers yet</Badge>
          )}
        </div>

        {post.answers.length > 0 && (
          <div className="space-y-4">
            {post.answers.map((answer, index) => (
              <motion.article
                key={answer.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className={cn("card-double-bezel", answer.isBestAnswer && "ring-2 ring-brand-secondary/50")}
              >
                <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5">
                  {answer.isBestAnswer && (
                    <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary text-sm">
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Marked as Best Answer</span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-surface-elevated/50 border border-border/30">
                        <button
                          onClick={() => handleVote(answer.id, "UP")}
                          className={cn("p-1 rounded transition-colors", voteStates[answer.id] === "UP" ? "text-brand-secondary bg-brand-secondary/10" : "text-text-muted hover:text-brand-secondary")}
                          aria-label="Upvote"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <span className={cn("font-bold text-sm", voteStates[answer.id] === "UP" ? "text-brand-secondary" : "")}>{answer.upvotes}</span>
                        <button
                          onClick={() => handleVote(answer.id, "DOWN")}
                          className={cn("p-1 rounded transition-colors", voteStates[answer.id] === "DOWN" ? "text-brand-danger bg-brand-danger/10" : "text-text-muted hover:text-brand-danger")}
                          aria-label="Downvote"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                      {canMarkBest && !answer.isBestAnswer && (
                        <Button variant="ghost" size="icon-sm" onClick={() => handleMarkBest(answer.id)} className="text-brand-secondary hover:bg-brand-secondary/10" aria-label="Mark as best answer">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar src={answer.author.avatar} name={answer.author.name} size="sm" />
                        <div>
                          <p className="font-medium text-foreground">{answer.author.name}</p>
                          <p className="text-xs text-text-muted">Level {answer.author.level} • {formatRelativeTime(answer.createdAt)}</p>
                        </div>
                      </div>
                      <div className="prose max-w-none text-text-secondary whitespace-pre-wrap mb-3">{answer.content}</div>
                      {answer.updatedAt !== answer.createdAt && (
                        <p className="text-xs text-text-muted">Edited • {formatRelativeTime(answer.updatedAt)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <AnimatePresence>
          {showAnswerForm && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="card-double-bezel"
            >
              <form onSubmit={handleSubmitAnswer} className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-heading-md font-semibold text-foreground">Write Your Answer</h3>
                  <button type="button" onClick={() => setShowAnswerForm(false)} className="btn-icon text-text-secondary hover:text-foreground">
                    <ExternalLink className="h-5 w-5 rotate-45" />
                  </button>
                </div>
                <Textarea name="content" placeholder="Write your answer here (Markdown supported)..." rows={6} required />
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="secondary" type="button" onClick={() => setShowAnswerForm(false)}>Cancel</Button>
                  <Button type="submit">Post Answer</Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {post.answers.length === 0 && !showAnswerForm && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="card-double-bezel text-center py-12"
          >
            <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8">
              <MessageSquare className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
              <h3 className="text-heading-sm font-semibold text-foreground mb-2">Be the first to answer!</h3>
              <p className="text-text-secondary mb-4">Help your peer by sharing your knowledge</p>
              <Button onClick={() => setShowAnswerForm(true)}>
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Write Answer
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}