export interface ResumeData {
  summary: string;
  skills: string[];
  tools: string[];
  companies: CompanyExperience[];
  education: EducationInfo[];
}

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
