import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

interface LocationMapProps {
  location: string;
  count: number;
  onChangeLocation: () => void;
  onExpand: () => void;
}

export function LocationMap({ location, count, onChangeLocation, onExpand }: LocationMapProps) {
  return (
    <>
      <GlassCard className="mb-5 flex items-center p-2">
        <div className="flex-grow">
          <div className="flex items-center px-2">
            <i className="icon ion-md-pin text-primary mr-2"></i>
            <span className="text-sm">{location}</span>
          </div>
        </div>
        <GlassButton onClick={onChangeLocation}>Change</GlassButton>
      </GlassCard>
      
      <GlassCard className="mb-5 overflow-hidden relative h-48">
        <div className="absolute inset-0 opacity-75">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Map view" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
        
        {/* Location markers */}
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse-slow relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse-slow relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse-slow relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">{count} professionals nearby</p>
            <p className="text-xs text-gray-400">Within 5 miles</p>
          </div>
          <GlassButton onClick={onExpand}>Expand</GlassButton>
        </div>
      </GlassCard>
    </>
  );
}
