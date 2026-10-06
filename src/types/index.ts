export interface CompanyInfo {
  name: string;
  tagline: string;
  subTagline: string;
  foundedYear: number;
  cin: string;
  headquarters: {
    city: string;
    state: string;
    country: string;
    address: string;
    landmark?: string;
    pincode: string;
    mapEmbedUrl?: string;
  };
  branches: {
    name: string;
    city: string;
    address: string;
    type: string;
  }[];
  contact: {
    primaryEmail: string;
    supportEmail: string;
    careersEmail: string;
    salesEmail: string;
    primaryPhone: string;
    supportPhone: string;
    workingHours: string;
  };
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  stats: {
    projectsCompleted: string;
    clientSatisfaction: string;
    enterpriseClients: string;
    uptimeSLA: string;
    yearsOfExcellence: string;
    expertEngineers: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  badge?: string;
  isExternal?: boolean;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Enterprise Software' | 'Cloud & DevOps' | 'AI & Data Intelligence' | 'Web & Mobile Apps' | 'UI/UX & Product Design' | 'Cybersecurity & Auditing';
  icon: string;
  deliverables: string[];
  techStack: string[];
  highlights: string[];
  roiMetric: string;
  startingPrice?: string;
  deliveryTimeline: string;
  isPopular?: boolean;
  imagePlaceholder?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  category: 'Enterprise' | 'Healthcare AI' | 'Sports Tech' | 'Cloud Infrastructure' | 'E-Commerce' | 'IoT & Analytics';
  shortDesc: string;
  fullDesc: string;
  features: {
    title: string;
    description: string;
  }[];
  techBadges: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  imagePlaceholder?: string;
  demoUrl?: string;
  status: 'Production Ready' | 'Active Deployment' | 'Enterprise Beta' | 'Flagship';
  pricingNote: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatarPlaceholder?: string;
  };
  publishedDate: string;
  readTime: string;
  category: 'AI & Innovation' | 'Cloud Architecture' | 'Enterprise Engineering' | 'UI/UX Design' | 'Cybersecurity' | 'Product Strategy';
  tags: string[];
  coverImagePlaceholder?: string;
  featured?: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  department: 'Engineering' | 'Design' | 'AI & Data' | 'Cloud & DevOps' | 'Product & Growth';
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Remote' | 'Hybrid' | 'Internship';
  experience: string;
  salaryRange: string;
  shortDesc: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  perks: string[];
  isUrgent?: boolean;
  postedDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  skills: string[];
  avatarPlaceholder?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  country: string;
  quote: string;
  rating: number;
  projectDelivered: string;
  avatarPlaceholder?: string;
  verified: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  sector: string;
  challenge: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  imagePlaceholder?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Products' | 'Security & SLA' | 'Billing & Engagement';
}

export interface ProcessStep {
  step: number;
  phase: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  icon: string;
}

export interface CulturePerk {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

export interface AboutSkill {
  label: string;
  percentage: number;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutData {
  badge: string;
  heading: string;
  subheading: string;
  storyDescription: string;
  topImage: string;
  bottomImage: string;
  skills: AboutSkill[];
  buttonText: string;
  stats: AboutStat[];
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  milestones: MilestoneItem[];
}

export interface WebsiteDataSchema {
  company: CompanyInfo;
  about: AboutData;
  navItems: NavItem[];
  services: Service[];
  products: Product[];
  blogPosts: BlogPost[];
  jobOpenings: JobOpening[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
  faqItems: FAQItem[];
  processSteps: ProcessStep[];
  culturePerks: CulturePerk[];
  coreValues: ValueItem[];
  techStackIcons: {
    name: string;
    category: string;
    level: string;
  }[];
}

