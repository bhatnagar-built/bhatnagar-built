// ============================================================
// BURST SHOWCASE — 3D Layered App Screen Explosion
// Transforms hero cards into an interactive isometric 3D screen stack
// ============================================================

import { appShowcases } from '../data/portfolio.js';

export function initBurstShowcase() {
  const stack = document.getElementById('hero-product-stack');
  const stage = document.getElementById('hero-burst-stage');
  if (!stack || !stage) return;

  let currentAppId = 'emi-health';
  let activeScreenIndex = 0; // 0 = Screen 1 (front), 1 = Screen 2, 2 = Screen 3

  // Attach click listeners to hero product cards
  const cards = stack.querySelectorAll('.hero__product-card');
  cards.forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    // Add burst cue if not already present
    if (!card.querySelector('.hero__product-card-cue')) {
      const cue = document.createElement('span');
      cue.className = 'hero__product-card-cue';
      cue.innerHTML = `<span>View Screens</span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
      card.appendChild(cue);
    }

    function triggerBurst() {
      const productId = card.getAttribute('data-product');
      if (!productId || !appShowcases[productId]) return;
      openBurstStage(productId);
    }

    card.addEventListener('click', triggerBurst);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerBurst();
      }
    });
  });

  // Open the Burst Stage with explosive transition
  function openBurstStage(productId) {
    currentAppId = productId;
    activeScreenIndex = 0;

    // Smooth scroll to hero section if scrolled down
    const heroEl = document.getElementById('hero');
    if (heroEl && window.scrollY > 40) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 1. Add bursting animation to stack
    stack.classList.add('hero__product-stack--bursting');

    // 2. Play particle shockwave effect
    createShockwave();

    setTimeout(() => {
      stack.style.display = 'none';
      stack.classList.remove('hero__product-stack--bursting');
      
      stage.style.display = 'flex';
      stage.setAttribute('aria-hidden', 'false');
      renderStageContent();
      
      // Force reflow and activate
      void stage.offsetWidth;
      stage.classList.add('hero__burst-stage--active');
    }, 220);
  }

  // Close the Burst Stage and restore 4 cards
  function closeBurstStage() {
    stage.classList.remove('hero__burst-stage--active');
    
    setTimeout(() => {
      stage.style.display = 'none';
      stage.setAttribute('aria-hidden', 'true');
      
      stack.style.display = 'grid';
      stack.classList.add('hero__product-stack--restoring');
      void stack.offsetWidth;
      stack.classList.remove('hero__product-stack--restoring');
    }, 220);
  }

  // Create shockwave effect
  function createShockwave() {
    const wave = document.createElement('div');
    wave.className = 'burst-shockwave';
    stack.parentElement.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
  }

  // Render the Burst Stage Content
  function renderStageContent() {
    const app = appShowcases[currentAppId];
    if (!app) return;

    const screens = app.screens;
    // Order layers based on activeScreenIndex
    // Active screen is layer-1 (front), others are layer-2 and layer-3
    const orderedIndices = [
      activeScreenIndex,
      (activeScreenIndex + 1) % 3,
      (activeScreenIndex + 2) % 3
    ];

    stage.innerHTML = `
      <div class="burst-header">
        <div class="burst-header__app">
          <span class="burst-dot burst-dot--${app.domainClass}"></span>
          <span class="burst-app-name">${app.name}</span>
          <span class="burst-app-tag burst-app-tag--${app.domainClass}">${app.domain}</span>
        </div>

        <button class="burst-close" id="burst-close-btn" aria-label="Close layered screens and return to overview">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          <span>Close</span>
        </button>
      </div>

      <div class="burst-switcher">
        ${Object.keys(appShowcases).map(key => {
          const item = appShowcases[key];
          const isActive = key === currentAppId;
          return `
            <button class="burst-switcher__btn ${isActive ? 'burst-switcher__btn--active' : ''}" data-switch-app="${key}" aria-label="Switch to ${item.name}">
              <span class="burst-switcher__dot burst-switcher__dot--${item.domainClass}"></span>
              <span>${item.name}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- 3D Isometric Viewport -->
      <div class="burst-viewport" id="burst-viewport">
        <div class="burst-stage-canvas" id="burst-stage-canvas">
          ${orderedIndices.map((screenIdx, position) => {
            const screen = screens[screenIdx];
            const layerClass = position === 0 ? 'burst-screen--front' : (position === 1 ? 'burst-screen--mid' : 'burst-screen--back');
            const zIndex = 3 - position;
            
            return `
              <div class="burst-screen ${layerClass}" data-screen-idx="${screenIdx}" style="z-index: ${zIndex};" role="button" tabindex="0" title="Click to bring ${screen.title} to front">
                <div class="burst-screen__bezel">
                  <div class="burst-screen__notch"></div>
                  <div class="burst-screen__glare"></div>
                  <div class="burst-screen__content">
                    <img src="${screen.src}" alt="${screen.title}" class="burst-screen__img" loading="eager" onerror="this.classList.add('burst-screen__img--fallback')" />
                    <div class="burst-screen__skeleton">
                      <div class="burst-skeleton__header">
                        <div class="burst-skeleton__bar burst-skeleton__bar--title"></div>
                        <div class="burst-skeleton__chip"></div>
                      </div>
                      <div class="burst-skeleton__card">
                        <div class="burst-skeleton__ring"></div>
                        <div class="burst-skeleton__lines">
                          <div class="burst-skeleton__bar"></div>
                          <div class="burst-skeleton__bar burst-skeleton__bar--short"></div>
                        </div>
                      </div>
                      <div class="burst-skeleton__chart">
                        <div class="burst-skeleton__col" style="height: 60%"></div>
                        <div class="burst-skeleton__col" style="height: 90%"></div>
                        <div class="burst-skeleton__col" style="height: 45%"></div>
                        <div class="burst-skeleton__col" style="height: 75%"></div>
                        <div class="burst-skeleton__col" style="height: 85%"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="burst-screen__badge">
                  <span class="burst-screen__badge-num">0${screenIdx + 1}</span>
                  <span class="burst-screen__badge-text">${screen.tag}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Stage Footer Controls -->
      <div class="burst-footer">
        <div class="burst-tabs">
          ${screens.map((screen, idx) => {
            const isFront = idx === activeScreenIndex;
            return `
              <button class="burst-tab ${isFront ? 'burst-tab--active' : ''}" data-focus-screen="${idx}" aria-label="Focus ${screen.title}">
                <span class="burst-tab__indicator"></span>
                <span class="burst-tab__label">${screen.title}</span>
              </button>
            `;
          }).join('')}
        </div>
        <p class="burst-hint">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <span>Click any background screen to bring it forward • Hover for 3D parallax</span>
        </p>
      </div>
    `;

    bindStageEvents();
  }

  // Bind interactive events within the burst stage
  function bindStageEvents() {
    // Close button
    const closeBtn = document.getElementById('burst-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeBurstStage);
    }

    // App switchers
    const switchBtns = stage.querySelectorAll('[data-switch-app]');
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-switch-app');
        if (targetId && targetId !== currentAppId) {
          currentAppId = targetId;
          activeScreenIndex = 0;
          
          // Brief transition
          const canvas = document.getElementById('burst-stage-canvas');
          if (canvas) {
            canvas.classList.add('burst-stage-canvas--switching');
            setTimeout(() => {
              renderStageContent();
            }, 160);
          } else {
            renderStageContent();
          }
        }
      });
    });

    // Screen layer click (clicking background layer brings it front)
    const screenEls = stage.querySelectorAll('.burst-screen');
    screenEls.forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-screen-idx'), 10);
        if (!isNaN(idx) && idx !== activeScreenIndex) {
          activeScreenIndex = idx;
          renderStageContent();
        }
      });
    });

    // Screen tab buttons
    const tabBtns = stage.querySelectorAll('[data-focus-screen]');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-focus-screen'), 10);
        if (!isNaN(idx) && idx !== activeScreenIndex) {
          activeScreenIndex = idx;
          renderStageContent();
        }
      });
    });

    // 3D Parallax mouse tracking
    const viewport = document.getElementById('burst-viewport');
    const canvas = document.getElementById('burst-stage-canvas');
    if (viewport && canvas) {
      viewport.addEventListener('pointermove', (e) => {
        const rect = viewport.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateY = -12 + (x - cx) * 0.04; // default -12deg isometric angle
        const rotateX = 8 - (y - cy) * 0.04;  // default 8deg tilt

        canvas.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });

      viewport.addEventListener('pointerleave', () => {
        canvas.style.transform = `rotateY(-12deg) rotateX(8deg)`;
      });
    }
  }

  // Keyboard Escape listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && stage.classList.contains('hero__burst-stage--active')) {
      closeBurstStage();
    }
  });
}
