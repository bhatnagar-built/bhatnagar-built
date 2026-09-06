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
    status: 'Release Candidate',
    statusBadge: 'Release Candidate',
    statusClass: 'fintech',
    deviceType: 'mobile',
    image: '/images/apps/emi-health/screen-1.png',
    domainUrl: 'emi-health.app',
    telemetry: ['Zero Telemetry', 'SQLite Local Engine', 'Amortization Math'],
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
    status: 'Active Beta',
    statusBadge: 'Active Beta',
    statusClass: 'banking',
    deviceType: 'desktop',
    image: '/images/apps/credalytix/screen-1.png',
    domainUrl: 'credalytix.app',
    telemetry: ['Tandon Method II', '100-Pt RAM Scorecard', 'Automated CAM'],
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
    statusBadge: 'Active Development',
    statusClass: 'legaltech',
    deviceType: 'mobile',
    image: '/images/apps/counselpro/screen-1.png',
    domainUrl: 'counselpro.legal',
    telemetry: ['Bar Council KYC', 'AES-256 Vault', 'Litigation Tracking'],
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
    status: 'Active Showcase',
    statusBadge: 'Production Verified',
    statusClass: 'health',
    deviceType: 'mobile',
    image: '/images/apps/calstreak/screen-1.png',
    domainUrl: 'calstreak.app',
    telemetry: ['Deterministic Macros', 'Streak Scoring', 'CalPoints Token'],
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

export const domainPillars = [
  {
    id: 'fintech',
    title: 'FinTech',
    subtitleLine1: 'Financial',
    subtitleLine2: 'Tools',
    icon: 'landmark',
    targetSection: 'products',
    targetProduct: 'emi-health',
    description: 'Privacy-first debt calculation and commercial banking assessment engines.'
  },
  {
    id: 'legaltech',
    title: 'LegalTech',
    subtitleLine1: 'Access &',
    subtitleLine2: 'Automation',
    icon: 'scale',
    targetSection: 'products',
    targetProduct: 'counselpro',
    description: 'Practice management and verified advocate consultation platform.'
  },
  {
    id: 'productivity',
    title: 'Productivity',
    subtitleLine1: 'Habit & Focus',
    subtitleLine2: 'Tools',
    icon: 'bar-chart-3',
    targetSection: 'products',
    targetProduct: 'calstreak',
    description: 'Offline-first nutrition and behavioral habit streak tracking.'
  },
  {
    id: 'mobile-web',
    title: 'Mobile & Web',
    subtitleLine1: 'Flutter',
    subtitleLine2: 'Full Stack',
    icon: 'code',
    targetSection: 'technology',
    targetProduct: null,
    description: 'Cross-platform native mobile applications and TypeScript full-stack web platforms.'
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
    icon: 'compass',
    tagline: 'PRAGMATIC WORKFLOW DESIGN',
    desc: 'Software engineered around actual user behavior and real workflows, not theoretical feature lists. Every interface decision is grounded in reducing cognitive load and accelerating task completion.',
    telemetry: ['Real Workflow Modeling', 'Zero Friction UX', 'Feedback Loops'],
    enforcement: 'UX Disciplinary Standard'
  },
  {
    number: '02',
    title: 'Privacy by Design',
    icon: 'shield-check',
    tagline: 'CLIENT-SIDE ISOLATION',
    desc: 'Sensitive financial and legal information is protected through local-first storage, client-side encryption, and zero-telemetry architectures where applicable. User data remains sovereign.',
    telemetry: ['Local SQLite Engine', 'AES-256 Storage', 'Zero Telemetry Leaks'],
    enforcement: 'Cryptographic Protection'
  },
  {
    number: '03',
    title: 'Deterministic Calculation Quality',
    icon: 'cpu',
    tagline: 'MATHEMATICAL PRECISION',
    desc: 'Mission-critical banking and financial models are calibrated against regulatory standards with rigorous boundary testing. Floating-point drift is eliminated through integer math engines.',
    telemetry: ['Zero Rounding Drift', 'Amortization Engine', 'Regulatory Proofs'],
    enforcement: 'Audit Benchmarked'
  },
  {
    number: '04',
    title: 'Maintainable Architecture',
    icon: 'boxes',
    tagline: 'MODULAR SEPARATION',
    desc: 'Clean separation of presentation, domain business logic, and data layers to ensure codebases remain scalable and resilient over time. Strict decoupling allows rapid independent refactoring.',
    telemetry: ['Clean Architecture', 'Repository Layering', 'Deterministic State'],
    enforcement: 'System Decoupling'
  }
];

export const techStack = [
  {
    id: 'languages',
    index: '01',
    category: 'Languages',
    icon: 'code-2',
    description: 'Core programming & scripting languages',
    items: ['Dart', 'TypeScript', 'JavaScript', 'SQL', 'HTML5', 'CSS3']
  },
  {
    id: 'frameworks',
    index: '02',
    category: 'Frameworks & Runtimes',
    icon: 'layers',
    description: 'Client frameworks & server engines',
    items: ['Flutter', 'React', 'Node.js', 'Express', 'Vite']
  },
  {
    id: 'databases',
    index: '03',
    category: 'Databases & Storage',
    icon: 'database',
    description: 'Relational, embedded & offline data',
    items: ['PostgreSQL', 'SQLite', 'Offline Local Storage', 'Hive']
  },
  {
    id: 'platforms',
    index: '04',
    category: 'Platforms',
    icon: 'smartphone',
    description: 'Native & responsive deployment targets',
    items: ['Android', 'iOS', 'Web', 'Desktop (macOS / Win)']
  },
  {
    id: 'engineering',
    index: '05',
    category: 'Engineering & Tooling',
    icon: 'wrench',
    description: 'Version control, containers & architecture',
    items: ['Git', 'GitHub', 'Docker', 'REST APIs', 'CI/CD Pipelines']
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
  linkedin: 'https://www.linkedin.com/in/abhishek-bhatnagar-44022b131/'
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
        title: 'CalStreak Dashboard',
        subtitle: 'Daily target tracking, weight milestones & calendar habits',
        src: '/images/apps/calstreak/screen-1.png',
        tag: 'Dashboard'
      },
      {
        id: 2,
        title: 'Daily Nutrition & Macros',
        subtitle: 'Target tracking & detailed micronutrient telemetry',
        src: '/images/apps/calstreak/screen-2.png',
        tag: 'Nutrition'
      },
      {
        id: 3,
        title: 'Streaks & Achievements',
        subtitle: 'Consecutive streak scoring, badges & reward CalPoints',
        src: '/images/apps/calstreak/screen-3.png',
        tag: 'Streaks'
      }
    ]
  }
};

/**
 * System Telemetry & Architecture Audit Metrics Explanation
 * Data-driven breakdown for the 3 Hero proof metrics:
 * 1. 4 Featured Products
 * 2. 3 Platforms
 * 3. 3 Domains
 */
export const heroMetricsExplanation = {
  'products': {
    id: 'products',
    metricValue: '4',
    metricLabel: 'Featured Products',
    systemCode: 'SYS-AUDIT // 04-PROD-ENT',
    tag: 'PRODUCTION SYSTEMS',
    title: '4 Featured Products',
    subtitle: 'Production-engineered applications with real architectures & source code',
    summary: 'Every featured product is an end-to-end engineered system built to solve high-stakes workflows in FinTech, LegalTech, and Habit Science — backed by verified GitHub repositories, zero placeholder claims, and production-tested algorithms.',
    stats: [
      { label: 'GitHub Verification', value: '100%' },
      { label: 'Total Showcases', value: '4 Systems' },
      { label: 'Codebase Status', value: 'Production / Beta' }
    ],
    items: [
      {
        name: 'EMI Health',
        category: 'Personal Finance / FinTech',
        status: 'Release Candidate',
        desc: 'Privacy-first debt diagnostics & loan amortization engine built in Flutter with zero telemetry and offline mathematical precision.',
        tech: ['Flutter', 'Dart', 'Local-First SQLite', 'Math Engine'],
        url: 'https://github.com/bhatnagar-built/emi-health-app-showcase'
      },
      {
        name: 'Credalytix',
        category: 'Commercial Banking',
        status: 'Active Beta',
        desc: 'Institutional credit appraisal platform implementing Tandon Method II MPBF, Nayak turnover models, and automated Credit Appraisal Memo generation.',
        tech: ['TypeScript', 'React', 'Banking Algorithms', 'Financial Analysis'],
        url: 'https://github.com/bhatnagar-built/Credalytix-Working-Capital-Eligibility-Calculator-showcase'
      },
      {
        name: 'CounselPro',
        category: 'LegalTech',
        status: 'Active Development',
        desc: 'Legal practice management suite with Bar Council advocate verification, end-to-end encrypted client document vaults, and AI-assisted case briefings.',
        tech: ['Flutter', 'Dart', 'Security Vault', 'AI Integration'],
        url: 'https://github.com/bhatnagar-built/counselpro-app-showcase'
      },
      {
        name: 'CalStreak',
        category: 'Health & Habit',
        status: 'Active Showcase',
        desc: 'Habit-first nutrition and consecutive streak tracker with deterministic macro calculations, weight trajectory pacing, and gamified CalPoints.',
        tech: ['Flutter', 'Dart', 'Trend Analysis', 'Gamification'],
        url: 'https://github.com/bhatnagar-built/CalStreak-Showcase'
      }
    ]
  },
  'platforms': {
    id: 'platforms',
    metricValue: '3',
    metricLabel: 'Platforms',
    systemCode: 'MATRIX // RUNTIME-03-CROSS',
    tag: 'CROSS-PLATFORM ARCHITECTURE',
    title: '3 Core Platforms',
    subtitle: 'Unified code logic engineered across Mobile, Web, and Desktop environments',
    summary: 'Architected with strict separation of concerns: mathematical cores and domain business rules are decoupled from UI presentation layers, enabling silky-smooth 60+ FPS performance natively across all three computing surfaces.',
    stats: [
      { label: 'Target Frame Rate', value: '60–120 FPS' },
      { label: 'Core Logic Reuse', value: '> 85%' },
      { label: 'Zero Platform Lock-in', value: 'Verified' }
    ],
    items: [
      {
        name: 'Mobile (iOS & Android)',
        category: 'Native Mobile',
        status: 'Flutter / Dart Engine',
        desc: 'Engineered with responsive gesture interactions, offline-first local persistence (Hive/SQLite), hardware biometric auth, and zero-latency state machines.',
        tech: ['Flutter', 'Dart', 'iOS Cupertino', 'Android Material 3']
      },
      {
        name: 'Web (SPA & Modern PWA)',
        category: 'High-Speed Web',
        status: 'TypeScript / React / Vite',
        desc: 'Sub-second cold starts, responsive layouts with fine-tuned CSS design tokens, accessible keyboard navigation, and robust financial calculator models.',
        tech: ['TypeScript', 'React', 'Vite', 'Modern Vanilla CSS']
      },
      {
        name: 'Desktop (macOS & Windows)',
        category: 'Desktop Workstations',
        status: 'Cross-Platform Desktop',
        desc: 'Tailored for intensive commercial banking underwriting (Credalytix) and legal docket management (CounselPro) on multi-column desktop displays.',
        tech: ['Desktop Flutter', 'Electron / Web', 'Multi-Window Layouts']
      }
    ]
  },
  'domains': {
    id: 'domains',
    metricValue: '3',
    metricLabel: 'Domains',
    systemCode: 'SECTORS // SPEC-DOMAIN-03',
    tag: 'DEEP DOMAIN EXPERTISE',
    title: '3 Specialized Domains',
    subtitle: 'Domain-Driven Design (DDD) rooted in actual regulatory & algorithmic requirements',
    summary: 'Software is only as effective as the domain rules it executes. Rather than generic UI clones, Abhishek builds specialized software grounded in real Indian financial frameworks, legal workflows, and behavioral habit mechanics.',
    stats: [
      { label: 'Domain-Driven Design', value: 'Strict' },
      { label: 'Regulatory Adherence', value: 'Banking / Legal' },
      { label: 'Algorithmic Rigor', value: 'Deterministic' }
    ],
    items: [
      {
        name: 'FinTech & Commercial Banking',
        category: 'Financial Engineering',
        status: 'Retail & Corporate Banking',
        desc: 'Mathematical amortization calculators, pre-payment scenarios, debt reduction strategies, and RBI regulatory working capital limit computations.',
        tech: ['Amortization Math', 'MPBF Tandon Norms', 'RAM Scorecard', 'DSCR Analysis']
      },
      {
        name: 'LegalTech',
        category: 'Legal Operations',
        status: 'Practice Management',
        desc: 'Digitized advocate onboarding, verified credentials, encrypted case repositories, hearing date tracking, and automated litigation timeline generation.',
        tech: ['Bar Verification', 'Encrypted Vaults', 'Litigation Tracking', 'AI Legal RAG']
      },
      {
        name: 'Health & Habit Science',
        category: 'Behavioral Technology',
        status: 'Habit Mechanics',
        desc: 'Consecutive streak algorithms, nutritional macronutrient validation, calorie deficit forecasting, and gamified behavioral reinforcement loops.',
        tech: ['Habit Retention', 'Macro Telemetry', 'CalPoint Tokens', 'Offline Sync']
      }
    ]
  }
};

