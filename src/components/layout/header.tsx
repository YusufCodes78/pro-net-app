import { GlassButton } from "@/components/ui/glass-button";
import { Logo } from "@/components/ui/logo";
import { useState } from "react";
import { useAppContext } from "@/contexts/app-context";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export default function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { showProfileModal } = useAppContext();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between border-b ${isDarkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex items-center space-x-3">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </Button>
        
        <div className="relative">
          <motion.button
            onClick={toggleProfileMenu}
            className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-primary to-accent border-2 border-primary/20 transition-all duration-300 hover:scale-110"
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </motion.button>
          
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                className="absolute top-12 right-0 z-50 w-64"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Profile"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Michael Johnson</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Software Engineer at TechCorp</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className={`p-2 rounded-lg text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      <div className="text-sm font-semibold text-primary">245</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connections</div>
                    </div>
                    <div className={`p-2 rounded-lg text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      <div className="text-sm font-semibold text-accent">15</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Skills</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-2"
                    variant="default"
                    onClick={() => {
                      showProfileModal(1);
                      setShowProfileMenu(false);
                    }}
                  >
                    View Profile
                  </Button>
                  
                  <Button className="w-full" variant="outline">
                    Log Out
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
