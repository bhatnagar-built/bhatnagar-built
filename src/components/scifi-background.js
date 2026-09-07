// ============================================================
// SCI-FI BACKGROUND — Animated Cyber Laser Beams & Interactive Constellation
// Neo-Futurist Product Lab aesthetic with 60fps canvas performance
// ============================================================

export function initSciFiBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'scifi-canvas';
  canvas.className = 'scifi-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = null;
  let isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mouse / Pointer tracking with smooth lerp
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false
  };

  // Theme detection
  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  // ── Element 1: Drastically Reduced Thin Laser Beams (Screenshot 2) ──
  // Drastically reduced to just 1 rare, subtle ambient streak across viewport
  const BEAM_COUNT = 1;
  const beams = [];

  function createBeam(initial = false) {
    const isDark = isDarkTheme();
    const speed = 0.4 + Math.random() * 0.8;
    const length = 70 + Math.random() * 140;
    const y = Math.random() * height;
    const x = initial ? Math.random() * (width + length) - length : -length;
    const angle = (Math.random() - 0.5) * 0.02;
    const opacity = isDark ? (0.12 + Math.random() * 0.18) : (0.06 + Math.random() * 0.12);
    const color = Math.random() > 0.4 ? 'cyan' : 'violet';

    return {
      x,
      y,
      length,
      speed,
      angle,
      opacity,
      color,
      thickness: 1,
      headGlow: Math.random() > 0.6
    };
  }

  // ── Element 2: Sparse Grid Pulse ────────────────────────────
  // Single subtle orthogonal pulse
  const GRID_SIZE = 90;
  const PULSE_COUNT = 1;
  const gridPulses = [];

  function createGridPulse(initial = false) {
    const horizontal = Math.random() > 0.5;
    const isDark = isDarkTheme();
    let x, y, vx, vy;

    if (horizontal) {
      y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
      x = initial ? Math.random() * width : 0;
      vx = 1.6 + Math.random() * 2.2;
      vy = 0;
    } else {
      x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
      y = initial ? Math.random() * height : 0;
      vx = 0;
      vy = 1.4 + Math.random() * 1.8;
    }

    return {
      x,
      y,
      vx,
      vy,
      horizontal,
      length: 45 + Math.random() * 75,
      opacity: isDark ? (0.18 + Math.random() * 0.2) : (0.08 + Math.random() * 0.12),
      color: 'cyan'
    };
  }

  // ── Element 3: Interactive Constellation Nodes (Screenshot 1) ───────
  // Dispersed constellation nodes (52–84 nodes desktop, 30% reduced on mobile)
  const nodes = [];

  function populateNodes() {
    const isMobile = width <= 768;
    // Dynamic node count scaled with screen resolution: 52 min to 84 max on desktop
    // Mobile mode: reduce particles by 30% (36 min to 58 max) for clean readability and 60fps
    let targetCount = Math.min(Math.max(Math.floor((width * height) / 17000), 52), 84);
    if (isMobile) {
      targetCount = Math.floor(targetCount * 0.70);
    }

    while (nodes.length < targetCount) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: 0.68 + Math.random() * 0.68,
        baseOpacity: 0.25 + Math.random() * 0.35,
        accent: Math.random() > 0.8,
        charged: 0
      });
    }
    if (nodes.length > targetCount) {
      nodes.length = targetCount;
    }
  }

  // Resize handler with devicePixelRatio support
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    populateNodes();

    if (beams.length === 0) {
      for (let i = 0; i < BEAM_COUNT; i++) beams.push(createBeam(true));
    }
    if (gridPulses.length === 0) {
      for (let i = 0; i < PULSE_COUNT; i++) gridPulses.push(createGridPulse(true));
    }
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Multi-input pointer interaction (Mouse, Trackpad, Touch)
  function handlePointer(clientX, clientY) {
    mouse.targetX = clientX;
    mouse.targetY = clientY;
    mouse.active = true;
  }

  window.addEventListener('pointermove', (e) => handlePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', (e) => handlePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('pointerleave', () => { mouse.active = false; }, { passive: true });
  window.addEventListener('touchend', () => { mouse.active = false; }, { passive: true });

  // ── Element 5: Refined Executive Ion Wavefront (Single Action Trigger) ──────
  const EXPLODE_RADIUS = 150;
  const EXPLODE_FORCE_MAX = 4.0;
  const sparks = [];         // Subtle micro-telemetry particles
  const shockwaves = [];     // Single sleek ion pulse ring

  function handleExplosion(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;
    const isMobile = width <= 768;

    // 1. Single Crisp Ion Wavefront Ring (No duplicate or delayed rings)
    shockwaves.push({
      x: cx,
      y: cy,
      radius: 6,
      maxRadius: isMobile ? 120 : 155,
      life: 1.0,
      decay: 0.038
    });

    // 2. Delicate Micro-Telemetry Particles (Minimal, elegant, quick decay)
    const sparkCount = isMobile ? 6 : 10;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.35;
      const speed = 2.4 + Math.random() * 3.8;
      sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 0.038 + Math.random() * 0.015,
        radius: 0.75 + Math.random() * 0.5,
        isViolet: Math.random() > 0.6
      });
    }

    // 3. Gentle harmonic pulse on constellation nodes (No noisy secondary sparks)
    nodes.forEach(node => {
      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < EXPLODE_RADIUS && dist > 1) {
        const intensity = (1 - dist / EXPLODE_RADIUS);
        const force = intensity * intensity * EXPLODE_FORCE_MAX;
        const angle = Math.atan2(dy, dx);

        node.vx += Math.cos(angle) * force;
        node.vy += Math.sin(angle) * force;
        node.charged = Math.max(node.charged || 0, 0.55);
      }
    });
  }

  // Expose single ion explosion trigger exclusively for project view screen action
  window.triggerNuclearExplosion = handleExplosion;

  // ── Element 4: Ambient Scanner Line ─────────────────────────
  let scanY = 0;
  const scanSpeed = 0.6;

  // ── Animation Loop ──────────────────────────────────────────
  function render() {
    ctx.clearRect(0, 0, width, height);

    const isDark = isDarkTheme();
    const cyanBase = isDark ? '56, 189, 248' : '3, 105, 161';
    const cyanLight = isDark ? '103, 211, 255' : '2, 132, 199';
    const violetBase = isDark ? '139, 124, 255' : '79, 70, 229';

    // Smooth mouse lerping
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;
    }

    // 1. Draw Subtle Background Grid
    ctx.save();
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.025)' : 'rgba(2, 132, 199, 0.02)';
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    for (let gx = 0; gx < width; gx += GRID_SIZE) {
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
    }
    for (let gy = 0; gy < height; gy += GRID_SIZE) {
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
    }
    ctx.stroke();
    ctx.restore();

    // 2. Draw Moving Grid Pulse (Drastically Reduced to 1)
    gridPulses.forEach((pulse, idx) => {
      pulse.x += pulse.vx;
      pulse.y += pulse.vy;

      if (pulse.horizontal && pulse.x - pulse.length > width) {
        gridPulses[idx] = createGridPulse(false);
        return;
      }
      if (!pulse.horizontal && pulse.y - pulse.length > height) {
        gridPulses[idx] = createGridPulse(false);
        return;
      }

      ctx.save();
      const grad = pulse.horizontal
        ? ctx.createLinearGradient(pulse.x - pulse.length, pulse.y, pulse.x, pulse.y)
        : ctx.createLinearGradient(pulse.x, pulse.y - pulse.length, pulse.x, pulse.y);

      grad.addColorStop(0, `rgba(${cyanBase}, 0)`);
      grad.addColorStop(0.7, `rgba(${cyanBase}, ${pulse.opacity * 0.4})`);
      grad.addColorStop(1, `rgba(${cyanLight}, ${pulse.opacity})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.1;
      if (isDark) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(${cyanBase}, 0.4)`;
      }

      ctx.beginPath();
      if (pulse.horizontal) {
        ctx.moveTo(pulse.x - pulse.length, pulse.y);
        ctx.lineTo(pulse.x, pulse.y);
      } else {
        ctx.moveTo(pulse.x, pulse.y - pulse.length);
        ctx.lineTo(pulse.x, pulse.y);
      }
      ctx.stroke();

      ctx.fillStyle = `rgba(${cyanLight}, ${pulse.opacity + 0.15})`;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 3. Draw Single Drifting Laser Beam (Drastically Reduced to 1)
    beams.forEach((beam, idx) => {
      beam.x += beam.speed;
      beam.y += beam.speed * beam.angle;

      if (beam.x - beam.length > width) {
        beams[idx] = createBeam(false);
        return;
      }

      const activeColor = beam.color === 'violet' ? violetBase : cyanBase;
      const headColor = beam.color === 'violet' ? '190, 180, 255' : '224, 242, 254';

      ctx.save();
      const grad = ctx.createLinearGradient(beam.x, beam.y, beam.x + beam.length, beam.y + beam.length * beam.angle);
      grad.addColorStop(0, `rgba(${activeColor}, 0)`);
      grad.addColorStop(0.3, `rgba(${activeColor}, ${beam.opacity * 0.3})`);
      grad.addColorStop(0.9, `rgba(${activeColor}, ${beam.opacity * 0.7})`);
      grad.addColorStop(1, `rgba(${headColor}, ${Math.min(beam.opacity + 0.15, 1)})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = beam.thickness;

      if (isDark && beam.headGlow) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${activeColor}, 0.5)`;
      }

      ctx.beginPath();
      ctx.moveTo(beam.x, beam.y);
      ctx.lineTo(beam.x + beam.length, beam.y + beam.length * beam.angle);
      ctx.stroke();

      if (beam.headGlow) {
        ctx.fillStyle = `rgba(${headColor}, ${Math.min(beam.opacity + 0.2, 1)})`;
        ctx.beginPath();
        ctx.arc(beam.x + beam.length, beam.y + beam.length * beam.angle, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // 4. Draw Floating Constellation Nodes & Gravitational Attraction
    // 50% restricted gravity pull radius (80px), gentle pull force
    const ATTRACT_RADIUS = 80;
    const CONNECT_RADIUS = 110;
    const MOUSE_CONNECT_RADIUS = 80;

    // Physics update with gentle magnetic pull (60% reduced overall speed)
    nodes.forEach(node => {
      if (mouse.active) {
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mdist = Math.hypot(mdx, mdy);

        if (mdist < ATTRACT_RADIUS && mdist > 4) {
          // Restricted gravitational nudge toward cursor
          const pullForce = (1 - mdist / ATTRACT_RADIUS) * 0.05;
          node.vx += (mdx / mdist) * pullForce;
          node.vy += (mdy / mdist) * pullForce;
        }
      }

      // Smooth damping
      node.vx *= 0.94;
      node.vy *= 0.94;

      // Keep organic wandering motion (60% slower velocity bounds)
      const currentSpeed = Math.hypot(node.vx, node.vy);
      if (currentSpeed < 0.10) {
        node.vx += (Math.random() - 0.5) * 0.032;
        node.vy += (Math.random() - 0.5) * 0.032;
      } else if (currentSpeed > 3.2) {
        node.vx = (node.vx / currentSpeed) * 3.2;
        node.vy = (node.vy / currentSpeed) * 3.2;
      }

      node.x += node.vx;
      node.y += node.vy;

      // Wrap edges
      if (node.x < -15) node.x = width + 15;
      if (node.x > width + 15) node.x = -15;
      if (node.y < -15) node.y = height + 15;
      if (node.y > height + 15) node.y = -15;
    });

    // Draw inter-node filaments & soft mutual dispersion (keeps particles scattered)
    ctx.lineWidth = isDark ? 0.7 : 1.0;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const target = nodes[j];
        const dx = node.x - target.x;
        const dy = node.y - target.y;
        const dist = Math.hypot(dx, dy);

        // Soft dispersion to keep particles naturally scattered
        if (dist < 50 && dist > 1) {
          const push = (1 - dist / 50) * 0.015;
          node.vx += (dx / dist) * push;
          node.vy += (dy / dist) * push;
          target.vx -= (dx / dist) * push;
          target.vy -= (dy / dist) * push;
        }

        if (dist < CONNECT_RADIUS) {
          // Darker connection lines in light mode specifically (0.46 alpha)
          const alpha = (1 - dist / CONNECT_RADIUS) * (isDark ? 0.32 : 0.46);
          ctx.strokeStyle = `rgba(${node.accent ? violetBase : cyanBase}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      }

      // Dynamic filament to cursor (restricted radius, darker in light mode)
      let isNearCursor = false;
      let mdistToCursor = 9999;
      if (mouse.active) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        mdistToCursor = Math.hypot(mdx, mdy);

        if (mdistToCursor < MOUSE_CONNECT_RADIUS) {
          isNearCursor = true;
          const malpha = (1 - mdistToCursor / MOUSE_CONNECT_RADIUS) * (isDark ? 0.75 : 0.68);
          ctx.save();
          ctx.strokeStyle = `rgba(${cyanLight}, ${malpha})`;
          ctx.lineWidth = isDark ? 1.0 : 1.3;
          if (isDark) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${cyanBase}, 0.8)`;
          }
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw node point with illuminated glow when attracted or charged by nuclear blast
      ctx.save();
      const nodeColor = node.accent ? violetBase : cyanBase;
      const isCharged = (node.charged || 0) > 0.05;
      const currentRadius = isNearCursor ? node.radius * 1.5 : (isCharged ? node.radius * 2.2 : node.radius);
      const currentOpacity = isNearCursor ? 0.95 : (isCharged ? 1.0 : (isDark ? node.baseOpacity : Math.min(node.baseOpacity * 1.6, 0.85)));

      if (isCharged) {
        node.charged = Math.max(0, node.charged - 0.025);
        ctx.strokeStyle = `rgba(${cyanLight}, ${node.charged * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 4 * node.charged, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (isDark) {
        ctx.shadowBlur = isNearCursor ? 12 : (isCharged ? 16 : 5);
        ctx.shadowColor = isNearCursor ? `rgba(${cyanLight}, 0.95)` : (isCharged ? `rgba(255, 255, 255, 1)` : `rgba(${cyanBase}, 0.4)`);
      }

      ctx.fillStyle = `rgba(${nodeColor}, ${currentOpacity})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Magnetic Cursor Reticle (50% reduced outer circle: 18px -> 9px)
    if (mouse.active) {
      ctx.save();
      ctx.strokeStyle = `rgba(${cyanLight}, ${isDark ? 0.45 : 0.25})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 9, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = `rgba(${cyanLight}, ${isDark ? 0.95 : 0.7})`;
      if (isDark) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${cyanLight}, 1)`;
      }
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 5. Draw Refined Micro-Telemetry Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.86;
      spark.vy *= 0.86;
      spark.life -= spark.decay;

      if (spark.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.save();
      const sparkColor = spark.isViolet ? violetBase : cyanLight;
      ctx.fillStyle = `rgba(${sparkColor}, ${spark.life * (isDark ? 0.9 : 0.7)})`;
      if (isDark) {
        ctx.shadowBlur = 5 * spark.life;
        ctx.shadowColor = `rgba(${sparkColor}, ${spark.life * 0.8})`;
      }
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.radius * Math.max(0.2, spark.life), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 6. Draw Single Crisp Ion Wavefront Ring
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const wave = shockwaves[i];
      wave.radius += (wave.maxRadius - wave.radius) * 0.20;
      wave.life -= wave.decay;

      if (wave.life <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      const alpha = wave.life * (isDark ? 0.65 : 0.42);
      ctx.strokeStyle = `rgba(${cyanLight}, ${alpha})`;
      ctx.lineWidth = Math.max(0.75, 1.35 * wave.life);
      if (isDark) {
        ctx.shadowBlur = 8 * wave.life;
        ctx.shadowColor = `rgba(${cyanBase}, ${wave.life * 0.7})`;
      }
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 7. Draw Ambient Scanning Laser Line
    scanY += scanSpeed;
    if (scanY > height + 50) {
      scanY = -50;
    }

    ctx.save();
    const scanGrad = ctx.createLinearGradient(0, scanY, width, scanY);
    scanGrad.addColorStop(0, `rgba(${cyanBase}, 0)`);
    scanGrad.addColorStop(0.2, `rgba(${cyanBase}, ${isDark ? 0.06 : 0.03})`);
    scanGrad.addColorStop(0.5, `rgba(${cyanLight}, ${isDark ? 0.15 : 0.06})`);
    scanGrad.addColorStop(0.8, `rgba(${cyanBase}, ${isDark ? 0.06 : 0.03})`);
    scanGrad.addColorStop(1, `rgba(${cyanBase}, 0)`);

    ctx.strokeStyle = scanGrad;
    ctx.lineWidth = 0.75;
    if (isDark) {
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${cyanBase}, 0.2)`;
    }
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(width, scanY);
    ctx.stroke();
    ctx.restore();

    if (!isReducedMotion) {
      animationId = requestAnimationFrame(render);
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else if (!isReducedMotion) {
      animationId = requestAnimationFrame(render);
    }
  });

  render();

  return {
    destroy: () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      delete window.triggerNuclearExplosion;
      canvas.remove();
    }
  };
}
