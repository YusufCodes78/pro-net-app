import { GlassButton } from "@/components/ui/glass-button";

export default function BottomNavigation() {
  return (
    <nav className="glass-dark fixed bottom-0 left-0 right-0 border-t border-white/5 py-3 px-6 z-50">
      <div className="flex justify-between items-center">
        <button className="flex flex-col items-center space-y-1">
          <i className="icon ion-md-home text-xl text-primary"></i>
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 opacity-70">
          <i className="icon ion-md-search text-xl"></i>
          <span className="text-xs font-medium">Search</span>
        </button>
        
        <div className="relative -mt-8">
          <button className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
            <i className="icon ion-md-add text-2xl text-white"></i>
          </button>
        </div>
        
        <button className="flex flex-col items-center space-y-1 opacity-70">
          <i className="icon ion-md-notifications-outline text-xl"></i>
          <span className="text-xs font-medium">Alerts</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 opacity-70">
          <i className="icon ion-md-person text-xl"></i>
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
}
