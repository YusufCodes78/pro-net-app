import { useState, useEffect } from "react";
import { ProfileCard } from "@/components/network/profile-card";
import { SwipeControls } from "@/components/network/swipe-controls";
import { useAppContext } from "@/contexts/app-context";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

export default function NetworkTab() {
  const { profiles, showProfileModal, connections, incrementConnections } = useAppContext();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [outOfCards, setOutOfCards] = useState(false);
  
  // Check screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Check if there are any profiles left
  useEffect(() => {
    if (currentIndex >= profiles.length) {
      setOutOfCards(true);
    } else {
      setOutOfCards(false);
    }
  }, [currentIndex, profiles.length]);
  
  // Skip to the next profile
  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      toast({
        title: "Skipped",
        description: `You skipped ${profiles[currentIndex].fullName}`,
        variant: "destructive",
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      setOutOfCards(true);
    }
  };
  
  // Show more information
  const handleInfo = () => {
    if (!outOfCards) {
      showProfileModal(profiles[currentIndex].id);
    }
  };
  
  // Connect with the current profile
  const handleConnect = () => {
    if (currentIndex < profiles.length - 1) {
      toast({
        title: "Connected!",
        description: `You connected with ${profiles[currentIndex].fullName}`,
        variant: "default",
      });
      incrementConnections();
      setCurrentIndex(currentIndex + 1);
    } else {
      setOutOfCards(true);
    }
  };
  
  // Reset the card stack
  const handleReset = () => {
    setCurrentIndex(0);
    setOutOfCards(false);
    toast({
      title: "Cards Reset",
      description: "Starting from the beginning",
    });
  };
  
  return (
    <div className="p-4 max-w-screen-lg mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <motion.h2 
          className="text-lg font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Connect with Professionals
        </motion.h2>
      </div>
      
      {/* Stats bar */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <GlassCard className="flex-1 p-2 flex items-center justify-center text-center">
          <div>
            <div className="text-sm opacity-70">Connections</div>
            <div className="text-lg font-bold text-primary">{connections}</div>
          </div>
        </GlassCard>
        <GlassCard className="flex-1 p-2 flex items-center justify-center text-center">
          <div>
            <div className="text-sm opacity-70">Profile Views</div>
            <div className="text-lg font-bold text-accent">{currentIndex * 4 + 12}</div>
          </div>
        </GlassCard>
        <GlassCard className="flex-1 p-2 flex items-center justify-center text-center">
          <div>
            <div className="text-sm opacity-70">Remaining</div>
            <div className="text-lg font-bold">{profiles.length - currentIndex}</div>
          </div>
        </GlassCard>
      </div>
      
      {/* Swipe Card Stack */}
      <div className={`relative ${isMobile ? "h-[460px]" : "h-[550px]"} mb-6`}>
        <AnimatePresence>
          {outOfCards ? (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8 w-full max-w-md">
                <i className="icon ion-md-checkmark-circle text-5xl text-success mb-4 block"></i>
                <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
                <p className="opacity-70 mb-6">You've viewed all available profiles for now. Check back later for more connections.</p>
                <GlassButton 
                  variant="primary" 
                  className="w-full"
                  onClick={handleReset}
                >
                  Start Over
                </GlassButton>
              </GlassCard>
            </motion.div>
          ) : (
            profiles.slice(currentIndex, currentIndex + 2).map((profile, index) => (
              <motion.div 
                key={profile.id} 
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, zIndex: index === 0 ? 10 : 5 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileCard
                  profile={profile}
                  onSwipeLeft={handleSkip}
                  onSwipeRight={handleConnect}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {/* Swipe Buttons */}
      {!outOfCards && (
        <SwipeControls
          onSkip={handleSkip}
          onInfo={handleInfo}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}
