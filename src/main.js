/**
 * Portfolio — Main Application
 * Abhishek Bhatnagar Personal Portfolio
 * 
 * Renders all dynamic sections from structured data,
 * handles navigation, scroll reveals, and interactions.
 */

import {
  products,
  domainPillars,
  capabilities,
  engineeringPrinciples,
  techStack,
  processSteps,
  githubRepos,
  currentFocus
} from './data/portfolio.js';
import { initSciFiBackground } from './components/scifi-background.js';
import { initBurstShowcase } from './components/burst-showcase.js';
import { initJarvisHud } from './components/jarvis-hud.js';

// ── Initialize ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSciFiBackground();
  initBurstShowcase();
  initJarvisHud();
  renderDomainPillars();
  renderProducts();
  renderCapabilities();
  renderProcessTimeline();
  renderEngineering();
  renderTechStack();
  renderGitHubRepos();
  renderCurrentFocus();
  initNavigation();
  initScrollReveal();
  initSmoothScroll();
  initLucideIcons();
});

// ── Render Domain & Engineering Pillars ──────────────────────
function renderDomainPillars() {
  const container = document.getElementById('hero-pillars');
  if (!container) return;

  const pillarIcons = {
    landmark: `
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="3" y1="21" x2="21" y2="21"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <polygon points="12 3 21 10 3 10" fill="currentColor" fill-opacity="0.15"></polygon>
        <line x1="6" y1="10" x2="6" y2="21"></line>
        <line x1="10" y1="10" x2="10" y2="21"></line>
        <line x1="14" y1="10" x2="14" y2="21"></line>
        <line x1="18" y1="10" x2="18" y2="21"></line>
      </svg>
    `,
    scale: `
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill="currentColor" fill-opacity="0.15"></path>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill="currentColor" fill-opacity="0.15"></path>
        <path d="M7 21h10"></path>
        <path d="M12 3v18"></path>
        <path d="M3 7h18"></path>
      </svg>
    `,
    'bar-chart-3': `
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <rect x="4" y="13" width="3.8" height="7.5" rx="1.2" opacity="0.9"></rect>
        <rect x="10.1" y="8" width="3.8" height="12.5" rx="1.2" opacity="0.95"></rect>
        <rect x="16.2" y="3.5" width="3.8" height="17" rx="1.2"></rect>
      </svg>
    `,
    code: `
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="7 8 3 12 7 16"></polyline>
        <line x1="14" y1="4" x2="10" y2="20"></line>
        <polyline points="17 8 21 12 17 16"></polyline>
      </svg>
    `
  };

  container.innerHTML = domainPillars.map(p => `
    <div class="pillar-item" data-pillar="${p.id}" tabindex="0" role="button" aria-label="${p.title}: ${p.subtitleLine1} ${p.subtitleLine2}. Click to explore." title="${p.description}">
      <div class="pillar-badge">
        <div class="pillar-badge__ring" aria-hidden="true"></div>
        <div class="pillar-badge__icon">
          ${pillarIcons[p.icon] || ''}
        </div>
      </div>
      <div class="pillar-text">
        <h3 class="pillar-title">${p.title}</h3>
        <div class="pillar-subtitle">
          <span class="pillar-subtitle-line">${p.subtitleLine1}</span>
          <span class="pillar-subtitle-line">${p.subtitleLine2}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Handle interaction: smooth scroll and highlight target products
  container.querySelectorAll('.pillar-item').forEach(item => {
    const trigger = () => {
      const pillarId = item.getAttribute('data-pillar');
      const pillar = domainPillars.find(p => p.id === pillarId);
      if (!pillar) return;

      if (pillar.targetSection === 'products') {
        const targetEl = pillar.targetProduct 
          ? document.getElementById(`product-${pillar.targetProduct}`)
          : document.getElementById('products');
        
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.classList.remove('product-card--pulse-focus');
          void targetEl.offsetWidth; // Force reflow
          targetEl.classList.add('product-card--pulse-focus');
          setTimeout(() => targetEl.classList.remove('product-card--pulse-focus'), 2500);
        }
      } else if (pillar.targetSection === 'technology') {
        const techSection = document.getElementById('technology');
        if (techSection) {
          techSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    item.addEventListener('click', trigger);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });
}

// ── Render Products ─────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <article class="product-card reveal" id="product-${product.id}" aria-label="${product.name}">
      <!-- Real App Screen Preview & Device Mockup -->
      <div class="product-card__image" data-trigger-burst="${product.id}" role="button" tabindex="0" title="Click to view interactive 3D exploded screens for ${product.name}">
        <!-- Window Chrome / Device Header -->
        <div class="product-card__chrome">
          <div class="product-card__chrome-dots" aria-hidden="true">
            <span class="chrome-dot chrome-dot--red"></span>
            <span class="chrome-dot chrome-dot--amber"></span>
            <span class="chrome-dot chrome-dot--green"></span>
          </div>
          <div class="product-card__chrome-url">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>${product.domainUrl || product.name}</span>
          </div>
          <div class="product-card__status-chip product-card__status-chip--${product.statusClass || 'fintech'}">
            <span class="status-pulse-dot"></span>
            <span>${product.statusBadge || product.status}</span>
          </div>
        </div>

        <!-- Real App Screenshot Viewport -->
        <div class="product-card__screen-viewport">
          <img src="${product.image}" alt="${product.name} Application Screenshot" class="product-card__screen-img" loading="lazy" />
          <div class="product-card__screen-glare" aria-hidden="true"></div>
          
          <!-- Hover 3D Exploded View Cue -->
          <div class="product-card__burst-overlay">
            <button type="button" class="product-card__burst-btn" data-trigger-burst="${product.id}" aria-label="Explode 3D screens for ${product.name}">
              <span class="burst-btn-icon">⚡</span>
              <span class="burst-btn-text">EXPLODE 3D SCREENS</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </button>
            <span class="product-card__burst-hint">Inspect layered isometric UI architecture</span>
          </div>
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="product-card__body">
        <div class="product-card__header-row">
          <span class="product-card__category product-card__category--${product.categoryClass}">
            ${product.category}
          </span>
          <span class="product-card__platform-badge">${product.platform.join(' • ')}</span>
        </div>

        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__tagline">${product.tagline}</p>

        <!-- Architectural Telemetry Pills -->
        ${product.telemetry ? `
          <div class="product-card__telemetry-strip">
            ${product.telemetry.map(t => `<span class="product-card__telemetry-pill">${t}</span>`).join('')}
          </div>
        ` : ''}

        <p class="product-card__description">${product.description}</p>

        <div class="product-card__meta">
          ${product.platform.map(p => `<span class="product-card__tag">${p}</span>`).join('')}
          ${product.stack.map(s => `<span class="product-card__tag">${s}</span>`).join('')}
        </div>

        <div class="product-card__capabilities">
          <span class="product-card__capabilities-title">Key Capabilities</span>
          <div class="product-card__capabilities-list">
            ${product.capabilities.map(c => `<span class="product-card__capability">${c}</span>`).join('')}
          </div>
        </div>

        <div class="product-card__footer">
          <button type="button" class="product-card__action-burst" data-trigger-burst="${product.id}" aria-label="View 3D screens for ${product.name}">
            <span>⚡ View 3D Screens</span>
          </button>
          <a href="${product.showcaseUrl}" target="_blank" rel="noopener noreferrer" class="product-card__link" aria-label="View ${product.name} repository on GitHub">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" class="product-card__link-icon" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>GitHub Repo</span>
            <i data-lucide="external-link" class="product-card__link-icon"></i>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// ── Render Capabilities ─────────────────────────────────────
function renderCapabilities() {
  const grid = document.getElementById('capabilities-grid');
  if (!grid) return;

  grid.innerHTML = capabilities.map((cap, i) => `
    <div class="capability-card reveal reveal--delay-${i + 1}">
      <i data-lucide="${cap.icon}" class="capability-card__icon"></i>
      <h3 class="capability-card__title">${cap.title}</h3>
      <p class="capability-card__desc">${cap.desc}</p>
    </div>
  `).join('');
}

// ── Render Process Timeline (Idea to Impact Bar) ───────────
function renderProcessTimeline() {
  const timeline = document.getElementById('process-timeline');
  if (!timeline) return;

  const iconMap = {
    lightbulb: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
    'file-text': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    pencil: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
    code: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    'shield-check': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    rocket: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`
  };

  const arrowSvg = `<svg class="process-flow__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

  let html = `
    <!-- Continuous Moving Energy Rail (Left to Right) -->
    <div class="process-flow__track" aria-hidden="true">
      <div class="process-flow__track-line"></div>
      <div class="process-flow__track-pulse">
        <div class="process-flow__track-tail"></div>
        <div class="process-flow__track-head"></div>
      </div>
    </div>
  `;
  processSteps.forEach((step, index) => {
    const iconSvg = iconMap[step.icon] || '';
    html += `
      <div class="process-flow__step reveal reveal--delay-${index + 1}">
        <div class="process-flow__circle" title="${step.title}">
          ${iconSvg}
        </div>
        <div class="process-flow__text">
          <span class="process-flow__name">${step.title}</span>
          <span class="process-flow__desc">${step.subtitle}</span>
        </div>
      </div>
    `;

    if (index < processSteps.length - 1) {
      html += `
        <div class="process-flow__connector" aria-hidden="true">
          <div class="process-flow__line"></div>
          ${arrowSvg}
          <div class="process-flow__line"></div>
        </div>
      `;
    }
  });

  timeline.innerHTML = html;
}

// ── Render Engineering Principles ───────────────────────────
function renderEngineering() {
  const grid = document.getElementById('engineering-grid');
  if (!grid) return;

  grid.innerHTML = engineeringPrinciples.map(principle => `
    <div class="engineering-card reveal">
      <span class="engineering-card__number">${principle.number}</span>
      <h3 class="engineering-card__title">${principle.title}</h3>
      <p class="engineering-card__desc">${principle.desc}</p>
    </div>
  `).join('');
}

// ── Render Tech Stack ───────────────────────────────────────
function renderTechStack() {
  const grid = document.getElementById('tech-grid');
  if (!grid) return;

  grid.innerHTML = techStack.map((category, idx) => `
    <div class="tech-category reveal" data-category="${category.id || idx}">
      <div class="tech-category__header">
        <div class="tech-category__icon-wrap" aria-hidden="true">
          <i data-lucide="${category.icon || 'code-2'}"></i>
        </div>
        <div class="tech-category__meta">
          <div class="tech-category__topline">
            <span class="tech-category__index">${category.index || `0${idx + 1}`}</span>
            <span class="tech-category__count">${category.items.length} Technologies</span>
          </div>
          <h3 class="tech-category__title">${category.category}</h3>
        </div>
      </div>
      <div class="tech-category__items">
        ${category.items.map(item => `
          <span class="tech-item">
            <span class="tech-item__dot" aria-hidden="true"></span>
            <span class="tech-item__name">${item}</span>
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// ── Render GitHub Repos ─────────────────────────────────────
function renderGitHubRepos() {
  const container = document.getElementById('github-repos');
  if (!container) return;

  container.innerHTML = githubRepos.map(repo => `
    <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="github-repo" aria-label="View ${repo.name} on GitHub">
      <i data-lucide="folder-git-2" class="github-repo__icon"></i>
      <div class="github-repo__info">
        <span class="github-repo__name">${repo.name}</span>
        <span class="github-repo__desc">${repo.desc}</span>
      </div>
      <i data-lucide="arrow-up-right" class="github-repo__arrow"></i>
    </a>
  `).join('');
}

// ── Render Current Focus ────────────────────────────────────
function renderCurrentFocus() {
  const list = document.getElementById('focus-list');
  if (!list) return;

  list.innerHTML = currentFocus.map(item => `
    <li class="about__focus-item">${item}</li>
  `).join('');
}

// ── Navigation ──────────────────────────────────────────────
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Scroll-based nav styling
  let lastScrollY = 0;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    lastScrollY = scrollY;
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('mobile-menu--open');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on overlay click
  const overlay = mobileMenu.querySelector('.mobile-menu__overlay');
  overlay.addEventListener('click', closeMobileMenu);

  function openMobileMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    toggle.classList.add('nav__toggle--open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('nav__toggle--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--github)');

  const observerOptions = {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

// ── Scroll Reveal ───────────────────────────────────────────
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const staggers = document.querySelectorAll('.stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '50px 0px 50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('stagger--visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  staggers.forEach(el => staggerObserver.observe(el));

  // Process timeline animation
  const processTimeline = document.querySelector('.process__timeline');
  if (processTimeline) {
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          processObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    processObserver.observe(processTimeline);
  }
}

// ── Smooth Scroll ───────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ── Initialize Lucide Icons ─────────────────────────────────
function initLucideIcons() {
  // Wait for Lucide to load
  const checkLucide = setInterval(() => {
    if (window.lucide) {
      window.lucide.createIcons();
      clearInterval(checkLucide);
    }
  }, 100);

  // Fallback: stop checking after 5 seconds
  setTimeout(() => clearInterval(checkLucide), 5000);
}

// ── Theme Switcher ──────────────────────────────────────────
function initTheme() {
  const darkBtns = [
    document.getElementById('theme-btn-dark'),
    document.getElementById('theme-btn-dark-mobile')
  ].filter(Boolean);

  const lightBtns = [
    document.getElementById('theme-btn-light'),
    document.getElementById('theme-btn-light-mobile')
  ].filter(Boolean);

  const legacyToggles = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile')
  ].filter(Boolean);

  function getCurrentTheme() {
    const rootTheme = document.documentElement.getAttribute('data-theme');
    if (rootTheme === 'light' || rootTheme === 'dark') return rootTheme;
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const isDark = theme === 'dark';

    // Update segmented buttons aria-checked
    darkBtns.forEach(btn => {
      btn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    });
    lightBtns.forEach(btn => {
      btn.setAttribute('aria-checked', !isDark ? 'true' : 'false');
    });

    // Legacy toggles
    legacyToggles.forEach(toggle => {
      const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';
      toggle.setAttribute('aria-label', nextLabel);
      toggle.setAttribute('title', nextLabel);
    });
  }

  // Set initial theme
  applyTheme(getCurrentTheme());

  // Segmented Dark button click
  darkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('dark');
    });
  });

  // Segmented Light button click
  lightBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('light');
    });
  });

  // Legacy toggles click
  legacyToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = getCurrentTheme();
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // OS theme change listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}
