/**
 * Resume Data Types
 * Single source of truth for all resume-related TypeScript interfaces
 */

// ============================================
// Base Types
// ============================================

export interface DateInfo {
  month: string; // "January", "February", etc.
  year: number;
}

export type DateRange = {
  start: DateInfo;
  end: DateInfo | 'Present';
};

// ============================================
// Experience Types
// ============================================

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  startDate: DateInfo;
  endDate: DateInfo | 'Present';
  highlights: string[];
}

export interface EnrichedExperience extends Experience {
  durationMonths: number;
  durationFormatted: string;
  startDateFormatted: string;
  endDateFormatted: string;
  startDateISO: string; // ISO 8601 format for <time datetime>
  endDateISO: string;   // ISO 8601 format for <time datetime>
  isCurrent: boolean;
}

export interface CompanyGroup {
  company: string;
  location: string;
  totalMonths: number;
  totalFormatted: string;
  roles: EnrichedExperience[];
}

// ============================================
// Education Types
// ============================================

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  graduationYear: number;
  honors?: string[];
}

// ============================================
// Skills Types
// ============================================

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Skills {
  technical: SkillCategory[];
  soft: string[];
}

// ============================================
// Contact Types
// ============================================

export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
}

// ============================================
// Resume Types
// ============================================

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education;
  skills: Skills;
}

export interface EnrichedResumeData extends Omit<ResumeData, 'experience'> {
  experience: EnrichedExperience[];
  experienceByCompany: CompanyGroup[];
  totalYearsExperience: number;
  totalSkillsCount: number;
  currentRole: EnrichedExperience | null;
}
