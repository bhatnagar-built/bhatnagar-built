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
  {
    number: '01',
    title: 'Idea',
    subtitle: 'Identify real problems',
    icon: 'lightbulb'
  },
  {
    number: '02',
    title: 'Product',
    subtitle: 'Define the solution',
    icon: 'file-text'
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Create simple, intuitive UX',
    icon: 'pencil'
  },
  {
    number: '04',
    title: 'Engineering',
    subtitle: 'Build with quality',
    icon: 'code'
  },
  {
    number: '05',
    title: 'Validation',
    subtitle: 'Test and refine',
    icon: 'shield-check'
  },
  {
    number: '06',
    title: 'Ship',
    subtitle: 'Deliver and improve',
    icon: 'rocket'
  }
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

export const appShowcases = {
  'emi-health': {
    id: 'emi-health',
    name: 'EMI Health',
    domain: 'FinTech',
    domainClass: 'fintech',
    headline: 'Privacy-First Personal Finance & Debt Diagnostics',
    description: 'Local-first zero-telemetry architecture with deterministic EMI amortization, health scoring, and stress-testing.',
    screens: [
      {
        id: 1,
        title: 'Diagnostic Dashboard',
        subtitle: 'Debt-to-Income & Health Score (0–100)',
        src: '/images/apps/emi-health/screen-1.png',
        tag: 'Dashboard'
      },
      {
        id: 2,
        title: 'Loan Amortization Setup',
        subtitle: 'Multi-loan scheduling & repayment engine',
        src: '/images/apps/emi-health/screen-2.png',
        tag: 'Loan Setup'
      },
      {
        id: 3,
        title: 'Savings & Liquidity',
        subtitle: 'Emergency buffer & liquidity diagnostics',
        src: '/images/apps/emi-health/screen-3.png',
        tag: 'Savings'
      }
    ]
  },
  'counselpro': {
    id: 'counselpro',
    name: 'CounselPro',
    domain: 'LegalTech',
    domainClass: 'legaltech',
    headline: 'Verified Legal Consultation & Case Management',
    description: 'Bar Council credential verification, encrypted case vault, and automated litigation timeline tracking.',
    screens: [
      {
        id: 1,
        title: 'Practice Dashboard',
        subtitle: 'Verified advocate consultation & active matters',
        src: '/images/apps/counselpro/screen-1.png',
        tag: 'Dashboard'
      },
      {
        id: 2,
        title: 'AI Legal Assistant',
        subtitle: 'Automated legal research & document analysis',
        src: '/images/apps/counselpro/screen-2.png',
        tag: 'AI Assistant'
      },
      {
        id: 3,
        title: 'Encrypted Case Vault',
        subtitle: 'Privileged case records & litigation tracking',
        src: '/images/apps/counselpro/screen-3.png',
        tag: 'Case Vault'
      }
    ]
  },
  'credalytix': {
    id: 'credalytix',
    name: 'Credalytix',
    domain: 'Commercial Banking',
    domainClass: 'banking',
    headline: 'Commercial Credit Underwriting & RAM Scorecard Engine',
    description: 'Institutional-grade B2B credit appraisal platform automating 100-point RAM scorecard and MPBF assessment.',
    screens: [
      {
        id: 1,
        title: 'Credit Appraisal Vault',
        subtitle: 'Active commercial underwriting portfolio',
        src: '/images/apps/credalytix/screen-1.png',
        tag: 'Case Vault'
      },
      {
        id: 2,
        title: '100-Point RAM Scorecard',
        subtitle: 'Multi-factor quantitative & qualitative scoring',
        src: '/images/apps/credalytix/screen-2.png',
        tag: 'Scorecard'
      },
      {
        id: 3,
        title: 'Final Verdict & CAM Summary',
        subtitle: 'Tandon MPBF calculation & committee memorandum',
        src: '/images/apps/credalytix/screen-3.png',
        tag: 'Verdict'
      }
    ]
  },
  'calstreak': {
    id: 'calstreak',
    name: 'CalStreak',
    domain: 'Health & Habit',
    domainClass: 'health',
    headline: 'Habit-First Nutrition & Consecutive Streak Engine',
    description: 'Deterministic trend calculation, ultra-low friction macro logging, and behavioral streak mechanics.',
    screens: [
      {
        id: 1,
        title: 'Calorie & Streak Tracker',
        subtitle: 'Daily macro target & streak consistency',
        src: '/images/apps/calstreak/screen-1.png',
        tag: 'Tracker'
      },
      {
        id: 2,
        title: 'Nutritional Analytics',
        subtitle: 'Macro distribution & historical trends',
        src: '/images/apps/calstreak/screen-2.png',
        tag: 'Analytics'
      },
      {
        id: 3,
        title: 'Cross-Platform Experience',
        subtitle: 'Offline-ready habit tracking architecture',
        src: '/images/apps/calstreak/screen-3.png',
        tag: 'Overview'
      }
    ]
  }
};
