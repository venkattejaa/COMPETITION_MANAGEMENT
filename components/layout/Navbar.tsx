"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Users, Trophy, BookOpen, LayoutDashboard, LogOut, User, Settings, Bell, ChevronDown, Bot } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/themes", label: "Themes", icon: Bot },
  { href: "/forum", label: "Forum", icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { href: "/admin/announcements", label: "Announcements", icon: Bell },
  { href: "/admin/analytics", label: "Analytics", icon: BookOpen },
];

export function Navbar({ user, isAdmin }: { user: any; isAdmin: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={cn("fixed top-6 left-1/2 -translate-x-1/2 z-layer-sticky w-full max-w-[1400px] px-4 transition-all duration-500 ease-spring", isScrolled ? "top-4" : "top-6")}>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex h-16 items-center justify-between gap-4 rounded-full bg-surface/50 backdrop-blur-2xl border border-border/30 px-4 md:px-6"
        style={{ boxShadow: "0 4px 24px 0 rgb(0 0 0 / 0.2), 0 1px 2px 0 rgb(0 0 0 / 0.1)" }}
      >
        <Link href="/dashboard" className="flex items-center gap-2" aria-label="eYRC Command Center">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary">
            <Bot className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="hidden font-display font-bold text-xl text-foreground sm:block">eYRC</span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-spring",
                pathname === item.href
                  ? "bg-brand-primary text-white shadow-brand"
                  : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="hidden md:flex md:items-center md:gap-1 border-l border-border/30 pl-2 ml-2">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-spring",
                    pathname === item.href
                      ? "bg-brand-accent/20 text-brand-accent border border-brand-accent/30"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
                  )}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-text-secondary transition-all duration-300 ease-spring hover:text-foreground hover:bg-surface-elevated/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="relative h-8 w-8 rounded-full bg-brand-primary/20 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-brand-primary font-semibold">{user?.name?.charAt(0).toUpperCase()}</span>
                )}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-brand-secondary border-2 border-surface" aria-hidden="true" />
              </div>
              <span className="hidden sm:block max-w-[120px] truncate">{user?.name}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isProfileOpen && "rotate-180")} aria-hidden="true" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface/90 backdrop-blur-2xl border border-border/50 shadow-card-hover p-2"
                  style={{ boxShadow: "0 20px 40px -12px rgb(0 0 0 / 0.4)" }}
                >
                  <div className="px-3 py-2 border-b border-border/30">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-text-muted truncate">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge-primary">{user?.role}</span>
                      {user?.level && <span className="badge-accent">Level {user.level}</span>}
                    </div>
                  </div>
                  <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-surface-elevated/50 transition-colors">
                    <User className="h-4 w-4" aria-hidden="true" />
                    Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-surface-elevated/50 transition-colors">
                    <Settings className="h-4 w-4" aria-hidden="true" />
                    Settings
                  </Link>
                  <div className="divider my-2" />
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-brand-danger hover:bg-brand-danger/10 transition-colors">
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-foreground hover:bg-surface-elevated/50"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-4 right-4 top-full mt-4 rounded-2xl bg-surface/90 backdrop-blur-2xl border border-border/50 py-4 md:hidden"
            style={{ boxShadow: "0 20px 40px -12px rgb(0 0 0 / 0.4)" }}
          >
            <div className="flex flex-col gap-1 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-brand-primary/20 text-brand-primary"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {isAdmin && (
                <>
                  <div className="divider my-2" />
                  <p className="px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Admin</p>
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-brand-accent/20 text-brand-accent"
                          : "text-text-secondary hover:text-foreground hover:bg-surface-elevated/50"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}