// Single source of truth for portfolio content.
// Items marked `placeholder: true` are not in the CV yet — fill them in later.

export const profile = {
  firstName: 'Phuc',
  lastName: 'Tan',
  fullName: 'Nguyễn Phúc Tần',
  role: 'Frontend Developer',
  tagline: 'Building fast, accessible interfaces that feel great to use.',
  summary:
    'Software Engineering graduate with 2 years of hands-on experience building full-stack applications across the React and modern backend ecosystems. Passionate about clean architecture, performance optimization, and reliable CI/CD pipelines. Adept at leveraging Spec-Driven Development (SDD) and AI-assisted workflows to accelerate delivery of robust, scalable products.',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'phuctann2505@gmail.com',
  phone: '+84 334 974 582',
  github: 'https://github.com/PTan2505',
  githubUser: 'PTan2505',
  cv: '/cv/Nguyen-Phuc-Tan-CV.pdf',
  photo: '/images/me-cutout.png',
  photoAvif: '/images/me-cutout.avif',
  avatar: '/images/me.jpg',
  yearsOfExperience: '2+',
}

export const navLinks = [
  { label: 'Work', to: '/#work', count: '05' },
  { label: 'Service', to: '/#service', count: '04' },
  { label: 'Experience', to: '/#experience', count: '2y+' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/#contact' },
]

export const socials = [
  { label: 'GitHub', href: profile.github, icon: 'github', external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'Download CV', href: profile.cv, icon: 'file', download: true },
]

// Derived from the CV skill set + responsibilities.
export const services = [
  {
    title: 'Web App Development',
    description:
      'Production React apps with Vite, Redux Toolkit and React Query — predictable state, smooth data sync, clean architecture.',
    tags: ['ReactJS', 'Vite', 'Redux Toolkit', 'React Query'],
  },
  {
    title: 'Mobile Apps',
    description:
      'Cross-platform mobile apps with React Native & Expo, from architecture to automated EAS builds and distribution.',
    tags: ['React Native', 'Expo', 'EAS Build'],
  },
  {
    title: 'API Integration & Backend',
    description:
      'RESTful APIs with Node.js, Hono and Django, plus secure auth flows — OAuth, JWT, RBAC, silent token refresh and MFA.',
    tags: ['Node.js', 'Hono', 'Django', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'CI/CD & Code Quality',
    description:
      'GitHub Actions pipelines that enforce formatting and lint standards, block non-compliant code and ship reliably.',
    tags: ['GitHub Actions', 'Vercel', 'Fly.io', 'AWS S3'],
  },
]

// Newest first. `project` links the hover preview to a project cover.
export const experience = [
  {
    company: 'The Pulse API',
    role: 'Role — TODO',
    period: 'TODO — Now',
    project: 'pulse-api',
    placeholder: true,
  },
  {
    company: 'Lowca — Capstone Project',
    role: 'Frontend Team Lead (Web & Mobile)',
    period: 'Dec 2025 - May 2026',
    project: 'lowca',
  },
  {
    company: 'Experiential Entrepreneurship Project',
    role: 'Backend Developer',
    period: 'Sep 2025 - Dec 2025',
    project: 'trading-card-game',
  },
  {
    company: 'Amazing Tech — OJT',
    role: 'Frontend Developer',
    period: 'Jan 2025 - Aug 2025',
    project: 'nghia-ad-cms',
  },
  {
    company: 'Personal Project',
    role: 'Fullstack Developer',
    period: 'Aug 2024 - Now',
    project: 'clinic-management',
  },
]

export const education = {
  school: 'FPT University',
  degree: 'Bachelor — Software Engineering',
  period: 'May 2023 - May 2026',
  details: [
    { label: 'GPA', value: '7.48 / 10' },
    { label: 'Classification', value: 'Good' },
    { label: 'Capstone', value: 'Lowca — HCM Digitalized Street Food Application' },
  ],
}

export const languages = [{ label: 'English', value: 'Intermediate' }]

export const skillGroups = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'] },
  { label: 'Core', items: ['OOP', 'Data Structures'] },
  {
    label: 'Frontend',
    items: [
      'ReactJS',
      'React Native',
      'Redux Toolkit',
      'React Query',
      'React Router',
      'Axios',
      'WebSocket',
      'TailwindCSS',
      'Vite',
      'MUI',
      'Bootstrap',
      'Zod',
      'React Hook Form',
    ],
  },
  {
    label: 'Backend & DB',
    items: ['Node.js', 'Django', 'RESTful API', 'Express.js', 'Hono.js', 'PostgreSQL', 'MongoDB', 'JWT'],
  },
  {
    label: 'Tools & DevOps',
    items: ['Git & GitHub', 'GitHub Actions', 'Postman', 'OpenAPI', 'AWS S3', 'Bun', 'npm', 'Figma', 'Fly.io', 'Vercel'],
  },
]

export const stats = [
  { value: '2+', label: 'Years building products' },
  { value: '05', label: 'Shipped projects' },
  { value: '03', label: 'Devs led on Lowca' },
  { value: '02', label: 'Platforms — Web & Mobile' },
]

// ---- Not in the CV yet: placeholders ---------------------------------------

export const testimonials = [
  {
    quote: 'A short quote from a teammate, lead or client about working with you goes here.',
    name: 'Name — TODO',
    title: 'Role, Company — TODO',
    placeholder: true,
  },
  {
    quote: 'A second testimonial. Two or three strong quotes are better than many weak ones.',
    name: 'Name — TODO',
    title: 'Role, Company — TODO',
    placeholder: true,
  },
  {
    quote: 'A third testimonial, ideally from someone who saw you ship something real.',
    name: 'Name — TODO',
    title: 'Role, Company — TODO',
    placeholder: true,
  },
]

export const certifications = [
  { title: 'Certification / Award — TODO', issuer: 'Issuer — TODO', year: 'Year', placeholder: true },
  { title: 'Certification / Award — TODO', issuer: 'Issuer — TODO', year: 'Year', placeholder: true },
]

export const writing = [
  { title: 'Article title — TODO', summary: 'One-line summary of the post.', date: 'Date', href: null, placeholder: true },
  { title: 'Article title — TODO', summary: 'One-line summary of the post.', date: 'Date', href: null, placeholder: true },
]
