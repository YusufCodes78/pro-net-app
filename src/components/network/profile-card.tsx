import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { SkillTag } from "@/components/ui/skill-tag";
import { SwipeCard } from "@/components/ui/swipe-card";
import { Profile } from "@/data/mock-data";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/app-context";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function ProfileCard({ profile, onSwipeLeft, onSwipeRight }: ProfileCardProps) {
  const { showProfileModal } = useAppContext();
  const isMobile = useIsMobile();

  const skillVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 + (i * 0.05),
        duration: 0.3
      }
    })
  };

  return (
    <SwipeCard
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      className="overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
      
      {profile.avatar ? (
        <img 
          src={profile.avatar} 
          alt={`${profile.fullName}'s profile`}
          className="object-cover w-full h-full transition-transform duration-10000 hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
          <span className="text-6xl font-bold opacity-30">{profile.fullName.charAt(0)}</span>
        </div>
      )}
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-5 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-end justify-between">
          <div className="w-full">
            <div className="flex justify-between items-center mb-1 flex-wrap md:flex-nowrap gap-2">
              <h3 className={`font-bold text-white ${isMobile ? "text-xl" : "text-2xl"}`}>{profile.fullName}</h3>
              <GlassButton
                size="xs" 
                variant="primary" 
                className="h-8 shrink-0"
                onClick={() => {
                  showProfileModal(profile.id);
                }}
              >
                <i className="icon ion-md-information-circle mr-1"></i>
                Details
              </GlassButton>
            </div>
            <p className="text-gray-200 mb-3 text-sm md:text-base">{profile.title} at {profile.company}</p>
            
            <div className="flex flex-wrap gap-2 mb-4 max-h-24 overflow-y-auto custom-scrollbar">
              {profile.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={skillVariants}
                  initial="initial"
                  animate="animate"
                >
                  <SkillTag variant="filled">{skill}</SkillTag>
                </motion.div>
              ))}
            </div>
            
            <div className={`flex ${isMobile ? "flex-col space-y-2" : "flex-row items-center"} text-sm bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg`}>
              <span className="flex items-center">
                <i className="icon ion-md-school mr-1 text-secondary"></i> {profile.experience} years exp.
              </span>
              {!isMobile && <span className="mx-2 text-white/30">•</span>}
              <span className="flex items-center">
                <i className="icon ion-md-pin mr-1 text-accent"></i> {profile.location}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={`absolute top-4 ${isMobile ? "right-2" : "right-4"} px-3 py-1 rounded-full text-xs z-20 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg flex items-center`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <i className="icon ion-md-git-network mr-1 text-primary"></i>
        <span>{profile.mutualConnections} mutual connections</span>
      </motion.div>
      
      <motion.div 
        className={`absolute ${isMobile ? "bottom-[5.5rem] right-2" : "bottom-24 right-4"} px-3 py-2 z-20 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md rounded-full flex items-center`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <i className="icon ion-md-hand text-white mr-2"></i>
        <span className="text-xs font-medium">Swipe right to connect</span>
      </motion.div>
    </SwipeCard>
  );
}
