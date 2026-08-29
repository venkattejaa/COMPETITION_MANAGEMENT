"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  CheckSquare,
  MessageSquare,
  Settings,
  LogOut,
  Bot
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Theme Roadmap", href: "/dashboard/roadmap", icon: Map },
  { name: "Team Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "eYRC Forum", href: "/dashboard/forum", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col backdrop-blur-xl">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              eYRC<span className="text-blue-400">Command</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 font-medium"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-blue-400" : ""}`}
                  />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                <span className="text-orange-400 font-bold">TC</span>
              </div>
              <div>
                <p className="text-sm font-medium">Team Captain</p>
                <p className="text-xs text-slate-400">Team #2409</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-[30%] h-[30%] rounded-full bg-orange-600/5 blur-[100px]" />
        </div>
        <div className="flex-1 overflow-y-auto relative z-10 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
