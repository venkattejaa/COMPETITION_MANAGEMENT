import { HTMLAttributes, forwardRef } from "react";
import { cn, getInitials } from "@/lib/utils";

const avatarSizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "away" | "offline";
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = "md", status, ...props }, ref) => {
    const statusSizes = {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
    };

    const statusColors = {
      online: "bg-emerald-500",
      away: "bg-amber-500",
      offline: "bg-slate-400",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 shadow-sm", avatarSizes[size], className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="aspect-square h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F05438]/10 text-[#F05438] font-bold" style={{ fontSize: size === "sm" ? "0.7rem" : size === "md" ? "0.8rem" : size === "lg" ? "0.95rem" : "1.2rem" }}>
            {name ? getInitials(name) : "?"}
          </div>
        )}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-zinc-900",
              statusSizes[size],
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { max?: number }>(
  ({ className, children, max = 4, ...props }, ref) => {
    const kids = Array.isArray(children) ? children : [children];
    const visibleChildren = kids.slice(0, max);
    const remainingCount = kids.length - max;

    return (
      <div ref={ref} className={cn("flex -space-x-2.5 items-center", className)} {...props}>
        {visibleChildren.map((child, index) => (
          <span key={index} className="relative z-10 border-2 border-white dark:border-[#121215] rounded-full">
            {child}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="relative z-0 flex items-center justify-center rounded-full bg-slate-200 dark:bg-zinc-800 border-2 border-white dark:border-[#121215] h-8 w-8 text-[10px] font-black text-slate-700 dark:text-zinc-300">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";