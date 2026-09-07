/**
 * JARVIS 3D Holographic HUD Component
 * Implements an Iron Man helmet Heads-Up Display (HUD) modal interface
 * explaining Abhishek's 3 Hero Metrics:
 * - 4 Featured Products
 * - 3 Platforms
 * - 3 Domains
 */

import { heroMetricsExplanation } from '../data/portfolio.js';

let activeMetricKey = 'products';
let isOpen = false;

export function initJarvisHud() {
  injectHudContainer();
  bindMetricButtons();
  bindGlobalEvents();
}

function injectHudContainer() {
  if (document.getElementById('jarvis-hud-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'jarvis-hud-modal';
  modal.className = 'jarvis-hud';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <!-- HUD Backdrop with Hexagonal Cyber Mesh -->
    <div class="jarvis-hud__backdrop" id="jarvis-hud-backdrop"></div>

    <!-- 3D Visor Viewport Wrapper with Dynamic Perspective -->
    <div class="jarvis-hud__viewport" id="jarvis-hud-viewport">
      <!-- 3D Holographic Curved Helmet Visor -->
      <div class="jarvis-hud__visor" id="jarvis-hud-visor">
        
        <!-- System Telemetry Top Header Bar -->
        <header class="jarvis-hud__top-bar">
          <div class="jarvis-hud__telemetry-left">
            <div class="jarvis-hud__arc-reactor" aria-hidden="true">
              <div class="arc-ring arc-ring--outer"></div>
              <div class="arc-ring arc-ring--mid"></div>
              <div class="arc-core"></div>
            </div>
            <div class="jarvis-hud__brand">
              <span class="jarvis-hud__brand-title">SYSTEM TELEMETRY // ARCHITECTURAL AUDIT</span>
              <span class="jarvis-hud__brand-sub">BHATNAGAR-BUILT • VERIFIED REPOSITORY MATRIX</span>
            </div>
          </div>

          <div class="jarvis-hud__telemetry-center">
            <span class="jarvis-hud__status-pill">
              <span class="jarvis-hud__status-dot"></span>
              <span>VERIFICATION MATRIX ACTIVE</span>
            </span>
            <span class="jarvis-hud__coords">DELHI NCR • 28.6139°N • 77.2090°E • ELEV: 216M</span>
          </div>

          <div class="jarvis-hud__telemetry-right">
            <div class="jarvis-hud__audio-eq" aria-hidden="true">
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
            </div>
            <button class="jarvis-hud__close-btn" id="jarvis-hud-close" aria-label="Close System Telemetry Audit">
              <span class="jarvis-hud__close-icon">✕</span>
              <span class="jarvis-hud__close-label">CLOSE AUDIT</span>
            </button>
          </div>
        </header>

        <!-- Visor Telemetry Corner Brackets & Crosshair Accents -->
        <div class="jarvis-hud__bracket jarvis-hud__bracket--tl" aria-hidden="true">[ 01-SPECIFICATION ]</div>
        <div class="jarvis-hud__bracket jarvis-hud__bracket--tr" aria-hidden="true">[ REPOSITORY-AUDIT ]</div>
        <div class="jarvis-hud__bracket jarvis-hud__bracket--bl" aria-hidden="true">+ ARCHITECTURE PROOF +</div>
        <div class="jarvis-hud__bracket jarvis-hud__bracket--br" aria-hidden="true">+ 100% PRODUCTION VERIFIED +</div>
        <div class="jarvis-hud__crosshair" aria-hidden="true"></div>

        <!-- Metric Switcher Pills (Switch between Products, Platforms, Domains) -->
        <nav class="jarvis-hud__switcher" aria-label="HUD Subsystem Navigation">
          <button class="jarvis-hud__tab jarvis-hud__tab--active" data-switch-metric="products">
            <span class="jarvis-hud__tab-code">01</span>
            <span class="jarvis-hud__tab-text">FEATURED PRODUCTS</span>
            <span class="jarvis-hud__tab-count">4</span>
          </button>
          <button class="jarvis-hud__tab" data-switch-metric="platforms">
            <span class="jarvis-hud__tab-code">02</span>
            <span class="jarvis-hud__tab-text">PLATFORMS</span>
            <span class="jarvis-hud__tab-count">3</span>
          </button>
          <button class="jarvis-hud__tab" data-switch-metric="domains">
            <span class="jarvis-hud__tab-code">03</span>
            <span class="jarvis-hud__tab-text">DOMAINS</span>
            <span class="jarvis-hud__tab-count">3</span>
          </button>
        </nav>

        <!-- Main Holographic Projection Display Area -->
        <main class="jarvis-hud__body" id="jarvis-hud-body" tabindex="0">
          <!-- Dynamically populated via renderHudContent() -->
        </main>

        <!-- Visor Bottom Tactical Telemetry Footer -->
        <footer class="jarvis-hud__footer">
          <div class="jarvis-hud__footer-metric">
            <span class="hud-f-label">SYS.INTEGRITY</span>
            <span class="hud-f-val">100% PRODUCTION VERIFIED</span>
          </div>
          <div class="jarvis-hud__footer-metric">
            <span class="hud-f-label">SOURCE REPOSITORIES</span>
            <span class="hud-f-val">GITHUB PUBLIC AUDIT</span>
          </div>
          <div class="jarvis-hud__footer-metric">
            <span class="hud-f-label">INTERACTION</span>
            <span class="hud-f-val">CLICK ANY CARD TO EXPLORE</span>
          </div>
          <div class="jarvis-hud__footer-hint">
            <span>[ ESC ] KEY TO CLOSE AUDIT</span>
          </div>
        </footer>

        <!-- Holographic Scanline Overlay -->
        <div class="jarvis-hud__scanline" aria-hidden="true"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Bind internal close & switcher events
  document.getElementById('jarvis-hud-close')?.addEventListener('click', closeJarvisHud);
  document.getElementById('jarvis-hud-backdrop')?.addEventListener('click', closeJarvisHud);

  const switcherTabs = modal.querySelectorAll('[data-switch-metric]');
  switcherTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-switch-metric');
      if (key && heroMetricsExplanation[key]) {
        switchHudMetric(key);
      }
    });
  });

  // 3D Parallax Tilt Effect tracking mouse movements on visor
  const visor = document.getElementById('jarvis-hud-visor');
  const viewport = document.getElementById('jarvis-hud-viewport');

  if (viewport && visor) {
    viewport.addEventListener('mousemove', (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotY = (x / (rect.width / 2)) * 6;  // -6deg to +6deg
      const rotX = -(y / (rect.height / 2)) * 5; // -5deg to +5deg
      
      visor.style.setProperty('--hud-rot-x', `${rotX}deg`);
      visor.style.setProperty('--hud-rot-y', `${rotY}deg`);
    });

    viewport.addEventListener('mouseleave', () => {
      visor.style.setProperty('--hud-rot-x', '0deg');
      visor.style.setProperty('--hud-rot-y', '0deg');
    });
  }
}

function bindMetricButtons() {
  const metricButtons = document.querySelectorAll('[data-hud-metric]');
  metricButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const metricKey = btn.getAttribute('data-hud-metric');
      if (metricKey && heroMetricsExplanation[metricKey]) {
        openJarvisHud(metricKey);
      }
    });
  });
}

function bindGlobalEvents() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeJarvisHud();
    }
  });
}

export function openJarvisHud(metricKey = 'products') {
  const modal = document.getElementById('jarvis-hud-modal');
  if (!modal) return;

  activeMetricKey = metricKey;
  isOpen = true;

  modal.classList.add('jarvis-hud--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  switchHudMetric(metricKey);

  // Focus management
  const firstFocusable = modal.querySelector('button, [tabindex="0"]');
  if (firstFocusable) firstFocusable.focus();
}

export function closeJarvisHud() {
  const modal = document.getElementById('jarvis-hud-modal');
  if (!modal) return;

  isOpen = false;
  modal.classList.remove('jarvis-hud--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function switchHudMetric(metricKey) {
  activeMetricKey = metricKey;

  // Update tabs
  const modal = document.getElementById('jarvis-hud-modal');
  if (!modal) return;

  const tabs = modal.querySelectorAll('[data-switch-metric]');
  tabs.forEach(tab => {
    const isTarget = tab.getAttribute('data-switch-metric') === metricKey;
    tab.classList.toggle('jarvis-hud__tab--active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  renderHudContent(metricKey);
}

function renderHudContent(metricKey) {
  const body = document.getElementById('jarvis-hud-body');
  if (!body) return;

  const data = heroMetricsExplanation[metricKey];
  if (!data) return;

  body.innerHTML = `
    <!-- Header Hologram Briefing -->
    <div class="jarvis-hud__hero-brief">
      <div class="jarvis-hud__hero-badge">
        <span class="hud-chip hud-chip--cyan">${data.systemCode}</span>
        <span class="hud-chip hud-chip--hollow">${data.tag}</span>
      </div>
      <h2 class="jarvis-hud__title">${data.title}</h2>
      <p class="jarvis-hud__subtitle">${data.subtitle}</p>
      <p class="jarvis-hud__summary">${data.summary}</p>

      <!-- Key Proof Metrics Bar -->
      <div class="jarvis-hud__stats-bar">
        ${data.stats.map(stat => `
          <div class="jarvis-hud__stat-item">
            <span class="jarvis-hud__stat-num">${stat.value}</span>
            <span class="jarvis-hud__stat-label">${stat.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Telemetry Cards Grid -->
    <div class="jarvis-hud__grid ${data.items.length === 4 ? 'jarvis-hud__grid--4' : 'jarvis-hud__grid--3'}">
      ${data.items.map((item, idx) => `
        <div class="jarvis-hud__card">
          <div class="jarvis-hud__card-header">
            <span class="jarvis-hud__card-index">0${idx + 1}</span>
            <div class="jarvis-hud__card-tags">
              <span class="hud-tag">${item.category}</span>
              <span class="hud-tag hud-tag--status">${item.status}</span>
            </div>
          </div>
          <h3 class="jarvis-hud__card-title">${item.name}</h3>
          <p class="jarvis-hud__card-desc">${item.desc}</p>
          <div class="jarvis-hud__tech-chips">
            ${item.tech.map(t => `<span class="hud-tech-chip">${t}</span>`).join('')}
          </div>
          ${item.url ? `
            <div class="jarvis-hud__card-footer">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="jarvis-hud__card-link">
                <span>Inspect Repository Audit</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}
