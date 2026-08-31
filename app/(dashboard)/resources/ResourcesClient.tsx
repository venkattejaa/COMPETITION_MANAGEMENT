"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Search, Download, FileText, Video, Link as LinkIcon,
  FileCode, Filter, Archive, ExternalLink, Sparkles, MapPin, Compass
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const THEMES = [
  { code: "ALL", name: "All Themes" },
  { code: "LQ", name: "Logic Quest" },
  { code: "KD", name: "Khoj-o-Drone" },
  { code: "SC", name: "Strata Cobot" },
  { code: "HE", name: "Hola The Explorer" },
  { code: "NV", name: "Niti Vahan" },
  { code: "EB", name: "Echo Balancer" },
  { code: "PB", name: "PacBot" },
  { code: "GENERAL", name: "General" },
];

const CURATED_RESOURCES = [
  // General / Core
  {
    id: "g1",
    title: "eYRC Hardware Integration & Wiring Cheat Sheet",
    type: "CHEAT_SHEET",
    theme: "GENERAL",
    category: "Hardware",
    tags: ["Hardware", "GPIO", "Wiring", "Arduino"],
    url: "https://docs.e-yantra.org",
    description: "Official pinout diagrams, sensor interfacing guides, and power distribution best practices.",
  },
  {
    id: "g2",
    title: "PID Controller Design & Tuning Guide",
    type: "CODE_TEMPLATE",
    theme: "GENERAL",
    category: "Control Systems",
    tags: ["Control Systems", "PID", "Python", "C++"],
    url: "https://docs.e-yantra.org",
    description: "Interactive Jupyter Notebook for understanding proportional, integral, and derivative tuning.",
  },
  {
    id: "g3",
    title: "ROS2 Humble Architecture Masterclass",
    type: "DOCUMENTATION",
    theme: "GENERAL",
    category: "Software",
    tags: ["ROS2", "Middleware", "Nodes", "Topics"],
    url: "https://docs.ros.org/en/humble/",
    description: "Comprehensive breakdown of publishers, subscribers, custom messages, and launch files.",
  },

  // Logic Quest (LQ)
  {
    id: "lq1",
    title: "OpenCV Basic & Advanced Image Processing",
    type: "VIDEO",
    theme: "LQ",
    category: "Computer Vision",
    tags: ["OpenCV", "Vision", "Python", "Color Masking"],
    url: "https://docs.opencv.org",
    description: "Learn color detection, contour extraction, and perspective transforms for autonomous navigation.",
  },
  {
    id: "lq2",
    title: "Logic Quest Line Following Algorithm Starter Code",
    type: "CODE_TEMPLATE",
    theme: "LQ",
    category: "Algorithmic Navigation",
    tags: ["Line Follower", "IR Sensors", "C++"],
    url: "https://github.com",
    description: "Base repository for high-speed differential drive robot navigation and junction detection.",
  },

  // Khoj-o-Drone (KD)
  {
    id: "kd1",
    title: "Pluto Drone SDK Setup & Telemetry Manual",
    type: "DOCUMENTATION",
    theme: "KD",
    category: "Aerial Robotics",
    tags: ["Drone", "Pluto", "SDK", "Telemetry"],
    url: "https://docs.e-yantra.org",
    description: "Step-by-step setup guide for Wi-Fi SDK communication, pitch/roll control, and optical flow estimation.",
  },
  {
    id: "kd2",
    title: "Autonomous Waypoint Flying with ArduPilot & Gazebo",
    type: "VIDEO",
    theme: "KD",
    category: "Simulation",
    tags: ["Drone", "Gazebo", "ArduPilot", "Waypoints"],
    url: "https://ardupilot.org",
    description: "Simulate quadcopter navigation in 3D environment with Gazebo and MavROS pipeline.",
  },

  // Strata Cobot (SC)
  {
    id: "sc1",
    title: "MoveIt2 Motion Planning & Inverse Kinematics",
    type: "DOCUMENTATION",
    theme: "SC",
    category: "Robotic Arms",
    tags: ["MoveIt2", "Kinematics", "URDF", "Cobots"],
    url: "https://moveit.ros.org",
    description: "Industrial arm manipulation tutorial: trajectory planning, collision avoidance, and gripper control.",
  },
  {
    id: "sc2",
    title: "URDF Robotic Manipulator Design Template",
    type: "CODE_TEMPLATE",
    theme: "SC",
    category: "CAD & Simulation",
    tags: ["URDF", "Xacro", "Gazebo", "CAD"],
    url: "https://github.com",
    description: "Ready-to-use 6-DOF manipulator URDF model with Gazebo physics plugins.",
  },

  // Hola The Explorer (HE)
  {
    id: "he1",
    title: "Holonomic Omni-Wheel Kinematics & Motor Drives",
    type: "PDF",
    theme: "HE",
    category: "Omni Drive",
    tags: ["Holonomic", "Omni Wheels", "Kinematics", "Motors"],
    url: "https://docs.e-yantra.org",
    description: "Math and vector decomposition for 3-wheel and 4-wheel omnidirectional motion planning.",
  },

  // Niti Vahan (NV)
  {
    id: "nv1",
    title: "Ackermann Steering Kinematics & Autonomous Parking",
    type: "DOCUMENTATION",
    theme: "NV",
    category: "Autonomous Vehicles",
    tags: ["Ackermann", "EV", "Pure Pursuit", "ROS2"],
    url: "https://docs.ros.org",
    description: "Path tracking using Pure Pursuit algorithm and path planning for steering-constrained vehicles.",
  },

  // Echo Balancer (EB)
  {
    id: "eb1",
    title: "Self-Balancing Robot Complementary & Kalman Filtering",
    type: "DOCUMENTATION",
    theme: "EB",
    category: "Inverted Pendulum",
    tags: ["Kalman Filter", "IMU", "MPU6050", "Balancing"],
    url: "https://docs.e-yantra.org",
    description: "Fusing accelerometer and gyroscope readings for accurate pitch state estimation on two-wheeled robots.",
  },

  // PacBot (PB)
  {
    id: "pb1",
    title: "PacBot Grid Maze Solving & Pathfinding Algorithms",
    type: "CODE_TEMPLATE",
    theme: "PB",
    category: "Grid Search",
    tags: ["A*", "Dijkstra", "Floodfill", "Maze"],
    url: "https://github.com",
    description: "Optimized A* and Flood Fill maze-solving implementations in C++ and Python.",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "DOCUMENTATION": return <FileText className="w-5 h-5 text-blue-400" />;
    case "VIDEO": return <Video className="w-5 h-5 text-purple-400" />;
    case "CODE_TEMPLATE": return <FileCode className="w-5 h-5 text-emerald-400" />;
    case "CHEAT_SHEET": return <Archive className="w-5 h-5 text-amber-400" />;
    case "PDF": return <Download className="w-5 h-5 text-rose-400" />;
    default: return <LinkIcon className="w-5 h-5 text-slate-400" />;
  }
};

export function ResourcesClient() {
  const [search, setSearch] = useState("");
  const [filterTheme, setFilterTheme] = useState("ALL");

  const filteredResources = CURATED_RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      res.category.toLowerCase().includes(search.toLowerCase());
    const matchesTheme = filterTheme === "ALL" || res.theme === filterTheme || res.theme === "GENERAL";
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curated Learning Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-blue-400" />
            Resource Vault & Roadmaps
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Official documentation, code templates, simulation guides, and cheat sheets for all 7 eYRC themes.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ROS2, PID, OpenCV..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Theme Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {THEMES.map((theme) => (
          <button
            key={theme.code}
            onClick={() => setFilterTheme(theme.code)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border
              ${filterTheme === theme.code
                ? "bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/25"
                : "bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-700/40"
              }`}
          >
            <Filter className="w-3 h-3" />
            {theme.name}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredResources.map((res, idx) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.04 }}
            >
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/70 backdrop-blur-sm p-5 h-full flex flex-col justify-between transition-all group hover:border-blue-500/40 hover:shadow-lg">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/40">
                      {getTypeIcon(res.type)}
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] border-blue-500/30 text-blue-400">
                      {res.theme}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-blue-400 transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {res.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/40 border border-slate-700/40 text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-blue-400 transition-colors pt-3 border-t border-slate-700/40 mt-auto"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredResources.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <Archive className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-base">No resources found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourcesClient;
