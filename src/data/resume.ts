/**
 * Resume Data
 * Single source of truth for all resume content
 * Derivations are computed once at build time
 */

import type { ResumeData, EnrichedResumeData } from './types';
import { deriveResumeData } from './derivations';

// ============================================
// Raw Resume Data
// ============================================

const rawData: ResumeData = {
  contact: {
    name: 'Emma Chirapongse',
    title: 'Staff Front-end Engineer',
    location: 'Atlanta, GA',
    email: 'emmac1016@gmail.com',
    linkedin: 'https://www.linkedin.com/in/emmachirapongse/',
  },

  summary: `Innovative, detail-oriented Staff Front-end Engineer with over 16 years of proven success and high-level performance in crafting scalable and secure web applications using TypeScript, React, and AWS technologies. Primarily focused on designing, building, and scaling complex, high-performance web applications. Combines deep front-end expertise, architectural ownership, and cross-team leadership to ensure consistent, accessible, and maintainable user experiences across products. Influences technical strategy, mentors engineers, sets front-end standards, and partners closely with Product, Design, Backend, and Platform teams.`,

  experience: [
    {
      id: 'aiwyn',
      title: 'Staff Front-end Engineer',
      company: 'Aiwyn',
      location: 'Charlotte, NC',
      remote: true,
      startDate: { month: 'March', year: 2025 },
      endDate: { month: 'January', year: 2026 },
      highlights: [
        'Developed a complex NextJS application for rendering tax form PDFs as pixel-perfect HTML, enabling real-time collaborative editing via WebSockets for simultaneous user updates with instant synchronization.',
        'Created a type-safe frontend architecture with TanStack React Query and Orval for API integration, optimizing rendering performance for complex forms with efficient memoization strategies.',
        'Integrated Claude AI to improve workflows and streamline tax document prep, designing scalable components for various form types with high code reusability.',
      ],
    },
    {
      id: 'amazon-pxt',
      title: 'Front-end Engineer II',
      company: 'Amazon.com, LLC',
      location: 'Arlington, VA',
      remote: false,
      startDate: { month: 'October', year: 2024 },
      endDate: { month: 'March', year: 2025 },
      highlights: [
        'Implemented accessible micro-frontend applications using module federation with React and TypeScript for the Talent Acquisition space in the People Experience and Technology organization.',
      ],
    },
    {
      id: 'aws',
      title: 'Front-end Engineer II',
      company: 'Amazon Web Services (AWS)',
      location: 'New Orleans, LA',
      remote: true,
      startDate: { month: 'June', year: 2022 },
      endDate: { month: 'September', year: 2024 },
      highlights: [
        'Developed a micro frontend application using React, TypeScript, and AWS CDK, integrated into an internal tool with deployment pipelines.',
        'Created UI mockups and application flows in Figma for a greenfield project. Documented frontend infrastructure and system design using React, TypeScript, and TanStack React Query.',
      ],
    },
    {
      id: '100plus',
      title: 'Senior Software Engineer',
      company: '100PLUS',
      location: 'Philadelphia, PA',
      remote: false,
      startDate: { month: 'April', year: 2021 },
      endDate: { month: 'June', year: 2022 },
      highlights: [
        'Contributed to and supported NodeJS backend API and frontend portal written in AngularJS.',
        'Developed a custom rate-limiting and queue system for serverless SMS Chat Bot using AWS SQS, Pinpoint, and Lex.',
      ],
    },
    {
      id: 'comcast',
      title: 'Engineer 4, Software Development & Engineering',
      company: 'Comcast',
      location: 'Philadelphia, PA',
      remote: false,
      startDate: { month: 'October', year: 2018 },
      endDate: { month: 'December', year: 2020 },
      highlights: [
        'Senior Lead on the Sprint team for Comcast Business ActiveCore SDN Platform React app.',
        'UI Architect focused on future architecture and transitioning business services using cutting-edge technologies.',
        'Developed POCs primarily with CloudFormation templates for deploying Lambda functions, API Gateways, IAM Roles, and SNS/SQS.',
      ],
    },
    {
      id: 'rakuten-lead',
      title: 'Lead Software Engineer',
      company: 'Rakuten Advertising',
      location: 'Seattle, WA',
      remote: false,
      startDate: { month: 'May', year: 2018 },
      endDate: { month: 'October', year: 2018 },
      highlights: [
        'Managed 3 Software Engineers, focusing on skill development, mentorship, and career path.',
        'Led authentication and security initiatives, working with Product Owners on requirements, Architects on design, and my team on implementing HashiCorp Vault, OAuth2, and Kong as an API Gateway.',
      ],
    },
    {
      id: 'rakuten-senior',
      title: 'Senior Software Engineer',
      company: 'Rakuten Advertising',
      location: 'Seattle, WA',
      remote: false,
      startDate: { month: 'September', year: 2016 },
      endDate: { month: 'April', year: 2018 },
      highlights: [
        'Created a White Label Dashboard for advertisers such as Birchbox and Jet.',
        'Worked on all project aspects from backend (PHP Symfony 3) to frontend (AngularJS), including deployment (Docker, Jenkins) and testing (PHPUnit, Protractor). Worked on apps for GDPR compliance using Go microservices and ReactJS.',
      ],
    },
    {
      id: 'bark',
      title: 'Technical Lead',
      company: 'Bark & Co',
      location: 'New York, NY',
      remote: false,
      startDate: { month: 'March', year: 2016 },
      endDate: { month: 'August', year: 2016 },
      highlights: [
        'Managed 2 software engineers on projects including custom implementations for BarkPost.com, backend Laravel apps for mobile push notifications, and the migration of 2.5M email subscribers between ESPs.',
        'Developed an SMS management app in Laravel, interfacing with Twilio for audience outreach and SMS subscriptions.',
      ],
    },
    {
      id: 'rakuten-mid',
      title: 'Software Engineer',
      company: 'Rakuten Advertising',
      location: 'New York, NY',
      remote: false,
      startDate: { month: 'June', year: 2013 },
      endDate: { month: 'March', year: 2016 },
      highlights: [
        'Oversaw a team of up to 5 senior engineers, both onshore and offshore, to deliver on time a complex Symfony 2 and AngularJS application that allowed clients to build custom reports, querying vast terabytes of data.',
        'Led and managed a team of 3 senior engineers on a new project using Symfony 3 and AngularJS.',
        'Enforced code quality with code reviews and design discussions, as well as implementation.',
      ],
    },
    {
      id: 'rakuten-junior',
      title: 'Junior Software Engineer',
      company: 'Rakuten Advertising',
      location: 'New York, NY',
      remote: false,
      startDate: { month: 'July', year: 2010 },
      endDate: { month: 'September', year: 2013 },
      highlights: [
        'Fixed bugs and implemented new features in legacy interfaces.',
        'Assisted in developing new APIs and Front End Applications, Publisher Registration Form, and Custom Reporting application, with Symfony 2 Framework and Knockout.js.',
        'Conducted unit testing for the Node.js Data Mart process and developed automated PHP scripts to back up a sharded Mongo cluster.',
      ],
    },
  ],

  education: {
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    institution: 'New York University',
    location: 'New York, NY',
    graduationYear: 2010,
    honors: [
      'Magna Cum Laude',
      "Dean's List Academic Year 2007-2010",
      'NYU Honors Scholar',
      'Presidential Honors Scholars Program, 2008-2009',
    ],
  },

  skills: {
    technical: [
      {
        name: 'Languages',
        skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Python', 'PHP'],
      },
      {
        name: 'Frameworks',
        skills: ['React', 'Next.js', 'Angular', 'Vue', 'Node.js', 'Astro'],
      },
      {
        name: 'State Management',
        skills: ['TanStack Query', 'Redux', 'Zustand', 'MobX'],
      },
      {
        name: 'Cloud & Infrastructure',
        skills: ['AWS', 'CDK', 'Lambda', 'CloudFormation', 'S3', 'SQS/SNS'],
      },
      {
        name: 'UI & Design',
        skills: ['Figma', 'Design Systems', 'Responsive Design', 'WCAG/ARIA Accessibility'],
      },
      {
        name: 'Tools & Practices',
        skills: ['Git', 'Vite', 'Webpack', 'Jest', 'Playwright', 'CI/CD', 'Docker'],
      },
      {
        name: 'Databases',
        skills: ['MongoDB', 'MySQL', 'Oracle', 'GraphQL', 'REST APIs'],
      },
    ],
    soft: [
      'Driving technical strategy across multiple teams',
      'Building consensus on complex architectural decisions',
      'Translating technical complexity for executive stakeholders',
      'Growing senior engineers into technical leaders',
      'Balancing long-term vision with near-term delivery',
    ],
  },
};

// ============================================
// Derived Export
// This runs once at build time
// ============================================

export const resume: EnrichedResumeData = deriveResumeData(rawData);

// Re-export types for convenience
export type { EnrichedResumeData, EnrichedExperience, CompanyGroup } from './types';
