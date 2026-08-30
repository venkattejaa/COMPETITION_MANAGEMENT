import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon" | "icon-sm";
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

    const variants = {
      primary: "bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-brand active:scale-[0.98]",
      secondary: "bg-surface-elevated text-foreground border border-border hover:bg-surface-elevated/80 hover:border-brand-primary/50 active:scale-[0.98]",
      ghost: "bg-transparent text-foreground hover:bg-surface-elevated/50 active:scale-[0.98]",
      danger: "bg-brand-danger text-white hover:bg-brand-danger/90 hover:shadow-[0_0_40px_-10px_rgb(239_68_68_/0.4)] active:scale-[0.98]",
      outline: "border-2 border-border text-foreground hover:border-brand-primary hover:text-brand-primary active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
      icon: "p-2.5",
      "icon-sm": "p-2",
    };

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";