import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateTeamCode(branch: string): string {
  const random = Math.floor(100 + Math.random() * 900);
  return `EYRC-${branch.toUpperCase().slice(0, 3)}-${random}`;
}

export function calculateLevel(xp: number): number {
  if (xp < 1000) return 1;
  if (xp < 3000) return 2;
  if (xp < 6000) return 3;
  if (xp < 10000) return 4;
  if (xp < 15000) return 5;
  if (xp < 21000) return 6;
  if (xp < 28000) return 7;
  if (xp < 36000) return 8;
  if (xp < 45000) return 9;
  return 10 + Math.floor((xp - 45000) / 10000);
}

export function getLevelThresholds(): number[] {
  return [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000];
}

export function getXpForNextLevel(currentXp: number): { current: number; next: number; progress: number } {
  const thresholds = getLevelThresholds();
  const currentLevel = calculateLevel(currentXp);
  const currentThreshold = thresholds[currentLevel - 1];
  const nextThreshold = thresholds[currentLevel] || currentThreshold + 10000;
  const progress = ((currentXp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return { current: currentThreshold, next: nextThreshold, progress: Math.min(100, Math.max(0, progress)) };
}

export function getThemeColor(themeCode: string): string {
  const colors: Record<string, string> = {
    LQ: "#6366F1",
    KD: "#10B981",
    SC: "#F59E0B",
    HE: "#EF4444",
    NV: "#8B5CF6",
    EB: "#EC4899",
    PB: "#06B6D4",
  };
  return colors[themeCode] || "#6366F1";
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    BEGINNER: "#10B981",
    INTERMEDIATE: "#F59E0B",
    ADVANCED: "#F97316",
    EXPERT: "#EF4444",
  };
  return colors[difficulty] || "#64748B";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}