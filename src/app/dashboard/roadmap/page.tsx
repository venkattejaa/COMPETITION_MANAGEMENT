"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Map, BookOpen, CheckCircle, Clock, ChevronRight, Code, Layers } from "lucide-react";

interface Theme {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  difficulty: string;
  mode: string;
  techStack: string[];
  objectives: string[];
}

export default function RoadmapPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/themes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.themes.length > 0) {
          setThemes(data.themes);
          setSelectedTheme(data.themes[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const sampleWeeks = [
    { week: 1, title: "Linux, Git & ROS2 Installation", desc: "Setup Ubuntu 22.04 LTS, configure ROS2 Humble environment and workspace.", status: "completed" },
    { week: 2, title: "Publisher / Subscriber Nodes & Topics", desc: "Build custom C++/Python ROS2 packages, write nodes for sensor telemetry.", status: "completed" },
    { week: 3, title: "CoppeliaSim & Gazebo Simulation", desc: "Load robot URDF models into simulator, interface with ROS2 control topics.", status: "current" },
    { week: 4, title: "Computer Vision & Path Planning", desc: "Process camera streams with OpenCV, implement A* pathfinding algorithm.", status: "upcoming" },
    { week: 5, title: "Hardware Integration & Test Runs", desc: "Flash microcontrollers, integrate sensors with physical motor drivers.", status: "upcoming" },
    { week: 6, title: "Final Run Video & Code Submission", desc: "Execute full autonomous run in arena, submit repository and demonstration.", status: "upcoming" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
            <Map className="w-8 h-8 text-blue-400" />
            Theme Roadmaps
          </h1>
          <p className="text-slate-400">Select a theme to view the 6-week step-by-step learning path.</p>
        </div>
      </header>

      {/* Theme Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {themes.map((theme) => (
          <button
            key={theme.code}
            onClick={() => setSelectedTheme(theme)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              selectedTheme?.code === theme.code
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {theme.code} - {theme.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : selectedTheme ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Theme Detail Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 font-bold rounded-lg text-xs">
                  {selectedTheme.code}
                </span>
                <span className="text-xs text-orange-400 font-medium px-2.5 py-1 bg-orange-500/10 rounded-md border border-orange-500/20">
                  {selectedTheme.difficulty}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{selectedTheme.name}</h2>
              <p className="text-sm text-slate-300 italic">"{selectedTheme.tagline}"</p>
              <p className="text-xs text-slate-400 leading-relaxed">{selectedTheme.description}</p>
              
              <div className="pt-4 border-t border-slate-700/50 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-blue-400" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTheme.techStack?.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-xs font-medium rounded-lg border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6-Week Learning Roadmap Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-orange-400" />
              6-Week Execution Timeline
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-slate-800">
              {sampleWeeks.map((w) => (
                <motion.div
                  key={w.week}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: w.week * 0.05 }}
                  className={`relative p-5 rounded-2xl border transition-all ${
                    w.status === "current"
                      ? "bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-500/10"
                      : w.status === "completed"
                      ? "bg-slate-800/30 border-slate-700/40 opacity-80"
                      : "bg-slate-900/40 border-slate-800"
                  }`}
                >
                  {/* Timeline node icon */}
                  <div className={`absolute -left-[35px] top-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    w.status === "completed"
                      ? "bg-emerald-500 text-slate-950"
                      : w.status === "current"
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-slate-700 text-slate-400"
                  }`}>
                    {w.status === "completed" ? "✓" : w.week}
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Week {w.week}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      w.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : w.status === "current"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-slate-800 text-slate-500"
                    }`}>
                      {w.status === "completed" ? "Completed" : w.status === "current" ? "In Progress" : "Upcoming"}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 mb-1">{w.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
