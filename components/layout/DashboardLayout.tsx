"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Bot, BookOpen, Trophy, LogOut, User, Settings, Bell, ChevronLeft, Menu, X, Bot as BotIcon, BarChart2, Megaphone, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teams", label: "My Team", icon: Users },
  { href: "/themes", label: "Themes", icon: Bot },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  isAdmin: boolean;
}

export function DashboardLayout({ children, user, isAdmin }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 z-10 lg:hidden" aria-hidden="true">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </div>

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-20 w-64 lg:w-64 transform transition-transform duration-300 ease-spring bg-surface/90 backdrop-blur-2xl border-r border-border/30 flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isSidebarCollapsed && "lg:w-20"
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/30">
          <Link href="/dashboard" className="flex items-center gap-2" aria-label="eYRC Command Center">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary">
              <BotIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            {!isSidebarCollapsed && <span className="font-display font-bold text-xl text-foreground">eYRC</span>}
          </Link>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:text-foreground hover:bg-surface-elevated/50 transition-colors"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isSidebarCollapsed}
          >
            {isSidebarCollapsed ? <ChevronLeft className="h-5 w-5 rotate-180" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Main menu">
          <div className="px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Main Menu
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-spring",
                pathname === item.href
                  ? "bg-brand-primary/20 text-brand-primary"
                  : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}

          {isAdmin && (
            <>
              <div className="divider my-4" />
              <div className="px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                Admin
              </div>
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-spring",
                    pathname === item.href
                      ? "bg-brand-accent/20 text-brand-accent"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar src={user?.avatar} name={user?.name} size="md" status="online" />
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <Link
              href="/profile"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <User className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!isSidebarCollapsed && <span>Profile</span>}
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Settings className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!isSidebarCollapsed && <span>Settings</span>}
            </Link>
            <button className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors text-left",
              "text-brand-danger hover:bg-brand-danger/10"
            )} onClick={() => setIsSidebarOpen(false)}>
              <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!isSidebarCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-brand-primary text-white shadow-brand flex items-center justify-center transition-all duration-300 ease-spring hover:scale-105"
        aria-label="Open menu"
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <main className="lg:ml-64 min-h-screen pt-20 lg:pt-0 transition-all duration-300 ease-spring">
        <div className="container-page py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}