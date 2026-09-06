/**
 * Portfolio — Main Application
 * Abhishek Bhatnagar Personal Portfolio
 * 
 * Renders all dynamic sections from structured data,
 * handles navigation, scroll reveals, and interactions.
 */

import {
  products,
  capabilities,
  engineeringPrinciples,
  techStack,
  processSteps,
  githubRepos,
  currentFocus
} from './data/portfolio.js';
import { initSciFiBackground } from './components/scifi-background.js';
import { initBurstShowcase } from './components/burst-showcase.js';

// ── Initialize ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSciFiBackground();
  initBurstShowcase();
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

// ── Render Products ─────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <article class="product-card reveal" id="product-${product.id}" aria-label="${product.name}">
      <div class="product-card__image">
        <div class="product-card__image-placeholder">
          <span class="product-card__image-placeholder-text">${product.name}</span>
        </div>
      </div>
      <div class="product-card__body">
        <span class="product-card__category product-card__category--${product.categoryClass}">
          ${product.category}
        </span>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__tagline">${product.tagline}</p>
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
          <a href="${product.showcaseUrl}" target="_blank" rel="noopener noreferrer" class="product-card__link" aria-label="View ${product.name} showcase on GitHub">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" class="product-card__link-icon" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>View Showcase</span>
            <i data-lucide="external-link" class="product-card__link-icon"></i>
          </a>
        </div>
      </div>
    </article>
  `).join('');
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

  let html = '';
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

  grid.innerHTML = techStack.map(category => `
    <div class="tech-category reveal">
      <h3 class="tech-category__title">${category.category}</h3>
      <div class="tech-category__items">
        ${category.items.map(item => `<span class="tech-item">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
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

  const floatingToggle = document.getElementById('floating-theme-toggle');
  const floatingLabel = document.getElementById('floating-theme-label');
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

    // Update floating toggle label & title
    if (floatingLabel) {
      floatingLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
    if (floatingToggle) {
      const nextTitle = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      floatingToggle.setAttribute('title', nextTitle);
      floatingToggle.setAttribute('aria-label', nextTitle);
    }

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

  // Floating Toggle click
  if (floatingToggle) {
    floatingToggle.addEventListener('click', () => {
      const current = getCurrentTheme();
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

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
