import { HTMLAttributes, forwardRef } from "react";
import { cn, getInitials } from "@/lib/utils";

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
      online: "bg-brand-secondary",
      away: "bg-brand-accent",
      offline: "bg-text-muted",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex shrink-0 overflow-hidden rounded-full bg-surface-elevated", avatarSizes[size], className)}
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
          <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary font-semibold" style={{ fontSize: size === "sm" ? "0.75rem" : size === "md" ? "0.875rem" : size === "lg" ? "1rem" : "1.25rem" }}>
            {name ? getInitials(name) : "?"}
          </div>
        )}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-surface",
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

const avatarSizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { max?: number }>(
  ({ className, children, max = 5, ...props }, ref) => {
    const kids = Array.isArray(children) ? children : [children];
    const visibleChildren = kids.slice(0, max);
    const remainingCount = kids.length - max;

    return (
      <div ref={ref} className={cn("flex -space-x-2", className)} {...props}>
        {visibleChildren.map((child, index) => (
          <span key={index} className="relative z-[calc(100_-_index)]">
            {child}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className={cn("relative z-0 flex items-center justify-center rounded-full bg-surface-elevated border-2 border-surface", avatarSizes.md)}>
            <span className="text-xs font-medium text-text-secondary">+{remainingCount}</span>
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";