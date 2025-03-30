import { GlassCard } from "@/components/ui/glass-card";
import { NearbyProfessional } from "@/data/mock-data";
import { useState } from "react";

interface ProfessionalCardProps {
  professional: NearbyProfessional;
  onConnect: (id: number) => void;
}

export function ProfessionalCard({ professional, onConnect }: ProfessionalCardProps) {
  const [isPending, setIsPending] = useState(false);
  
  const handleConnect = () => {
    setIsPending(true);
    onConnect(professional.id);
  };
  
  return (
    <GlassCard className="p-3 flex items-center">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-primary to-accent mr-3">
        <img 
          src={professional.avatar} 
          alt={professional.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{professional.name}</h4>
        <p className="text-xs text-gray-400">{professional.title}</p>
        <div className="flex mt-1">
          {professional.skills.slice(0, 2).map((skill, index) => (
            <span key={index} className="text-xs bg-white/10 px-2 py-0.5 rounded-full mr-1">{skill}</span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <span className="glass px-2 py-1 rounded-full text-xs flex items-center">
          <i className="icon ion-md-pin mr-1 text-primary"></i> {professional.distance}
        </span>
        <button 
          className={`mt-2 text-xs ${isPending ? "text-gray-400" : "text-primary"}`}
          onClick={handleConnect}
          disabled={isPending}
        >
          {isPending ? "Pending" : "Connect"}
        </button>
      </div>
    </GlassCard>
  );
}
