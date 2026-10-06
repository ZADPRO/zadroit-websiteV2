import rawData from './websiteData.json';
import type {
  WebsiteDataSchema,
  CompanyInfo,
  Service,
  Product,
  BlogPost,
  JobOpening,
  TeamMember,
  Testimonial,
  CaseStudy,
  FAQItem,
  ProcessStep,
  CulturePerk,
  ValueItem,
  NavItem
} from '../types';

export const websiteData: WebsiteDataSchema = rawData as WebsiteDataSchema;

export const companyInfo: CompanyInfo = websiteData.company;
export const navItems: NavItem[] = websiteData.navItems;
export const servicesData: Service[] = websiteData.services;
export const productsData: Product[] = websiteData.products;
export const blogPostsData: BlogPost[] = websiteData.blogPosts;
export const jobOpeningsData: JobOpening[] = websiteData.jobOpenings;
export const teamMembersData: TeamMember[] = websiteData.teamMembers;
export const testimonialsData: Testimonial[] = websiteData.testimonials;
export const caseStudiesData: CaseStudy[] = websiteData.caseStudies;
export const faqItemsData: FAQItem[] = websiteData.faqItems;
export const processStepsData: ProcessStep[] = websiteData.processSteps;
export const culturePerksData: CulturePerk[] = websiteData.culturePerks;
export const coreValuesData: ValueItem[] = websiteData.coreValues;
export const techStackData = websiteData.techStackIcons;

// Helper query functions
export function getServiceById(id: string): Service | undefined {
  return servicesData.find((s) => s.id === id || s.slug === id);
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPostsData.find((b) => b.id === id || b.slug === id);
}

export function getJobById(id: string): JobOpening | undefined {
  return jobOpeningsData.find((j) => j.id === id);
}

export function getFeaturedBlogs(): BlogPost[] {
  return blogPostsData.filter((b) => b.featured);
}
