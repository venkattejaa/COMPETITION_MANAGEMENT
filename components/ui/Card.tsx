import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "double-bezel" | "elevated";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    const variants = {
      default: "rounded-2xl bg-surface/50 backdrop-blur-xl border border-border/50",
      "double-bezel": "card-double-bezel",
      elevated: "rounded-2xl bg-surface/70 backdrop-blur-2xl border border-border/50 shadow-card",
    };

    const hoverStyles = hover
      ? "transition-all duration-500 ease-spring hover:border-brand-primary/50 hover:shadow-card-hover hover:-translate-y-1"
      : "";

    return (
      <div
        ref={ref}
        className={cn(variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4 border-b border-border/30", className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-heading-md font-semibold text-foreground", className)} {...props}>
      {children}
    </h3>
  )
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-body-sm text-text-secondary mt-1", className)} {...props}>
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4 border-t border-border/30 flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";