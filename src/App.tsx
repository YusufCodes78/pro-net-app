import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import TabNavigation from "@/components/layout/tab-navigation";
import NetworkTab from "@/pages/network-tab";
import FeedTab from "@/pages/feed-tab";
import NearbyTab from "@/pages/nearby-tab";
import JobsTab from "@/pages/jobs-tab";
import NotFound from "@/pages/not-found";
import InsightsTab from "@/pages/insights-tab";
import { ProfileModal } from "@/components/modals/profile-modal";
import { AppProvider, useAppContext } from "@/contexts/app-context";
import { useState, useEffect } from "react";



function InnerApp() {
  const { activeTab } = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Apply theme to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <div className={`relative min-h-screen ${isDarkMode ? 
      'bg-black text-white' : 
      'bg-white text-black'}`}
    >
      {isDarkMode && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,100,255,0.07),transparent_40%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(30,144,255,0.07),transparent_40%)] pointer-events-none"></div>
        </>
      )}
      
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <TabNavigation />
      
      <main className="pt-16 pb-6 animate-fadeIn">
        {activeTab === "network" && <NetworkTab />}
        {activeTab === "feed" && <FeedTab />}
        {activeTab === "nearby" && <NearbyTab />}
        {activeTab === "jobs" && <JobsTab />}
        {activeTab === "insights" && <InsightsTab />}
      </main>
      
      {/* Profile Modal */}
      <ProfileModal />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <InnerApp />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
