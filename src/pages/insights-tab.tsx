import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/contexts/app-context";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";

export default function InsightsTab() {
  const { profiles, nearbyProfessionals, jobs, connections } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("connections");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Check theme
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkTheme();
    
    // Create a mutation observer to watch for class changes on documentElement
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
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
  
  // Calculate various metrics for dashboard
  const connectionsCount = connections;
  const profileViews = 127;
  const profileStrength = 72; // percentage
  const jobApplications = 6;
  
  // Sample data for skill distribution chart
  const skillsData = [
    { name: "React", value: 45 },
    { name: "TypeScript", value: 38 },
    { name: "Node.js", value: 30 },
    { name: "UI/UX", value: 25 },
    { name: "Python", value: 15 }
  ];
  
  // Sample data for activity chart
  const activityData = [
    { name: "Mon", views: 12, connections: 2 },
    { name: "Tue", views: 19, connections: 3 },
    { name: "Wed", views: 15, connections: 1 },
    { name: "Thu", views: 25, connections: 4 },
    { name: "Fri", views: 32, connections: 5 },
    { name: "Sat", views: 18, connections: 2 },
    { name: "Sun", views: 6, connections: 0 }
  ];
  
  // Sample data for network growth
  const growthData = [
    { month: "Jan", connections: 5 },
    { month: "Feb", connections: 8 },
    { month: "Mar", connections: 15 },
    { month: "Apr", connections: 19 },
    { month: "May", connections: 24 }
  ];
  
  // Sample data for job match
  const jobMatchData = [
    { category: "Perfect Match", count: 3 },
    { category: "Good Match", count: 8 },
    { category: "Partial Match", count: 15 }
  ];
  
  // Colors for charts
  const COLORS = ["#845EF7", "#22B8CF", "#FFB86C", "#FF6B6B"];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-2 border border-white/10 text-xs">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary">{`${payload[0].name}: ${payload[0].value}`}</p>
          {payload[1] && <p className="text-accent">{`${payload[1].name}: ${payload[1].value}`}</p>}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="p-4 max-w-screen-lg mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-lg font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profile Insights
        </motion.h2>
        
        <div className="flex space-x-2">
          <GlassButton 
            size="sm"
            variant={selectedMetric === "connections" ? "primary" : "default"}
            onClick={() => setSelectedMetric("connections")}
          >
            <i className="icon ion-md-people mr-1"></i>
            <span className={isMobile ? "hidden" : ""}>Connections</span>
          </GlassButton>
          
          <GlassButton 
            size="sm"
            variant={selectedMetric === "activity" ? "primary" : "default"}
            onClick={() => setSelectedMetric("activity")}
          >
            <i className="icon ion-md-pulse mr-1"></i>
            <span className={isMobile ? "hidden" : ""}>Activity</span>
          </GlassButton>
          
          <GlassButton 
            size="sm"
            variant={selectedMetric === "jobs" ? "primary" : "default"}
            onClick={() => setSelectedMetric("jobs")}
          >
            <i className="icon ion-md-briefcase mr-1"></i>
            <span className={isMobile ? "hidden" : ""}>Jobs</span>
          </GlassButton>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="flex flex-col items-center">
            <div className="text-xs opacity-70 mb-1">Connections</div>
            <div className="text-2xl font-bold text-primary">{connectionsCount}</div>
            <div className="text-xs text-green-400 mt-1">+5 this week</div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4">
          <div className="flex flex-col items-center">
            <div className="text-xs opacity-70 mb-1">Profile Views</div>
            <div className="text-2xl font-bold text-accent">{profileViews}</div>
            <div className="text-xs text-green-400 mt-1">+23 this week</div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4">
          <div className="flex flex-col items-center">
            <div className="text-xs opacity-70 mb-1">Profile Strength</div>
            <div className={`text-2xl font-bold ${isDarkMode ? "text-accent" : "text-primary"}`}>{profileStrength}%</div>
            <div className="w-full bg-gray-400/10 dark:bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full" 
                style={{ width: `${profileStrength}%` }}
              ></div>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4">
          <div className="flex flex-col items-center">
            <div className="text-xs opacity-70 mb-1">Job Applications</div>
            <div className="text-2xl font-bold text-success">{jobApplications}</div>
            <div className="text-xs text-yellow-400 mt-1">2 pending</div>
          </div>
        </GlassCard>
      </div>
      
      {/* Main Chart Section */}
      <AnimatePresence mode="wait">
        {selectedMetric === "connections" && (
          <motion.div
            key="connections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Network Growth Chart */}
              <GlassCard className="p-4">
                <h3 className="text-sm font-semibold mb-4">Network Growth</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="colorConnections" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#845EF7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#845EF7" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#ffffff50" />
                      <YAxis stroke="#ffffff50" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="connections" 
                        stroke="#845EF7" 
                        fillOpacity={1} 
                        fill="url(#colorConnections)" 
                        name="Connections"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
              
              {/* Skills Distribution Chart */}
              <GlassCard className="p-4">
                <h3 className="text-sm font-semibold mb-4">Network Skills Distribution</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillsData}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
            
            {/* Connection Recommendations */}
            <GlassCard className="p-4 mb-6">
              <h3 className="text-sm font-semibold mb-4">Connection Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profiles.slice(0, 3).map(profile => (
                  <div key={profile.id} className="flex items-center p-2 bg-white/5 rounded-lg">
                    {profile.avatar ? (
                      <img 
                        src={profile.avatar}
                        alt={profile.fullName}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full mr-3 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-white">{profile.fullName.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{profile.fullName}</p>
                      <p className="text-xs text-gray-400 truncate">{profile.title}</p>
                    </div>
                    <GlassButton size="xs" variant="primary">
                      <i className="icon ion-md-add"></i>
                    </GlassButton>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
        
        {selectedMetric === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Activity Chart */}
            <GlassCard className="p-4 mb-6">
              <h3 className="text-sm font-semibold mb-4">Weekly Activity</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <XAxis dataKey="name" stroke="#ffffff50" />
                    <YAxis stroke="#ffffff50" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="views" fill="#22B8CF" name="Profile Views" />
                    <Bar dataKey="connections" fill="#845EF7" name="New Connections" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
            
            {/* Recent Activity */}
            <GlassCard className="p-4 mb-6">
              <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start border-l-2 border-primary pl-4 py-1">
                  <div className="flex-1">
                    <p className="text-sm">You connected with <span className="text-primary font-medium">Sarah Johnson</span></p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                  <GlassButton size="xs" variant="default">
                    <i className="icon ion-md-mail"></i>
                  </GlassButton>
                </div>
                
                <div className="flex items-start border-l-2 border-accent pl-4 py-1">
                  <div className="flex-1">
                    <p className="text-sm">You viewed <span className="text-accent font-medium">Tech Senior Developer</span> job</p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                  <GlassButton size="xs" variant="default">
                    <i className="icon ion-md-eye"></i>
                  </GlassButton>
                </div>
                
                <div className="flex items-start border-l-2 border-success pl-4 py-1">
                  <div className="flex-1">
                    <p className="text-sm">Your profile strength increased to <span className="text-success font-medium">72%</span></p>
                    <p className="text-xs text-gray-400">Yesterday</p>
                  </div>
                  <GlassButton size="xs" variant="default">
                    <i className="icon ion-md-trending-up"></i>
                  </GlassButton>
                </div>
                
                <div className="flex items-start border-l-2 border-warning pl-4 py-1">
                  <div className="flex-1">
                    <p className="text-sm">You applied for <span className="text-warning font-medium">Frontend Engineer</span> position</p>
                    <p className="text-xs text-gray-400">2 days ago</p>
                  </div>
                  <GlassButton size="xs" variant="default">
                    <i className="icon ion-md-paper"></i>
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
        
        {selectedMetric === "jobs" && (
          <motion.div
            key="jobs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Matches Chart */}
              <GlassCard className="p-4">
                <h3 className="text-sm font-semibold mb-4">Job Matches</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={jobMatchData}
                      layout="vertical"
                    >
                      <XAxis type="number" stroke="#ffffff50" />
                      <YAxis dataKey="category" type="category" stroke="#ffffff50" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="#FFB86C" name="Jobs" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
              
              {/* Application Status */}
              <GlassCard className="p-4">
                <h3 className="text-sm font-semibold mb-4">Application Status</h3>
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold text-white">Applied</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-primary">6</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold text-white">Interview</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-accent">2</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold text-white">Offered</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-success">1</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "16%" }}></div>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold text-white">Rejected</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-red-400">1</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: "16%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-black/20 rounded-lg">
                  <h4 className="text-xs font-medium mb-2">Latest Update</h4>
                  <p className="text-sm">
                    <span className="text-success font-medium">Good news!</span> You've been invited to interview for Frontend Developer at TechCorp.
                  </p>
                  <div className="mt-2 flex justify-end">
                    <GlassButton size="xs" variant="primary">View Details</GlassButton>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Job Recommendations */}
            <GlassCard className="p-4 mb-6">
              <h3 className="text-sm font-semibold mb-4">Recommended Jobs Based on Your Profile</h3>
              <div className="space-y-3">
                {jobs.slice(0, 3).map(job => (
                  <div key={job.id} className="flex items-center p-3 bg-white/5 rounded-lg">
                    {job.logo ? (
                      <img 
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg mr-3 object-contain bg-white/10 p-1"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg mr-3 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-white">{job.company.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{job.title}</p>
                      <p className="text-xs text-gray-400 truncate">{job.company} • {job.location}</p>
                    </div>
                    <GlassButton size="xs" variant="success">
                      Apply <i className="icon ion-md-arrow-forward ml-1"></i>
                    </GlassButton>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Skills to develop section */}
      <GlassCard className="p-4 mb-4">
        <div className="flex justify-between mb-3">
          <h3 className="text-sm font-semibold">Skills to Develop</h3>
          <button className="text-xs text-primary hover:underline">See All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-white/5 rounded-lg flex flex-col items-center text-center">
            <i className="icon ion-md-cloud text-3xl text-blue-400 mb-2"></i>
            <span className="text-sm font-medium">Cloud Computing</span>
            <span className="text-xs text-gray-400">High demand</span>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg flex flex-col items-center text-center">
            <i className="icon ion-md-analytics text-3xl text-purple-400 mb-2"></i>
            <span className="text-sm font-medium">Data Analysis</span>
            <span className="text-xs text-gray-400">Trending</span>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg flex flex-col items-center text-center">
            <i className="icon ion-md-lock text-3xl text-green-400 mb-2"></i>
            <span className="text-sm font-medium">Cybersecurity</span>
            <span className="text-xs text-gray-400">Critical</span>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg flex flex-col items-center text-center">
            <i className="icon ion-md-trending-up text-3xl text-orange-400 mb-2"></i>
            <span className="text-sm font-medium">Leadership</span>
            <span className="text-xs text-gray-400">Career growth</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}