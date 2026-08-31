"use client";

import { cn } from "@/lib/utils";

interface EYantraLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function EYantraLogo({ className, size = "md", showText = true }: EYantraLogoProps) {
  const sizeMap = {
    sm: { icon: "h-7 w-7", text: "text-base", sub: "text-[9px]" },
    md: { icon: "h-9 w-9", text: "text-lg", sub: "text-[10px]" },
    lg: { icon: "h-12 w-12", text: "text-2xl", sub: "text-xs" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3 select-none group", className)}>
      {/* Brand Icon Badge */}
      <div
        className={cn(
          "rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300 flex-shrink-0",
          currentSize.icon
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3/5 h-3/5 text-white"
        >
          {/* Robot Gear / e-Yantra Symbol */}
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <circle cx="12" cy="12" r="5" className="fill-white/20" />
          <circle cx="12" cy="12" r="2.5" className="fill-white" />
          <path d="m4.93 4.93 2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1">
            <span className={cn("font-extrabold tracking-tight text-slate-900 dark:text-white", currentSize.text)}>
              e-Yantra
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
          </div>
          <span className={cn("font-bold tracking-wider uppercase text-orange-600 dark:text-orange-400", currentSize.sub)}>
            eYRC Command Center
          </span>
        </div>
      )}
    </div>
  );
}

export default EYantraLogo;
