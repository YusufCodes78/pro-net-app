// Mock data for the application

// User Profiles
export interface Profile {
  id: number;
  fullName: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  experience: number;
  avatar: string;
  bio: string;
  mutualConnections: number;
}

export const profiles: Profile[] = [
  {
    id: 1,
    fullName: "Sarah Johnson",
    title: "UX/UI Design Lead @ Envision Tech",
    company: "Envision Tech",
    location: "San Francisco",
    skills: ["UX Design", "Figma", "Design Systems", "User Research"],
    experience: 8,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Passionate UX/UI designer with 8+ years of experience crafting digital experiences that delight users.",
    mutualConnections: 2
  },
  {
    id: 2,
    fullName: "James Wilson",
    title: "Product Manager @ TechFlow",
    company: "TechFlow",
    location: "Boston",
    skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
    experience: 6,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Product leader focused on building innovative solutions that solve real user problems.",
    mutualConnections: 5
  },
  {
    id: 3,
    fullName: "Emily Chen",
    title: "Frontend Developer @ InnovateTech",
    company: "InnovateTech",
    location: "New York",
    skills: ["React", "TypeScript", "CSS", "Web Performance"],
    experience: 4,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Frontend developer specializing in building beautiful, accessible, and performant web applications.",
    mutualConnections: 3
  },
  {
    id: 4,
    fullName: "Marcus Wong",
    title: "Data Scientist @ DataSync",
    company: "DataSync",
    location: "Seattle",
    skills: ["Machine Learning", "Python", "Data Visualization", "Statistics"],
    experience: 5,
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Data scientist using analytics and ML to help companies make better decisions.",
    mutualConnections: 1
  },
  {
    id: 5,
    fullName: "Alicia Nguyen",
    title: "Product Designer @ DesignHub",
    company: "DesignHub",
    location: "San Francisco",
    skills: ["UI/UX", "Figma", "Prototyping", "Design Thinking"],
    experience: 7,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Product designer crafting thoughtful digital experiences with a focus on simplicity and usability.",
    mutualConnections: 4
  },
  {
    id: 6,
    fullName: "Michael Richards",
    title: "Lead Developer @ CloudTech",
    company: "CloudTech",
    location: "San Francisco",
    skills: ["JavaScript", "Cloud", "AWS", "DevOps"],
    experience: 9,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Full stack developer and cloud architect with expertise in scalable web applications.",
    mutualConnections: 3
  },
  {
    id: 7,
    fullName: "Daniel Lee",
    title: "Marketing Manager @ Startup",
    company: "Startup",
    location: "San Francisco",
    skills: ["Growth", "Digital", "SEO", "Content Strategy"],
    experience: 6,
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Marketing professional with a passion for growth strategies and digital innovation.",
    mutualConnections: 2
  }
];

// Feed Items
export interface FeedItem {
  id: number;
  userId: number;
  user: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  type: 'achievement' | 'project' | 'post';
  metadata?: {
    title?: string;
    level?: number;
    imageUrl?: string;
    category?: string;
  };
}

export const feedItems: FeedItem[] = [
  {
    id: 1,
    userId: 3,
    user: {
      name: "Emily Chen",
      title: "Frontend Developer @ InnovateTech",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
    },
    content: "Just completed the Advanced React Patterns course! Excited to implement these new skills in our upcoming project redesign. 🚀",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    type: "achievement",
    metadata: {
      title: "Advanced React Patterns",
      level: 4
    }
  },
  {
    id: 2,
    userId: 4,
    user: {
      name: "Marcus Wong",
      title: "Data Scientist @ DataSync",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
    },
    content: "Just published my research on \"Implementing ML Models for Financial Forecasting\". Check it out and let me know your thoughts!",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    type: "project",
    metadata: {
      title: "ML Models for Financial Forecasting",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Research Paper"
    }
  },
  {
    id: 3,
    userId: 1,
    user: {
      name: "Sarah Johnson",
      title: "UX/UI Design Lead @ Envision Tech",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
    },
    content: "Excited to share that I'll be speaking at the upcoming UX Design Conference about building accessible design systems. Hope to see some of you there!",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    type: "post"
  },
  {
    id: 4,
    userId: 2,
    user: {
      name: "James Wilson",
      title: "Product Manager @ TechFlow",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
    },
    content: "Just earned my Product Management certification! Grateful for all the mentors and colleagues who supported me through this journey.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    type: "achievement",
    metadata: {
      title: "Product Management Certification",
      level: 3
    }
  }
];

// Nearby Professionals
export interface NearbyProfessional {
  id: number;
  userId: number;
  name: string;
  title: string;
  company: string;
  skills: string[];
  avatar: string;
  distance: string;
}

export const nearbyProfessionals: NearbyProfessional[] = [
  {
    id: 1,
    userId: 6,
    name: "Michael Richards",
    title: "Lead Developer @ CloudTech",
    company: "CloudTech",
    skills: ["JavaScript", "Cloud"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    distance: "0.4 mi"
  },
  {
    id: 2,
    userId: 5,
    name: "Alicia Nguyen",
    title: "Product Designer @ DesignHub",
    company: "DesignHub",
    skills: ["UI/UX", "Figma"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    distance: "1.2 mi"
  },
  {
    id: 3,
    userId: 7,
    name: "Daniel Lee",
    title: "Marketing Manager @ Startup",
    company: "Startup",
    skills: ["Growth", "Digital"],
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    distance: "2.8 mi"
  }
];

// Job Listings
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  type: string;
  description: string;
  skills: string[];
  salary: string;
  logo: string;
  postedDate: Date;
  applicants: number;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior UX Designer",
    company: "TechVision Inc.",
    location: "San Francisco",
    isRemote: true,
    type: "Full-time",
    description: "We're looking for a Senior UX Designer to lead design initiatives for our enterprise products. You'll collaborate with cross-functional teams to deliver exceptional user experiences.",
    skills: ["UI/UX", "Figma", "Design Systems"],
    salary: "$120K-$150K",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    applicants: 42
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "InnoTech Solutions",
    location: "New York",
    isRemote: false,
    type: "Full-time",
    description: "Join our development team to build scalable web applications using modern technologies. You'll work on challenging projects and contribute to our technical architecture.",
    skills: ["React", "Node.js", "AWS"],
    salary: "$130K-$160K",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    applicants: 28
  },
  {
    id: 3,
    title: "Product Manager",
    company: "GrowthLabs",
    location: "Austin",
    isRemote: true,
    type: "Full-time",
    description: "Drive product strategy and execution for our B2B SaaS platform. You'll work with design, engineering, and marketing teams to launch features that solve customer problems.",
    skills: ["Product Management", "B2B SaaS", "Agile"],
    salary: "$110K-$140K",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    applicants: 56
  },
  {
    id: 4,
    title: "Data Engineer",
    company: "AnalyticsPro",
    location: "Remote",
    isRemote: true,
    type: "Full-time",
    description: "Build and maintain data pipelines and infrastructure to support our analytics platform. You'll work with large datasets and implement scalable solutions.",
    skills: ["Python", "SQL", "ETL", "Data Warehousing"],
    salary: "$125K-$155K",
    logo: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    applicants: 34
  }
];
