import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  title: string;
  level: number;
  className?: string;
}

export function AchievementCard({ title, level, className }: AchievementCardProps) {
  // Calculate the width percentage based on level (1-5)
  const levelPercentage = Math.min(Math.max(level, 1), 5) * 20;
  
  return (
    <div className={cn("glass-dark rounded-xl p-3", className)}>
      <div className="flex items-center text-accent text-sm font-medium mb-2">
        <i className="icon ion-md-trophy mr-2"></i>
        <span>New Skill Achievement</span>
      </div>
      
      <div className="flex items-center">
        <div className="h-2 flex-grow rounded-full bg-secondary overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${levelPercentage}%` }}
          ></div>
        </div>
        <span className="ml-2 text-xs font-medium">Level {level}</span>
      </div>
      
      <h5 className="font-semibold mt-2">{title}</h5>
    </div>
  );
}
