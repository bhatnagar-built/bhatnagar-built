// ============================================================
// SCI-FI BACKGROUND — Animated Cyber Laser Beams & Grid Pulses
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

  // Mouse tracking
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
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Pointer interaction
  window.addEventListener('pointermove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.active = false;
  }, { passive: true });

  // ── Element 1: Thin Laser Beams (Horizontal Data Streams) ───
  const BEAM_COUNT = 18;
  const beams = [];

  function createBeam(initial = false) {
    const isDark = isDarkTheme();
    const speed = 0.6 + Math.random() * 1.8;
    const length = 100 + Math.random() * 260;
    const y = Math.random() * height;
    const x = initial ? Math.random() * (width + length) - length : -length;
    // Slight angle tilt between -2 and +2 degrees
    const angle = (Math.random() - 0.5) * 0.04;
    const opacity = isDark ? (0.25 + Math.random() * 0.5) : (0.12 + Math.random() * 0.25);
    const color = Math.random() > 0.3 ? 'cyan' : 'violet';

    return {
      x,
      y,
      length,
      speed,
      angle,
      opacity,
      color,
      thickness: Math.random() > 0.8 ? 1.5 : 1,
      headGlow: Math.random() > 0.4
    };
  }

  for (let i = 0; i < BEAM_COUNT; i++) {
    beams.push(createBeam(true));
  }

  // ── Element 2: Grid Data Pulses (Traveling on Orthogonal Grid)
  const GRID_SIZE = 90;
  const PULSE_COUNT = 6;
  const gridPulses = [];

  function createGridPulse(initial = false) {
    const horizontal = Math.random() > 0.4;
    const isDark = isDarkTheme();
    let x, y, vx, vy;

    if (horizontal) {
      y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
      x = initial ? Math.random() * width : 0;
      vx = 2.5 + Math.random() * 3.5;
      vy = 0;
    } else {
      x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
      y = initial ? Math.random() * height : 0;
      vx = 0;
      vy = 2.0 + Math.random() * 3.0;
    }

    return {
      x,
      y,
      vx,
      vy,
      horizontal,
      length: 60 + Math.random() * 120,
      opacity: isDark ? (0.35 + Math.random() * 0.4) : (0.15 + Math.random() * 0.25),
      color: 'cyan'
    };
  }

  for (let i = 0; i < PULSE_COUNT; i++) {
    gridPulses.push(createGridPulse(true));
  }

  // ── Element 3: Constellation Nodes with Dynamic Filaments ───
  const NODE_COUNT = Math.min(Math.floor(width / 45), 32);
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1 + Math.random() * 1.2,
      baseOpacity: 0.2 + Math.random() * 0.4
    });
  }

  // ── Element 4: Ambient Scanner Line ─────────────────────────
  let scanY = 0;
  const scanSpeed = 0.8;

  // ── Animation Loop ──────────────────────────────────────────
  function render() {
    ctx.clearRect(0, 0, width, height);

    const isDark = isDarkTheme();
    const cyanBase = isDark ? '56, 189, 248' : '2, 132, 199';
    const cyanLight = isDark ? '103, 211, 255' : '3, 105, 161';
    const violetBase = isDark ? '139, 124, 255' : '99, 102, 241';

    // Smooth mouse lerping
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
    }

    // 1. Draw Subtle Background Grid
    ctx.save();
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.035)' : 'rgba(2, 132, 199, 0.03)';
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

    // 2. Draw Moving Grid Pulses
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
      grad.addColorStop(0.7, `rgba(${cyanBase}, ${pulse.opacity * 0.5})`);
      grad.addColorStop(1, `rgba(${cyanLight}, ${pulse.opacity})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      if (isDark) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${cyanBase}, 0.6)`;
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

      // Glowing head dot
      ctx.fillStyle = `rgba(${cyanLight}, ${pulse.opacity + 0.2})`;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 3. Draw Drifting Thin Laser Beams
    beams.forEach((beam, idx) => {
      beam.x += beam.speed;
      beam.y += beam.speed * beam.angle;

      if (beam.x - beam.length > width) {
        beams[idx] = createBeam(false);
        return;
      }

      const activeColor = beam.color === 'violet' ? violetBase : cyanBase;
      const headColor = beam.color === 'violet' ? '180, 170, 255' : '224, 242, 254';

      ctx.save();
      const grad = ctx.createLinearGradient(beam.x, beam.y, beam.x + beam.length, beam.y + beam.length * beam.angle);
      grad.addColorStop(0, `rgba(${activeColor}, 0)`);
      grad.addColorStop(0.3, `rgba(${activeColor}, ${beam.opacity * 0.4})`);
      grad.addColorStop(0.9, `rgba(${activeColor}, ${beam.opacity})`);
      grad.addColorStop(1, `rgba(${headColor}, ${Math.min(beam.opacity + 0.2, 1)})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = beam.thickness;

      if (isDark && beam.headGlow) {
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${activeColor}, 0.8)`;
      }

      ctx.beginPath();
      ctx.moveTo(beam.x, beam.y);
      ctx.lineTo(beam.x + beam.length, beam.y + beam.length * beam.angle);
      ctx.stroke();

      // Leading photon dot
      if (beam.headGlow) {
        ctx.fillStyle = `rgba(${headColor}, ${Math.min(beam.opacity + 0.3, 1)})`;
        ctx.beginPath();
        ctx.arc(beam.x + beam.length, beam.y + beam.length * beam.angle, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // 4. Draw Floating Constellation Nodes & Connecting Filaments
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0) node.x = width;
      if (node.x > width) node.x = 0;
      if (node.y < 0) node.y = height;
      if (node.y > height) node.y = 0;
    });

    // Draw inter-node filaments
    ctx.lineWidth = 0.65;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = node.x - nodes[j].x;
        const dy = node.y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * (isDark ? 0.25 : 0.12);
          ctx.strokeStyle = `rgba(${cyanBase}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Mouse interactive filament
      if (mouse.active) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 140) {
          const malpha = (1 - mdist / 140) * (isDark ? 0.5 : 0.25);
          ctx.save();
          ctx.strokeStyle = `rgba(${cyanLight}, ${malpha})`;
          ctx.lineWidth = 0.9;
          if (isDark) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${cyanBase}, 0.5)`;
          }
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw node point
      ctx.fillStyle = `rgba(${cyanBase}, ${node.baseOpacity})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Draw Ambient Scanning Laser Line
    scanY += scanSpeed;
    if (scanY > height + 50) {
      scanY = -50;
    }

    ctx.save();
    const scanGrad = ctx.createLinearGradient(0, scanY, width, scanY);
    scanGrad.addColorStop(0, `rgba(${cyanBase}, 0)`);
    scanGrad.addColorStop(0.2, `rgba(${cyanBase}, ${isDark ? 0.1 : 0.05})`);
    scanGrad.addColorStop(0.5, `rgba(${cyanLight}, ${isDark ? 0.25 : 0.1})`);
    scanGrad.addColorStop(0.8, `rgba(${cyanBase}, ${isDark ? 0.1 : 0.05})`);
    scanGrad.addColorStop(1, `rgba(${cyanBase}, 0)`);

    ctx.strokeStyle = scanGrad;
    ctx.lineWidth = 1;
    if (isDark) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${cyanBase}, 0.3)`;
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

  // Handle Visibility change (pause loop when tab inactive)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else if (!isReducedMotion) {
      animationId = requestAnimationFrame(render);
    }
  });

  // Start rendering
  render();

  return {
    destroy: () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.remove();
    }
  };
}
