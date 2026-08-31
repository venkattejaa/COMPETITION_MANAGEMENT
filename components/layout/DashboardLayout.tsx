"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Calendar, Users, CreditCard, MessageSquare, Bot, BookOpen,
  Trophy, LogOut, User, Bell, Menu, X, BarChart2, Megaphone, Zap, ChevronRight,
  ShieldCheck, Award, Layers
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { EYantraLogo } from "@/components/ui/EYantraLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const competitionItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teams", label: "My Team", icon: Users },
  { href: "/themes", label: "Themes", icon: Bot },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

const accountItems = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/notifications", label: "Alerts & Schedule", icon: Bell },
];

const adminItems = [
  { href: "/admin/dashboard", label: "Admin Panel", icon: BarChart2 },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
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
    <div className="flex flex-col h-full bg-white dark:bg-[#000000] text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-zinc-800 transition-colors">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-200 dark:border-zinc-800">
        <Link href="/dashboard">
          <EYantraLogo size="md" />
        </Link>
        <ThemeToggle className="lg:flex hidden" />
      </div>

      {/* Sidebar Nav */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Competition Section */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            Competition
          </p>
          <div className="space-y-1">
            {competitionItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 group",
                    isActive
                      ? "bg-[#F05438] text-white shadow-md shadow-[#F05438]/20"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-white" : "text-slate-400 dark:text-zinc-500 group-hover:text-slate-700 dark:group-hover:text-zinc-300")} />
                  <span className="truncate">{item.label}</span>
                  {item.href === "/dashboard" && (
                    <span className="ml-auto text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-orange-500/15 text-[#F05438] dark:text-orange-400">
                      Task 0
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Account Section */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            Account
          </p>
          <div className="space-y-1">
            {accountItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 group",
                    isActive
                      ? "bg-[#F05438] text-white shadow-md shadow-[#F05438]/20"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-white" : "text-slate-400 dark:text-zinc-500")} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <div>
            <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-red-500/80">
              Admin Controls
            </p>
            <div className="space-y-1">
              {adminItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200",
                      isActive
                        ? "bg-red-600 text-white shadow-md"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* User XP & Signout Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-zinc-800 space-y-2">
        <div className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#F05438]" />
              <span className="text-[11px] font-black text-[#F05438]">Level {user?.level || 1}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{user?.xp || 0} XP</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#F05438] transition-all duration-1000"
              style={{ width: `${Math.min(((user?.xp || 0) % 1000) / 10, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <Avatar src={user?.avatar} name={user?.name} size="sm" status="online" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#000000] text-slate-900 dark:text-white flex transition-colors">
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
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 fixed top-0 bottom-0 left-0 z-20">
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

      {/* Main Container */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <EYantraLogo size="sm" />
            </div>
            <div className="hidden lg:block text-xs font-semibold text-slate-500 dark:text-zinc-400">
              eYRC 2026-27 • Command Center
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-[#F05438] border border-[#F05438]/20 text-xs font-bold font-mono">
              <Users className="w-3.5 h-3.5" />
              eYRC#1051
            </span>

            <ThemeToggle />

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-800">
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden md:inline-block text-xs font-bold text-slate-800 dark:text-white max-w-[120px] truncate">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}