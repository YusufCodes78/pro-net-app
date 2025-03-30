import { LocationMap } from "@/components/nearby/location-map";
import { ProfessionalCard } from "@/components/nearby/professional-card";
import { GlassButton } from "@/components/ui/glass-button";
import { useAppContext } from "@/contexts/app-context";
import { useToast } from "@/hooks/use-toast";

export default function NearbyTab() {
  const { nearbyProfessionals, currentLocation, setCurrentLocation, incrementConnections } = useAppContext();
  const { toast } = useToast();
  
  const handleChangeLocation = () => {
    setCurrentLocation("New York, NY");
    toast({
      title: "Location Changed",
      description: "Your location has been updated to New York, NY",
    });
  };
  
  const handleExpand = () => {
    toast({
      title: "Map Expanded",
      description: "Showing all professionals in a 10 mile radius",
    });
  };
  
  const handleConnect = (id: number) => {
    const professional = nearbyProfessionals.find(p => p.id === id);
    if (professional) {
      incrementConnections();
      toast({
        title: "Connection Request Sent",
        description: `You sent a connection request to ${professional.name}`,
      });
    }
  };
  
  return (
    <div className="p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Professionals Nearby</h2>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>
      
      {/* Location and Map */}
      <LocationMap
        location={currentLocation}
        count={nearbyProfessionals.length}
        onChangeLocation={handleChangeLocation}
        onExpand={handleExpand}
      />
      
      {/* Nearby Professionals */}
      <h3 className="font-medium mb-3">Nearby Professionals</h3>
      <div className="space-y-3">
        {nearbyProfessionals.map(professional => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
            onConnect={handleConnect}
          />
        ))}
        
        <GlassButton className="w-full py-3 rounded-xl text-sm font-medium">
          View All Nearby Professionals
        </GlassButton>
      </div>
    </div>
  );
}
