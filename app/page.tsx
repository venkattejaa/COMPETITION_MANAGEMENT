"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, ArrowRight, Users, Trophy, BookOpen, Zap, Shield, Clock, CheckCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Users,
    title: "Team Management",
    description: "Create teams, invite members, track progress, and manage theme assignments with automated workflows.",
  },
  {
    icon: BookOpen,
    title: "Theme Roadmaps",
    description: "Structured learning paths for all 7 eYRC themes with curated resources, milestones, and checkpoints.",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    description: "XP system, leaderboards, badges, and streaks to keep teams motivated throughout the competition.",
  },
  {
    icon: Zap,
    title: "Real-time Forum",
    description: "Peer-to-peer Q&A with threaded discussions, voting, best answers, and instant notifications.",
  },
  {
    icon: Shield,
    title: "Coordinator Dashboard",
    description: "Bird's-eye view of all teams, risk detection, bulk actions, and automated deadline alerts.",
  },
  {
    icon: Clock,
    title: "Timeline & Deadlines",
    description: "Competition timeline visualization with countdown timers and milestone tracking.",
  },
];

const stats = [
  { value: "7", label: "eYRC Themes" },
  { value: "200+", label: "Students Supported" },
  { value: "50+", label: "Teams Managed" },
  { value: "100%", label: "Automation" },
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 flex flex-wrap items-center gap-2"
              >
                <span className="badge-primary">eYRC 2026-27 Season</span>
                <span className="badge-secondary">Registration Open</span>
                <span className="badge-accent">7 Themes</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="text-display-xl font-display font-bold text-foreground leading-none tracking-tight mb-6"
              >
                Command Center for{" "}
                <span className="text-gradient">e-Yantra Robotics</span>{" "}
                <br />
                Competition Teams
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-body-lg text-text-secondary max-w-xl mb-8 leading-relaxed"
              >
                Transform fragmented WhatsApp groups and scattered spreadsheets into a structured, 
                game-like platform that drives teams toward the National Finale at IIT Bombay.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button size="lg" asChild>
                  <Link href="/login">
                    <span>Get Started Free</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/themes">
                    Explore Themes
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mt-12 flex flex-wrap items-center gap-8 text-sm"
              >
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="text-display-sm font-display font-bold text-gradient">{stat.value}</span>
                    <span className="text-text-secondary">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/20 rounded-[3rem] blur-3xl" aria-hidden="true" />
                <div className="relative rounded-[3rem] bg-surface/30 backdrop-blur-2xl border border-border/30 p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Bot className="h-24 w-24 mx-auto mb-6 text-brand-primary/50" aria-hidden="true" />
                    <h3 className="text-heading-lg font-semibold text-foreground mb-2">Dashboard Preview</h3>
                    <p className="text-text-secondary text-sm mb-6 max-w-xs mx-auto">Real-time team progress, XP, deadlines, and forum activity</p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/30">
                        <div className="text-2xl font-bold text-brand-primary">1,247</div>
                        <div className="text-xs text-text-muted">Total XP</div>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/30">
                        <div className="text-2xl font-bold text-brand-secondary">87%</div>
                        <div className="text-xs text-text-muted">Progress</div>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/30">
                        <div className="text-2xl font-bold text-brand-accent">12</div>
                        <div className="text-xs text-text-muted">Days Left</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 hidden lg:block">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="card-double-bezel p-4 max-w-xs"
                >
                  <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse" aria-hidden="true" />
                      <span className="text-xs font-medium text-brand-secondary">Live Activity</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Team Alpha</span>
                        <span className="text-brand-primary font-medium">+50 XP</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Priya S.</span>
                        <span className="text-brand-secondary font-medium">Best Answer</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Team Beta</span>
                        <span className="text-brand-accent font-medium">Task Submitted</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-xl bg-surface/30 backdrop-blur-xl border-y border-border/30">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-foreground mb-4">Everything you need to win eYRC</h2>
            <p className="text-body-lg text-text-secondary">A complete ecosystem designed for coordinators, team leaders, and members to collaborate, learn, and compete effectively.</p>
          </motion.div>

          <div className="grid-bento-3">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="card-double-bezel group"
              >
                <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 h-full transition-all duration-500 ease-spring hover:border-brand-primary/50 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="relative h-12 w-12 rounded-xl bg-brand-primary/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 ease-spring">
                    <feature.icon className="h-6 w-6 text-brand-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-heading-md font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-body text-text-secondary">{feature.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-xl">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-foreground mb-4">The 7 eYRC Themes</h2>
            <p className="text-body-lg text-text-secondary">Each theme offers unique challenges from beginner-friendly maze solving to expert-level multi-robot coordination.</p>
          </motion.div>

          <div className="grid-bento-4 max-w-6xl mx-auto">
            {[
              { code: "PB", name: "PacBot", tagline: "Maze-solving with game theory", difficulty: "BEGINNER", color: "#06B6D4" },
              { code: "NV", name: "Niti Vahan", tagline: "Autonomous vehicle navigation", difficulty: "INTERMEDIATE", color: "#8B5CF6" },
              { code: "LQ", name: "Logic Quest", tagline: "RFID decryption & path planning", difficulty: "INTERMEDIATE", color: "#6366F1" },
              { code: "EB", name: "Echo Balancer", tagline: "Self-balancing two-wheel robot", difficulty: "INTERMEDIATE", color: "#EC4899" },
              { code: "KD", name: "Khoj-o-Drone", tagline: "Autonomous survivor search drone", difficulty: "ADVANCED", color: "#10B981" },
              { code: "SC", name: "Strata Cobot", tagline: "Mobile base + robotic arm", difficulty: "ADVANCED", color: "#F59E0B" },
              { code: "HE", name: "Hola The Explorer", tagline: "3-robot coordinated exploration", difficulty: "EXPERT", color: "#EF4444" },
            ].map((theme, index) => (
              <motion.article
                key={theme.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                className="card-double-bezel group relative overflow-hidden"
              >
                <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-5 h-full transition-all duration-500 ease-spring hover:border-brand-primary/50 hover:shadow-card-hover hover:-translate-y-1 relative">
                  <div className="absolute top-4 right-4 h-3 w-3 rounded-full" style={{ backgroundColor: theme.color }} aria-hidden="true" />
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.color}20` }}>
                      <span className="text-xl font-bold" style={{ color: theme.color }}>{theme.code}</span>
                    </div>
                    <div>
                      <h3 className="text-heading-sm font-bold text-foreground">{theme.name}</h3>
                      <p className="text-caption text-text-muted uppercase tracking-wide">{theme.difficulty}</p>
                    </div>
                  </div>
                  <p className="text-body-sm text-text-secondary mb-4">{theme.tagline}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/themes/${theme.code}`}>
                      Explore Theme
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-xl bg-surface/30 backdrop-blur-xl border-y border-border/30">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display font-bold text-foreground mb-4">Ready to lead your team to victory?</h2>
            <p className="text-body-lg text-text-secondary mb-8">Join hundreds of students already using the platform. Free for college teams. Setup in minutes.</p>
          </motion.div>

          <div className="card-double-bezel">
            <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-8 md:p-12 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/login">
                    <span>Start Free - No Credit Card</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/themes">
                    Browse All Themes
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-text-muted">By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/30 py-12 md:py-16">
        <div className="container-page">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="eYRC Command Center Home">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-xl text-foreground">eYRC</span>
              </Link>
              <p className="text-body text-text-secondary max-w-sm mb-6">
                The ultimate command center for e-Yantra Robotics Competition teams. 
                Manage, mentor, and gamify the journey to the National Finale at IIT Bombay.
              </p>
              <div className="flex gap-6 text-sm text-text-muted">
                <span>© 2026 eYRC Command Center</span>
                <span>Not affiliated with IIT Bombay</span>
              </div>
            </div>

            <nav>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/themes" className="hover:text-brand-primary transition-colors">Themes</Link></li>
                <li><Link href="/forum" className="hover:text-brand-primary transition-colors">Forum</Link></li>
                <li><Link href="/leaderboard" className="hover:text-brand-primary transition-colors">Leaderboard</Link></li>
                <li><Link href="/resources" className="hover:text-brand-primary transition-colors">Resources</Link></li>
              </ul>
            </nav>

            <nav>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/docs" className="hover:text-brand-primary transition-colors">Documentation</Link></li>
                <li><Link href="/faq" className="hover:text-brand-primary transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}