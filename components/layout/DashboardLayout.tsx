"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Bot, BookOpen, Trophy, LogOut, User,
  Bell, Menu, X, BarChart2, Megaphone, MessageSquare, Zap, ChevronRight,
  GraduationCap
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-400" },
  { href: "/teams", label: "My Team", icon: Users, color: "text-emerald-400" },
  { href: "/themes", label: "Themes", icon: Bot, color: "text-indigo-400" },
  { href: "/resources", label: "Resources", icon: BookOpen, color: "text-amber-400" },
  { href: "/forum", label: "Forum", icon: MessageSquare, color: "text-purple-400" },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, color: "text-orange-400" },
];

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Panel", icon: BarChart2, color: "text-red-400" },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone, color: "text-red-400" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  isAdmin: boolean;
}

export function DashboardLayout({ children, user, isAdmin }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => signOut({ callbackUrl: "/login" });

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-extrabold text-white text-sm leading-tight">eYRC</p>
          <p className="text-[10px] text-slate-500 leading-tight">Command Center</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 flex-shrink-0", isActive ? item.color : "text-slate-500 group-hover:text-slate-300")} aria-hidden="true" />
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-blue-400 opacity-70" />}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-3 border-t border-white/5" />
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Admin</p>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-red-500/10 text-red-400 border border-red-500/15"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("h-4.5 w-4.5 flex-shrink-0", isActive ? item.color : "text-slate-500")} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-white/5">
        {/* XP Bar */}
        <div className="px-3 py-2 mb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-400">Level {user?.level || 1}</span>
            </div>
            <span className="text-[10px] text-slate-600">{user?.xp || 0} XP</span>
          </div>
          <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-1000"
              style={{ width: `${Math.min(((user?.xp || 0) % 1000) / 10, 100)}%` }}
            />
          </div>
        </div>

        {/* User info + links */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/3 border border-white/5 mb-2">
          <Avatar src={user?.avatar} name={user?.name} size="sm" status="online" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate leading-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <div className="flex gap-1">
          <Link
            href="/profile"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <User className="h-3.5 w-3.5" />
            Profile
          </Link>
          <Link
            href="/notifications"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Bell className="h-3.5 w-3.5" />
            Alerts
          </Link>
          <button
            onClick={handleSignOut}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar — Desktop (always visible) */}
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 fixed top-0 bottom-0 left-0 z-20 bg-[#0D1117] border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Sidebar — Mobile (slide-in drawer) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0D1117] border-r border-white/5 flex flex-col lg:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 xl:ml-64 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0D1117] border-b border-white/5 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">eYRC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-400 font-medium">
              {navItems.find(n => n.href === pathname || pathname.startsWith(n.href + "/"))?.label || "Dashboard"}
            </div>
            <button
              onClick={() => setIsMobileOpen(true)}
              className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}