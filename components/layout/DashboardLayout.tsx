"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Bot, BookOpen, Trophy, LogOut, User,
  Bell, Menu, X, BarChart2, Megaphone, MessageSquare, Zap, ChevronRight
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { EYantraLogo } from "@/components/ui/EYantraLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-orange-500" },
  { href: "/teams", label: "My Team", icon: Users, color: "text-emerald-500" },
  { href: "/themes", label: "Themes", icon: Bot, color: "text-indigo-500" },
  { href: "/resources", label: "Resources", icon: BookOpen, color: "text-amber-500" },
  { href: "/forum", label: "Forum", icon: MessageSquare, color: "text-purple-500" },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, color: "text-yellow-500" },
];

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Panel", icon: BarChart2, color: "text-red-500" },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone, color: "text-red-500" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  isAdmin: boolean;
}

export function DashboardLayout({ children, user, isAdmin }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => signOut({ callbackUrl: "/login" });

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0D1117] text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-white/5 transition-colors">
      {/* Brand Logo Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-200 dark:border-white/5">
        <Link href="/dashboard">
          <EYantraLogo size="md" />
        </Link>
        <ThemeToggle className="lg:flex hidden" />
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 group",
                isActive
                  ? "bg-orange-500/10 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 flex-shrink-0", isActive ? item.color : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} aria-hidden="true" />
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-orange-500 opacity-80" />}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-3 border-t border-slate-200 dark:border-white/5" />
            <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Admin
            </p>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/15"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("h-4.5 w-4.5 flex-shrink-0", isActive ? item.color : "text-slate-400")} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User XP & Profile Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-white/5 space-y-2">
        {/* XP Mini Bar */}
        <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-[11px] font-extrabold text-orange-600 dark:text-orange-400">Level {user?.level || 1}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{user?.xp || 0} XP</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
              style={{ width: `${Math.min(((user?.xp || 0) % 1000) / 10, 100)}%` }}
            />
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/5">
          <Avatar src={user?.avatar} name={user?.name} size="sm" status="online" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-1 pt-1">
          <Link
            href="/profile"
            className="flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <User className="h-3.5 w-3.5" />
            Profile
          </Link>
          <Link
            href="/notifications"
            className="flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <Bell className="h-3.5 w-3.5" />
            Alerts
          </Link>
          <button
            onClick={handleSignOut}
            className="flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10"
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] text-slate-900 dark:text-white flex transition-colors">
      {/* Mobile Drawer Overlay */}
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

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 fixed top-0 bottom-0 left-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Slide-Over Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 bottom-0 left-0 z-40 w-72 shadow-2xl flex flex-col lg:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-60 xl:ml-64 flex flex-col min-h-screen">
        {/* Mobile Sticky Top Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 sticky top-0 z-20 shadow-sm">
          <EYantraLogo size="sm" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}