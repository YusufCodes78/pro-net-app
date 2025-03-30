import { GlassCard } from "@/components/ui/glass-card";
import { SkillTag } from "@/components/ui/skill-tag";
import { GlassButton } from "@/components/ui/glass-button";
import { Button } from "@/components/ui/button";
import { Job } from "@/data/mock-data";
import { formatTimeAgo } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Globe, Clock, Calendar, Users, Share, X, 
  Briefcase, Check
} from "lucide-react";

interface JobCardProps {
  job: Job;
  onApply: (id: number) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [applied, setApplied] = useState(false);
  
  const toggleExpand = () => setExpanded(!expanded);
  
  const handleApply = () => {
    onApply(job.id);
    setApplied(true);
  };

  return (
    <GlassCard 
      className="p-4 relative transition-all duration-300"
      variant={isHovered ? "primary" : "default"}
      hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <motion.div 
          className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 border border-white/10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {job.logo ? (
            <img 
              src={job.logo} 
              alt={`${job.company} logo`}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="font-bold text-white">{job.company.charAt(0)}</span>
            </div>
          )}
        </motion.div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <motion.h4 
              className="font-semibold"
              initial={{ opacity: 1 }}
              animate={{ 
                color: isHovered ? 'rgb(var(--primary))' : 'rgb(var(--foreground))',
                scale: isHovered ? 1.02 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {job.title}
            </motion.h4>
            <Button 
              variant={applied ? "outline" : "default"}
              size="sm"
              onClick={handleApply}
              className="ml-2"
              disabled={applied}
            >
              {applied ? (
                <>
                  <Check className="mr-1 h-3 w-3 text-green-500" />
                  Applied
                </>
              ) : (
                <>
                  <Briefcase className="mr-1 h-3 w-3" />
                  Apply
                </>
              )}
            </Button>
          </div>
          
          <p className="text-sm">{job.company}</p>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <span className="flex items-center">
              <MapPin className="mr-1 h-3 w-3 text-accent" /> {job.location}
            </span>
            <span className="mx-2 text-white/20">•</span>
            <span className="flex items-center">
              <Globe className="mr-1 h-3 w-3 text-primary" /> 
              {job.isRemote ? "Remote" : "On-site"}
            </span>
            <span className="mx-2 text-white/20">•</span>
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3 text-secondary" /> 
              {job.type}
            </span>
          </div>
        </div>
      </div>
      
      <div 
        className="mt-3 text-sm cursor-pointer" 
        onClick={toggleExpand}
      >
        <p className={expanded ? "" : "line-clamp-2"}>
          {job.description}
        </p>
        {!expanded && job.description.length > 100 && (
          <button className="text-xs text-primary mt-1 hover:underline">
            Show more...
          </button>
        )}
      </div>
      
      <motion.div 
        className="mt-3 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {job.skills.map((skill, index) => (
          <SkillTag 
            key={index} 
            variant={isHovered ? "primary" : "default"}
            animated={isHovered}
          >
            {skill}
          </SkillTag>
        ))}
        <SkillTag 
          variant="accent" 
          animated={isHovered}
          className="font-semibold"
        >
          {job.salary}
        </SkillTag>
      </motion.div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="mr-1 h-3 w-3 text-secondary" />
          <span>Posted {formatTimeAgo(job.postedDate)}</span>
          <span className="mx-2 text-white/20">•</span>
          <Users className="mr-1 h-3 w-3 text-accent" />
          <span>{job.applicants} applicants</span>
        </div>
        
        <motion.button 
          className="text-xs text-white/60 hover:text-white flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share className="mr-1 h-3 w-3" />
          Share
        </motion.button>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute -top-2 right-2" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button 
              size="icon" 
              variant="outline"
              onClick={toggleExpand}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
