import { GlassButton } from "@/components/ui/glass-button";
import { motion } from "framer-motion";

interface SwipeControlsProps {
  onSkip: () => void;
  onInfo: () => void;
  onConnect: () => void;
}

export function SwipeControls({ onSkip, onInfo, onConnect }: SwipeControlsProps) {
  return (
    <div className="swipe-buttons flex justify-center items-center gap-3 py-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GlassButton 
          variant="default" 
          className="px-6 border border-red-500/30"
          onClick={onSkip}
          icon={<i className="icon ion-md-close text-red-500"></i>}
        >
          Skip
        </GlassButton>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GlassButton 
          variant="default" 
          className="px-6 border border-primary/30"
          onClick={onInfo}
          icon={<i className="icon ion-md-information-circle-outline text-primary"></i>}
        >
          Profile
        </GlassButton>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GlassButton 
          variant="default" 
          className="px-6 border border-green-500/30"
          onClick={onConnect}
          icon={<i className="icon ion-md-checkmark text-green-500"></i>}
        >
          Connect
        </GlassButton>
      </motion.div>
    </div>
  );
}
