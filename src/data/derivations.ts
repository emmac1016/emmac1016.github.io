/**
 * Resume Data Derivations
 * Pure functions for computing derived state at build time
 */

import type {
  DateInfo,
  Experience,
  EnrichedExperience,
  CompanyGroup,
  ResumeData,
  EnrichedResumeData,
  SkillCategory,
} from './types';

// ============================================
// Date Utilities
// ============================================

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBREV = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Get current date as DateInfo
 */
function getCurrentDate(): DateInfo {
  const now = new Date();
  return {
    month: MONTH_NAMES[now.getMonth()],
    year: now.getFullYear()
  };
}

/**
 * Convert month name to index (0-11)
 */
function monthNameToIndex(month: string): number {
  const index = MONTH_NAMES.findIndex(m =>
    m.toLowerCase() === month.toLowerCase()
  );
  return index >= 0 ? index : 0;
}

/**
 * Format a DateInfo to abbreviated string (e.g., "Jan 2024")
 */
export function formatDate(date: DateInfo): string {
  const monthIndex = monthNameToIndex(date.month);
  return `${MONTH_ABBREV[monthIndex]} ${date.year}`;
}

/**
 * Format a DateInfo to ISO 8601 string (e.g., "2024-01")
 * Used for <time datetime> attribute
 */
export function formatDateISO(date: DateInfo): string {
  const monthIndex = monthNameToIndex(date.month);
  const month = String(monthIndex + 1).padStart(2, '0');
  return `${date.year}-${month}`;
}

/**
 * Format a date range (e.g., "Jan 2024 - Present")
 */
export function formatDateRange(start: DateInfo, end: DateInfo | 'Present'): string {
  const startStr = formatDate(start);
  const endStr = end === 'Present' ? 'Present' : formatDate(end);
  return `${startStr} - ${endStr}`;
}

// ============================================
// Duration Calculations
// ============================================

/**
 * Calculate duration in months between two dates
 */
export function calculateDurationMonths(start: DateInfo, end: DateInfo | 'Present'): number {
  const endDate = end === 'Present' ? getCurrentDate() : end;

  const startMonths = start.year * 12 + monthNameToIndex(start.month);
  const endMonths = endDate.year * 12 + monthNameToIndex(endDate.month);

  // Add 1 to include both start and end months
  return Math.max(1, endMonths - startMonths + 1);
}

/**
 * Format duration in human-readable form (e.g., "2 years, 3 months")
 */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  }

  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`);
  }

  return parts.length > 0 ? parts.join(', ') : 'Less than a month';
}

// ============================================
// Experience Enrichment
// ============================================

/**
 * Enrich a single experience with computed fields
 */
export function enrichExperience(exp: Experience): EnrichedExperience {
  const durationMonths = calculateDurationMonths(exp.startDate, exp.endDate);
  const isCurrent = exp.endDate === 'Present';
  // Resolve endDate to a concrete DateInfo (use current date for "Present")
  const resolvedEndDate: DateInfo = isCurrent ? getCurrentDate() : exp.endDate as DateInfo;

  return {
    ...exp,
    durationMonths,
    durationFormatted: formatDuration(durationMonths),
    startDateFormatted: formatDate(exp.startDate),
    endDateFormatted: isCurrent ? 'Present' : formatDate(resolvedEndDate),
    startDateISO: formatDateISO(exp.startDate),
    endDateISO: formatDateISO(resolvedEndDate),
    isCurrent,
  };
}

// ============================================
// Company Grouping
// ============================================

/**
 * Group experiences by company, sorted by most recent
 */
export function groupExperienceByCompany(experiences: EnrichedExperience[]): CompanyGroup[] {
  const groups = new Map<string, CompanyGroup>();

  // Sort by start date descending (most recent first)
  const sorted = [...experiences].sort((a, b) => {
    const aMonths = a.startDate.year * 12 + monthNameToIndex(a.startDate.month);
    const bMonths = b.startDate.year * 12 + monthNameToIndex(b.startDate.month);
    return bMonths - aMonths;
  });

  for (const exp of sorted) {
    const existing = groups.get(exp.company);
    if (existing) {
      existing.roles.push(exp);
      existing.totalMonths += exp.durationMonths;
      existing.totalFormatted = formatDuration(existing.totalMonths);
    } else {
      groups.set(exp.company, {
        company: exp.company,
        location: exp.location,
        totalMonths: exp.durationMonths,
        totalFormatted: formatDuration(exp.durationMonths),
        roles: [exp],
      });
    }
  }

  // Sort groups by most recent role
  return Array.from(groups.values()).sort((a, b) => {
    const aMonths = a.roles[0].startDate.year * 12 + monthNameToIndex(a.roles[0].startDate.month);
    const bMonths = b.roles[0].startDate.year * 12 + monthNameToIndex(b.roles[0].startDate.month);
    return bMonths - aMonths;
  });
}

// ============================================
// Statistics
// ============================================

/**
 * Calculate total years of experience (accounting for overlaps simply)
 */
export function calculateTotalExperience(experiences: EnrichedExperience[]): number {
  const totalMonths = experiences.reduce((sum, exp) => sum + exp.durationMonths, 0);
  // Round to one decimal place
  return Math.round(totalMonths / 12 * 10) / 10;
}

/**
 * Count total skills across all categories
 */
export function countTotalSkills(categories: SkillCategory[]): number {
  return categories.reduce((sum, cat) => sum + cat.skills.length, 0);
}

/**
 * Find current role (if any)
 */
export function findCurrentRole(experiences: EnrichedExperience[]): EnrichedExperience | null {
  return experiences.find(exp => exp.isCurrent) ?? null;
}

// ============================================
// Main Derivation Function
// ============================================

/**
 * Derive all computed fields from raw resume data
 * This runs once at build time
 */
export function deriveResumeData(data: ResumeData): EnrichedResumeData {
  const enrichedExperience = data.experience.map(enrichExperience);

  return {
    ...data,
    experience: enrichedExperience,
    experienceByCompany: groupExperienceByCompany(enrichedExperience),
    totalYearsExperience: calculateTotalExperience(enrichedExperience),
    totalSkillsCount: countTotalSkills(data.skills.technical),
    currentRole: findCurrentRole(enrichedExperience),
  };
}
