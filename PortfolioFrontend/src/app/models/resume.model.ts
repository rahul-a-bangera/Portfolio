export interface ResumeData {
  personalInfo: PersonalInfo;
  shortSummary: string;
  summary: string;
  skills: SkillsInfo;
  tools: Tool[];
  experience: Experience[];
  education: Education[];
  certifications?: Certification[];
  projects?: Project[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface SkillsInfo {
  technical?: string[];
  frontend: string[];
  backend: string[];
  cloud: string[];
  database: string[];
  tools: string[];
}

export interface Tool {
  name: string;
  icon: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  highlights: string[];
}

// Legacy interfaces for backward compatibility
export interface CompanyExperience {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
}


