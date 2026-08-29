"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Upload, ExternalLink, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface Task {
  id: string;
  number: string;
  title: string;
  description: string;
  deadline: string;
  maxXp: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      number: "TASK_0",
      title: "Team Registration & Verification",
      description: "Complete team profile verification, assign member roles, and confirm participation.",
      deadline: "2026-09-05",
      maxXp: 100,
      status: "COMPLETED",
    },
    {
      id: "2",
      number: "TASK_1A",
      title: "Simulation Environment & PID Tuning",
      description: "Build line-following controller in CoppeliaSim, tune PID gains, submit run video.",
      deadline: "2026-09-20",
      maxXp: 500,
      status: "IN_PROGRESS",
    },
    {
      id: "3",
      number: "TASK_1B",
      title: "RFID Block Decryption & Path Planning",
      description: "Implement RFID sensor node, parse byte arrays, solve shortest path grid.",
      deadline: "2026-10-05",
      maxXp: 750,
      status: "NOT_STARTED",
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(tasks[1]);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      if (activeTask) {
        setTasks(prev => prev.map(t => t.id === activeTask.id ? { ...t, status: "SUBMITTED" } : t));
        setActiveTask(prev => prev ? { ...prev, status: "SUBMITTED" } : null);
      }
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-orange-400" />
          Task Submissions
        </h1>
        <p className="text-slate-400">View competition tasks, deadlines, and upload your project submissions.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => { setActiveTask(task); setSubmittedSuccess(false); }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                activeTask?.id === task.id
                  ? "bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10"
                  : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-blue-400 border border-slate-700">
                  {task.number}
                </span>
                <span className="text-xs font-semibold text-orange-400">+{task.maxXp} XP</span>
              </div>
              <h3 className="font-bold text-slate-100 mb-2">{task.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/40">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due {task.deadline}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  task.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400" :
                  task.status === "SUBMITTED" ? "bg-blue-500/10 text-blue-400" :
                  task.status === "IN_PROGRESS" ? "bg-orange-500/10 text-orange-400" : "bg-slate-700 text-slate-400"
                }`}>
                  {task.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Task Detail & Submission Portal */}
        {activeTask && (
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm space-y-6">
            <div className="flex items-start justify-between border-b border-slate-700/60 pb-6">
              <div>
                <span className="text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg">
                  {activeTask.number}
                </span>
                <h2 className="text-2xl font-bold mt-3">{activeTask.title}</h2>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-orange-400">+{activeTask.maxXp}</div>
                <div className="text-xs text-slate-400">Max XP</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{activeTask.description}</p>

            {/* Submission Form */}
            <div className="pt-6 border-t border-slate-700/60 space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                Submit Task Materials
              </h3>

              {submittedSuccess || activeTask.status === "SUBMITTED" || activeTask.status === "COMPLETED" ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Submission Received!</p>
                    <p className="text-xs text-emerald-400/80">Evaluators will review your code and video within 48 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      GitHub Repository or Google Drive Video Link
                    </label>
                    <input
                      type="url"
                      required
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      placeholder="https://github.com/team/repository or drive link..."
                      className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Submit Task Solution
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
