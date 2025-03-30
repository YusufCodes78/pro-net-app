import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkillTagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "filled" | "primary" | "accent" | "success";
  animated?: boolean;
  onClick?: () => void;
}

export function SkillTag({ 
  children, 
  className,
  variant = "default",
  animated = false,
  onClick
}: SkillTagProps) {
  const variantClasses = {
    "default": "glass hover:bg-white/10",
    "filled": "bg-white/10 hover:bg-white/15",
    "primary": "bg-primary/20 text-primary-foreground hover:bg-primary/30 border border-primary/30",
    "accent": "bg-accent/20 text-accent-foreground hover:bg-accent/30 border border-accent/30",
    "success": "bg-success/20 text-success-foreground hover:bg-success/30 border border-success/30"
  };

  const baseClass = "skill-tag px-3 py-1 rounded-full text-xs backdrop-blur-sm transition-all duration-300";
  
  const TagComponent = animated ? motion.span : "span";
  
  const animationProps = animated ? {
    whileHover: { y: -3, scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 500, damping: 10 }
  } : {};
  
  return (
    <TagComponent
      className={cn(
        baseClass,
        variantClasses[variant],
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </TagComponent>
  );
}
