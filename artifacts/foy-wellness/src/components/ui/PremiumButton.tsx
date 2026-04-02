import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

    const variants = {
      primary: "bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md border border-primary",
      secondary: "bg-foreground text-white shadow-sm hover:bg-foreground/90 border border-foreground",
      outline: "bg-transparent text-primary border border-primary hover:bg-primary/6",
      ghost: "bg-transparent text-foreground hover:bg-foreground/5 border border-transparent",
    };

    const sizes = {
      sm: "px-4 py-2 text-[13px]",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "relative rounded-full font-medium tracking-wide transition-all duration-250 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : null}
          {children}
        </span>
      </button>
    );
  }
);
PremiumButton.displayName = "PremiumButton";
