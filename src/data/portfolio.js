/**
 * Portfolio Data — Sourced from GitHub Evidence
 * All information verified against public repositories and showcases.
 */

export const products = [
  {
    id: 'emi-health',
    name: 'EMI Health',
    category: 'FinTech',
    categoryClass: 'fintech',
    tagline: 'Privacy-First Personal Finance & Debt Diagnostics',
    description: 'A consumer-focused financial health application designed to bring clarity to debt obligations and loan structures. Built with a strict local-first, zero-telemetry architecture to ensure sensitive financial data never leaves the user\'s device.',
    platform: ['Flutter', 'Dart'],
    stack: ['Local-First Architecture', 'Cross-Platform'],
    domain: 'Personal Finance',
    status: 'Beta / Release Candidate',
    capabilities: [
      'Debt diagnostics',
      'EMI health scoring',
      'Loan amortization',
      'Prepayment stress-testing',
      'Repayment scenarios',
      'Financial Health Score (0–100)'
    ],
    showcaseUrl: 'https://github.com/bhatnagar-built/emi-health-app-showcase',
    screenshotRef: 'assets/screenshots/app_ecosystem_panoramic_showcase.png',
    featured: true
  },
  {
    id: 'credalytix',
    name: 'Credalytix',
    category: 'Commercial Banking',
    categoryClass: 'banking',
    tagline: 'Commercial Credit Underwriting & RAM Scorecard Engine',
    description: 'An institutional-grade B2B credit appraisal platform built for commercial lenders, NBFCs, and credit analysts. Automates multi-year financial statement spreading, ratio diagnostics, and regulatory working capital limit assessments.',
    platform: ['TypeScript', 'Web'],
    stack: ['Financial Engineering Algorithms'],
    domain: 'Credit Risk & Underwriting',
    status: 'Active Testing / Beta',
    capabilities: [
      '100-point RAM scorecard',
      'Tandon Method II MPBF',
      'Multi-year trend diagnostics',
      'Credit Appraisal Memo generation',
      'Financial statement spreading',
      'Ratio diagnostics'
    ],
    showcaseUrl: 'https://github.com/bhatnagar-built/Credalytix-Working-Capital-Eligibility-Calculator-showcase',
    screenshotRef: 'assets/screenshots/01_case_vault_dashboard.png',
    featured: true
  },
  {
    id: 'counselpro',
    name: 'CounselPro',
    category: 'LegalTech',
    categoryClass: 'legaltech',
    tagline: 'Verified Legal Consultation & Case Management Platform',
    description: 'A modern LegalTech application designed to streamline practice workflows and connect clients with verified advocates. Features Bar Council credential verification, encrypted case vault, and automated litigation tracking.',
    platform: ['Flutter', 'Dart'],
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    domain: 'Legal Practice & Case Management',
    status: 'Active Development',
    capabilities: [
      'Bar Council KYC verification',
      'Multi-mode consultation',
      'Milestone-based escrow',
      'Encrypted document vault',
      '4-stage litigation tracking',
      'AI legal assistant'
    ],
    showcaseUrl: 'https://github.com/bhatnagar-built/counselpro-app-showcase',
    screenshotRef: null,
    featured: true
  },
  {
    id: 'calstreak',
    name: 'CalStreak',
    category: 'Consumer Health',
    categoryClass: 'health',
    tagline: 'Habit-First Nutrition & Daily Streak Tracking',
    description: 'A consumer mobile companion built to address tracking burnout by replacing spreadsheet-like calorie counters with sustainable habit consistency. Prioritizes consistency over perfection.',
    platform: ['Flutter', 'Dart'],
    stack: ['Mobile UX'],
    domain: 'Nutrition & Habit Tracking',
    status: 'MVP / In Development',
    capabilities: [
      'Daily streak engine',
      'Glanceable energy baselines',
      'Frictionless meal logging',
      'Adaptive habit scoring',
      'Behavioral nudges',
      'Weekly progress snapshots'
    ],
    showcaseUrl: 'https://github.com/bhatnagar-built/CalStreak-Showcase',
    screenshotRef: null,
    featured: true
  }
];

export const capabilities = [
  {
    icon: 'smartphone',
    title: 'Mobile Applications',
    desc: 'Cross-platform Flutter applications for Android and iOS, built with native-grade performance and thoughtful mobile UX — from EMI Health to CalStreak.'
  },
  {
    icon: 'landmark',
    title: 'FinTech Products',
    desc: 'Financial tools with deterministic calculation engines, amortization models, and credit risk scoring — built to banking-grade precision with privacy-conscious architecture.'
  },
  {
    icon: 'scale',
    title: 'LegalTech Products',
    desc: 'Practice workflow automation, case management, and verified advocate matching — CounselPro brings encrypted, compliant infrastructure to legal services.'
  },
  {
    icon: 'bar-chart-3',
    title: 'Business & Financial Tools',
    desc: 'Commercial credit underwriting, working capital assessment, and RAM scorecard engines — Credalytix automates institutional lending decisions.'
  },
  {
    icon: 'globe',
    title: 'Web Applications',
    desc: 'Modern web platforms with TypeScript, responsive dashboards, and data-driven interfaces for enterprise and consumer markets.'
  }
];

export const engineeringPrinciples = [
  {
    number: '01',
    title: 'Product-First Thinking',
    desc: 'Software engineered around actual user behavior and real workflows, not theoretical feature lists.'
  },
  {
    number: '02',
    title: 'Privacy by Design',
    desc: 'Sensitive financial and legal information is protected through local-first storage, client-side encryption, and zero-telemetry architectures where applicable.'
  },
  {
    number: '03',
    title: 'Deterministic Calculation Quality',
    desc: 'Mission-critical banking and financial models are calibrated against regulatory standards with rigorous boundary testing.'
  },
  {
    number: '04',
    title: 'Maintainable Architecture',
    desc: 'Clean separation of presentation, domain business logic, and data layers to ensure codebases remain scalable and resilient over time.'
  }
];

export const techStack = [
  {
    category: 'Languages',
    items: ['Dart', 'TypeScript', 'JavaScript', 'SQL', 'HTML5', 'CSS3']
  },
  {
    category: 'Frameworks & Runtimes',
    items: ['Flutter', 'Node.js', 'Express']
  },
  {
    category: 'Databases & Storage',
    items: ['PostgreSQL', 'SQLite', 'Offline Local Storage']
  },
  {
    category: 'Platforms',
    items: ['Android', 'iOS', 'Web']
  },
  {
    category: 'Engineering & Tooling',
    items: ['Git', 'GitHub', 'Docker', 'REST APIs']
  }
];

export const processSteps = [
  { label: 'Idea', number: '01' },
  { label: 'Product', number: '02' },
  { label: 'Design', number: '03' },
  { label: 'Engineering', number: '04' },
  { label: 'Validation', number: '05' },
  { label: 'Ship', number: '06' }
];

export const githubRepos = [
  {
    name: 'emi-health-app-showcase',
    desc: 'Privacy-first personal finance & EMI planning',
    url: 'https://github.com/bhatnagar-built/emi-health-app-showcase'
  },
  {
    name: 'counselpro-app-showcase',
    desc: 'Legal consultation & case management',
    url: 'https://github.com/bhatnagar-built/counselpro-app-showcase'
  },
  {
    name: 'Credalytix-showcase',
    desc: 'Commercial credit underwriting & RAM scorecard',
    url: 'https://github.com/bhatnagar-built/Credalytix-Working-Capital-Eligibility-Calculator-showcase'
  },
  {
    name: 'CalStreak-Showcase',
    desc: 'Habit-first nutrition & streak tracking',
    url: 'https://github.com/bhatnagar-built/CalStreak-Showcase'
  }
];

export const currentFocus = [
  'Expanding commercial credit underwriting and banking decision-support tools.',
  'Enhancing legal practice workflow automation and document verification systems.',
  'Deepening cross-platform mobile architectures with Flutter.',
  'Maintaining high standards for privacy, performance, and user interface responsiveness.'
];

export const contactInfo = {
  email: 'abhi.bhatnagar.official@gmail.com',
  github: 'https://github.com/bhatnagar-built',
  linkedin: 'https://www.linkedin.com/in/abhishek-bhatnagar'
};
