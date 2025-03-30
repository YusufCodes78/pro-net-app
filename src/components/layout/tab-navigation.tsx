import { useAppContext } from "@/contexts/app-context";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Users, Newspaper, MapPin, Briefcase, BarChart } from "lucide-react";

export default function TabNavigation() {
  const { activeTab, setActiveTab } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile
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
  
  const tabs = [
    { id: "network", icon: Users, label: "Network" },
    { id: "feed", icon: Newspaper, label: "Feed" },
    { id: "nearby", icon: MapPin, label: "Nearby" },
    { id: "jobs", icon: Briefcase, label: "Jobs" },
    { id: "insights", icon: BarChart, label: "Insights" }
  ];
  
  return (
    <div className="sticky top-16 z-40 dark:bg-black bg-white border-b dark:border-white/10 border-black/10">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative">
          <div className="flex items-center justify-between md:justify-start p-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "relative flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all w-full",
                    "md:flex-1 md:justify-center",
                    isActive 
                      ? "dark:text-white text-black" 
                      : "dark:text-gray-400 text-gray-600 hover:dark:text-white/90 hover:text-black",
                  )}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 dark:bg-primary/20 bg-primary/10 rounded-lg dark:border-primary/30 border-primary/20 border"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    animate={{ 
                      scale: isActive ? 1.2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                  
                  <span className={cn(
                    "font-medium whitespace-nowrap relative z-10 min-w-0 text-center",
                    isMobile ? "text-xs" : "text-sm", 
                  )}>
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
