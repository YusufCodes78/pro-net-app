import { cn } from "@/lib/utils";
import { useState } from "react";

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "circle";
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function GlassButton({ 
  children, 
  className,
  onClick,
  type = "button",
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left"
}: GlassButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = "backdrop-blur-md transition-all duration-300 flex items-center justify-center";
  
  const variantClasses = {
    "default": "glass hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:bg-white/10",
    "primary": "bg-primary/20 border border-primary/30 text-primary-foreground hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)] active:bg-primary/40",
    "accent": "bg-accent/20 border border-accent/30 text-accent-foreground hover:bg-accent/30 hover:shadow-[0_0_15px_rgba(var(--accent),0.2)] active:bg-accent/40",
    "success": "bg-success/20 border border-success/30 text-success-foreground hover:bg-success/30 hover:shadow-[0_0_15px_rgba(var(--success),0.2)] active:bg-success/40",
    "warning": "bg-warning/20 border border-warning/30 text-warning-foreground hover:bg-warning/30 hover:shadow-[0_0_15px_rgba(var(--warning),0.2)] active:bg-warning/40",
    "circle": "glass h-14 w-14 rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:bg-white/10",
  };
  
  const sizeClasses = {
    "xs": "px-2 py-1 text-xs rounded-lg gap-1",
    "sm": "px-3 py-1.5 text-sm rounded-xl gap-1.5",
    "md": "px-4 py-2 text-base rounded-xl gap-2",
    "lg": "px-6 py-3 text-lg rounded-2xl gap-2"
  };

  // For circle variant, size is handled differently
  const circleSize = variant === "circle" ? "h-14 w-14 rounded-full" : "";
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  
  const hoverEffect = !disabled && !loading ? "hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95" : "";
  
  const loadingAnimation = loading 
    ? "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer" 
    : "";
  
  // Handle icon positioning and loading state
  let content = children;
  if (loading) {
    content = (
      <>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {children}
      </>
    );
  } else if (icon) {
    content = (
      <>
        {iconPosition === "left" && <span className="icon-container">{icon}</span>}
        <span>{children}</span>
        {iconPosition === "right" && <span className="icon-container">{icon}</span>}
      </>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        baseClasses,
        variantClasses[variant],
        variant !== "circle" ? sizeClasses[size] : circleSize,
        disabledClasses,
        hoverEffect,
        loadingAnimation,
        className
      )}
    >
      {content}
    </button>
  );
}
