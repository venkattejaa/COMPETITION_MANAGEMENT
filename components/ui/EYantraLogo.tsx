"use client";

import { cn } from "@/lib/utils";

interface EYantraLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function EYantraLogo({ className, size = "md", showText = true }: EYantraLogoProps) {
  const sizeMap = {
    sm: { icon: "h-7 w-7 rounded-lg text-sm", text: "text-base", sub: "text-[10px]" },
    md: { icon: "h-8 w-8 rounded-xl text-base", text: "text-lg", sub: "text-[11px]" },
    lg: { icon: "h-10 w-10 rounded-xl text-xl", text: "text-2xl", sub: "text-xs" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2.5 select-none group", className)}>
      {/* Official e-Yantra Coral Square Icon */}
      <div
        className={cn(
          "bg-[#F05438] flex items-center justify-center font-extrabold text-white shadow-md shadow-[#F05438]/25 group-hover:scale-105 transition-transform duration-300 flex-shrink-0 font-sans tracking-tighter",
          currentSize.icon
        )}
      >
        e
      </div>

      {/* Official eYRC Text */}
      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={cn("font-black tracking-tight text-slate-900 dark:text-white", currentSize.text)}>
            eYRC
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F05438]/10 text-[#F05438] border border-[#F05438]/20 dark:bg-[#F05438]/20 dark:text-[#FF6B4A]">
            2026-27
          </span>
        </div>
      )}
    </div>
  );
}

export default EYantraLogo;
