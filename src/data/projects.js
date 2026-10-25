// Project content from the CV. `cover` drives the generated monochrome cover art
// (see components/common/ProjectCover.jsx) — swap in `image` once you have real screenshots.

export const categories = ['All', 'Real Project', 'Academic', 'Personal']

export const projects = [
  {
    slug: 'lowca',
    title: 'Lowca — HCM Digitalized Street Food',
    short: 'Discovery & social-proof platform for Ho Chi Minh City street food, on web and mobile.',
    category: 'Academic',
    tags: ['Web + Mobile', 'Capstone'],
    role: 'Frontend Team Lead (Web & Mobile)',
    period: 'Dec 2025 - May 2026',
    description:
      'A comprehensive digital discovery and review ecosystem tailored for Ho Chi Minh City’s street food vendors and customers — featuring a “Pay First, Eat Later” flow, integrated wallets, and gamification mechanics.',
    stack: ['ReactJS', 'Vite', 'React Native', 'Expo', 'Bun', 'Redux', 'React Query', 'SignalR', 'PayOS', 'OpenMapVn', 'AWS S3', 'Google OAuth', 'Meta OAuth'],
    responsibilities: [
      'Led a 3-developer frontend team to architect and build both Web and Mobile platforms from the ground up.',
      'Independently architected and developed the entire cross-platform Mobile application using React Native and Expo from scratch.',
      'Implemented secure authentication and RBAC with Google and Meta OAuth, cross-platform token management, and silent refresh-token handling for uninterrupted sessions.',
      'Designed a dynamic weighted ranking algorithm and multi-layered search logic that prioritizes store-name matches over dish names.',
      'Used React Query caching to eliminate UI blocking and rendering overhead across platforms.',
      'Engineered GitHub Actions workflows enforcing formatting and lint compliance, plus EAS Build for automated mobile distribution.',
    ],
    links: [
      { label: 'GitHub — Web', href: 'https://github.com/PTan2505/HCM-Digitalized-Street-Food-FE-Web' },
      { label: 'GitHub — Mobile', href: 'https://github.com/PTan2505/HCM-Digitalized-Street-Food-FE-Mobile' },
    ],
    cover: { tone: 'light', motif: 'devices', logo: '/images/lowca-logo.svg', label: 'Lowca' },
  },
  {
    slug: 'pulse-api',
    title: 'The Pulse API',
    short: 'Short description of the product and your contribution — TODO.',
    category: 'Real Project',
    tags: ['Real Project', 'TODO'],
    role: 'Role — TODO',
    period: 'TODO — Now',
    description: 'Describe what The Pulse API is, who it is for, and what you built. — TODO',
    stack: ['TODO'],
    responsibilities: ['Responsibility — TODO', 'Responsibility — TODO', 'Responsibility — TODO'],
    links: [{ label: 'Live site', href: 'https://thepulseapi.com' }],
    cover: { tone: 'dark', motif: 'pulse', label: 'Pulse' },
    placeholder: true,
  },
  {
    slug: 'nghia-ad-cms',
    title: 'Nghia Ad — Dynamic CMS Platform',
    short: 'A CMS that lets corporate clients customize and edit their website content directly.',
    category: 'Real Project',
    tags: ['Web App', 'Amazing Tech'],
    role: 'Frontend Developer (OJT)',
    period: 'Jan 2025 - Aug 2025',
    description:
      'A dynamic Content Management System (CMS) platform enabling corporate clients to customize and modify website content directly.',
    stack: ['ReactJS', 'Vite', 'Redux', 'Quill Rich Text Editor', 'RESTful APIs'],
    responsibilities: [
      'Built the core frontend modules and structural layouts from scratch, ensuring predictable global state management using Redux.',
      'Robustly integrated complex RESTful API endpoints from the backend to ensure smooth data synchronization.',
    ],
    links: [],
    cover: { tone: 'dark', motif: 'editor', label: 'Nghia Ad' },
  },
  {
    slug: 'trading-card-game',
    title: 'Trading Card Game Platform',
    short: 'Backend for a TCG platform — collections, secure trading and a social feed.',
    category: 'Academic',
    tags: ['Backend', 'Hono + MongoDB'],
    role: 'Backend Developer',
    period: 'Sep 2025 - Dec 2025',
    description:
      'A backend system for a comprehensive TCG platform that allows hobbyists to catalog personal collections, securely trade items, and interact through a social feed to showcase rare cards or share gaming experiences from popular franchises (Pokémon, Yu-Gi-Oh!, One Piece).',
    stack: ['Node.js', 'Hono', 'MongoDB', 'Mongoose', 'RESTful APIs', 'JWT', 'Agenda.js', 'Google OCR'],
    responsibilities: [
      'Independently designed the entire MongoDB/Mongoose schema and solo-implemented all RESTful APIs using Hono for ultra-low latency.',
      'Engineered dynamic structures for custom deck-building, user collection tracking, and diverse card management (Pokémon & Yu-Gi-Oh!).',
      'Integrated Google OCR to automate card text recognition from images and built an advanced query engine for multi-criteria filtering.',
      'Implemented JWT authentication, enforced API rate-limiting protection, and provided interactive Swagger documentation.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/PTan2505/tcg_be' }],
    cover: { tone: 'light', motif: 'cards', label: 'TCG' },
  },
  {
    slug: 'clinic-management',
    title: 'Clinic Management System',
    short: 'Clinical workflows, patient records and appointment scheduling for healthcare providers.',
    category: 'Personal',
    tags: ['Fullstack', 'Django + React'],
    role: 'Fullstack Developer',
    period: 'Aug 2024 - Now',
    description:
      'A system designed to streamline clinical workflows, automate patient record management, and optimize appointment scheduling for healthcare providers. The repository is private.',
    stack: ['Python', 'Django', 'PostgreSQL', 'PyOTP', 'ReactJS', 'Vite', 'TailwindCSS', 'MUI', 'Axios', 'TanStack Query'],
    responsibilities: [
      'Architected a robust relational PostgreSQL schema with strict constraints and optimized indexing for complex healthcare data.',
      'Implemented core business logic for appointment booking, medical billing generation, and secure electronic health record (EHR) management.',
      'Developed a secure authorization system and MFA with PyOTP to differentiate permissions between doctors, nurses, receptionists, and patients.',
      'Initiated the companion frontend web app — responsive layouts wired to core REST APIs for authentication and patient workflows.',
      'Engineered GitHub Actions workflows enforcing formatting and lint compliance.',
    ],
    links: [],
    cover: { tone: 'dark', motif: 'dashboard', label: 'Clinic' },
  },
]

export const getProject = slug => projects.find(p => p.slug === slug)
