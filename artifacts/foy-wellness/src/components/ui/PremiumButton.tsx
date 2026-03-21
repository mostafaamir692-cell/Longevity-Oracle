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
      primary: "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:shadow-[0_0_30px_rgba(13,148,136,0.6)] hover:bg-primary/90 border border-primary/50",
      secondary: "bg-card text-foreground shadow-lg hover:shadow-xl hover:bg-card/80 border border-border/50 hover:border-primary/50",
      outline: "bg-transparent text-primary border border-primary hover:bg-primary/10 shadow-[0_0_15px_rgba(13,148,136,0.1)] hover:shadow-[0_0_20px_rgba(13,148,136,0.3)]",
      ghost: "bg-transparent text-foreground hover:bg-white/5 border border-transparent",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "relative overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Button Hover Glow Effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        
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
