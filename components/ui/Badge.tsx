import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "outline" | "default";
  size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-brand-primary/15 text-brand-primary border border-brand-primary/30",
      secondary: "bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/30",
      accent: "bg-brand-accent/15 text-brand-accent border border-brand-accent/30",
      danger: "bg-brand-danger/15 text-brand-danger border border-brand-danger/30",
      outline: "border-border text-text-secondary",
      default: "bg-surface-elevated text-foreground border border-border",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-xs",
      lg: "px-4 py-1.5 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "outline" | "default";
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      primary: "bg-brand-primary/15 text-brand-primary",
      secondary: "bg-brand-secondary/15 text-brand-secondary",
      accent: "bg-brand-accent/15 text-brand-accent",
      danger: "bg-brand-danger/15 text-brand-danger",
      outline: "border-border text-text-secondary",
      default: "bg-surface-elevated text-text-secondary border border-border",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.15em]",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";