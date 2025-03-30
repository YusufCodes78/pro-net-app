import { createContext, useContext, useState, ReactNode } from "react";
import { profiles, feedItems, nearbyProfessionals, jobs } from "@/data/mock-data";

type TabType = "network" | "feed" | "nearby" | "jobs" | "insights";

interface ProfileModalState {
  isOpen: boolean;
  profileId?: number;
}

interface FilterState {
  roles: string[];
  skills: string[];
  experience: number[];
  jobType: string[];
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  profiles: typeof profiles;
  feedItems: typeof feedItems;
  nearbyProfessionals: typeof nearbyProfessionals;
  jobs: typeof jobs;
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  profileModal: ProfileModalState;
  showProfileModal: (id?: number) => void;
  hideProfileModal: () => void;
  jobFilters: FilterState;
  updateJobFilters: (filters: Partial<FilterState>) => void;
  resetJobFilters: () => void;
  connections: number;
  incrementConnections: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("network");
  const [currentLocation, setCurrentLocation] = useState("San Francisco, CA");
  const [profileModal, setProfileModal] = useState<ProfileModalState>({ isOpen: false });
  const [connections, setConnections] = useState(0);
  const [jobFilters, setJobFilters] = useState<FilterState>({
    roles: [],
    skills: [],
    experience: [],
    jobType: []
  });

  const showProfileModal = (id?: number) => {
    setProfileModal({ isOpen: true, profileId: id });
  };

  const hideProfileModal = () => {
    setProfileModal({ isOpen: false });
  };

  const updateJobFilters = (filters: Partial<FilterState>) => {
    setJobFilters(prev => ({ ...prev, ...filters }));
  };

  const resetJobFilters = () => {
    setJobFilters({
      roles: [],
      skills: [],
      experience: [],
      jobType: []
    });
  };
  
  const incrementConnections = () => {
    setConnections(prev => prev + 1);
  };

  const value = {
    activeTab,
    setActiveTab,
    profiles,
    feedItems,
    nearbyProfessionals,
    jobs,
    currentLocation,
    setCurrentLocation,
    profileModal,
    showProfileModal,
    hideProfileModal,
    jobFilters,
    updateJobFilters,
    resetJobFilters,
    connections,
    incrementConnections
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
