"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, Download, FileText, Video, Link as LinkIcon, FileCode, Filter, Archive } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const MOCK_RESOURCES = [
  {
    id: "r1",
    title: "ROS2 Humble Architecture Guide",
    type: "DOCUMENTATION",
    theme: "PB",
    tags: ["ROS2", "Architecture"],
    url: "#",
  },
  {
    id: "r2",
    title: "OpenCV Basic Image Processing",
    type: "VIDEO",
    theme: "LQ",
    tags: ["OpenCV", "Vision"],
    url: "#",
  },
  {
    id: "r3",
    title: "eYRC Hardware Integration Cheat Sheet",
    type: "CHEAT_SHEET",
    theme: "GENERAL",
    tags: ["Hardware", "Wiring"],
    url: "#",
  },
  {
    id: "r4",
    title: "PID Tuning Interactive Notebook",
    type: "CODE_TEMPLATE",
    theme: "GENERAL",
    tags: ["Control Systems", "Jupyter"],
    url: "#",
  },
  {
    id: "r5",
    title: "Gazebo Simulation Quickstart",
    type: "PDF",
    theme: "SC",
    tags: ["Simulation", "Gazebo"],
    url: "#",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "DOCUMENTATION": return <FileText className="w-5 h-5 text-blue-400" />;
    case "VIDEO": return <Video className="w-5 h-5 text-purple-400" />;
    case "CODE_TEMPLATE": return <FileCode className="w-5 h-5 text-emerald-400" />;
    case "CHEAT_SHEET": return <Archive className="w-5 h-5 text-orange-400" />;
    case "PDF": return <Download className="w-5 h-5 text-rose-400" />;
    default: return <LinkIcon className="w-5 h-5 text-slate-400" />;
  }
};

export default function ResourcesClient() {
  const [search, setSearch] = useState("");
  const [filterTheme, setFilterTheme] = useState("ALL");

  const filteredResources = MOCK_RESOURCES.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) || res.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesTheme = filterTheme === "ALL" || res.theme === filterTheme || res.theme === "GENERAL";
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-display-sm font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-primary" />
            Resource Vault
          </h1>
          <p className="text-body text-text-secondary">
            Access official documentation, templates, and reference materials.
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["ALL", "PB", "LQ", "SC", "GENERAL"].map((theme) => (
          <button
            key={theme}
            onClick={() => setFilterTheme(theme)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2
              ${filterTheme === theme 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25" 
                : "bg-surface/50 text-text-secondary hover:bg-surface-elevated hover:text-foreground border border-border/50"
              }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {theme === "ALL" ? "All Themes" : theme}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredResources.map((res, idx) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card variant="double-bezel" className="h-full group hover:border-brand-primary/50 transition-colors">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-xl bg-surface-elevated shadow-inner">
                      {getTypeIcon(res.type)}
                    </div>
                    {res.theme !== "GENERAL" && (
                      <Badge variant="outline" className="font-mono text-xs border-brand-primary/30 text-brand-primary">
                        {res.theme}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-brand-primary transition-colors">
                    {res.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {res.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-surface border border-border/50 text-text-secondary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-sm font-semibold text-text-secondary hover:text-brand-primary transition-colors pt-4 border-t border-border/50"
                  >
                    <span>Access Resource</span>
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
          {filteredResources.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center"
            >
              <Archive className="w-12 h-12 text-border mx-auto mb-4" />
              <p className="text-text-muted text-lg">No resources found matching your filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
