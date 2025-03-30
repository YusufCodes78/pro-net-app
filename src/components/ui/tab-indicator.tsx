import { cn } from "@/lib/utils";

interface TabIndicatorProps {
  position: number;
  count: number;
  className?: string;
}

export function TabIndicator({ 
  position, 
  count, 
  className 
}: TabIndicatorProps) {
  const translateX = position * (100 / count);
  
  return (
    <div 
      className={cn(
        "tab-indicator absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent",
        className
      )}
      style={{ 
        width: `${100 / count}%`, 
        transform: `translateX(${translateX}%)` 
      }}
    />
  );
}
