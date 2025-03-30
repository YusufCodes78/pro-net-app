import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwipeCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function SwipeCard({
  children,
  className,
  onSwipeLeft,
  onSwipeRight
}: SwipeCardProps) {
  const [exitX, setExitX] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -200, 0, 200, 300], [0, 1, 1, 1, 0]);
  
  const leftIndicatorOpacity = useTransform(x, [-150, -75, 0], [1, 0.5, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 75, 150], [0, 0.5, 1]);
  
  const left = {
    backgroundColor: "rgba(255, 75, 75, 0.2)",
    borderColor: "rgba(255, 75, 75, 0.6)"
  };
  
  const right = {
    backgroundColor: "rgba(75, 255, 139, 0.2)",
    borderColor: "rgba(75, 255, 139, 0.6)"
  };
  
  // Background color based on swipe direction
  const bgColor = useTransform(
    x,
    [-150, 0, 150],
    [
      "rgba(255, 75, 75, 0.15)",
      "rgba(0, 0, 0, 0)",
      "rgba(75, 255, 139, 0.15)"
    ]
  );
  
  const borderColor = useTransform(
    x,
    [-150, 0, 150],
    [
      "rgba(255, 75, 75, 0.3)",
      "rgba(255, 255, 255, 0.1)",
      "rgba(75, 255, 139, 0.3)"
    ]
  );
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isAnimating) return;
    
    const threshold = 100;
    
    if (info.offset.x < -threshold) {
      setIsAnimating(true);
      setExitX(-window.innerWidth);
      onSwipeLeft && setTimeout(onSwipeLeft, 200);
    } else if (info.offset.x > threshold) {
      setIsAnimating(true);
      setExitX(window.innerWidth);
      onSwipeRight && setTimeout(onSwipeRight, 200);
    }
  };
  
  // Reset card position
  useEffect(() => {
    const resetCard = () => {
      if (exitX !== 0) {
        setExitX(0);
        setIsAnimating(false);
        x.set(0);
      }
    };
    
    // Reset the card after animation completes
    const timeoutId = exitX !== 0 ? setTimeout(resetCard, 500) : undefined;
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [exitX, x]);
  
  return (
    <div className="relative h-full w-full">
      <AnimatePresence>
        <motion.div
          ref={cardRef}
          className={cn(
            "swipe-card absolute inset-0 rounded-3xl overflow-hidden shadow-xl",
            "border transition-colors", 
            className
          )}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ 
            x, 
            rotate, 
            opacity,
            backgroundColor: bgColor,
            borderColor: borderColor
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: exitX }}
          transition={{ 
            type: "spring", 
            bounce: 0.2,
            duration: 0.5
          }}
          whileTap={{ cursor: "grabbing", scale: 0.98 }}
        >
          {children}
          
          {/* Swipe indicators */}
          <motion.div 
            className="absolute top-8 left-8 px-4 py-2 rounded-lg bg-red-500/80 backdrop-blur-sm border border-red-400 flex items-center"
            style={{ opacity: leftIndicatorOpacity }}
          >
            <i className="icon ion-md-close text-white mr-2"></i>
            <span className="text-white font-medium">Skip</span>
          </motion.div>
          
          <motion.div 
            className="absolute top-8 right-8 px-4 py-2 rounded-lg bg-green-500/80 backdrop-blur-sm border border-green-400 flex items-center"
            style={{ opacity: rightIndicatorOpacity }}
          >
            <span className="text-white font-medium">Connect</span>
            <i className="icon ion-md-checkmark text-white ml-2"></i>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-4 pointer-events-none z-30">
        <div className="text-xs text-white/60 flex items-center">
          <i className="icon ion-md-arrow-back mr-1"></i>
          Swipe left to skip
        </div>
        <div className="text-xs text-white/60 flex items-center">
          Swipe right to connect
          <i className="icon ion-md-arrow-forward ml-1"></i>
        </div>
      </div>
    </div>
  );
}
