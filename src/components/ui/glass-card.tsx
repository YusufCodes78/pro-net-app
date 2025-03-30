import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "primary" | "accent" | "success";
  hover?: boolean;
  animation?: "pulse" | "float" | "shimmer" | "fadeIn" | "none";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function GlassCard({ 
  children, 
  className, 
  variant = "default",
  hover = false,
  animation = "none",
  onMouseEnter,
  onMouseLeave
}: GlassCardProps) {
  const baseClasses = "rounded-2xl backdrop-blur-md transition-all duration-300";
  
  const variantClasses = {
    "default": "glass hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]",
    "dark": "glass-dark hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
    "primary": "bg-primary/10 border border-primary/20 hover:bg-primary/15 hover:shadow-[0_0_25px_rgba(var(--primary),0.15)]",
    "accent": "bg-accent/10 border border-accent/20 hover:bg-accent/15 hover:shadow-[0_0_25px_rgba(var(--accent),0.15)]",
    "success": "bg-success/10 border border-success/20 hover:bg-success/15 hover:shadow-[0_0_25px_rgba(var(--success),0.15)]"
  };
  
  const hoverClasses = hover ? "hover:-translate-y-1 hover:scale-[1.02]" : "";
  
  const animationClasses = {
    "pulse": "animate-pulse",
    "float": "animate-float",
    "shimmer": "animate-shimmer",
    "fadeIn": "animate-fadeIn",
    "none": ""
  };
  
  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        animationClasses[animation],
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
