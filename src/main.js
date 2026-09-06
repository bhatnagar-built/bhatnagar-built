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

// ── Initialize ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
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

// ── Render Process Timeline ─────────────────────────────────
function renderProcessTimeline() {
  const timeline = document.getElementById('process-timeline');
  if (!timeline) return;

  timeline.innerHTML = processSteps.map(step => `
    <div class="process__step">
      <span class="process__step-number">${step.number}</span>
      <div class="process__step-dot"></div>
      <span class="process__step-label">${step.label}</span>
    </div>
  `).join('');
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
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
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
  const toggles = [
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

    const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    toggles.forEach(toggle => {
      toggle.setAttribute('aria-label', nextLabel);
      toggle.setAttribute('title', nextLabel);
    });
  }

  // Set initial labels & attributes
  applyTheme(getCurrentTheme());

  // Click handlers
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = getCurrentTheme();
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  // OS theme change listener (only updates if user hasn't explicitly set localStorage)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}
