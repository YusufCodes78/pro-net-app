import { JobCard } from "@/components/jobs/job-card";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { SkillTag } from "@/components/ui/skill-tag";
import { useAppContext } from "@/contexts/app-context";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobsTab() {
  const { jobs, jobFilters, updateJobFilters, resetJobFilters } = useAppContext();
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  
  const allRoles = Array.from(new Set(jobs.map(job => job.title.split(' ')[0])));
  const allSkills = Array.from(new Set(jobs.flatMap(job => job.skills)));
  const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
  
  const handleApply = (id: number) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      toast({
        title: "Application Submitted",
        description: `You applied for ${job.title} at ${job.company}`,
        variant: "default",
      });
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Apply filter and update results in real-time
  const applyFiltersRealTime = (newFilters: typeof jobFilters) => {
    let results = [...jobs];
    
    // Filter by roles
    if (newFilters.roles.length > 0) {
      results = results.filter(job => 
        newFilters.roles.some(role => job.title.toLowerCase().includes(role.toLowerCase()))
      );
    }
    
    // Filter by skills
    if (newFilters.skills.length > 0) {
      results = results.filter(job =>
        newFilters.skills.some(skill => 
          job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }
    
    // Filter by job type
    if (newFilters.jobType.length > 0) {
      results = results.filter(job =>
        newFilters.jobType.includes(job.type) || 
        (newFilters.jobType.includes("Remote") && job.isRemote)
      );
    }
    
    setFilteredJobs(results);
  };
  
  // Use real-time filtering whenever filters change
  useEffect(() => {
    applyFiltersRealTime(jobFilters);
  }, [jobFilters, jobs]);
  
  const toggleRoleFilter = (role: string) => {
    const updatedRoles = jobFilters.roles.includes(role) 
      ? jobFilters.roles.filter(r => r !== role)
      : [...jobFilters.roles, role];
    
    updateJobFilters({ roles: updatedRoles });
    
    // Show toast only when adding a filter
    if (!jobFilters.roles.includes(role)) {
      toast({
        title: `Filter Added: ${role}`,
        description: "Results updated",
        variant: "default",
      });
    }
  };
  
  const toggleSkillFilter = (skill: string) => {
    const updatedSkills = jobFilters.skills.includes(skill) 
      ? jobFilters.skills.filter(s => s !== skill)
      : [...jobFilters.skills, skill];
    
    updateJobFilters({ skills: updatedSkills });
    
    // Show toast only when adding a filter
    if (!jobFilters.skills.includes(skill)) {
      toast({
        title: `Filter Added: ${skill}`,
        description: "Results updated",
        variant: "default",
      });
    }
  };
  
  const toggleJobTypeFilter = (type: string) => {
    const updatedTypes = jobFilters.jobType.includes(type) 
      ? jobFilters.jobType.filter(t => t !== type)
      : [...jobFilters.jobType, type];
    
    updateJobFilters({ jobType: updatedTypes });
    
    // Show toast only when adding a filter
    if (!jobFilters.jobType.includes(type)) {
      toast({
        title: `Filter Added: ${type}`,
        description: "Results updated",
        variant: "default",
      });
    }
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    resetJobFilters();
    setFilteredJobs(jobs);
    
    toast({
      title: "Filters Reset",
      description: "Showing all available jobs",
    });
  };
  
  const displayJobs = jobFilters.roles.length > 0 || jobFilters.skills.length > 0 || jobFilters.jobType.length > 0
    ? filteredJobs
    : jobs;
  
  return (
    <div className="p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <motion.h2 
          className="text-lg font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recommended Jobs
        </motion.h2>
        <GlassButton 
          onClick={toggleFilters}
          variant="primary"
          size="sm"
          icon={<i className="icon ion-md-options"></i>}
        >
          Filters {(jobFilters.roles.length + jobFilters.skills.length + jobFilters.jobType.length) > 0 && 
            `(${jobFilters.roles.length + jobFilters.skills.length + jobFilters.jobType.length})`}
        </GlassButton>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            <GlassCard variant="dark" className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold">Filter Jobs</h3>
                <GlassButton 
                  variant="default" 
                  size="xs"
                  onClick={handleResetFilters}
                >
                  Reset All
                </GlassButton>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs font-medium mb-2">Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {allRoles.map(role => (
                      <SkillTag 
                        key={role}
                        variant={jobFilters.roles.includes(role) ? "primary" : "default"}
                        className="cursor-pointer"
                        onClick={() => toggleRoleFilter(role)}
                      >
                        {role}
                      </SkillTag>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.slice(0, 8).map(skill => (
                      <SkillTag 
                        key={skill}
                        variant={jobFilters.skills.includes(skill) ? "accent" : "default"}
                        className="cursor-pointer"
                        onClick={() => toggleSkillFilter(skill)}
                      >
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium mb-2">Job Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map(type => (
                      <SkillTag 
                        key={type}
                        variant={jobFilters.jobType.includes(type) ? "success" : "default"}
                        className="cursor-pointer"
                        onClick={() => toggleJobTypeFilter(type)}
                      >
                        {type}
                      </SkillTag>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <GlassButton 
                  variant="primary"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active Filters */}
      {(jobFilters.roles.length > 0 || jobFilters.skills.length > 0 || jobFilters.jobType.length > 0) && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {jobFilters.roles.map(role => (
            <SkillTag 
              key={role} 
              variant="primary"
              className="cursor-pointer flex items-center gap-1"
              onClick={() => toggleRoleFilter(role)}
            >
              {role}
              <i className="icon ion-md-close text-xs"></i>
            </SkillTag>
          ))}
          {jobFilters.skills.map(skill => (
            <SkillTag 
              key={skill} 
              variant="accent"
              className="cursor-pointer flex items-center gap-1"
              onClick={() => toggleSkillFilter(skill)}
            >
              {skill}
              <i className="icon ion-md-close text-xs"></i>
            </SkillTag>
          ))}
          {jobFilters.jobType.map(type => (
            <SkillTag 
              key={type} 
              variant="success"
              className="cursor-pointer flex items-center gap-1"
              onClick={() => toggleJobTypeFilter(type)}
            >
              {type}
              <i className="icon ion-md-close text-xs"></i>
            </SkillTag>
          ))}
        </div>
      )}
      
      {/* Results count */}
      {displayJobs.length === 0 && (
        <div className="py-8 text-center">
          <i className="icon ion-md-sad text-4xl text-muted-foreground block mb-2"></i>
          <p className="text-muted-foreground">No jobs match your filters.</p>
          <GlassButton className="mt-3" size="sm" onClick={handleResetFilters}>
            Reset Filters
          </GlassButton>
        </div>
      )}
      
      {/* Job Listings */}
      <div className="space-y-4">
        {displayJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <JobCard 
              job={job}
              onApply={handleApply}
            />
          </motion.div>
        ))}
        
        {displayJobs.length > 0 && (
          <GlassButton 
            className="w-full py-3 rounded-xl text-sm font-medium mt-4"
            variant="primary"
            icon={<i className="icon ion-md-search"></i>}
          >
            View All Job Recommendations
          </GlassButton>
        )}
      </div>
    </div>
  );
}
