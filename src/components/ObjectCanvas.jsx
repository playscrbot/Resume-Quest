import { CONVEYOR_BELTS, BROKEN_BRIDGE, NEON_BUILDINGS, ANIMATED_NEON_SIGNS, MAINTENANCE_HATCHES, IGLOOS, WOODEN_CRATES, PINE_TREES, PRISON, TANK_WAGONS, CRYSTALS, FLOATING_ROCK_RINGS, ELEVATOR, VENDING_MACHINES, LIGHT_POSTS, CYBER_FACTORY, DATA_TOWERS, WALL_TERMINALS, NEON_TUBES, BILLBOARDS, ATM_UNITS, DRONE_STATIONS, POWER_PANELS, CABLE_JUNCTION_BOXES, PHONE_BOOTHS, JUNCTION_TOWERS, TRANSFORMER_BOXES, INDUSTRIAL_LIGHT_POLES, OIL_STATIONS, SERVICE_SHEDS, CABLE_REELS, HIGH_VOLTAGE_FENCES, MAINTENANCE_LOCKERS, INDUSTRY_BUILDINGS, SMOKESTACKS, COOLING_FANS, FUEL_PUMP_STATIONS, OIL_DRUM_STACKS, PUMP_HOUSES, MONORAIL, TICKET_COUNTER, EXIT_BOOTHS, MOBILE_CRANES, PIPE_BRIDGES, CHEMICAL_TANK, CONTROL_CONTAINERS, MAINTENANCE_CARTS, TOOL_BENCHES, PILLARS, GUARDIAN_STATUES, WATERFALLS, GLOW_DECORATIONS, ENGRAVED_WALLS, TORCHES, OBELISKS } from './GameObjects';

const SIGN_TEXT = ["WELCOME TO", "MY CITY"];

// =========================
// HELPER FUNCTIONS
// =========================
function makeRNG(seed) {
  // Mulberry32-ish
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

function lerp(a, b, t) { return a + (b - a) * t; };

function drawGlyphBand(ctx, rng, left, right, y, height = 10, alpha = 0.8) {
  const width = right - left;
  const cols = Math.max(6, Math.floor(width / 24));
  const cell = width / cols;

  // faint cut line behind the band
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.stroke();

  for (let i = 0; i < cols; i++) {
    const cx = left + i * cell + cell * 0.5;
    const s = Math.min(cell * 0.45, height);

    // emboss effect (light/high + dark/low)
    ctx.save();
    ctx.translate(cx, y);

    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1.5;
    drawSimpleHieroGlyph(ctx, Math.floor(rng() * 7), s);
    ctx.stroke();

    ctx.translate(1, 1);
    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    drawSimpleHieroGlyph(ctx, Math.floor(rng() * 7), s);
    ctx.stroke();

    ctx.restore();
  }
}

function drawSimpleHieroGlyph(ctx, type, s) {
  ctx.beginPath();
  switch (type) {
    case 0: // eye
      ctx.ellipse(0, 0, s * 0.6, s * 0.35, 0, 0, Math.PI * 2);
      ctx.moveTo(-s * 0.5, 0); ctx.lineTo(s * 0.5, 0);
      ctx.moveTo(0, 0); ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2);
      break;
    case 1: // scarab-ish
      ctx.ellipse(0, 0, s * 0.45, s * 0.35, 0, 0, Math.PI * 2);
      ctx.moveTo(-s * 0.35, -s * 0.2); ctx.lineTo(s * 0.35, -s * 0.2);
      ctx.moveTo(-s * 0.25, s * 0.2);  ctx.lineTo(s * 0.25, s * 0.2);
      break;
    case 2: // reed bundle
      for (let k = -1; k <= 1; k++) {
        ctx.moveTo(k * s * 0.35, s * 0.5);
        ctx.lineTo(k * s * 0.35, -s * 0.5);
      }
      break;
    case 3: // zig water
      ctx.moveTo(-s, 0);
      ctx.lineTo(-s * 0.5, -s * 0.25);
      ctx.lineTo(0, 0);
      ctx.lineTo(s * 0.5, -s * 0.25);
      ctx.lineTo(s, 0);
      break;
    case 4: // ankh-like
      ctx.arc(0, -s * 0.35, s * 0.22, 0, Math.PI * 2);
      ctx.moveTo(0, -s * 0.1); ctx.lineTo(0, s * 0.6);
      ctx.moveTo(-s * 0.25, s * 0.2); ctx.lineTo(s * 0.25, s * 0.2);
      break;
    case 5: // falcon outline hint
      ctx.moveTo(-s * 0.6, 0);
      ctx.quadraticCurveTo(0, -s * 0.7, s * 0.6, -s * 0.2);
      ctx.moveTo(-s * 0.2, -s * 0.2); ctx.lineTo(s * 0.2, s * 0.1);
      break;
    default: // sun disc + rays
      ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.moveTo(Math.cos(a) * s * 0.45, Math.sin(a) * s * 0.45);
        ctx.lineTo(Math.cos(a) * s * 0.7,  Math.sin(a) * s * 0.7);
      }
      break;
  }
}

function drawEdgeChips(ctx, rng, x, y, w, h) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    // small nicks along the border
    const side = Math.floor(rng() * 4);
    let cx, cy, dx, dy;
    const len = 4 + Math.floor(rng() * 8);
    if (side === 0) { // top
      cx = x + 6 + rng() * (w - 12); cy = y + 2; dx = len; dy = 0;
    } else if (side === 1) { // right
      cx = x + w - 2; cy = y + 6 + rng() * (h - 12); dx = 0; dy = len;
    } else if (side === 2) { // bottom
      cx = x + 6 + rng() * (w - 12); cy = y + h - 2; dx = len; dy = 0;
    } else { // left
      cx = x + 2; cy = y + 6 + rng() * (h - 12); dx = 0; dy = len;
    }
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + (dx ? (rng() < 0.5 ? -dx : dx) : 0), cy + (dy ? (rng() < 0.5 ? -dy : dy) : 0));
    ctx.stroke();
  }
  ctx.restore();
}

// ---------- Hieroglyphs ----------
function drawHieroglyphRows(ctx, rng, x, y, w, h) {
  const rows = Math.max(2, Math.floor(h / 24));
  const cols = Math.max(6, Math.floor(w / 28));

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#c5b08a'; // sandstone cut
  ctx.fillStyle = '#c5b08a';

  for (let r = 0; r < rows; r++) {
    const rowY = y + 10 + r * (h / rows);
    for (let c = 0; c < cols; c++) {
      const gx = x + 10 + c * (w / cols);
      const type = Math.floor(rng() * 6);
      ctx.save();
      ctx.translate(gx, rowY);
      ctx.globalAlpha = 0.9;

      // shallow emboss: dark bottom-right / light top-left
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.translate(0.8, 0.8);
      drawGlyph(ctx, type, 10 + rng() * 6);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.setLineDash([]);
      ctx.translate(-1.2, -1.2);
      drawGlyph(ctx, type, 10 + rng() * 6);
      ctx.stroke();

      ctx.restore();
    }
  }
  ctx.restore();
}

function drawGlyph(ctx, type, size) {
  // A handful of iconic shapes: eye, bird, reed, zig-zag water, hand, sun-disc
  ctx.beginPath();
  switch (type) {
    case 0: // Eye
      ctx.ellipse(0, 0, size, size * 0.6, 0, 0, Math.PI * 2);
      ctx.moveTo(-size * 0.6, 0);
      ctx.lineTo(size * 0.6, 0);
      ctx.moveTo(0, -size * 0.6);
      ctx.lineTo(0, size * 0.6);
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      break;
    case 1: // Bird-like
      ctx.moveTo(-size, 0); ctx.quadraticCurveTo(-size * 0.2, -size * 0.8, size * 0.6, -size * 0.2);
      ctx.moveTo(-size * 0.2, -size * 0.2); ctx.lineTo(size * 0.2, size * 0.1);
      ctx.moveTo(size * 0.1, -size * 0.05); ctx.lineTo(size * 0.9, -size * 0.05);
      break;
    case 2: // Reed
      for (let i = -1; i <= 1; i++) {
        ctx.moveTo(i * (size * 0.35), size * 0.6);
        ctx.lineTo(i * (size * 0.35), -size * 0.6);
        ctx.moveTo(i * (size * 0.35), -size * 0.6);
        ctx.quadraticCurveTo(i * (size * 0.35) + size * 0.2, -size * 0.9, i * (size * 0.35) + size * 0.05, -size * 0.6);
      }
      break;
    case 3: // Water zig-zag
      for (let i = -size; i <= size; i += size * 0.5) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i + size * 0.25, -size * 0.25);
        ctx.lineTo(i + size * 0.5, 0);
        ctx.lineTo(i + size * 0.75, -size * 0.25);
      }
      break;
    case 4: // Hand-ish
      ctx.moveTo(-size * 0.8, 0); ctx.lineTo(size * 0.4, 0);
      for (let f = 0; f < 4; f++) {
        ctx.moveTo(size * 0.4, -f * (size * 0.18));
        ctx.lineTo(size * 0.8, -f * (size * 0.18));
      }
      break;
    case 5: // Ankh (symbol of life)
      ctx.arc(0, -size * 0.3, size * 0.3, 0, Math.PI * 2);
      ctx.moveTo(0, -size * 0.6);
      ctx.lineTo(0, size * 0.6);
      ctx.moveTo(-size * 0.3, size * 0.3);
      ctx.lineTo(size * 0.3, size * 0.3);
      break;
    case 6: // Scarab beetle
      ctx.ellipse(0, 0, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
      for (let i = -1; i <= 1; i += 0.5) {
        ctx.moveTo(i * size * 0.5, -size * 0.3);
        ctx.lineTo(i * size * 0.5, size * 0.3);
      }
      break;
    default: // Sun-disc
      ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
      ctx.moveTo(0, -size * 0.9); ctx.lineTo(0, -size * 0.3);
      ctx.moveTo(0, size * 0.9); ctx.lineTo(0, size * 0.3);
      ctx.moveTo(-size * 0.9, 0); ctx.lineTo(-size * 0.3, 0);
      ctx.moveTo(size * 0.9, 0); ctx.lineTo(size * 0.3, 0);
      break;
  }
}

// ---------- Cave drawings (ochre paint) ----------
function drawCavePaint(ctx, rng, x, y, w, h) {
  ctx.save();
  ctx.strokeStyle = '#9c4f2a'; // ochre
  ctx.lineWidth = 2;

  const motifs = Math.max(4, Math.floor((w * h) / 2200));
  for (let i = 0; i < motifs; i++) {
    const mx = x + 10 + rng() * (w - 20);
    const my = y + 10 + rng() * (h - 20);
    const t = Math.floor(rng() * 4);

    ctx.save();
    ctx.translate(mx, my);
    ctx.globalAlpha = 0.85;

    if (t === 0) {
      // stick figure
      ctx.beginPath();
      ctx.moveTo(0, -8); ctx.lineTo(0, 8);           // spine
      ctx.moveTo(-6, -2); ctx.lineTo(6, -2);         // arms
      ctx.moveTo(0, 8); ctx.lineTo(-6, 16);          // leg L
      ctx.moveTo(0, 8); ctx.lineTo(6, 16);           // leg R
      ctx.stroke();
      ctx.beginPath(); ctx.arc(0, -12, 4, 0, Math.PI * 2); ctx.stroke(); // head
    } else if (t === 1) {
      // animal outline (deer-ish)
      ctx.beginPath();
      ctx.moveTo(-12, 6);
      ctx.quadraticCurveTo(-10, -8, 8, -6);
      ctx.quadraticCurveTo(12, 0, -8, 6);
      ctx.stroke();
      // antlers
      ctx.beginPath();
      ctx.moveTo(8, -6); ctx.lineTo(12, -12);
      ctx.moveTo(8, -6); ctx.lineTo(14, -10);
      ctx.stroke();
    } else if (t === 2) {
      // spiral
      ctx.beginPath();
      spiral(ctx, 0, 0, 1.2, 9);
      ctx.stroke();
    } else {
      // hand negative (stencil rectangle-ish hint)
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#9c4f2a';
      ctx.fillRect(-8, -8, 16, 16);
      ctx.globalAlpha = 0.85;
      // little finger gaps
      for (let f = -6; f <= 6; f += 3) {
        ctx.clearRect(f, -8, 2, 6);
      }
    }

    ctx.restore();
  }

  ctx.restore();
}

function spiral(ctx, x, y, step, turns) {
  let a = 0, r = 2;
  ctx.moveTo(x, y);
  for (let i = 0; i < turns * 20; i++) {
    a += 0.2;
    r += step * 0.12;
    ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
}

// ---------- Glowing runes (With Number Pattern) ----------
function drawRunePanel(ctx, rng, x, y, w, h, glowColor, time) {
  // Your contact number pattern: 6384890892
  // We'll use this to determine which runes glow brighter
  const numberPattern = [6, 3, 8, 4, 8, 9, 0, 8, 9, 2];
  
  // Pale incisions + faint pulsing glow
  const cols = Math.max(10, Math.floor(w / 36)); // Ensure at least 10 columns for the pattern
  const rows = Math.max(3, Math.floor(h / 34));
  const cellW = w / cols;
  const cellH = h / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * cellW + cellW * 0.5;
      const cy = y + r * cellH + cellH * 0.5;
      const size = Math.min(cellW, cellH) * (0.32 + rng() * 0.1);

      // Determine glow intensity based on number pattern
      const patternIndex = c % numberPattern.length;
      const shouldGlowBright = (r === Math.floor(rows/2)) && (numberPattern[patternIndex] > 0);
      const glowIntensity = shouldGlowBright ? numberPattern[patternIndex] / 10 : 0.1;

      // engraved cut (emboss) - ALWAYS DRAW THIS
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.translate(cx, cy);
      drawRuneShape(ctx, Math.floor(rng() * 8), size);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.translate(1, 1);
      drawRuneShape(ctx, Math.floor(rng() * 8), size);
      ctx.stroke();

      // glow overlay (pulse) - VARIABLE INTENSITY BASED ON NUMBER PATTERN
      const pulse = (0.22 + 0.18 * Math.sin((time / 400) + (r * 0.9 + c * 1.2))) * glowIntensity;
      ctx.shadowBlur = shouldGlowBright ? 20 : 10;
      ctx.shadowColor = glowColor;
      ctx.strokeStyle = glowColor;
      ctx.globalAlpha = pulse;
      ctx.lineWidth = shouldGlowBright ? 2.5 : 1.5;
      drawRuneShape(ctx, Math.floor(rng() * 8), size * 0.95);
      ctx.stroke();

      // For the brightest runes (matching your number), add a subtle number overlay
      if (shouldGlowBright) {
        ctx.save();
        ctx.globalAlpha = pulse * 0.8;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${size * 0.4}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(numberPattern[patternIndex].toString(), 0, 0);
        ctx.restore();
      }

      ctx.restore();
    }
  }

  // Draw a subtle number sequence at the bottom as a hint
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = glowColor;
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('638 • 489 • 0892', x + w/2, y + h + 20);
  ctx.restore();

  // cleanup
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

function drawRuneShape(ctx, kind, s) {
  ctx.beginPath();
  switch (kind) {
    case 0: // diamond
      ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0); ctx.closePath();
      break;
    case 1: // trident
      ctx.moveTo(0, -s); ctx.lineTo(0, s);
      ctx.moveTo(-s * 0.6, -s * 0.2); ctx.lineTo(s * 0.6, -s * 0.2);
      ctx.moveTo(-s * 0.6, s * 0.2); ctx.lineTo(s * 0.6, s * 0.2);
      break;
    case 2: // chevrons
      ctx.moveTo(-s, -s * 0.2); ctx.lineTo(0, -s * 0.8); ctx.lineTo(s, -s * 0.2);
      ctx.moveTo(-s, s * 0.2); ctx.lineTo(0, s * 0.8); ctx.lineTo(s, s * 0.2);
      break;
    case 3: // circle + slash
      ctx.arc(0, 0, s * 0.8, 0, Math.PI * 2);
      ctx.moveTo(-s * 0.8, s * 0.8); ctx.lineTo(s * 0.8, -s * 0.8);
      break;
    case 4: // angular F
      ctx.moveTo(-s, -s); ctx.lineTo(-s, s); ctx.lineTo(s * 0.4, 0); ctx.closePath();
      break;
    case 5: // star-ish
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const r = i % 2 ? s * 0.6 : s;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      break;
    case 6: // split bars
      ctx.moveTo(-s, 0); ctx.lineTo(-s * 0.2, 0);
      ctx.moveTo(s * 0.2, 0); ctx.lineTo(s, 0);
      ctx.moveTo(0, -s); ctx.lineTo(0, -s * 0.2);
      ctx.moveTo(0, s * 0.2); ctx.lineTo(0, s);
      break;
    default: // rune R
      ctx.moveTo(-s, s); ctx.lineTo(-s, -s); ctx.lineTo(s * 0.2, -s);
      ctx.lineTo(s * 0.1, -s * 0.2); ctx.lineTo(-s, -s * 0.2);
      break;
  }
};

// Color manipulation helper
const shiftColorHue = (hexColor, degrees) => {
  // Remove # if present
  let hex = hexColor.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Shift hue
  h = (h * 360 + degrees) % 360;
  if (h < 0) h += 360;
  h /= 360;

  // Convert HSL back to RGB
  let r2, g2, b2;
  if (s === 0) {
    r2 = g2 = b2 = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1/3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1/3);
  }

  // Convert RGB back to HEX
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
};

// Draws a single neon character with 3D tube effect
const drawNeonCharacter = (ctx, char, x, y, color, time) => {
  const charFlicker = 0.7 + 0.3 * Math.sin(time/300) * Math.sin(time/700 + x);
  const hueShift = (time/100 + x) % 30 - 15; // Small hue variation
  
  // Main glow
  ctx.save();
  ctx.fillStyle = shiftColorHue(color, hueShift);
  ctx.shadowColor = shiftColorHue(color, hueShift);
  ctx.shadowBlur = 15 * charFlicker;
  ctx.globalAlpha = 0.9 * charFlicker;
  ctx.fillText(char, x, y);
  
  // Tube highlight
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.strokeText(char, x, y);
  
  // Hot spots
  const hotSpot = Math.sin(time/200 + x) > 0.8;
  if (hotSpot) {
    ctx.fillStyle = 'white';
    ctx.shadowColor = shiftColorHue(color, hueShift + 30);
    ctx.shadowBlur = 20;
    ctx.globalAlpha = 0.7;
    ctx.fillText(char, x, y);
  }
  
  ctx.restore();
};

const drawPulsingGlow = (ctx, x, y, width, height, color, time) => {
  ctx.save();

  // Color shift through hue spectrum
  const hueShift = (time / 5000) % 360;
  
  // Base glow pulse (slow)
  const pulse1 = 0.7 + 0.3 * Math.sin(time / 1200);
  
  // Secondary faster pulse
  const pulse2 = 0.8 + 0.2 * Math.sin(time / 3700);
  
  // Combined pulse effect
  const glowIntensity = pulse1 * pulse2;
  
  // Outer glow
  ctx.shadowColor = shiftColorHue(color, hueShift * 0.3);
  ctx.shadowBlur = 40 * glowIntensity;
  ctx.fillStyle = shiftColorHue(color, hueShift * 0.3);
  ctx.globalAlpha = 0.05 * glowIntensity;
  ctx.fillRect(x, y, width, height);
  
  // Inner glow
  ctx.shadowBlur = 20 * glowIntensity;
  ctx.globalAlpha = 0.1 * glowIntensity;
  ctx.fillRect(x + 5, y + 5, width - 10, height - 10);
  
  ctx.restore();
};

const drawNeonFrame = (ctx, x, y, width, height, color, time, id) => {
  ctx.save();

  const segmentCount = 20;
  const lightSize = 8;
  const speed = 0.002;
  const offset = id * 1000; // Stagger multiple signs
  
  // Tube glow with subtle flicker
  const flicker = 0.8 + 0.2 * Math.sin(time/300) * Math.sin(time/170);
  const pulse = 0.7 + 0.3 * Math.sin(time/2000);

  // Outer tube
  ctx.shadowColor = color;
  ctx.shadowBlur = 30 * flicker * pulse;
  ctx.lineWidth = 6;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.9 * flicker;
  ctx.strokeRect(x, y, width, height);
  
  // Inner tube with phase-shifted animation
  const innerFlicker = 0.7 + 0.3 * Math.sin(time/400 + 2) * Math.sin(time/230 + 1);
  ctx.shadowBlur = 20 * innerFlicker * pulse;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.7 * innerFlicker;
  ctx.strokeRect(x + 10, y + 10, width - 20, height - 20);

  // Outer frame
  ctx.shadowColor = color;
  ctx.shadowBlur = 30 * flicker;
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.8 * flicker;
  ctx.strokeRect(x, y, width, height);
  
  // Inner frame line
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15 * flicker;
  ctx.globalAlpha = 0.6 * flicker;
  ctx.strokeRect(x + 5, y + 5, width - 10, height - 10);

  // Draw running lights along all four sides
  for (let i = 0; i < segmentCount; i++) {
    const pos = (time * speed + offset + i/segmentCount) % 1;
    
    let lightX, lightY;
    if (pos < 0.25) {
      // Top side
      lightX = x + width * (pos / 0.25);
      lightY = y;
    } else if (pos < 0.5) {
      // Right side
      lightX = x + width;
      lightY = y + height * ((pos - 0.25) / 0.25);
    } else if (pos < 0.75) {
      // Bottom side
      lightX = x + width * (1 - (pos - 0.5) / 0.25);
      lightY = y + height;
    } else {
      // Left side
      lightX = x;
      lightY = y + height * (1 - (pos - 0.75) / 0.25);
    }
    
    const intensity = 0.7 + 0.3 * Math.sin(time/100 + i);
    ctx.fillStyle = `hsl(${(time/20 + i*30) % 360}, 100%, 80%)`;
    ctx.shadowColor = `hsl(${(time/20 + i*30) % 360}, 100%, 50%)`;
    ctx.shadowBlur = 15 * intensity;
    ctx.beginPath();
    ctx.arc(lightX, lightY, lightSize * intensity, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

const drawGlowingText = (ctx, lines, x, y, color, fontSize, flickers, time, id) => {
  ctx.save();

  // Text settings
  ctx.font = `${fontSize - 7}px 'Orbitron', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Color cycling through hues
  const hueOffset = (time / 50 + id * 60) % 360;
  const textColor = shiftColorHue(color, hueOffset * 0.5);

  const lineHeight = fontSize * 1.2;
  const startY = y - (lineHeight * (lines.length - 1)) / 2;

  // Per-character animation
  lines.forEach((line, lineIndex) => {
    const letters = [...line];
    const spacing = ctx.measureText("M").width * 1.2;
    const totalWidth = spacing * letters.length;
    let startX = x - totalWidth / 2 + spacing / 2;
    
    // Background text glow
    ctx.save();
    ctx.shadowColor = textColor;
    ctx.shadowBlur = 30;
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = textColor;
    ctx.fillText(line, x, startY + lineIndex * lineHeight);
    ctx.restore();
    
    // Draw each character with individual effects
    letters.forEach((char, i) => {
      const charTime = time + i * 100 + lineIndex * 500;
      
      // Combine random flicker with time-based pulse
      const timePulse = 0.8 + 0.2 * Math.sin(time / 500 + i * 100);
      const flicker = flickers[lineIndex][i] * timePulse;
      const alpha = 0.7 + 0.3 * flicker;
      const glowIntensity = 15 + 15 * flicker;

      // Main glow
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = glowIntensity;
      ctx.fillStyle = color;
      ctx.fillText(char, startX + i * spacing, startY + lineIndex * lineHeight);
      
      // Inner white-hot core
      ctx.globalAlpha = alpha * 0.8;
      ctx.shadowBlur = glowIntensity * 0.6;
      ctx.fillStyle = "white";
      ctx.fillText(char, startX + i * spacing, startY + lineIndex * lineHeight);
      
      // Tiny bright center
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText(char, startX + i * spacing, startY + lineIndex * lineHeight);
      ctx.restore();

      // 3D tube effect with highlights
      drawNeonCharacter(
        ctx,
        char,
        startX + i * spacing,
        startY + lineIndex * lineHeight,
        textColor,
        charTime
      );
    });
  });

  ctx.restore();
};

const generateFlickerMap = (lines, time) => {
  // Creates a more organic flicker pattern that changes over time
  return lines.map(line => 
    [...line].map((_, i) => {
      // Base flicker value
      const base = 0.7 + 0.3 * Math.random();
      
      // Time-based variation
      const timeVar = 0.5 + 0.5 * Math.sin(time / (300 + i * 50));
      
      // Random spikes
      const spike = Math.random() > 0.95 ? 1.5 : 1;
      
      // Combine effects and clamp between 0.5-1.2
      return Math.min(1.2, Math.max(0.5, base * timeVar * spike));
    })
  );
};

function drawHexBolt(ctx, x, y, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * 2 * Math.PI / 6) - Math.PI / 6;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Bolt center
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
  ctx.fill();
}



// Draw Functions
export const drawConveyorBelt = (ctx, camX, camY) => {
  CONVEYOR_BELTS.forEach(belt => {
    const drawX = belt.x - camX;
    const drawY = belt.y - camY;

    ctx.save();

    const r = 10; // roller radius
    const beltThickness = 6; // more visible belt thickness
    const rollerWidth = 4; // roller width (for 3D effect)

    // ====== Rollers (Left & Right Ends) ======
    const rollerGradient = ctx.createRadialGradient(0, 0, 1, 0, 0, r);
    rollerGradient.addColorStop(0, '#d0d0d0'); // metallic highlight
    rollerGradient.addColorStop(0.5, '#808080');
    rollerGradient.addColorStop(1, '#404040');

    // Draw rollers with 3D effect
    [drawX, drawX + belt.width].forEach(cx => {
      ctx.save();
      ctx.translate(cx, drawY + belt.height / 2);
      
      // Main roller body
      ctx.fillStyle = rollerGradient;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      
      // Roller side (for 3D perspective)
      ctx.fillStyle = '#606060';
      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI/2, Math.PI/2);
      ctx.lineTo(rollerWidth, r);
      ctx.arc(rollerWidth, 0, r, Math.PI/2, -Math.PI/2, true);
      ctx.closePath();
      ctx.fill();

      // Axle details
      ctx.fillStyle = '#303030';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Bolt/nut detail
      ctx.fillStyle = '#505050';
      ctx.beginPath();
      ctx.arc(rollerWidth, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });

    // ====== Belt Base ======
    // Main belt body with realistic rubber texture
    const beltGradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + belt.height);
    beltGradient.addColorStop(0, '#3a3a3a'); // top edge highlight
    beltGradient.addColorStop(0.5, '#2a2a2a'); // main color
    beltGradient.addColorStop(1, '#1a1a1a'); // bottom shadow
    
    ctx.fillStyle = belt.isOn ? belt.color : beltGradient;
    ctx.beginPath();
    ctx.moveTo(drawX + r, drawY);
    ctx.lineTo(drawX + belt.width - r, drawY);
    ctx.quadraticCurveTo(drawX + belt.width, drawY, drawX + belt.width, drawY + r);
    ctx.lineTo(drawX + belt.width, drawY + belt.height - r);
    ctx.quadraticCurveTo(drawX + belt.width, drawY + belt.height, drawX + belt.width - r, drawY + belt.height);
    ctx.lineTo(drawX + r, drawY + belt.height);
    ctx.quadraticCurveTo(drawX, drawY + belt.height, drawX, drawY + belt.height - r);
    ctx.lineTo(drawX, drawY + r);
    ctx.quadraticCurveTo(drawX, drawY, drawX + r, drawY);
    ctx.fill();

    // ====== Belt Texture ======
    // Rubber texture with subtle noise
    ctx.save();
    ctx.clip(); // Use the same path as belt base for clipping
    
    // Add subtle noise to belt surface
    const textureOpacity = 0.03;
    for (let y = drawY; y < drawY + belt.height; y += 2) {
      for (let x = drawX; x < drawX + belt.width; x += 2) {
        const noiseVal = Math.random() * 50;
        ctx.fillStyle = `rgba(${150 + noiseVal}, ${140 + noiseVal}, ${130 + noiseVal}, ${textureOpacity})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
    ctx.restore();

    // ====== Tread Animation (Realistic Cleats) ======
    const cleatSpacing = 20;
    const cleatWidth = 8;
    const cleatHeight = belt.height - 8;
    const offset = (Date.now() / (50 / belt.speed)) % cleatSpacing;
    
    ctx.save();
    ctx.clip(); // Clip to belt area
    
    for (let i = -cleatSpacing; i < belt.width + cleatSpacing; i += cleatSpacing) {
      let px = drawX + (belt.direction === 'right' ? i - offset : i + offset);
      
      // Cleat base
      ctx.fillStyle = '#252525';
      ctx.fillRect(px, drawY + 2, cleatWidth, cleatHeight);
      
      // Cleat highlight
      const cleatGradient = ctx.createLinearGradient(px, drawY, px, drawY + cleatHeight);
      cleatGradient.addColorStop(0, 'rgba(100, 100, 100, 0.3)');
      cleatGradient.addColorStop(1, 'rgba(50, 50, 50, 0.1)');
      ctx.fillStyle = cleatGradient;
      ctx.fillRect(px, drawY + 2, cleatWidth, cleatHeight);
      
      // Cleat edge highlight
      ctx.strokeStyle = 'rgba(120, 120, 120, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 0.5, drawY + 2.5);
      ctx.lineTo(px + 0.5, drawY + cleatHeight + 1.5);
      ctx.stroke();
    }
    ctx.restore();

    // ====== Belt Highlights ======
    // Top edge highlight
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(drawX + r, drawY + 0.5);
    ctx.lineTo(drawX + belt.width - r, drawY + 0.5);
    ctx.stroke();
    
    // Side edge highlights
    ctx.beginPath();
    ctx.moveTo(drawX + 0.5, drawY + r);
    ctx.lineTo(drawX + 0.5, drawY + belt.height - r);
    ctx.moveTo(drawX + belt.width - 0.5, drawY + r);
    ctx.lineTo(drawX + belt.width - 0.5, drawY + belt.height - r);
    ctx.stroke();

    // ====== Wear and Tear ======
    // Add some subtle scratches and wear marks
    ctx.strokeStyle = 'rgba(80, 80, 80, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const scratchY = drawY + 5 + Math.random() * (belt.height - 10);
      const scratchLength = 10 + Math.random() * (belt.width - 20);
      const scratchX = drawX + 10 + Math.random() * (belt.width - 20);
      
      ctx.beginPath();
      ctx.moveTo(scratchX, scratchY);
      ctx.lineTo(scratchX + scratchLength, scratchY + (Math.random() - 0.5) * 3);
      ctx.stroke();
    }

    ctx.restore();
  });
};

export const drawSteelBridge = (ctx, camX, camY) => {
  BROKEN_BRIDGE.forEach(bridge => {
    const drawX = bridge.x - camX;
    const drawY = bridge.y - camY;
    
    // Skip if not visible
    if (drawX + bridge.width < 0 || drawX > ctx.canvas.width || 
        drawY + bridge.height < 0 || drawY > ctx.canvas.height) return;

    ctx.save();

    const railingHeight = 24;
    const gapWidth = 12;
    const barWidth = 6;
    const trussHeight = 30;
    const cableSpacing = 25;
    const boltSpacing = 20;

    // === Structural Trusses ===
    ctx.fillStyle = '#2a2a2a';
    // Left truss
    ctx.fillRect(drawX - 8, drawY - trussHeight, 10, trussHeight + bridge.height);
    // Right truss
    ctx.fillRect(drawX + bridge.width - 2, drawY - trussHeight, 10, trussHeight + bridge.height);
    
    // Truss cross beams
    for (let y = drawY - trussHeight + 10; y < drawY + bridge.height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(drawX - 8, y);
      ctx.lineTo(drawX + bridge.width + 8, y);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // === Deck with plating ===
    const deckGradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + bridge.height);
    deckGradient.addColorStop(0, '#222');
    deckGradient.addColorStop(1, '#1a1a1a');
    
    ctx.fillStyle = deckGradient;
    ctx.fillRect(drawX, drawY, bridge.width, bridge.height);

    // Deck plating seams
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = drawX + 20; x < drawX + bridge.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, drawY);
      ctx.lineTo(x, drawY + bridge.height);
      ctx.stroke();
    }

    // Glowing energy line with pulse effect
    const pulse = Math.sin(Date.now() / 300) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(0, 255, 238, ${0.3 + pulse * 0.2})`;
    ctx.shadowColor = '#00ffee';
    ctx.shadowBlur = 5 + pulse * 3;
    ctx.fillRect(drawX, drawY + bridge.height/2 - 1, bridge.width, 2);
    ctx.shadowBlur = 0;

    // === Industrial Railing ===
    // Main posts
    ctx.fillStyle = '#444';
    for (let x = drawX; x <= drawX + bridge.width; x += gapWidth) {
      // Post with depth
      ctx.fillRect(x, drawY - railingHeight, barWidth, railingHeight);
      // Post top cap
      ctx.fillRect(x - 1, drawY - railingHeight - 2, barWidth + 2, 3);
    }

    // Horizontal beams
    ctx.fillStyle = '#555';
    // Top beam
    ctx.fillRect(drawX, drawY - railingHeight - 2, bridge.width, 4);
    // Middle beam
    ctx.fillRect(drawX, drawY - railingHeight/2, bridge.width, 3);
    // Bottom beam
    ctx.fillRect(drawX, drawY - 4, bridge.width, 3);

    // Edge highlight
    ctx.strokeStyle = 'rgba(100, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX + 0.5, drawY + 0.5, bridge.width - 1, bridge.height - 1);

    ctx.restore();
  });
};

export const drawCyberpunkBuilding = (ctx, camX, camY) => {
  NEON_BUILDINGS.forEach(building => {
    const drawX = building.x - camX;
    const drawY = building.y - camY;

    ctx.save();

    // Base dark silhouette
    ctx.fillStyle = '#101010';
    ctx.fillRect(drawX, drawY, building.width, building.height);

    // Neon outline (subtle glow)
    ctx.strokeStyle = building.color;
    ctx.shadowColor = building.color;
    ctx.shadowBlur = 12;
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX, drawY, building.width, building.height);

    ctx.shadowBlur = 0;

    // Windows / Panels

    // === Define space margins ===
    const topGap = 10;    // For signage
    const bottomGap = 20; // For door/ground features
    const leftGap = 10;
    const rightGap = 5;

    const usableHeight = building.height - topGap - bottomGap;
    const usableY = drawY + topGap;

    const usableWidth = building.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    const columns = Math.floor(usableWidth / 20);
    const rows = Math.floor(usableHeight / 18);
    const panelWidth = 8;
    const panelHeight = 12;
    const paddingX = 6;
    const paddingY = 8;

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() < 0.5) continue; // Randomize window existence

        const px = usableX + i * 20 + paddingX;
        const py =usableY + j * 18 + paddingY;

        const colors = ['#00ffee', '#ff00cc', '#ffaa00', '#00f0ff'];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

        ctx.globalAlpha = 0.7 + Math.random() * 0.3; // Flicker effect
        ctx.fillRect(px, py, panelWidth, panelHeight);
        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();
  });
};

export const AnimatedNeonSign = (ctx, camX, camY, elapsedTime) => {
  const now = Date.now();
  
  ANIMATED_NEON_SIGNS.forEach(sign => {
    const { id, x, y, width, height, color, text } = sign;

    const drawX = x - camX;
    const drawY = y - camY;

    ctx.save();

    const screenX = drawX + width / 2;
    const screenY = drawY + height / 2;

    // Flickering letter brightness per frame
    const flickerMap = generateFlickerMap(text, elapsedTime, id);

    // Draw background glow that pulses slowly
    drawPulsingGlow(ctx, screenX, screenY, width, height, color, elapsedTime, id);

    // Draw the neon tube frame
    drawNeonFrame(ctx, screenX, screenY, width, height, color, elapsedTime, id);

    // Draw the glowing text with individual character flickering
    drawGlowingText(
      ctx,
      text || SIGN_TEXT,
      screenX + width / 2,
      screenY + height / 2,
      color,
      36,
      flickerMap,
      now,
      id
    );

    ctx.restore();
  });
};

export const drawMaintenanceHatches = (ctx, camX, camY) => {
  MAINTENANCE_HATCHES.forEach(hatch => {
    const hatchX = hatch.x - camX;
    const hatchY = hatch.y - camY;

    ctx.save();

    // --- METAL BASE ---
    // Main plate (brushed metal)
    ctx.fillStyle = hatch.baseColor;
    ctx.fillRect(hatchX, hatchY, hatch.width, hatch.height);
    
    // Metal texture (subtle scratches)
    ctx.strokeStyle = '#ffffff10';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      const scratchX = hatchX + Math.random() * hatch.width;
      ctx.beginPath();
      ctx.moveTo(scratchX, hatchY);
      ctx.lineTo(scratchX - 10 + Math.random() * 20, hatchY + hatch.height);
      ctx.stroke();
    }

    // --- INDUSTRIAL DETAILS ---
    // Bolts (hexagonal)
    ctx.fillStyle = '#555';
    ctx.strokeStyle = hatch.accentColor;
    ctx.lineWidth = 1;
    const boltOffset = 15;
    for (let i = 0; i < hatch.bolts; i++) {
      // Top bolts
      drawHexBolt(
        ctx, 
        hatchX + (hatch.width / (hatch.bolts + 1)) * (i + 1), 
        hatchY + boltOffset,
        5
      );
      // Bottom bolts
      drawHexBolt(
        ctx,
        hatchX + (hatch.width / (hatch.bolts + 1)) * (i + 1),
        hatchY + hatch.height - boltOffset,
        5
      );
    }

    // --- NEON ACCENTS ---
    // Reinforced frame
    ctx.strokeStyle = hatch.accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(hatchX + 2, hatchY + 2, hatch.width - 4, hatch.height - 4);
    
    // Glow effect (metallic reflection)
    const gradient = ctx.createLinearGradient(
      hatchX, hatchY, 
      hatchX + hatch.width, hatchY + hatch.height
    );
    gradient.addColorStop(0, `${hatch.accentColor}30`);
    gradient.addColorStop(1, `${hatch.accentColor}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(hatchX, hatchY, hatch.width, hatch.height);

    // --- LABEL ---
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillStyle = hatch.accentColor;
    ctx.textAlign = 'center';
    ctx.fillText(
      hatch.label, 
      hatchX + hatch.width / 2, 
      hatchY + hatch.height / 2 + 5
    );
    // Label plate
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      hatchX + hatch.width / 2 - 50,
      hatchY + hatch.height / 2 - 15,
      100,
      30
    );

    ctx.restore();
  });
};

export const drawWoodenCrates = (ctx, camX, camY) => {
  WOODEN_CRATES.forEach(crate => {
    const { x, y, size } = crate;
    const drawX = x - camX;
    const drawY = y - camY;

    const pixel = size / 16; // Scale for pixel-art proportions

    // Colors
    const woodLight = "#f9d45a";
    const woodDark = "#e1b94b";
    const outline = "#000000";

    ctx.save();
    ctx.translate(drawX, drawY);

    // Outline
    ctx.fillStyle = outline;
    ctx.fillRect(0, 0, size, size);

    // Inner background
    ctx.fillStyle = woodLight;
    ctx.fillRect(pixel, pixel, size - pixel * 2, size - pixel * 2);

    // Horizontal planks
    ctx.fillStyle = woodDark;
    ctx.fillRect(pixel, pixel, size - pixel * 2, pixel * 2); // Top plank
    ctx.fillRect(pixel, size - pixel * 3, size - pixel * 2, pixel * 2); // Bottom plank

    // Vertical planks
    ctx.fillRect(pixel, pixel, pixel * 2, size - pixel * 2); // Left plank
    ctx.fillRect(size - pixel * 3, pixel, pixel * 2, size - pixel * 2); // Right plank

    // Diagonal X cross
    ctx.strokeStyle = woodDark;
    ctx.lineWidth = pixel * 2;
    ctx.beginPath();
    ctx.moveTo(pixel * 2, pixel * 2);
    ctx.lineTo(size - pixel * 2, size - pixel * 2);
    ctx.moveTo(size - pixel * 2, pixel * 2);
    ctx.lineTo(pixel * 2, size - pixel * 2);
    ctx.stroke();

    // Bolts
    ctx.fillStyle = "#777";
    const boltSize = pixel * 1.5;
    ctx.fillRect(pixel * 1.5, pixel * 1.5, boltSize, boltSize);
    ctx.fillRect(size - pixel * 3, pixel * 1.5, boltSize, boltSize);
    ctx.fillRect(pixel * 1.5, size - pixel * 3, boltSize, boltSize);
    ctx.fillRect(size - pixel * 3, size - pixel * 3, boltSize, boltSize);

    ctx.restore();
  });
};

export const drawIgloos = (ctx, camX, camY) => {
  IGLOOS.forEach(({ x, y, size = 80, tilt = 0, baseColor = '#E6F3FF' }) => {
    const drawX = x - camX;
    const drawY = y - camY;

    const radius = size;
    const domeCenterX = drawX;
    const domeCenterY = drawY - radius;

    ctx.save();
    ctx.translate(domeCenterX, domeCenterY);
    if (tilt) ctx.rotate(tilt);

    // Dome fill
    ctx.beginPath();
    ctx.arc(0, 0, radius, Math.PI, 2 * Math.PI);
    ctx.lineTo(radius, radius * 0.15);
    ctx.lineTo(-radius, radius * 0.15);
    ctx.closePath();
    ctx.fillStyle = baseColor;
    ctx.fill();

    // Dome stroke
    ctx.lineWidth = Math.max(1, Math.floor(radius * 0.06));
    ctx.strokeStyle = '#BFDFF6';
    ctx.stroke();

    // Clip dome for entrance
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, radius, Math.PI, 2 * Math.PI);
    ctx.lineTo(radius, radius * 0.15);
    ctx.lineTo(-radius, radius * 0.15);
    ctx.closePath();
    ctx.clip();

    // Entrance dimensions
    const entW = radius * 0.6;
    const entH = radius * 0.6;
    const entX = -entW / 2;
    const entY = radius * 0.15 - entH;

    // Entrance outer
    ctx.beginPath();
    ctx.moveTo(entX, entY + entH);
    ctx.lineTo(entX, entY + entH * 0.45);
    ctx.quadraticCurveTo(0, entY, entX + entW, entY + entH * 0.45);
    ctx.lineTo(entX + entW, entY + entH);
    ctx.closePath();
    ctx.fillStyle = '#D8EFFF';
    ctx.fill();
    ctx.strokeStyle = '#9FBFE6';
    ctx.lineWidth = Math.max(1, Math.floor(radius * 0.04));
    ctx.stroke();

    ctx.restore(); // exit clip

    ctx.restore(); // restore transform
  });
};

export const drawPineTree = (ctx, camX, camY) => {
  PINE_TREES.forEach(pine => {
    const { x, y, height } = pine;
  
    // World → screen
    const drawX = Math.round(x - camX);
    const drawY = Math.round(y - camY);

    const halfWidth = height * 0.3;
    const trunkWidth = height * 0.12;
    const trunkHeight = height * 0.18;
    const foliageHeight = height - trunkHeight;

    ctx.save();

    // Draw trunk
    ctx.fillStyle = '#8B5A2B';
    ctx.beginPath();
    ctx.rect(
      drawX - trunkWidth / 2,
      drawY - trunkHeight,
      trunkWidth,
      trunkHeight
    );
    ctx.fill();

    // Continuous foliage shape
    ctx.beginPath();
    ctx.moveTo(drawX, drawY - height); // tree tip
    ctx.quadraticCurveTo(drawX - halfWidth * 0.8, drawY - foliageHeight * 0.75, drawX - halfWidth, drawY - trunkHeight);
    ctx.lineTo(drawX + halfWidth, drawY - trunkHeight);
    ctx.quadraticCurveTo(drawX + halfWidth * 0.8, drawY - foliageHeight * 0.75, drawX, drawY - height);
    ctx.closePath();

    // Foliage fill
    const grad = ctx.createLinearGradient(0, drawY - height, 0, drawY - trunkHeight);
    grad.addColorStop(0, '#2E5D3D');
    grad.addColorStop(1, '#1C4027');
    ctx.fillStyle = grad;
    ctx.fill();

    // Snow overlay with natural curves
    const snowLayers = 5;
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < snowLayers; i++) {
      const lyY = drawY - trunkHeight - (foliageHeight / snowLayers) * (i + 0.5);
      const lyWidth = halfWidth * (1 - i / snowLayers);
      ctx.beginPath();
      ctx.moveTo(drawX - lyWidth * 0.7, lyY);
      ctx.quadraticCurveTo(drawX, lyY - 6, drawX + lyWidth * 0.7, lyY);
      ctx.quadraticCurveTo(drawX, lyY + 4, drawX - lyWidth * 0.7, lyY);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.restore();
  });
};

export const drawSnowHouse = (ctx, x, y, width, height, camX, camY) => {
  const drawX = Math.round(x - camX);
  const drawY = Math.round(y - camY);

  const smokeTime = Date.now();
  const roofHeight = height * 0.35;
  const wallHeight = height - roofHeight;
  const plankSpacing = wallHeight / 6;

  ctx.save();

  // Walls
  ctx.fillStyle = '#8B5A2B';
  ctx.fillRect(drawX - width / 2, drawY - wallHeight, width, wallHeight);

  // --- Roof (wood under snow) ---
  ctx.beginPath();
  ctx.moveTo(drawX - width / 2 - 8, drawY - wallHeight);
  ctx.lineTo(drawX, drawY - height);
  ctx.lineTo(drawX + width / 2 + 8, drawY - wallHeight);
  ctx.closePath();
  ctx.fillStyle = '#5B3A1E';
  ctx.fill();

  // --- Roof snow ---
  ctx.beginPath();
  const snowBumps = 5;
  const snowWidth = width + 16;
  const startX = drawX - snowWidth / 2;
  const startY = drawY - wallHeight;
  ctx.moveTo(startX, startY);
  for (let i = 0; i <= snowBumps; i++) {
    const px = startX + (snowWidth / snowBumps) * i;
    const py = startY - (i % 2 === 0 ? 8 : 4);
    ctx.lineTo(px, py);
  }
  ctx.lineTo(drawX, drawY - height - 8);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.globalAlpha = 0.95;
  ctx.fill();
  ctx.globalAlpha = 1;

  // Door
  const doorWidth = width * 0.22;
  const doorHeight = wallHeight * 0.55;
  ctx.fillStyle = '#4B2E17';
  ctx.fillRect(drawX - doorWidth / 2, drawY - doorHeight, doorWidth, doorHeight);

  // Windows
  const winSize = width * 0.18;
  const winY = drawY - wallHeight * 0.55;
  const winColor = '#AEE7F8';
  const winOffsetX = width * 0.28;
  [ -1, 1 ].forEach(side => {
    const wx = drawX + winOffsetX * side - winSize / 2;
    ctx.fillStyle = winColor;
    ctx.fillRect(wx, winY, winSize, winSize);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(wx + winSize / 2, winY);
    ctx.lineTo(wx + winSize / 2, winY + winSize);
    ctx.moveTo(wx, winY + winSize / 2);
    ctx.lineTo(wx + winSize, winY + winSize / 2);
    ctx.stroke();
  });

  // --- Chimney (stone) ---
  const chimneyW = width * 0.15;
  const chimneyH = roofHeight * 0.6;
  const chimneyX = drawX + width * 0.25;
  const chimneyY = drawY - height + chimneyH;
  ctx.fillStyle = '#7D7D7D';
  ctx.fillRect(chimneyX, chimneyY, chimneyW, chimneyH);

  // --- Chimney smoke ---
  const smokePuffs = 3;
  for (let i = 0; i < smokePuffs; i++) {
    const puffY = chimneyY - (i * 12 + (Math.sin(smokeTime / 300 + i) * 4));
    const puffX = chimneyX + chimneyW / 2 + Math.sin(smokeTime / 200 + i) * 6;
    const puffRadius = 6 + i * 4;
    ctx.beginPath();
    ctx.arc(puffX, puffY, puffRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 220, 220, ${1 - i * 0.25})`;
    ctx.fill();
  }

  ctx.restore();
};

export const drawSnowDude = (ctx, camX, camY, x, y, size, coatColor, hoodColor) => {
  const drawX = Math.round(x - camX);
  const drawY = Math.round(y - camY);

  ctx.save();
  ctx.translate(drawX, drawY);

  const bodyW = size * 0.55;
  const bodyH = size * 0.8;

  // Body (coat)
  ctx.beginPath();
  ctx.roundRect(-bodyW / 2, -bodyH, bodyW, bodyH, 8);
  ctx.fillStyle = coatColor;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#2F4B6A';
  ctx.stroke();

  // Zipper line
  ctx.beginPath();
  ctx.moveTo(0, -bodyH);
  ctx.lineTo(0, 0);
  ctx.strokeStyle = '#BFDFF6';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Hood
  const hoodRadius = size * 0.32;
  ctx.beginPath();
  ctx.arc(0, -bodyH, hoodRadius, 0, Math.PI * 2);
  ctx.fillStyle = hoodColor;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#BFDFF6';
  ctx.stroke();

  // Hood fur trim
  ctx.beginPath();
  ctx.arc(0, -bodyH, hoodRadius * 1.1, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.setLineDash([2, 2]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Face
  ctx.beginPath();
  ctx.arc(0, -bodyH, hoodRadius * 0.65, 0, Math.PI * 2);
  ctx.fillStyle = '#FFD9B3';
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(-hoodRadius * 0.25, -bodyH, 2, 0, Math.PI * 2);
  ctx.arc(hoodRadius * 0.25, -bodyH, 2, 0, Math.PI * 2);
  ctx.fill();

  // Nose
  ctx.beginPath();
  ctx.arc(0, -bodyH + 4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Cheeks
  ctx.fillStyle = 'rgba(255,100,100,0.6)';
  ctx.beginPath();
  ctx.arc(-hoodRadius * 0.35, -bodyH + 5, 3, 0, Math.PI * 2);
  ctx.arc(hoodRadius * 0.35, -bodyH + 5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Boots
  ctx.fillStyle = '#3B3B3B';
  const bootW = bodyW * 0.45;
  const bootH = bodyH * 0.25;
  ctx.fillRect(-bootW - 2, 0, bootW, bootH);
  ctx.fillRect(2, 0, bootW, bootH);

  ctx.restore();
};

export const drawSledDog = (ctx, camX, camY, x, y, scale, furColor) => {
  const drawX = Math.round(x - camX);
  const drawY = Math.round(y - camY);

  ctx.save();
  ctx.translate(drawX, drawY);
  ctx.scale(scale, scale);

  // Shadow
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.ellipse(0, 12, 14, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.globalAlpha = 1;

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = furColor;
  ctx.fill();

  // Legs
  ctx.fillRect(-10, 6, 3, 6);
  ctx.fillRect(7, 6, 3, 6);

  // Head
  ctx.beginPath();
  ctx.arc(14, -4, 6, 0, Math.PI * 2);
  ctx.fillStyle = furColor;
  ctx.fill();

  // Ears
  ctx.beginPath();
  ctx.moveTo(11, -8);
  ctx.lineTo(9, -14);
  ctx.lineTo(13, -8);
  ctx.closePath();
  ctx.moveTo(17, -8);
  ctx.lineTo(19, -14);
  ctx.lineTo(15, -8);
  ctx.closePath();
  ctx.fillStyle = furColor;
  ctx.fill();

  // Face mask
  ctx.beginPath();
  ctx.arc(14, -4, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Nose
  ctx.beginPath();
  ctx.arc(16, -4, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();

  ctx.restore();
};

export const drawPrison = (ctx, camX, camY) => {
  PRISON.forEach(({ x, y, width, height }) => {
    const drawX = Math.round(x - camX);
    const drawY = Math.round(y - camY);

    ctx.save();
    ctx.translate(drawX, drawY);

    // ======== MAIN STRUCTURE ========
    ctx.beginPath();
    ctx.rect(-width / 2, -height / 2, width + 9, height);
    ctx.fillStyle = '#535353ff'; // deep volcanic basalt
    ctx.fill();
    ctx.strokeStyle = '#444241ff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // ======== WALL TEXTURE (cracks & shading) ========
    const blockSize = 26;
    for (let row = 0; row < Math.ceil(height / blockSize); row++) {
      for (let col = 0; col < Math.ceil(width / blockSize); col++) {
        const bx = -width / 2 + col * blockSize;
        const by = -height / 2 + row * blockSize;

        // Shadowed side (right & bottom edges)
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(bx + blockSize - 3, by + 2, 3, blockSize - 4); // right edge
        ctx.fillRect(bx + 2, by + blockSize - 3, blockSize - 4, 3); // bottom edge

        // Highlighted side (top & left edges)
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(bx + 1, by + 1, blockSize - 3, 2); // top edge
        ctx.fillRect(bx + 1, by + 1, 2, blockSize - 3); // left edge

        // Magenta cracks
        if ((row + col) % 6 === 0 || (row + col) % 3 === 0) {
          ctx.fillStyle = '#FF3B00';
          ctx.fillRect(bx + blockSize - 2, by + 3, 2, blockSize - 6);
          ctx.fillRect(bx + 3, by + blockSize - 2, blockSize - 6, 2);

          ctx.fillStyle = 'rgba(255,100,0,0.3)';
          ctx.fillRect(bx + blockSize - 4, by + 1, 4, blockSize - 2);
          ctx.fillRect(bx + 1, by + blockSize - 4, blockSize - 2, 4);
        }
      }
    }

    // ==== BATTLEMENTS ====
    const battlementW = 24;
    const battlementH = 16;
    const topY = -height / 2;

    // Number of teeth (round up so we always cover)
    const teethCount = Math.ceil(width / battlementW);

    for (let i = 0; i < teethCount; i++) {
      const bx = -width / 2 + i * battlementW;

      // Main tooth
      ctx.fillStyle = '#3A2924';
      ctx.fillRect(bx, topY - battlementH, battlementW, battlementH);

      // Side shading
      ctx.fillStyle = '#2B1E1A';
      ctx.fillRect(bx + battlementW - 3, topY - battlementH, 3, battlementH);

      // Top highlight
      ctx.fillStyle = '#4C3A34';
      ctx.fillRect(bx, topY - battlementH, battlementW, 2);

      // Random cracks
      if (Math.random() < 0.3) {
        ctx.fillStyle = '#1A100E';
        ctx.fillRect(
          bx + Math.random() * (battlementW - 4),
          topY - battlementH + Math.random() * (battlementH - 4),
          2,
          Math.random() * 4 + 1
        );
      }

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(bx, topY, battlementW, 3);
    }

    // ======== WINDOWS ========
    const cellY = -height / 4;
    const cellW = 28;
    const cellH = 36;
    
    [[-width / 3, cellY], [0, cellY], [width / 3, cellY]].forEach(([cx, cy]) => {
      ctx.fillStyle = '#FFB84D';
      ctx.fillRect(cx - cellW / 2, cy - cellH / 2, cellW, cellH);

      // Bars
      ctx.beginPath();
      for (let i = -1; i <= 1; i++) {
        ctx.moveTo(cx + (i * cellW) / 3, cy - cellH / 2);
        ctx.lineTo(cx + (i * cellW) / 3, cy + cellH / 2);
      }
      ctx.strokeStyle = '#2B1E1A';
      ctx.lineWidth = 3;
      ctx.stroke();
    });

    // ======== DOOR ========
    const doorW = 50;
    const doorH = 70;
    const doorY = height -  35 - doorH / 2;
    ctx.fillStyle = '#4A3B33';
    ctx.fillRect(-doorW / 2, doorY - height / 2, doorW, doorH);
    ctx.strokeStyle = '#2B1E1A';
    ctx.lineWidth = 3;
    ctx.strokeRect(-doorW / 2, doorY - height / 2, doorW, doorH);

    ctx.restore();
  });
};

export const drawTankWagon = (ctx, camX, camY) => {
  TANK_WAGONS.forEach(wagon => {
    const { x, y, width, height } = wagon;
    const drawX = Math.round(x - camX);
    const drawY = Math.round(y - camY);

    ctx.save();
    ctx.translate(drawX, drawY);

    // Base platform
    ctx.beginPath();
    ctx.rect(-width / 2, height / 4, width, height / 8);
    ctx.fillStyle = "#2B2B2B";
    ctx.fill();

    // Wheels
    const wheelRadius = height / 6;
    const wheelY = height / 2.2;
    const wheelPositions = [
      -width / 2 + wheelRadius * 2,
      width / 2 - wheelRadius * 2
    ];

    wheelPositions.forEach(posX => {
      ctx.beginPath();
      ctx.arc(posX, wheelY, wheelRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#1A1A1A";
      ctx.fill();
    });

    // Tanks
    const tankRadius = width / 8;
    const tankSpacing = width / 4;

    const drawOctagon = (cx, cy, r, color) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i + Math.PI / 8; // rotated for flat top/bottom
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    [-tankSpacing, 0, tankSpacing].forEach(offsetX => {
      drawOctagon(offsetX, 0, tankRadius, "#E3A122");

      // Tank top connector
      ctx.beginPath();
      ctx.rect(offsetX - 4, -tankRadius - 6, 8, 12);
      ctx.fillStyle = "#2B2B2B";
      ctx.fill();
    });

    // Top connecting rod
    ctx.beginPath();
    ctx.moveTo(-tankSpacing - 4, -tankRadius - 6);
    ctx.lineTo(tankSpacing + 4, -tankRadius - 6);
    ctx.strokeStyle = "#2B2B2B";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  });
};

export const drawPurpleCrystalField = (ctx, camX, camY) => {
  CRYSTALS.forEach(({ x, y, size }) => {
    const drawX = x - camX;
    const drawY = y - camY;

    // Draw multi-faceted crystal polygon (5 faces)
    const height = size * 2.5;
    const width = size * 1.5;

    ctx.save();

    // Define vertices for a jagged 3D-ish crystal shape
    const vertices = [
      { x: drawX, y: drawY - height },               // tip top
      { x: drawX - width * 0.5, y: drawY - height * 0.5 },
      { x: drawX - width * 0.3, y: drawY },
      { x: drawX + width * 0.3, y: drawY },
      { x: drawX + width * 0.5, y: drawY - height * 0.5 },
    ];

    // Main crystal body - base color
    ctx.fillStyle = '#6a2ea0';
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Add shading - simulate 3D facets by drawing polygons on each side with different colors
    ctx.fillStyle = '#7e3fba'; // lighter purple facet
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[1].x, vertices[1].y);
    ctx.lineTo(vertices[2].x, vertices[2].y);
    ctx.lineTo(vertices[0].x, vertices[0].y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#4a1f70'; // darker purple facet
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[4].x, vertices[4].y);
    ctx.lineTo(vertices[3].x, vertices[3].y);
    ctx.lineTo(vertices[0].x, vertices[0].y);
    ctx.closePath();
    ctx.fill();

    // Highlight edges
    ctx.strokeStyle = 'rgba(230, 200, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    vertices.forEach((v, i) => {
      if (i === 0) ctx.moveTo(v.x, v.y);
      else ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();
    ctx.stroke();

    // Small highlight near the tip to simulate light reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(drawX - width * 0.1, drawY - height * 0.9);
    ctx.lineTo(drawX, drawY - height);
    ctx.lineTo(drawX + width * 0.1, drawY - height * 0.9);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  });
};

export const drawFloatingRockRings = (ctx, camX, camY) => {
  FLOATING_ROCK_RINGS.forEach(ring => {
    const { x, y, mainWidth, mainHeight, cracks, glowSpots, pieces } = ring;
    const drawX = x - camX;
    const drawY = y - camY;

    ctx.save();
    ctx.translate(drawX, drawY);

    const rockColor = "#4c3951ff";
    const crackColor = "#ffcc33";

    // ---- Main rock platform ----
    ctx.beginPath();
    ctx.moveTo(-mainWidth / 2, 0);
    ctx.lineTo(mainWidth / 2, 0);
    ctx.lineTo(mainWidth * 0.45, mainHeight);
    ctx.lineTo(-mainWidth * 0.45, mainHeight);
    ctx.closePath();
    ctx.fillStyle = rockColor;
    ctx.fill();

    // ---- Cracks ----
    ctx.strokeStyle = crackColor;
    ctx.lineWidth = 4;
    cracks.forEach(cr => {
      ctx.beginPath();
      ctx.moveTo(cr.x1, cr.y1);
      ctx.lineTo(cr.x2, cr.y2);
      ctx.stroke();
    });

    // ---- Glow spots ----
    ctx.fillStyle = crackColor;
    glowSpots.forEach(gs => {
      ctx.beginPath();
      ctx.ellipse(gs.x, gs.y, gs.rx, gs.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // ---- Floating pieces ----
    ctx.fillStyle = rockColor;
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x - p.w / 2, p.y - p.h / 2);
      ctx.lineTo(p.x + p.w / 2, p.y - p.h / 2);
      ctx.lineTo(p.x + p.w / 2, p.y + p.h / 2);
      ctx.lineTo(p.x - p.w / 2, p.y + p.h / 2);
      ctx.closePath();
      ctx.fill();
    });

    // ---- Glow spots on pieces ----
    ctx.fillStyle = crackColor;
    pieces.forEach(p => {
      if (p.glow) {
        p.glow.forEach(gs => {
          ctx.beginPath();
          ctx.ellipse(p.x + gs.offsetX, p.y + gs.offsetY, gs.rx, gs.ry, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

    ctx.restore();
  });
};

export const drawCyberpunkElevatorDoor = (ctx, camX, camY, door) => {
  ELEVATOR.forEach(door => {
    const { x, y, width, height } = door;

    const drawX = x - camX;
    const drawY = y - camY;

    ctx.save();
    ctx.translate(drawX, drawY);

    // === FRAME ===
    const frameGrad = ctx.createLinearGradient(0, 0, width, 0);
    frameGrad.addColorStop(0, "#1a1a1a");
    frameGrad.addColorStop(0.5, "#333333");
    frameGrad.addColorStop(1, "#1a1a1a");

    ctx.fillStyle = frameGrad;
    ctx.fillRect(0, 0, width, height);

    // === DOOR PANELS ===
    const panelWidth = width / 2 - 4;
    const panelGrad = ctx.createLinearGradient(0, 0, 0, height);
    panelGrad.addColorStop(0, "#555");
    panelGrad.addColorStop(0.4, "#2e2e2e");
    panelGrad.addColorStop(0.6, "#2e2e2e");
    panelGrad.addColorStop(1, "#444");

    // Left panel
    ctx.fillStyle = panelGrad;
    ctx.fillRect(2, 12, panelWidth, height - 12);

    // Right panel
    ctx.fillStyle = panelGrad;
    ctx.fillRect(width / 2 + 2, 12, panelWidth, height - 12);

    // === LIGHT STRIPS ===
    const neonGrad = ctx.createLinearGradient(0, 0, 0, height);
    neonGrad.addColorStop(0, "rgba(0, 255, 255, 0.9)");
    neonGrad.addColorStop(1, "rgba(0, 150, 255, 0.3)");

    ctx.fillStyle = neonGrad;
    ctx.fillRect(width / 2 - 3, 12, 2, height - 12);
    ctx.fillRect(width / 2 + 1, 12, 2, height - 12);

    const dirtGrad = ctx.createLinearGradient(0, height - 20, 0, height);
    dirtGrad.addColorStop(0, "rgba(50, 40, 30, 0)");
    dirtGrad.addColorStop(1, "rgba(30, 20, 10, 0.8)");
    ctx.fillStyle = dirtGrad;
    ctx.fillRect(0, height - 20, width, 20);

    ctx.restore();
  });
};

export const drawVendingMachine = (ctx, camX, camY) => {
  VENDING_MACHINES.forEach(machine => {
    const { x, y, width, height } = machine;
    const drawX = x - camX;
    const drawY = y - camY;

    ctx.save();

    // Frame
    ctx.fillStyle = "#222222";
    ctx.fillRect(drawX, drawY, width, height);

    // Neon border
    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 4;
    ctx.strokeRect(drawX + 2, drawY + 2, width - 4, height - 4);

    // Glass panel
    ctx.fillStyle = "rgba(0,255,255,0.15)";
    ctx.fillRect(drawX + 10, drawY + 10, width - 20, height - 80);

    // Product slots
    ctx.fillStyle = "#ff69b4";
    const slotWidth = (width - 30) / 3;
    const slotHeight = 25;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        ctx.fillRect(
          drawX + 15 + col * (slotWidth + 2),
          drawY + 15 + row * (slotHeight + 5),
          slotWidth - 4,
          slotHeight
        );
      }
    }

    // Keypad
    ctx.fillStyle = "#444";
    ctx.fillRect(drawX + width - 35, drawY + 15, 25, 45);
    ctx.fillStyle = "#bbb";
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        ctx.fillRect(
          drawX + width - 32 + c * 12,
          drawY + 18 + r * 14,
          8,
          8
        );
      }
    }

    // Coin slot
    ctx.fillStyle = "#666";
    ctx.fillRect(drawX + width - 30, drawY + 85, 20, 5);

    // Item tray
    ctx.fillStyle = "#111";
    ctx.fillRect(drawX + 10, drawY + height - 25, width - 20, 15);
    ctx.strokeStyle = "#555";
    ctx.strokeRect(drawX + 10, drawY + height - 25, width - 20, 15);

    ctx.restore();
  });
};

export const drawLightPosts = (ctx, camX, camY) => {
  LIGHT_POSTS.forEach(post => {
    const drawX = post.x - camX;
    const drawY = post.y - camY;

    const postOffset = 150;

    ctx.save();

    const drawPost = () => {
      // Pole
      ctx.fillStyle = '#555';
      ctx.fillRect(drawX, drawY - post.height, 8, post.height);

      // Decorative Ring
      ctx.fillStyle = '#777';
      ctx.fillRect(drawX - 2, drawY - post.height + 15, 12, 3);

      // Lamp Head
      ctx.beginPath();
      ctx.arc(drawX + 4, drawY - post.height, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#fffa9e';
      ctx.fill();
      ctx.strokeStyle = '#ffaa33';
      ctx.stroke();

      // Lamp Glow
      const gradient = ctx.createRadialGradient(drawX + 4, drawY - post.height, 5, drawX + 4, drawY - post.height, 30);
      gradient.addColorStop(0, 'rgba(255, 250, 158, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 250, 158, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(drawX + 4, drawY - post.height, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Left, Right and Middle Post
    drawPost();
    ctx.translate(postOffset, 0);
    drawPost();
    ctx.translate(-postOffset, 0);

    // Bench in the middle (if enabled)
    if (post.bench) {
      const benchWidth = postOffset - 50;
      const benchHeight = 8;

      // Seat + Backrest
      ctx.fillStyle = '#774c24';
      ctx.fillRect(drawX + postOffset / 2 - benchWidth / 2, drawY - 15, benchWidth, benchHeight);

      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(drawX + postOffset / 2 - benchWidth / 2, drawY - 28, benchWidth, 10);

      // Legs
      ctx.fillStyle = '#6e6d6dff';
      ctx.fillRect(drawX + postOffset / 2 - benchWidth / 2 + 4, drawY - 7, 4, 7);
      ctx.fillRect(drawX + postOffset / 2 + benchWidth / 2 - 8, drawY - 7, 4, 7);
    }

    ctx.restore();
  });
};

export const drawCyberpunkFactory = (ctx, camX, camY) => {
  CYBER_FACTORY.forEach(factory => {
    const drawX = factory.x - camX;
    const drawY = factory.y - camY;

    ctx.save();

    // Base steel body
    const gradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + factory.height);
    gradient.addColorStop(0, '#323131ff'); // light silver
    gradient.addColorStop(1, '#434343ff'); // darker bottom
    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, factory.width, factory.height);

    // Steel outline
    ctx.strokeStyle = '#a0a0a0';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, factory.width, factory.height);

    // Smokestacks
    const stackCount = 5;
    const stackWidth = 14;
    const stackHeight = 40;
    ctx.fillStyle = '#999999';
    for (let i = 0; i < stackCount; i++) {
      const sx = drawX + 15 + i * 30;
      const sy = drawY - stackHeight;
      ctx.fillRect(sx, sy, stackWidth, stackHeight);
      
      // Smoke puff
      ctx.fillStyle = 'rgba(200,200,200,0.5)';
      ctx.beginPath();
      ctx.arc(sx + stackWidth / 2, sy - 10, 10 + Math.random() * 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // === CONVEYOR BELT ===
    const beltY = drawY + factory.height - 15;
    const beltHeight = 8;
    ctx.fillStyle = '#444444';
    ctx.fillRect(drawX + 10, beltY, factory.width - 20, beltHeight);

    const stripeWidth = 10;
    const offset = (Date.now() % stripeWidth) * 2;
    ctx.fillStyle = '#bbbbbb';
    for (let s = -offset; s < factory.width; s += stripeWidth * 2) {
      ctx.fillRect(drawX + 10 + s, beltY, stripeWidth, beltHeight);
    }

    // Small industrial windows
    const topGap = 15;    
    const bottomGap = 20; 
    const leftGap = 10;
    const rightGap = 8;

    const usableHeight = factory.height - topGap - bottomGap;
    const usableY = drawY + topGap;
    const usableWidth = factory.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    // === WARM WINDOWS IN GRID ===
    const cols = Math.floor(usableWidth / 22);
    const rows = Math.floor(usableHeight / 20);
    const panelWidth = 10;
    const panelHeight = 12;
    const paddingX = 6;
    const paddingY = 8;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() < 0.3) continue;
        const wx = usableX + i * 22 + paddingX;
        const wy = usableY + j * 20 + paddingY;
        ctx.fillStyle = '#ffcc66';
        ctx.globalAlpha = 0.85 + Math.random() * 0.15;
        ctx.fillRect(wx, wy, panelWidth, panelHeight);
        ctx.globalAlpha = 1;
      }
    }
    
    ctx.restore();
  });
};

export const drawDataTower = (ctx, camX, camY, tick) => {
  DATA_TOWERS.forEach(tower => {
    const drawX = tower.x - camX;
    const drawY = tower.y - camY;

    ctx.save();

    // === BASE TOWER BODY ===
    const gradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + tower.height);
    gradient.addColorStop(0, '#0a0a0f'); // top dark
    gradient.addColorStop(1, '#1a1a2e'); // bottom dark-blue
    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, tower.width, tower.height);

    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX, drawY, tower.width, tower.height);

    // === DEFINE USABLE AREA ===
    const topGap = 20;    
    const bottomGap = 20; 
    const leftGap = 8;
    const rightGap = 8;

    const usableHeight = tower.height - topGap - bottomGap;
    const usableY = drawY + topGap;
    const usableWidth = tower.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    // === SERVER RACK PANELS ===
    const rows = Math.floor(usableHeight / 16);
    for (let j = 0; j < rows; j++) {
      const py = usableY + j * 16 + 2;

      // random color lights for rack
      const colors = ['#00ffcc', '#ff00ff', '#00ccff', '#ffcc00'];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.7 + Math.random() * 0.3;
      ctx.fillRect(usableX, py, usableWidth, 8);
      ctx.globalAlpha = 1;
    }

    // === DATA STREAMS (animated light strips) ===
    for (let i = 0; i < 3; i++) {
      const streamX = drawX + 5 + i * (tower.width / 3);
      const offset = (tick * 2 + i * 20) % tower.height;
      ctx.strokeStyle = `rgba(0,255,255,0.3)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(streamX, drawY - offset);
      ctx.lineTo(streamX, drawY + tower.height - offset);
      ctx.stroke();
    }

    // === BLINKING ANTENNA LIGHT ===
    if (Math.floor(tick / 30) % 2 === 0) {
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(drawX + tower.width / 2, drawY - 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });
};

export const drawWallTerminal = (ctx, camX, camY) => {
  WALL_TERMINALS.forEach(terminal => {
    const drawX = terminal.x - camX;
    const drawY = terminal.y - camY;

    const tick = Date.now();

    ctx.save();

    // === TERMINAL BODY ===
    const gradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + terminal.height);
    gradient.addColorStop(0, '#202025'); // dark metal top
    gradient.addColorStop(1, '#101015'); // darker bottom
    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, terminal.width, terminal.height);

    // Metallic border
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, terminal.width, terminal.height);

    // === USABLE AREA (like your building code) ===
    const topGap = terminal.height * 0.08;
    const bottomGap = terminal.height * 0.08;
    const leftGap = terminal.width * 0.07;
    const rightGap = terminal.width * 0.07;

    const usableHeight = terminal.height - topGap - bottomGap;
    const usableY = drawY + topGap;
    const usableWidth = terminal.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    const isNear = terminal.isNear;
    const isAccessed = terminal.isAccessed;

    // === MAIN SCREEN ===
    const screenHeight = Math.floor(usableHeight * 0.7);
    ctx.fillStyle = '#001f1f';
    ctx.fillRect(usableX, usableY, usableWidth, screenHeight);

    // Flicker effect
    if (Math.random() < 0.04) {
      ctx.fillStyle = 'rgba(0,255,255,0.2)';
      ctx.fillRect(usableX, usableY, usableWidth, screenHeight);
    }

    // === STATUS TEXT ABOVE SCREEN ===
    ctx.font = '10px monospace';
    ctx.fillStyle = '#0ff';
    ctx.globalAlpha = 1;
    
    // If accessed, override to special mode
    if (isNear && !isAccessed) {
      ctx.fillText(`> SYSTEM UNLOCKED`, usableX + 124, usableY + 10);
      ctx.fillText(`> JUMP TO ACCESS DATA`, usableX + 124, usableY + 28);      
    } else if (isNear && isAccessed) {
      ctx.fillText(`> DATA DOWNLOADED`, usableX + 124, usableY + 14);
      ctx.fillText(`> GOOD LUCK!`, usableX + 124, usableY + 28);
    } else {
      ctx.fillText(`> STANDBY MODE`, usableX + 104, usableY + 12);
      ctx.fillText(`> DATA: ###`, usableX + 104, usableY + 24);
    }

    // === BUTTON PANEL ===
    const buttonY = usableY + screenHeight + 6;
    const buttonRows = 1;
    const buttonCols = 3;
    const buttonW = usableWidth / buttonCols - 4;
    const buttonH = 12;

    for (let r = 0; r < buttonRows; r++) {
      for (let c = 0; c < buttonCols; c++) {
        ctx.fillStyle = ['#ff0066', '#00ffcc', '#ffcc00'][Math.floor(Math.random() * 3)];
        ctx.globalAlpha = 0.75 + Math.random() * 0.25;
        const bx = usableX + c * (buttonW + 5);
        const by = buttonY + r * (buttonH + 4);
        ctx.fillRect(bx, by, buttonW, buttonH);
      }
    }
    ctx.globalAlpha = 1;

    // === SMALL HOLOGRAM PROJECTOR ===
    ctx.fillStyle = '#333333';
    const projX = drawX + terminal.width / 2 - 6;
    const projY = drawY - 8;
    ctx.fillRect(projX, projY, 12, 8);

    // Hologram light
    ctx.fillStyle = `rgba(0,255,255,${0.3 + Math.sin(tick / 20) * 0.2})`;
    ctx.beginPath();
    ctx.arc(drawX + terminal.width / 2, drawY - 15, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
};

export const drawNeonTubes = (ctx, camX, camY) => {
  NEON_TUBES.forEach(tube => {
    const drawX1 = tube.x1 - camX;
    const drawY1 = tube.y1 - camY;
    const drawX2 = tube.x2 - camX;
    const drawY2 = tube.y2 - camY;

    // Tick for animation
    const tick = Date.now();

    // Flicker: small, quick brightness changes
    const flicker = 0.85 + Math.sin(tick / 80 + tube.seed) * 0.15 
                  + (Math.random() * 0.05);

    ctx.save();

    // Core color and glow
    ctx.strokeStyle = tube.color;
    ctx.shadowColor = tube.color;
    ctx.shadowBlur = 15; // glow radius

    // Tube body
    ctx.lineWidth = tube.thickness;
    ctx.globalAlpha = flicker;
    ctx.beginPath();
    ctx.moveTo(drawX1, drawY1);
    ctx.lineTo(drawX2, drawY2);
    ctx.stroke();

    // Inner bright core (hot center)
    ctx.shadowBlur = 0;
    ctx.lineWidth = (tube.thickness || 4) / 2;
    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = flicker * 0.6;
    ctx.beginPath();
    ctx.moveTo(drawX1, drawY1);
    ctx.lineTo(drawX2, drawY2);
    ctx.stroke();

    ctx.globalAlpha = 1;

    ctx.restore();
  });
};

export const drawDigitalBillboard = (ctx, camX, camY) => {
  BILLBOARDS.forEach(board => {
    const drawX = board.x - camX;
    const drawY = board.y - camY;

    const tick = Date.now();

    ctx.save();

    // === Billboard Frame ===
    ctx.fillStyle = '#111111';
    ctx.fillRect(drawX - 4, drawY - 4, board.width + 8, board.height + 8);

    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 3;
    ctx.strokeRect(drawX - 4, drawY - 4, board.width + 8, board.height + 8);

    // === Screen Background (gradient sweep) ===
    const gradient = ctx.createLinearGradient(
      drawX, drawY,
      drawX + board.width, drawY
    );
    const offset = (tick / 800) % 1;
    gradient.addColorStop(offset, board.color1);
    gradient.addColorStop((offset + 0.5) % 1, board.color2);
    gradient.addColorStop((offset + 1) % 1, board.color1);

    ctx.shadowColor = board.colorGlow;
    ctx.shadowBlur = 20;
    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, board.width, board.height);
    ctx.shadowBlur = 0;

    // === Scanlines Effect ===
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    for (let y = 0; y < board.height; y += 2) {
      ctx.fillRect(drawX, drawY + y, board.width, 1);
    }

    // === Random Glitch Bars ===
    if (Math.random() < 0.05) {
      ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.2})`;
      const gy = drawY + Math.random() * board.height;
      const gh = 2 + Math.random() * 4;
      ctx.fillRect(drawX, gy, board.width, gh);
    }

    // === Tropical Neon Text ===
    const fontSize = board.fontSize || 18;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.fillStyle = '#ffffff'; // solid white main text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textX = drawX + board.width / 2 + 4;
    const textY = drawY + board.height / 2;

    // Draw text normally first
    ctx.fillText(board.message, textX, textY);

    // === Neon Outline Animation ===
    const neonGradient = ctx.createLinearGradient(drawX, drawY, drawX + board.width, drawY);
    neonGradient.addColorStop(0, '#ff0080'); // pink
    neonGradient.addColorStop(0.5, '#fffd7f'); // yellow
    neonGradient.addColorStop(1, '#00ffe5'); // aqua

    ctx.strokeStyle = neonGradient;
    ctx.lineWidth = 2; // pulsing line width
    ctx.strokeText(board.message, textX, textY);

    // Reset
    ctx.shadowBlur = 0;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';

    ctx.restore();
  });
};

export const drawATMUnits = (ctx, camX, camY) => {
  ATM_UNITS.forEach(atm => {
    const drawX = atm.x - camX;
    const drawY = atm.y - camY;
    const tick = Date.now();

    ctx.save();

    // === ATM BODY ===
    const bodyGradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + atm.height);
    bodyGradient.addColorStop(0, '#22252b');
    bodyGradient.addColorStop(1, '#111317');
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(drawX, drawY, atm.width, atm.height);

    // Metallic edges
    ctx.strokeStyle = '#999999';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, atm.width, atm.height);

    // === USABLE AREA ===
    const topGap = 10;
    const bottomGap = 12;
    const leftGap = 8;
    const rightGap = 8;
    const usableHeight = atm.height - topGap - bottomGap;
    const usableY = drawY + topGap;
    const usableWidth = atm.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    // === SCREEN ===
    const screenHeight = Math.floor(usableHeight * 0.4);
    ctx.fillStyle = '#001a1a';
    ctx.fillRect(usableX, usableY, usableWidth, screenHeight);

    // Screen glow
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 15 + Math.sin(tick / 300) * 3;
    ctx.fillStyle = '#00f0f0';
    ctx.globalAlpha = 0.15;
    ctx.fillRect(usableX, usableY, usableWidth, screenHeight);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // === CARD SLOT ===
    const slotY = usableY + screenHeight + 6;
    ctx.fillStyle = '#333333';
    ctx.fillRect(usableX + usableWidth / 2 - 15, slotY, 30, 4);

    // Slot glow (when active)
    ctx.fillStyle = `rgba(0,255,255,${0.4 + Math.sin(tick / 150) * 0.3})`;
    ctx.fillRect(usableX + usableWidth / 2 - 15, slotY, 30, 4);

    // === CASH DISPENSER ===
    const cashY = slotY + 14;
    ctx.fillStyle = '#222222';
    ctx.fillRect(usableX + usableWidth / 2 - 18, cashY, 36, 6);

    // ATM Text
    ctx.fillStyle = `rgba(0,255,255,${0.6 + Math.sin(tick / 150) * 0.3})`;
    ctx.fillText('ATM', usableX + usableWidth / 2 - 15, slotY + 30, 30, 4);

    // === SIDE NEON TRIM ===
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#00f0f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    ctx.lineTo(drawX, drawY + atm.height);
    ctx.moveTo(drawX + atm.width, drawY);
    ctx.lineTo(drawX + atm.width, drawY + atm.height);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Reset
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';

    ctx.restore();
  });
};

export const drawDroneStations = (ctx, camX, camY) => {
  const now = Date.now();

  DRONE_STATIONS.forEach(station => {
    const drawX = station.x - camX;
    const drawY = station.y - camY;

    ctx.save();

    // Station base
    ctx.fillStyle = '#222';
    ctx.fillRect(drawX, drawY, station.width, station.height);

    // Neon outline glow
    ctx.strokeStyle = station.color;
    ctx.shadowColor = station.color;
    ctx.shadowBlur = 15;
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, station.width, station.height);
    ctx.shadowBlur = 0;

    // Margins
    const topGap = 10;
    const bottomGap = 15;
    const leftGap = 8;
    const rightGap = 8;

    const usableHeight = station.height - topGap - bottomGap;
    const usableY = drawY + topGap;

    const usableWidth = station.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    // Charging port background
    ctx.fillStyle = '#111';
    ctx.fillRect(usableX, usableY, usableWidth, usableHeight);

    // Charging socket neon animation
    const pulse = (Math.sin(now * 0.01) + 1) / 2; // 0–1 oscillation
    const pulseColor = station.color;
    ctx.fillStyle = pulseColor;
    ctx.globalAlpha = 0.4 + pulse * 0.6;
    ctx.fillRect(usableX + 10, usableY + 10, usableWidth - 20, usableHeight - 20);
    ctx.globalAlpha = 1;

    // Optional: animated "energy lines"
    for (let i = 0; i < 3; i++) {
      const offset = (now * 0.05 + i * 30) % (usableHeight - 20);
      ctx.strokeStyle = pulseColor;
      ctx.globalAlpha = 0.3 + pulse * 0.4;
      ctx.beginPath();
      ctx.moveTo(usableX + 12, usableY + 10 + offset);
      ctx.lineTo(usableX + usableWidth - 12, usableY + 10 + offset);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Label text
    ctx.font = '10px monospace';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(`Drone Dock ${station.id}`, drawX + station.width / 2, drawY - 5);

    ctx.restore();
  });
};

export const drawPowerPanels = (ctx, camX, camY) => {
  const now = Date.now();
  
  POWER_PANELS.forEach(panel => {
    const drawX = panel.x - camX;
    const drawY = panel.y - camY;
    const panelRight = drawX + panel.width;
    const panelBottom = drawY + panel.height;

    ctx.save();

    // ===== BASE PANEL =====
    ctx.fillStyle = '#0d0d15';
    ctx.fillRect(drawX, drawY, panel.width, panel.height);
    
    // ===== NEON BORDER (Pulsing) =====
    ctx.shadowColor = panel.color;
    ctx.shadowBlur = 8 + 2 * Math.sin(now * 0.003);
    ctx.strokeStyle = panel.color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX + 1, drawY + 1, panel.width - 2, panel.height - 2);
    ctx.shadowBlur = 0;

    // ===== TOP BAR ELEMENTS =====
    const topBarY = drawY + 20;
    
    // 1. Energy Reading (Top Left) - Digital Font
    ctx.font = 'bold 9px "Segment7", monospace';
    ctx.fillStyle = panel.color;
    ctx.textAlign = 'left';
    ctx.fillText(`${Math.floor(15000 + Math.sin(now * 0.01) * 500)}W`, drawX + 10, topBarY);
    
    // 2. Power Level Bars (Top Right)
    const powerLevel = 0.7 + Math.sin(now * 0.005) * 0.3; // Animated 40-100%
    const barWidth = 40;
    const barX = panelRight - barWidth - 10;

    // ===== GLOWING SCREEN FRAME =====
    const screenX = drawX + 7;
    const screenY = drawY + 35;
    const screenWidth = panel.width - 20;
    const screenHeight = 40;
    
    // Screen glow (radial gradient)
    const gradient = ctx.createRadialGradient(
      drawX, screenY + screenHeight/2, 5,
      drawX, screenY + screenHeight/2, screenWidth/2
    );
    gradient.addColorStop(0, panel.color);
    gradient.addColorStop(1, panel.color);
    ctx.fillStyle = gradient;
    ctx.fillRect(screenX, screenY, screenWidth, screenHeight);
    
    // Screen border
    ctx.strokeStyle = panel.color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = panel.color;
    ctx.shadowBlur = 10;
    ctx.strokeRect(screenX, screenY, screenWidth, screenHeight);
    
    // Background
    ctx.fillStyle = '#ffffff10';
    ctx.fillRect(barX, topBarY - 6, barWidth, 8);
    
    // Active Bar
    ctx.fillStyle = panel.color;
    ctx.fillRect(barX, topBarY - 6, barWidth * powerLevel, 8);
    
    // ===== DIGITAL INTERFACE (Below Power Bar) =====
    const interfaceY = topBarY + 27;
    
    // Status Line 1
    ctx.font = 'bold 8px "Courier New", monospace';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText(`VOLT: ${(480 + Math.sin(now * 0.02) * 10).toFixed(1)}V`, drawX + 10, interfaceY);
    
    // Status Line 2 (Flickering)
    ctx.globalAlpha = 0.9 + Math.sin(now * 0.1) * 0.1;
    ctx.fillText(`CURR: ${(12.5 + Math.sin(now * 0.015) * 2.3).toFixed(2)}A`, drawX + 10, interfaceY + 12);
    ctx.globalAlpha = 1;
    
    // Status Line 3 (Critical)
    const fault = Math.sin(now * 0.05) > 0.8;
    ctx.fillStyle = fault ? '#ff0000' : '#00ff00';
    ctx.fillText(`STATUS: ${fault ? 'FAULT' : 'NOMINAL'}`, drawX + 10, interfaceY + 24);

    // ===== HAZARD LIGHT (Top Center) =====
    if (fault) {
      ctx.beginPath();
      ctx.arc(drawX + panel.width / 2, drawY - 6, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.shadowColor = '#ff0000';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  });
};

export const drawCableJunctionBoxes = (ctx, camX, camY) => {
  const now = Date.now();

  CABLE_JUNCTION_BOXES.forEach(box => {
    const drawX = box.x - camX;
    const drawY = box.y - camY;

    ctx.save();

    // Outer shell
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(drawX, drawY, box.width, box.height);

    // Neon glow border
    ctx.strokeStyle = box.cableGlow;
    ctx.shadowColor = box.cableGlow;
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, box.width, box.height);
    ctx.shadowBlur = 0;

    // Margins for internal layout
    const topGap = 10;
    const bottomGap = 10;
    const leftGap = 8;
    const rightGap = 8;

    const usableHeight = box.height - topGap - bottomGap;
    const usableY = drawY + topGap;

    const usableWidth = box.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    // Inner panel
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(usableX, usableY, usableWidth, usableHeight);

    // Decorative inner neon rails
    ctx.strokeStyle = box.cableGlow;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(usableX, usableY + usableHeight / 2);
    ctx.lineTo(usableX + usableWidth, usableY + usableHeight / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(usableX + usableWidth / 2, usableY);
    ctx.lineTo(usableX + usableWidth / 2, usableY + usableHeight);
    ctx.stroke();

    // Cables emerging from bottom
    const spacing = usableWidth / (box.cableCount + 1);
    for (let i = 0; i < box.cableCount; i++) {
      const cx = usableX + spacing * (i + 1);
      const cy = usableY + usableHeight;

      // Outer neon sheath
      ctx.shadowColor = box.cableGlow;
      ctx.shadowBlur = 6;
      ctx.strokeStyle = box.cableGlow;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + 18 + Math.sin(now * 0.004 + i) * 2);
      ctx.stroke();

      // Inner dark core
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + 18 + Math.sin(now * 0.004 + i) * 2);
      ctx.stroke();
    }

    // Small glowing indicator light
    const blink = (Math.sin(now * 0.01) + 1) / 2; // 0 to 1
    ctx.beginPath();
    ctx.arc(drawX + box.width - 8, drawY + 8, 3, 0, Math.PI * 2);
    ctx.fillStyle = box.cableGlow;
    ctx.globalAlpha = 0.5 + blink * 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();
  });
};

export const drawPhoneBooths = (ctx, camX, camY) => {
  const now = Date.now();

  PHONE_BOOTHS.forEach(booth => {
    const drawX = booth.x - camX;
    const drawY = booth.y - camY;

    ctx.save();

    // Booth frame
    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(drawX, drawY, booth.width, booth.height);

    // Neon glow outline
    ctx.strokeStyle = booth.glow;
    ctx.shadowColor = booth.glow;
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, booth.width, booth.height);
    ctx.shadowBlur = 0;

    // Top light panel (sign)
    const signHeight = 20;
    ctx.fillStyle = '#111';
    ctx.fillRect(drawX, drawY, booth.width, signHeight);
    ctx.font = '10px monospace';
    ctx.fillStyle = booth.glow;
    ctx.textAlign = 'center';
    ctx.fillText('PHONE', drawX + booth.width / 2, drawY + 14);

    // Phone interior layout
    const topGap = signHeight + 10;
    const bottomGap = 20;
    const leftGap = 10;
    const rightGap = 10;

    const usableHeight = booth.height - topGap - bottomGap;
    const usableY = drawY + topGap;

    const usableWidth = booth.width - leftGap - rightGap;
    const usableX = drawX + leftGap;

    // Screen
    const screenHeight = 30;
    ctx.fillStyle = '#000';
    ctx.fillRect(usableX, usableY, usableWidth, screenHeight);
    ctx.shadowColor = booth.screenGlow;
    ctx.shadowBlur = 6;
    ctx.fillStyle = booth.screenGlow;
    ctx.globalAlpha = 0.8 + 0.2 * Math.sin(now * 0.005);
    ctx.fillRect(usableX, usableY, usableWidth, screenHeight);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Keypad
    ctx.fillStyle = '#444';
    const keyRows = 4;
    const keyCols = 3;
    const keyW = usableWidth / keyCols - 2;
    const keyH = (usableHeight - screenHeight - 8) / keyRows - 2;

    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        ctx.fillRect(
          usableX + c * (keyW + 2),
          usableY + screenHeight + 4 + r * (keyH + 2),
          keyW,
          keyH
        );
      }
    }

    // Handset cord (animated sway)
    const cordX = usableX + usableWidth + 4;
    const cordY = usableY + 10;
    ctx.strokeStyle = booth.glow;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      ctx.lineTo(
        cordX + Math.sin(now * 0.005 + i) * 2,
        cordY + i * 4
      );
    }
    ctx.stroke();

    // Handset (simple rectangle)
    ctx.fillStyle = '#111';
    ctx.fillRect(cordX - 5, cordY + 38, 12, 30);

    ctx.restore();
  });
};

export const drawJunctionTowers = (ctx, camX, camY) => {
  JUNCTION_TOWERS.forEach(tower => {
    const drawX = tower.x - camX;
    const drawY = tower.y - camY;

    ctx.save();

    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.filter = 'none';

    // Base tower color
    ctx.strokeStyle = '#87877cff'; // dull galvanized steel
    ctx.lineWidth = 3;

    // Vertical main beams
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + tower.height);
    ctx.lineTo(drawX, drawY);
    ctx.moveTo(drawX + tower.width, drawY + tower.height);
    ctx.lineTo(drawX + tower.width, drawY);
    ctx.stroke();

    // Crossbeams
    ctx.lineWidth = 2;
    for (let i = 0; i <= tower.height; i += 25) {
      ctx.beginPath();
      ctx.moveTo(drawX, drawY + i);
      ctx.lineTo(drawX + tower.width, drawY + i);
      ctx.stroke();
    }

    // Diagonal braces for stability
    ctx.lineWidth = 1.5;
    for (let i = 0; i < tower.height; i += 25) {
      ctx.beginPath();
      ctx.moveTo(drawX, drawY + i);
      ctx.lineTo(drawX + tower.width, drawY + i + 25);
      ctx.moveTo(drawX + tower.width, drawY + i);
      ctx.lineTo(drawX, drawY + i + 25);
      ctx.stroke();
    }

    // Insulators (top crossbeam)
    const insulatorCount = 3;
    const beamY = drawY;
    for (let i = 0; i < insulatorCount; i++) {
      const ix = drawX + 10 + i * ((tower.width - 20) / (insulatorCount - 1));
      ctx.fillStyle = '#4a3b2b'; // ceramic brown
      ctx.beginPath();
      ctx.arc(ix, beamY - 8, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Power cables (simulate sag)
    ctx.strokeStyle = '#2c2c2c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(drawX + 10, beamY - 8);
    ctx.quadraticCurveTo(drawX + tower.width / 2, beamY + 20, drawX + tower.width - 10, beamY - 8);
    ctx.stroke();

    // Rust accents
    ctx.strokeStyle = 'rgba(90,40,20,0.3)';
    ctx.lineWidth = 1;
    for (let r = 0; r < 6; r++) {
      const rx = drawX + Math.random() * tower.width;
      const ry = drawY + Math.random() * tower.height;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx, ry + 8);
      ctx.stroke();
    }

    ctx.restore();
  });
};

export const drawTransformerBoxes = (ctx, camX, camY) => {
  const now = Date.now();

  TRANSFORMER_BOXES.forEach(box => {
    const drawX = box.x - camX;
    const drawY = box.y - camY;
    
    const margin = 8; // Uniform spacing

    ctx.save();

    // Main box body
    const gradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + box.height);
    gradient.addColorStop(0, '#777777ff');
    gradient.addColorStop(0.5, '#5f5f5fff');
    gradient.addColorStop(1, '#9f9797ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, box.width, box.height);

    // Metal edges for depth
    ctx.strokeStyle = '#353535ff';
    ctx.lineWidth = 4;
    ctx.strokeRect(drawX + 2, drawY + 2, box.width - 4, box.height - 4);

    // === OPERATIONAL DETAILS ===
    // Status lights (animated)
    const lightStates = [
      { color: '#00ff00', active: true }, // Power OK
      { color: '#ffff00', active: Math.sin(now * 0.005) > 0 }, // Activity
      { color: '#ff0000', active: Math.sin(now * 0.001) > 0 } // Fault
    ];
    lightStates.forEach((light, i) => {
      ctx.fillStyle = light.active ? light.color : '#444';
      ctx.beginPath();
      ctx.arc(drawX + 15 + i * 10, drawY + box.height - 15, 3, 0, Math.PI * 2);
      ctx.fill();
      if (light.active) {
        ctx.shadowColor = light.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // === INDUSTRIAL LABELING ===
    // High-voltage warning (professional design)
    const labelWidth = 40;
    const labelHeight = 24;
    const labelX = drawX + box.width - margin - labelWidth;
    const labelY = drawY + margin;
    
    // Black/yellow hazard border
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
    ctx.fillStyle = '#000';
    ctx.fillRect(labelX + 2, labelY + 2, labelWidth - 4, labelHeight - 4);
    
    // Warning text
    ctx.font = 'bold 8px "Arial Narrow"';
    ctx.fillStyle = '#ffcc00';
    ctx.textAlign = 'center';
    ctx.fillText('DANGER', labelX + labelWidth/2, labelY + 12);
    ctx.font = 'bold 6px "Arial Narrow"';
    ctx.fillText('15,000V', labelX + labelWidth/2, labelY + 20);

    // === VENTILATION SYSTEM === 
    // Precision louver array (top)
    const louverCount = 3;
    const louverHeight = 4;
    ctx.fillStyle = '#1a1a1a';
    for (let i = 0; i < louverCount; i++) {
      const louverY = drawY + margin + i * 8;
      ctx.fillRect(
        drawX + margin,
        louverY + louverHeight,
        box.width - margin * 10,
        louverHeight
      );
    }

    ctx.restore();
  });
};

export const drawIndustrialLightPoles = (ctx, camX, camY) => {
  const now = Date.now();

  INDUSTRIAL_LIGHT_POLES.forEach(pole => {
    const drawX = pole.x - camX;
    const drawY = pole.y - camY;

    ctx.save();

    // Pole base
    ctx.fillStyle = '#4a4d44';
    ctx.fillRect(drawX - 4, drawY - pole.height, 8, pole.height);

    // Crossbar
    ctx.fillStyle = '#3a3c35';
    ctx.fillRect(drawX - 25, drawY - pole.height, 50, 5);

    // Lamp casings
    const lampPositions = [-20, 20]; // left and right
    lampPositions.forEach(offsetX => {
      const lampX = drawX + offsetX;
      const lampY = drawY - pole.height;

      // Lamp housing
      ctx.fillStyle = '#55584d';
      ctx.fillRect(lampX - 6, lampY - 12, 12, 12);

      // Lamp glass (dull yellow)
      ctx.fillStyle = '#d4b25f';
      ctx.beginPath();
      ctx.arc(lampX, lampY - 6, 5, 0, Math.PI * 2);
      ctx.fill();

      // Faint light spill
      const flicker = 0.6 + Math.sin((now / 150) + lampX) * 0.1;
      const gradient = ctx.createRadialGradient(
        lampX, lampY - 6, 0,
        lampX, lampY - 6, 60
      );
      gradient.addColorStop(0, `rgba(212,178,95,${0.3 * flicker})`);
      gradient.addColorStop(1, 'rgba(212,178,95,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(lampX, lampY - 6, 60, 0, Math.PI * 2);
      ctx.fill();
    });

    // Base mounting plate
    ctx.fillStyle = '#2f312b';
    ctx.fillRect(drawX - 6, drawY - 4, 12, 8);

    ctx.restore();
  });
};

export const drawOilStations = (ctx, camX, camY) => {
  const now = Date.now();
  
  OIL_STATIONS.forEach(station => {
    const drawX = station.x - camX;
    const drawY = station.y - camY;
    const padHeight = 10;

    ctx.save();

    // Ground base pad
    ctx.fillStyle = '#4a4a42';
    ctx.fillRect(drawX, drawY, station.width, station.height);

    // Expansion joints with wear
    ctx.strokeStyle = '#5a5a52';
    ctx.lineWidth = 2;
    for (let x = drawX + 50; x < drawX + station.width - 30; x += 70) {
      ctx.beginPath();
      ctx.moveTo(x, drawY);
      ctx.lineTo(x, drawY + padHeight);
      // Add joint wear effect
      ctx.strokeStyle = '#6a6a62';
      ctx.stroke();
      ctx.strokeStyle = '#3a3a32';
      ctx.beginPath();
      ctx.moveTo(x + 2, drawY + 2);
      ctx.lineTo(x + 2, drawY + padHeight - 2);
      ctx.stroke();
    }

    // === MAIN PUMP HOUSING ===
    const housingWidth = station.width * 0.6;
    
    // === INDUSTRIAL PUMPS ===
    const pumpWidth = 50;
    for (let i = 0; i < 2; i++) {
      const px = drawX + 30 + i * (housingWidth - 60);
      const py = drawY - 60;

      // Pump body (heavy cast iron)
      ctx.fillStyle = '#2a2b26';
      ctx.fillRect(px, py, pumpWidth, 60);
      
      // Bolted flanges
      ctx.fillStyle = '#4a4b44';
      ctx.fillRect(px - 5, py + 10, pumpWidth + 10, 10);
      ctx.fillRect(px - 5, py + 40, pumpWidth + 10, 10);
      
      // Bolt heads
      ctx.fillStyle = '#5a5b54';
      for (let b = 0; b < 4; b++) {
        ctx.beginPath();
        ctx.arc(px + 10 + b * (pumpWidth - 20)/3, py + 15, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px + 10 + b * (pumpWidth - 20)/3, py + 45, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pressure gauges
      ctx.fillStyle = '#1a1a16';
      ctx.beginPath();
      ctx.arc(px + pumpWidth/2, py - 10, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Gauge needle
      ctx.save();
      ctx.translate(px + pumpWidth/2, py - 10);
      ctx.rotate(Math.PI * 0.3 + Math.sin(now * 0.005 + i) * 0.4);
      ctx.fillStyle = '#ff3333';
      ctx.fillRect(0, -1, 6, 2);
      ctx.restore();
    }

    // Fuel pumps (3)
    for (let i = 0; i < 3; i++) {
      const px = drawX + 30 + i * 60;
      const py = drawY + 20;
      ctx.fillStyle = '#4a4d44';
      ctx.fillRect(px, py, 20, 40); // Pump body
      ctx.fillStyle = '#2f312b';
      ctx.fillRect(px + 4, py + 4, 12, 20); // Display screen
      ctx.fillStyle = '#5c5f55';
      ctx.fillRect(px + 2, py + 28, 16, 8); // Hose connector
    }

    // Small control booth
    ctx.fillStyle = '#4d4f45';
    ctx.fillRect(drawX + station.width - 50, drawY - 30, 40, 30);
    ctx.fillStyle = '#2f312b';
    ctx.fillRect(drawX + station.width - 44, drawY - 24, 12, 12); // window

    ctx.restore();
  });
};

export const drawServiceSheds = (ctx, camX, camY) => {
  SERVICE_SHEDS.forEach(shed => {
    const drawX = shed.x - camX;
    const drawY = shed.y - camY;

    ctx.save();

    // Shed base walls
    ctx.fillStyle = '#4d4f45';
    ctx.fillRect(drawX, drawY, shed.width, shed.height);

    // Slanted roof
    ctx.fillStyle = '#5f6155';
    ctx.beginPath();
    ctx.moveTo(drawX - 5, drawY);
    ctx.lineTo(drawX + shed.width + 5, drawY);
    ctx.lineTo(drawX + shed.width, drawY - 15);
    ctx.lineTo(drawX, drawY - 15);
    ctx.closePath();
    ctx.fill();

    // Roof rust accents
    ctx.strokeStyle = '#7a4b2a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(drawX, drawY - 5);
    ctx.lineTo(drawX + shed.width, drawY - 5);
    ctx.stroke();

    // Door (centered front)
    const doorWidth = shed.width * 0.4;
    const doorX = drawX + (shed.width - doorWidth) / 2;
    ctx.fillStyle = '#3a3c34';
    ctx.fillRect(doorX, drawY + shed.height - 50, doorWidth, 50);

    // Door handle
    ctx.fillStyle = '#bbbbbb';
    ctx.fillRect(doorX + doorWidth - 8, drawY + shed.height - 28, 4, 4);

    // Small vent/window
    ctx.fillStyle = '#2f312b';
    ctx.fillRect(drawX + shed.width - 20, drawY + 10, 14, 10);

    // Metal panel lines
    ctx.strokeStyle = '#3e4037';
    ctx.lineWidth = 1;
    for (let i = 10; i < shed.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(drawX + i, drawY);
      ctx.lineTo(drawX + i, drawY + shed.height);
      ctx.stroke();
    }

    ctx.restore();
  });
};

export const drawCableReels = (ctx, camX, camY) => {
  CABLE_REELS.forEach(reel => {
    const drawX = reel.x - camX;
    const drawY = reel.y - camY;

    ctx.save();

    // Outer wooden discs
    ctx.fillStyle = '#6a5a3c';
    ctx.beginPath();
    ctx.arc(drawX, drawY, reel.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(drawX + reel.radius * 1.5, drawY, reel.radius, 0, Math.PI * 2);
    ctx.fill();

    // Connecting planks between discs
    ctx.fillStyle = '#5a4a33';
    ctx.beginPath();
    ctx.moveTo(drawX, drawY - reel.radius);
    ctx.lineTo(drawX + reel.radius * 1.5, drawY - reel.radius);
    ctx.lineTo(drawX + reel.radius * 1.5, drawY + reel.radius);
    ctx.lineTo(drawX, drawY + reel.radius);
    ctx.closePath();
    ctx.fill();

    // Cable coils (simplified arcs)
    ctx.strokeStyle = reel.cableColor;
    ctx.lineWidth = 6;
    for (let r = reel.radius - 8; r > 8; r -= 6) {
      ctx.beginPath();
      ctx.arc(drawX + reel.radius * 0.75, drawY, r, Math.PI * 0.1, Math.PI * 1.9);
      ctx.stroke();
    }

    // Loose cable end
    ctx.beginPath();
    ctx.moveTo(drawX + reel.radius * 1.5, drawY + 10);
    ctx.lineTo(drawX + reel.radius * 2.2, drawY + 20);
    ctx.stroke();

    ctx.restore();
  });
};

export const drawHighVoltageFences = (ctx, camX, camY) => {
  HIGH_VOLTAGE_FENCES.forEach(fence => {
    const drawX = fence.x - camX;
    const drawY = fence.y - camY;

    ctx.save();

    // Fence frame
    ctx.fillStyle = '#555';
    ctx.fillRect(drawX, drawY, fence.width, 6); // top bar
    ctx.fillRect(drawX, drawY + fence.height - 6, fence.width, 6); // bottom bar
    ctx.fillRect(drawX, drawY, 6, fence.height); // left post
    ctx.fillRect(drawX + fence.width - 6, drawY, 6, fence.height); // right post

    // Chain-link mesh
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= fence.width; i += 8) {
      ctx.moveTo(drawX + i, drawY);
      ctx.lineTo(drawX + i, drawY + fence.height);
    }
    for (let j = 0; j <= fence.height; j += 8) {
      ctx.moveTo(drawX, drawY + j);
      ctx.lineTo(drawX + fence.width, drawY + j);
    }
    ctx.stroke();

    // Barbed wire (optional)
    const barbY = drawY - 6;
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < fence.width; i += 12) {
      ctx.moveTo(drawX + i, barbY);
      ctx.lineTo(drawX + i + 6, barbY - 4);
      ctx.moveTo(drawX + i + 6, barbY - 4);
      ctx.lineTo(drawX + i + 12, barbY);
    }
    ctx.stroke();

    // Danger sign
    const signWidth = 50;
    const signHeight = 22;
    const signX = drawX + fence.width / 2 - signWidth / 2;
    const signY = drawY + fence.height / 2 - signHeight / 2;
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(signX, signY, signWidth, signHeight);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(signX, signY, signWidth, signHeight);

    ctx.font = '8px monospace';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('DANGER', signX + signWidth / 2, signY + 10);
    ctx.fillText('HIGH VOLT', signX + signWidth / 2, signY + 18);

    ctx.restore();
  });
};

export const drawMaintenanceLockers = (ctx, camX, camY) => {
  const now = Date.now();
  
  MAINTENANCE_LOCKERS.forEach(locker => {
    const drawX = locker.x - camX;
    const drawY = locker.y - camY;
    const lockerHeight = locker.height;
    const lockerWidth = locker.width;

    ctx.save();

    // === REINFORCED BODY ===
    // Main locker shell with metal texture
    const metalGradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + lockerHeight);
    metalGradient.addColorStop(0, locker.color);
    metalGradient.addColorStop(0.5, '#3a3a3a');
    metalGradient.addColorStop(1, locker.color);
    ctx.fillStyle = metalGradient;
    ctx.fillRect(drawX, drawY, lockerWidth, lockerHeight);

    // Corner reinforcements
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 4;
    ctx.strokeRect(drawX + 1, drawY + 1, lockerWidth - 2, lockerHeight - 2);
    
    // Rivet details
    ctx.fillStyle = '#666';
    const rivetPositions = [
      [drawX + 5, drawY + 5], [drawX + lockerWidth - 5, drawY + 5],
      [drawX + 5, drawY + lockerHeight - 5], [drawX + lockerWidth - 5, drawY + lockerHeight - 5]
    ];
    rivetPositions.forEach(pos => {
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // === VENTILATION SYSTEM ===
    // Perforated steel vent panel
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(drawX + 10, drawY + 15, lockerWidth - 20, 30);
    
    // Vent holes (precision array)
    ctx.fillStyle = '#333';
    const holeRadius = 1.5;
    const holeSpacing = 6;
    for (let y = drawY + 20; y < drawY + 40; y += holeSpacing) {
      for (let x = drawX + 15; x < drawX + lockerWidth - 15; x += holeSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, holeRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // === SECURITY HARDWARE ===
    // Heavy-duty latch assembly
    const latchX = drawX + lockerWidth - 15;
    const latchY = drawY + lockerHeight / 2 - 10;
    
    // Mounting plate
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(latchX - 5, latchY - 3, 15, 26);
    
    // Lock body
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.roundRect(latchX, latchY, 8, 20, [0, 0, 3, 3]);
    ctx.fill();
    
    // Shackle (U-shaped)
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(latchX + 4, latchY - 2, 6, Math.PI * 0.8, Math.PI * 0.2);
    ctx.stroke();
    
    // Handle with grip texture
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.roundRect(drawX + lockerWidth - 25, latchY + 5, 6, 10, [3, 3, 3, 3]);
    ctx.fill();
    // Grip ridges
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    for (let y = latchY + 7; y < latchY + 13; y += 2) {
      ctx.beginPath();
      ctx.moveTo(drawX + lockerWidth - 25, y);
      ctx.lineTo(drawX + lockerWidth - 19, y);
      ctx.stroke();
    }

    // === WEATHERING EFFECTS ===
    // Rust streaks
    ctx.strokeStyle = 'rgba(120, 60, 30, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(
        drawX + 10 + Math.random() * (lockerWidth - 20),
        drawY + 5
      );
      ctx.lineTo(
        drawX + 10 + Math.random() * (lockerWidth - 20),
        drawY + lockerHeight - 15
      );
      ctx.stroke();
    }

    ctx.restore();
  });
};

export const drawIndustryBuildings = (ctx, camX, camY) => {
  const now = Date.now();

  INDUSTRY_BUILDINGS.forEach(building => {
    const drawX = building.x - camX;
    const drawY = building.y - camY;

    ctx.save();

    // Base building
    ctx.fillStyle = building.color;
    ctx.fillRect(drawX, drawY, building.width, building.height);

    // Slight shading for depth
    const grad = ctx.createLinearGradient(drawX, drawY, drawX + building.width, drawY);
    grad.addColorStop(0, '#6e7062');
    grad.addColorStop(1, building.color);
    ctx.fillStyle = grad;
    ctx.fillRect(drawX, drawY, building.width, building.height);

    // Roof line
    ctx.fillStyle = '#555';
    ctx.fillRect(drawX, drawY - 8, building.width, 8);

    // Windows (rows)
    const rows = 4;
    const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = drawX + 20 + c * ((building.width - 40) / cols);
        const wy = drawY + 20 + r * ((building.height - 40) / rows);
        const windowLit = Math.random() > 0.7; // some random lights on
        ctx.fillStyle = windowLit ? '#f2f2a0' : '#2b2b2b';
        ctx.fillRect(wx, wy, 20, 12);
      }
    }

    // Side vertical pipes
    ctx.fillStyle = '#444';
    ctx.fillRect(drawX - 10, drawY, 8, building.height); // left pipe
    ctx.fillRect(drawX + building.width + 2, drawY, 8, building.height); // right pipe

    // Rooftop vents
    ctx.fillStyle = '#555';
    ctx.fillRect(drawX + 40, drawY - 20, 20, 12);
    ctx.fillRect(drawX + 100, drawY - 20, 20, 12);

    // Label (optional)
    ctx.font = '14px monospace';
    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    ctx.fillText('MAIN FACTORY', drawX + building.width / 2, drawY + building.height + 20);

    ctx.restore();
  });
};

export const drawSmokestacks = (ctx, camX, camY) => {
  const now = Date.now();

  SMOKESTACKS.forEach(stack => {
    const drawX = stack.x - camX;
    const drawY = stack.y - camY;

    ctx.save();

    // Stack body
    ctx.fillStyle = stack.color;
    ctx.fillRect(drawX, drawY, stack.width, stack.height);

    // Top rim
    ctx.fillStyle = '#333';
    ctx.fillRect(drawX - 2, drawY - 4, stack.width + 4, 4);

    // === ADVANCED SMOKE SIMULATION ===
    const smokeCount = 8; // More particles for density
    for (let i = 0; i < smokeCount; i++) {
      const particleSeed = i * 100; // Unique behavior per particle
      const t = (now / 400 + i * 0.2) % 1; // Slower lifecycle
  
      // Physics-based movement
      const windSpeed = 0.5 + Math.sin(now / 2000) * 0.3; // Variable wind
      const turbulence = Math.sin(now / 500 + particleSeed) * 2;
  
      // Particle properties
      const size = 18 + t * 40; // Grows then dissipates
      const offsetX = (windSpeed * t * 60) + (turbulence * t * 15);
      const smokeY = drawY - 15 - (t * 100); // Rises with gravity decay
      const swirl = Math.sin(t * 10 + particleSeed) * size * 0.3;
  
      // Volumetric coloring (temperature simulation)
      const heat = 1 - (t * 0.8); // Cool over time
      const r = 160 + Math.floor(95 * heat);
      const g = 160 + Math.floor(60 * heat);
      const b = 160;
      const alpha = (0.6 * (1 - t)) ** 2; // Quadratic fade
  
      // Turbulent distortion
      ctx.save();
      ctx.translate(
        drawX + stack.width / 2 + offsetX + swirl,
        smokeY
      );
      ctx.rotate(Math.sin(now / 300 + particleSeed) * 0.3);
  
      // Particle shape (organic noise)
      const noiseFactor = 0.15;
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        const radius = size * (50 + (Math.sin(a * 3 + now/200) * noiseFactor));
        const x = radius * Math.cos(a);
        const y = radius * Math.sin(a) * 1.3; // Vertical stretch
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
  
      // Gradient fill (denser core)
      const smokeGradient = ctx.createRadialGradient(
        0, 0, size * 0.3,
        0, 0, size
      );
      smokeGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`);
      smokeGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = smokeGradient;
      ctx.fill();
      ctx.restore();

      // Rising heat distortion
      if (t < 0.3) {
        ctx.filter = `blur(${1 + (1 - t/0.3) * 3}px)`;
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#fff';
        ctx.fillRect(
          drawX + stack.width / 2 - size/2 + offsetX,
          smokeY - size/2,
          size,
          size * 0.5
        );
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();
  });
};

export const drawCoolingFans = (ctx, camX, camY) => {
  const now = Date.now();

  COOLING_FANS.forEach(fan => {
    const drawX = fan.x - camX;
    const drawY = fan.y - camY;
    const centerX = drawX + fan.size / 2;
    const centerY = drawY + fan.size / 2;

    ctx.save();

    // Fan housing
    ctx.fillStyle = '#444';
    ctx.fillRect(drawX, drawY, fan.size, fan.size);

    // Inner shadow ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, fan.size / 2 - 4, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Blades (rotating)
    const angle = now * fan.speed;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.fillStyle = '#777';
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(fan.size * 0.35, -fan.size * 0.08);
      ctx.lineTo(fan.size * 0.35, fan.size * 0.08);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Grill lines
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    for (let r = 8; r < fan.size / 2; r += 8) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Vertical and horizontal grill bars
    ctx.beginPath();
    ctx.moveTo(centerX - fan.size / 2 + 4, centerY);
    ctx.lineTo(centerX + fan.size / 2 - 4, centerY);
    ctx.moveTo(centerX, centerY - fan.size / 2 + 4);
    ctx.lineTo(centerX, centerY + fan.size / 2 - 4);
    ctx.stroke();

    ctx.restore();
  });
};

export const drawFuelPumpStations = (ctx, camX, camY) => {
  const now = Date.now();

  FUEL_PUMP_STATIONS.forEach(pump => {
    const drawX = pump.x - camX;
    const drawY = pump.y - camY;
    const isActive = Math.random() > 0.98; // Random activation

    ctx.save();

    // === COMPACT BASE ===
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(drawX - 5, drawY + pump.height, pump.width + 10, 8); // Slimmer base
    
    // Mini oil stains
    for (let i = 0; i < 2; i++) {
      ctx.beginPath();
      ctx.arc(
        drawX + 10 + Math.random() * (pump.width - 20),
        drawY + pump.height + 4,
        3 + Math.random() * 5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(30, 30, 30, ${0.3 + Math.random() * 0.3})`;
      ctx.fill();
    }

    // === SCALED-DOWN PUMP BODY ===
    const bodyGradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + pump.height);
    bodyGradient.addColorStop(0, pump.bodyColor);
    bodyGradient.addColorStop(0.5, '#3a3a3a');
    bodyGradient.addColorStop(1, pump.bodyColor);
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(drawX, drawY, pump.width, pump.height);
    
    // Slimmer panel lines
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX + 1, drawY + 1, pump.width - 2, pump.height - 2);
    ctx.beginPath();
    ctx.moveTo(drawX + pump.width/2, drawY + 4);
    ctx.lineTo(drawX + pump.width/2, drawY + pump.height - 4);
    ctx.stroke();

    // === COMPACT DISPLAY ===
    ctx.fillStyle = '#0a2a0a';
    ctx.fillRect(drawX + 5, drawY + 10, pump.width - 10, 15); // Smaller display
    
    // Scaled-down price
    const price = (78.9 + Math.sin(now * 0.01) * 0.5).toFixed(2);
    ctx.font = 'bold 10px "Segment7", monospace'; // Smaller font
    ctx.fillStyle = isActive ? '#0f0' : '#0a5a0a';
    ctx.textAlign = 'right';
    ctx.fillText(`₹${price}`, drawX + pump.width - 8, drawY + 22); // Adjusted position

    // === TIGHT BUTTON LAYOUT ===
    const fuelTypes = ['REG', 'MID', 'PRE'];
    for (let i = 0; i < 3; i++) {
      const btnX = drawX + 5 + i * 15; // Tighter spacing
      ctx.fillStyle = pump.selectedGrade === i ? '#ff0' : '#333';
      ctx.fillRect(btnX, drawY + 32, 12, 8); // Smaller buttons
      ctx.font = 'bold 5px Arial'; // Smaller font
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(fuelTypes[i], btnX + 6, drawY + 38); // Adjusted position
    }

    // === MINI HOSE SYSTEM ===
    const reelAngle = isActive ? (now * 0.05 % Math.PI * 2) : Math.PI * 0.25;
    ctx.save();
    ctx.translate(drawX + pump.width - 10, drawY + 55); // Higher reel position
    ctx.rotate(reelAngle);
    
    // Smaller reel
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Thinner hose winding
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 1.8);
    ctx.stroke();
    ctx.restore();

    // Compact hose path
    const hoseSwing = isActive ? Math.sin(now * 0.01) * 8 : 0;
    ctx.beginPath();
    ctx.moveTo(drawX + pump.width - 10, drawY + 55);
    ctx.bezierCurveTo(
      drawX + pump.width + 15 + hoseSwing, drawY + 70,
      drawX + pump.width + 5 + hoseSwing, drawY + 85,
      drawX + pump.width - 15, drawY + pump.height + 3
    );
    ctx.lineWidth = 5; // Thinner hose
    ctx.strokeStyle = '#222';
    ctx.stroke();
    
    // Mini nozzle
    ctx.fillStyle = '#555';
    ctx.fillRect(drawX + pump.width - 20, drawY + pump.height - 2, 15, 8);
    ctx.fillStyle = isActive ? '#f00' : '#500';
    ctx.fillRect(drawX + pump.width - 17, drawY + pump.height, 9, 4);

    // === COMPACT STATUS LIGHTS ===
    const indicators = [
      { x: drawX + 10, color: isActive ? '#0f0' : '#030', label: 'RDY' },
      { x: drawX + pump.width - 10, color: pump.needsMaintenance ? '#f00' : '#300', label: 'WAI' }
    ];
    
    indicators.forEach(ind => {
      ctx.beginPath();
      ctx.arc(ind.x, drawY + pump.height - 10, 3, 0, Math.PI * 2); // Smaller LEDs
      ctx.fillStyle = ind.color;
      ctx.fill();
      
      // Micro labels
      ctx.font = 'bold 4px Arial';
      ctx.fillStyle = '#aaa';
      ctx.textAlign = 'center';
      ctx.fillText(ind.label, ind.x, drawY + pump.height - 15);
    });

    ctx.restore();
  });
};

export const drawOilDrumStacks = (ctx, camX, camY) => {
  const now = Date.now();

  OIL_DRUM_STACKS.forEach(stack => {
    const drumWidth = 40;
    const drumHeight = 50;

    ctx.save();

    for (let r = 0; r < stack.rows; r++) {
      for (let c = 0; c < stack.cols; c++) {
        const drawX = stack.x - camX + c * (drumWidth + 4);
        const drawY = stack.y - camY + r * (drumHeight + 4);

        // Barrel color variations
        const colors = ['#b22222', '#2f4f4f', '#8b4513'];
        const barrelColor = colors[(r + c) % colors.length];

        // Barrel body
        ctx.fillStyle = barrelColor;
        ctx.fillRect(drawX, drawY, drumWidth, drumHeight);

        // Top & bottom rims
        ctx.fillStyle = '#222';
        ctx.fillRect(drawX, drawY, drumWidth, 4); // top rim
        ctx.fillRect(drawX, drawY + drumHeight - 4, drumWidth, 4); // bottom rim

        // Center band
        ctx.fillStyle = '#111';
        ctx.fillRect(drawX, drawY + drumHeight / 2 - 2, drumWidth, 4);

        // Weathering effect (random scratches)
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          const sx = drawX + Math.random() * drumWidth;
          const sy = drawY + Math.random() * drumHeight;
          const ex = sx + Math.random() * 8 - 4;
          const ey = sy + Math.random() * 8 - 4;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }

        // Subtle oil sheen (moving highlight)
        const sheenX = (now / 20 + r * 10 + c * 15) % drumWidth;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.moveTo(drawX + sheenX, drawY);
        ctx.lineTo(drawX + sheenX, drawY + drumHeight);
        ctx.stroke();
      }
    }

    ctx.restore();
  });
};

export const drawPumpHouses = (ctx, camX, camY) => {
  const now = Date.now();

  PUMP_HOUSES.forEach(house => {
    const drawX = house.x - camX;
    const drawY = house.y - camY;

    ctx.save();

    // Base building
    ctx.fillStyle = house.color;
    ctx.fillRect(drawX, drawY, house.width, house.height);

    // Roof (slightly darker)
    ctx.fillStyle = '#444';
    ctx.fillRect(drawX, drawY - 10, house.width, 12);

    // Roof edge highlight
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY - 10, house.width, 12);

    // Door
    const doorWidth = 24;
    const doorHeight = 38;
    ctx.fillStyle = '#333';
    ctx.fillRect(drawX + house.width / 2 - doorWidth / 2, drawY + house.height - doorHeight, doorWidth, doorHeight);

    // Door handle
    ctx.fillStyle = '#999';
    ctx.beginPath();
    ctx.arc(drawX + house.width / 2 + 7, drawY + house.height - doorHeight / 2, 2, 0, Math.PI * 2);
    ctx.fill();

    // External pump body
    const pumpX = drawX + house.width + 8;
    const pumpY = drawY + house.height - 30;
    ctx.fillStyle = '#555';
    ctx.fillRect(pumpX, pumpY, 20, 28);

    // Pump hose (curved pipe)
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(pumpX + 20, pumpY + 14);
    ctx.quadraticCurveTo(pumpX + 35, pumpY + 10, pumpX + 35, pumpY - 10);
    ctx.stroke();

    // Gauge on pump
    ctx.beginPath();
    ctx.arc(pumpX + 10, pumpY - 8, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Animated gauge needle
    const angle = Math.sin(now / 500) * 0.8; // oscillate
    ctx.beginPath();
    ctx.moveTo(pumpX + 10, pumpY - 8);
    ctx.lineTo(pumpX + 10 + Math.cos(angle) * 5, pumpY - 8 + Math.sin(angle) * 5);
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Weathering streaks on the wall
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const sx = drawX + Math.random() * house.width;
      const sy = drawY + Math.random() * house.height;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx, sy + Math.random() * 8);
      ctx.stroke();
    }

    ctx.restore();
  });
};

export const drawMonorail = (ctx, camX, camY) => {
  const { track, train } = MONORAIL;
  const drawX = track.x - camX;
  const drawY = track.y - camY;

  ctx.save();

  // --- Beam top (concrete slab) ---
  ctx.fillStyle = '#5b5e54';
  ctx.fillRect(drawX, drawY, track.length, track.beamWidth);

  // --- Beam underside / side shading for depth ---
  const sideGrad = ctx.createLinearGradient(0, drawY + track.beamWidth, 0, drawY + track.beamWidth + track.beamDepth);
  sideGrad.addColorStop(0, '#4b4e45');
  sideGrad.addColorStop(1, '#3e4038');
  ctx.fillStyle = sideGrad;
  ctx.fillRect(drawX, drawY + track.beamWidth, track.length, track.beamDepth);

  // --- Pylons ---
  for (let px = 0; px <= track.length; px += track.pylonSpacing) {
    const baseX = drawX + px - track.pylonWidth / 2;
    const topY = drawY + track.beamWidth + track.beamDepth;
    // shaft
    ctx.fillStyle = '#4a4d44';
    ctx.fillRect(baseX, topY, track.pylonWidth, track.pylonHeight);
    // base footing
    ctx.fillStyle = '#3e4138';
    ctx.fillRect(baseX - 8, topY + track.pylonHeight, track.pylonWidth + 16, 10);
    // vertical seam
    ctx.strokeStyle = '#34362f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(baseX + track.pylonWidth / 2, topY + 6);
    ctx.lineTo(baseX + track.pylonWidth / 2, topY + track.pylonHeight - 6);
    ctx.stroke();
  }

  // --- Train ---
  const headXWorld = track.x + (train.head % (track.length + 400)); // wrap with cushion
  const headX = headXWorld - camX + 540;

  // total train length for wrapping math (not drawn here but useful)
  const carSpan = train.carWidth + train.gap;

  for (let i = 0; i < train.numCars; i++) {
    const carX = headX - i * carSpan;
    const carY = drawY - train.carHeight + 2; // sit slightly into the beam

    // car body
    ctx.fillStyle = train.bodyColor;
    ctx.fillRect(carX, carY, train.carWidth, train.carHeight);

    // rounded nose for the first car
    if (i === 0) {
      ctx.fillStyle = train.bodyColor;
      ctx.beginPath();
      ctx.moveTo(carX + train.carWidth, carY);
      ctx.lineTo(carX + train.carWidth, carY + train.carHeight);
      ctx.quadraticCurveTo(
        carX + train.carWidth + 14, carY + train.carHeight / 2,
        carX + train.carWidth, carY
      );
      ctx.closePath();
      ctx.fill();
    }

    // skirt that hugs the beam (covers wheels—straddle-beam look)
    ctx.fillStyle = train.skirtColor;
    ctx.fillRect(carX + 4, drawY - 4, train.carWidth - 8, 6);

    // window band
    const bandY = carY + 8;
    const bandH = 14;
    ctx.fillStyle = train.windowBand;
    ctx.fillRect(carX + 6, bandY, train.carWidth - 12, bandH);

    // spaced windows with some lit
    const wPad = 10;
    const wWidth = 10;
    const wGap = 8;
    for (let wx = carX + 8; wx < carX + train.carWidth - 18; wx += wWidth + wGap) {
      const lit = ((Math.floor(wx) + i) % 3) === 0; // deterministic variation
      ctx.fillStyle = lit ? train.windowLit : '#1c1d1b';
      ctx.fillRect(wx, bandY + 2, wWidth, bandH - 4);
    }

    // inter-car accordion (between this car and the next)
    if (i < train.numCars - 1) {
      const jointX = carX - train.gap + train.carWidth;
      ctx.fillStyle = '#494a46';
      ctx.fillRect(jointX, carY + 4, train.gap, train.carHeight - 8);
      // simple pleats
      ctx.strokeStyle = '#3c3d39';
      ctx.lineWidth = 1;
      for (let p = 1; p < 4; p++) {
        const xx = jointX + (p * train.gap) / 4;
        ctx.beginPath();
        ctx.moveTo(xx, carY + 4);
        ctx.lineTo(xx, carY + train.carHeight - 4);
        ctx.stroke();
      }
    }

    // headlight pulse on lead car
    if (i === 0) {
      const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(Date.now() * 0.008));
      ctx.fillStyle = `rgba(216,230,255,${pulse})`;
      ctx.beginPath();
      ctx.ellipse(carX + train.carWidth + 10, carY + train.carHeight / 2, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // subtle under-shadow onto beam side
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(carX + 2, drawY + track.beamWidth - 2, train.carWidth - 4, 3);
  }

  ctx.restore();
};

export const drawTicketCounter = (ctx, camX, camY) => {
  const c = TICKET_COUNTER;
  const drawX = c.x - camX;
  const drawY = c.y - camY;

  ctx.save();

  // --- Main body ---
  ctx.fillStyle = c.wallColor;
  ctx.fillRect(drawX, drawY - c.height, c.width, c.height);

  // --- Roof (corrugated) ---
  ctx.fillStyle = c.roofColor;
  ctx.fillRect(drawX - 6, drawY - c.height - 12, c.width + 12, 12);
  ctx.strokeStyle = '#3d3d34';
  ctx.lineWidth = 1;
  for (let i = drawX - 6; i < drawX + c.width + 6; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, drawY - c.height - 12);
    ctx.lineTo(i, drawY - c.height);
    ctx.stroke();
  }

  // --- Frame edges ---
  ctx.strokeStyle = c.frameColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(drawX, drawY - c.height, c.width, c.height);

  // --- Window ---
  const wX = drawX + 30;
  const wY = drawY - c.height + 28;
  const wW = 100;
  const wH = 40;
  ctx.fillStyle = c.windowFrame;
  ctx.fillRect(wX, wY, wW, wH);
  ctx.fillStyle = c.windowGlass;
  ctx.fillRect(wX + 4, wY + 4, wW - 8, wH - 8);

  // --- Sliding shutter (half open) ---
  ctx.fillStyle = c.shutterColor;
  ctx.fillRect(wX + wW / 2, wY + 4, (wW / 2) - 4, wH - 8);

  // --- Sign ---
  const signW = 80;
  const signH = 18;
  const signX = drawX + (c.width - signW) / 2;
  const signY = drawY - c.height - signH - 14;
  ctx.fillStyle = c.signBg;
  ctx.fillRect(signX, signY, signW, signH);
  ctx.fillStyle = '#e2e2d6';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(c.signText, signX + signW / 2, signY + signH / 2);

  // --- Base shadow ---
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(drawX, drawY, c.width, 4);

  ctx.restore();
};

export const drawExitBooths = (ctx, camX, camY) => {
  const now = Date.now();

  EXIT_BOOTHS.forEach(booth => {
    const drawX = booth.x - camX;
    const drawY = booth.y - camY;

    ctx.save();

    // Booth base
    ctx.fillStyle = booth.color;
    ctx.fillRect(drawX, drawY, booth.width, booth.height);

    // Roof overhang
    ctx.fillStyle = '#333';
    ctx.fillRect(drawX - 5, drawY - 8, booth.width + 10, 8);

    // Windows (3 panels)
    const winHeight = booth.height / 2.5;
    const winY = drawY + booth.height / 4;
    ctx.fillStyle = '#222';
    ctx.fillRect(drawX + 8, winY, booth.width - 16, winHeight);

    ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.fillRect(drawX + 8, winY, booth.width - 16, winHeight);

    // Hazard stripes on base
    const stripeHeight = 8;
    for (let i = 0; i < booth.width; i += 16) {
      ctx.fillStyle = (i / 16) % 2 === 0 ? '#ffcc00' : '#000';
      ctx.fillRect(drawX + i, drawY + booth.height - stripeHeight, 16, stripeHeight);
    }

    // Barrier arm (lowered)
    ctx.fillStyle = booth.barrierColor;
    ctx.fillRect(drawX + booth.width, drawY + booth.height / 2 - 4, 50, 8);

    // Barrier stripes
    for (let i = 0; i < 50; i += 12) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(drawX + booth.width + i, drawY + booth.height / 2 - 4, 6, 8);
    }

    // Beacon light on roof
    const blink = Math.sin(now * 0.01) > 0 ? 1 : 0.3;
    ctx.beginPath();
    ctx.arc(drawX + booth.width / 2, drawY - 12, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.globalAlpha = blink;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();
  });
};

export const drawMobileCranes = (ctx, camX, camY) => {
  const now = Date.now();

  MOBILE_CRANES.forEach(crane => {
    const drawX = crane.x - camX;
    const drawY = crane.y - camY;

    ctx.save();

    // Base / chassis
    ctx.fillStyle = '#444';
    ctx.fillRect(drawX, drawY, crane.width, crane.height);

    // Wheels
    ctx.fillStyle = '#222';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(drawX + 20 + i * (crane.width / 4), drawY + crane.height, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    // Rotating cabin
    ctx.fillStyle = crane.color;
    ctx.fillRect(drawX + crane.width * 0.35, drawY - 30, crane.width * 0.3, 30);

    // Cabin window
    ctx.fillStyle = '#333f4f';
    ctx.fillRect(drawX + crane.width * 0.38, drawY - 27, crane.width * 0.24, 24);

    // Boom arm
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(drawX + crane.width * 0.5, drawY - 15);
    ctx.lineTo(drawX + crane.width * 0.5 + crane.boomLength, drawY - crane.boomLength * 0.5);
    ctx.stroke();

    // Cable + swinging hook
    const swing = Math.sin(now * 0.004) * 8;
    const hookX = drawX + crane.width * 0.5 + crane.boomLength + swing;
    const hookY = drawY - crane.boomLength * 0.5 + 40;

    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(drawX + crane.width * 0.5 + crane.boomLength, drawY - crane.boomLength * 0.5);
    ctx.lineTo(hookX, hookY);
    ctx.stroke();

    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(hookX, hookY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
};

export const drawPipeBridges = (ctx, camX, camY) => {
  const now = Date.now();

  PIPE_BRIDGES.forEach(bridge => {
    const drawX = bridge.x - camX;
    const drawY = bridge.y - camY;

    ctx.save();

    // Steel support frame
    ctx.fillStyle = '#555';
    ctx.fillRect(drawX, drawY, bridge.length, 10); // top beam
    ctx.fillRect(drawX, drawY + bridge.height, bridge.length, 10); // bottom beam

    // Vertical posts
    for (let i = 0; i <= bridge.length; i += 50) {
      ctx.fillRect(drawX + i, drawY, 8, bridge.height + 10);
    }

    // Pipes inside bridge
    const pipeColors = ['#888', '#a66', '#777'];
    pipeColors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(drawX + 10, drawY + 15 + index * 15, bridge.length - 20, 10);
    });

    // Occasional steam puff from middle pipe
    if (Math.sin(now * 0.002) > 0.8) {
      const puffX = drawX + bridge.length / 2;
      const puffY = drawY + 25;
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.arc(puffX, puffY - (now % 100) / 5, 8 + Math.sin(now * 0.01) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  });
};

export const drawChemicalTanks = (ctx, camX, camY) => {
  CHEMICAL_TANK.forEach(tank => {
    const drawX = tank.x - camX;
    const drawY = tank.y - camY;

    ctx.save();

    // Tank body
    ctx.fillStyle = tank.color;
    ctx.fillRect(drawX - tank.radius, drawY, tank.radius * 2, tank.height);

    // Dome top
    ctx.beginPath();
    ctx.ellipse(drawX, drawY, tank.radius, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Outline
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX - tank.radius, drawY, tank.radius * 2, tank.height);

    // Access ladder (right side)
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 1.5;
    for (let y = 0; y < tank.height; y += 10) {
      ctx.beginPath();
      ctx.moveTo(drawX + tank.radius - 5, drawY + y);
      ctx.lineTo(drawX + tank.radius + 5, drawY + y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(drawX + tank.radius + 5, drawY);
    ctx.lineTo(drawX + tank.radius + 5, drawY + tank.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(drawX + tank.radius - 5, drawY);
    ctx.lineTo(drawX + tank.radius - 5, drawY + tank.height);
    ctx.stroke();

    // Top hatch
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(drawX, drawY - 5, 6, 0, Math.PI * 2);
    ctx.fill();

    // Warning label
    ctx.font = '10px monospace';
    ctx.fillStyle = '#ff3300';
    ctx.textAlign = 'center';
    ctx.fillText('HAZMAT', drawX, drawY + tank.height + 12);

    ctx.restore();
  });
};

export const drawControlContainers = (ctx, camX, camY) => {
  CONTROL_CONTAINERS.forEach(box => {
    const drawX = box.x - camX;
    const drawY = box.y - camY;

    ctx.save();

    // Base container
    ctx.fillStyle = box.color;
    ctx.fillRect(drawX, drawY, box.width, box.height);

    // Corrugated texture lines
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 1;
    for (let i = 4; i < box.width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(drawX + i, drawY);
      ctx.lineTo(drawX + i, drawY + box.height);
      ctx.stroke();
    }

    // Windows
    ctx.fillStyle = '#1a1f24';
    ctx.fillRect(drawX + 20, drawY + 20, 80, 30);
    ctx.fillRect(drawX + 110, drawY + 20, 70, 30);

    ctx.strokeStyle = '#222';
    ctx.strokeRect(drawX + 20, drawY + 20, 80, 30);
    ctx.strokeRect(drawX + 110, drawY + 20, 70, 30);

    // Roof railing
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    ctx.lineTo(drawX, drawY - 10);
    ctx.lineTo(drawX + box.width, drawY - 10);
    ctx.lineTo(drawX + box.width, drawY);
    ctx.stroke();

    // Antenna
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(drawX + box.width / 2, drawY - 10);
    ctx.lineTo(drawX + box.width / 2, drawY - 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(drawX + box.width / 2, drawY - 33, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#999';
    ctx.fill();

    ctx.restore();
  });
};

export const drawMaintenanceCarts = (ctx, camX, camY) => {
  MAINTENANCE_CARTS.forEach(cart => {
    const drawX = cart.x - camX;
    const drawY = cart.y - camY;

    ctx.save();

    // Cart base
    ctx.fillStyle = '#333';
    ctx.fillRect(drawX, drawY, cart.width, cart.height);

    // Side rails
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    ctx.lineTo(drawX, drawY - 10);
    ctx.lineTo(drawX + cart.width, drawY - 10);
    ctx.lineTo(drawX + cart.width, drawY);
    ctx.stroke();

    // Wheels
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(drawX + 10, drawY + cart.height + 6, 6, 0, Math.PI * 2);
    ctx.arc(drawX + cart.width - 10, drawY + cart.height + 6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Toolbox
    ctx.fillStyle = '#884400';
    ctx.fillRect(drawX + 8, drawY - 20, 30, 18);
    ctx.strokeStyle = '#552200';
    ctx.strokeRect(drawX + 8, drawY - 20, 30, 18);

    // Gas cylinder
    ctx.fillStyle = '#006666';
    ctx.fillRect(drawX + cart.width - 20, drawY - 25, 12, 25);
    ctx.fillStyle = '#222';
    ctx.fillRect(drawX + cart.width - 18, drawY - 30, 8, 5);

    // Scattered tools
    ctx.fillStyle = '#999';
    ctx.fillRect(drawX + 50, drawY + 5, 10, 3); // wrench
    ctx.fillRect(drawX + 65, drawY + 8, 8, 3);  // screwdriver
    ctx.fillRect(drawX + 80, drawY + 3, 12, 3); // hammer head
    ctx.fillRect(drawX + 85, drawY, 2, 5);      // hammer handle

    ctx.restore();
  });
};

export const drawToolBenches = (ctx, camX, camY) => {
  TOOL_BENCHES.forEach(bench => {
    const drawX = bench.x - camX;
    const drawY = bench.y - camY;

    ctx.save();

    // Main bench body
    ctx.fillStyle = bench.color;
    ctx.fillRect(drawX, drawY, bench.width, bench.height);

    // Bench top
    ctx.fillStyle = '#222';
    ctx.fillRect(drawX, drawY - 8, bench.width, 8);

    // Drawers (3 columns)
    const drawerWidth = (bench.width - 20) / 3;
    ctx.fillStyle = '#666';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(drawX + 5 + i * (drawerWidth + 5), drawY + 10, drawerWidth, bench.height - 15);
      ctx.strokeStyle = '#333';
      ctx.strokeRect(drawX + 5 + i * (drawerWidth + 5), drawY + 10, drawerWidth, bench.height - 15);
    }

    // Pegboard for tools
    const pegboardHeight = 50;
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(drawX, drawY - pegboardHeight - 8, bench.width, pegboardHeight);

    // Pegboard holes
    ctx.fillStyle = '#111';
    for (let y = drawY - pegboardHeight - 6; y < drawY - 6; y += 6) {
      for (let x = drawX + 4; x < drawX + bench.width - 4; x += 6) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Tools hanging on pegboard
    ctx.fillStyle = '#999';
    ctx.fillRect(drawX + 15, drawY - pegboardHeight, 4, 20); // wrench
    ctx.fillRect(drawX + 30, drawY - pegboardHeight + 5, 2, 15); // screwdriver
    ctx.fillRect(drawX + 45, drawY - pegboardHeight + 2, 12, 4); // hammer head
    ctx.fillRect(drawX + 50, drawY - pegboardHeight + 2, 2, 18); // hammer handle

    // Items on bench
    ctx.fillStyle = '#777';
    ctx.fillRect(drawX + bench.width - 35, drawY - 15, 12, 7); // small metal box
    ctx.fillStyle = '#008080';
    ctx.beginPath();
    ctx.arc(drawX + bench.width - 15, drawY - 12, 5, 0, Math.PI * 2); // bottle/canister
    ctx.fill();

    ctx.restore();
  });
};

// Cave Stone Pillars
export const drawStonePillars = (ctx, camX, camY) => {
  PILLARS.forEach(pillar => {
    const drawX = pillar.x - camX;
    const drawY = pillar.y - camY;

    ctx.save();

    // Base pillar shape
    ctx.fillStyle = "#6b5c4a"; // rocky brown/gray
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    ctx.lineTo(drawX + pillar.width, drawY + 10);
    ctx.lineTo(drawX + pillar.width - 15, drawY + pillar.height);
    ctx.lineTo(drawX + 10, drawY + pillar.height - 5);
    ctx.closePath();
    ctx.fill();

    // Shading for depth
    const gradient = ctx.createLinearGradient(drawX, drawY, drawX + pillar.width, drawY);
    gradient.addColorStop(0, "#3e352c");
    gradient.addColorStop(1, "rgba(255,255,255,0.2)");
    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, pillar.width, pillar.height);

    ctx.restore();
  });
};

export const drawGuardianStatues = (ctx, camX, camY) => {
  GUARDIAN_STATUES.forEach(statue => {
    const { x, y, size, weapon } = statue;
    const drawX = x - camX;
    const drawY = y - camY;

    ctx.save();
    ctx.translate(drawX, drawY);
    ctx.fillStyle = "#aaa"; // stone-gray

    // Pedestal
    ctx.fillRect(-size * 0.5, size * 0.8, size, size * 0.3);

    // Legs
    ctx.fillRect(-size * 0.35, size * 0.5, size * 0.25, size * 0.3);
    ctx.fillRect(size * 0.1, size * 0.5, size * 0.25, size * 0.3);

    // Torso
    ctx.fillRect(-size * 0.4, 0, size * 0.8, size * 0.5);

    // Arms (blocky LEGO style)
    ctx.fillRect(-size * 0.55, 0.05 * size, size * 0.15, size * 0.35);
    ctx.fillRect(size * 0.4, 0.05 * size, size * 0.15, size * 0.35);

    // Head (blocky square)
    ctx.fillRect(-size * 0.25, -size * 0.3, size * 0.5, size * 0.3);

    // Helmet detail
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 3;
    ctx.strokeRect(-size * 0.25, -size * 0.3, size * 0.5, size * 0.3);

    // Eyes (carved squares)
    ctx.fillStyle = "#222";
    ctx.fillRect(-size * 0.12, -size * 0.2, size * 0.08, size * 0.08);
    ctx.fillRect(size * 0.04, -size * 0.2, size * 0.08, size * 0.08);

    // Weapon (attached to right hand)
    ctx.fillStyle = "#888";
    if (weapon === "sword") {
      ctx.fillRect(size * 0.55, -size * 0.2, size * 0.1, size * 0.7);
      ctx.fillRect(size * 0.5, -size * 0.25, size * 0.2, size * 0.1);
    } else if (weapon === "spear") {
      ctx.fillRect(size * 0.55, -size * 0.4, size * 0.08, size * 0.9);
      ctx.beginPath();
      ctx.moveTo(size * 0.59, -size * 0.6);
      ctx.lineTo(size * 0.45, -size * 0.4);
      ctx.lineTo(size * 0.73, -size * 0.4);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  });
};

export const drawCaveWaterfall = (ctx, camX, camY) => {
  WATERFALLS.forEach(waterfall => {
    const drawX = waterfall.x - camX;
    const drawY = waterfall.y - camY;

    // Waterfall stream (just a vertical fillRect, with some alpha for effect)
    const gradient = ctx.createLinearGradient(drawX, drawY, drawX, drawY + waterfall.height);
    gradient.addColorStop(0, "#ffd700");   // bright gold top
    gradient.addColorStop(0.5, "#debd04ff"); // goldenrod mid-tone
    gradient.addColorStop(1, "#fbdb22ff");   // darker gold bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(drawX, drawY, waterfall.width, waterfall.height);

    // Splash effect at bottom
    ctx.fillStyle = "rgba(255,255,200,0.7)";
    ctx.beginPath();
    ctx.ellipse(drawX + waterfall.width / 2, drawY + waterfall.height, waterfall.width - 100, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sparkle overlay (optional shimmer effect)
    for (let i = 0; i < 10; i++) {
      const sparkleX = drawX + Math.random() * waterfall.width;
      const sparkleY = drawY + Math.random() * waterfall.height;
      ctx.fillStyle = "rgba(255, 255, 200, 0.7)";
      ctx.fillRect(sparkleX, sparkleY, 2, 6);
    }
  });
};

export const drawGlowDecorations = (ctx, camX, camY) => {
  GLOW_DECORATIONS.forEach(deco => {
    const drawX = deco.x - camX;
    const drawY = deco.y - camY;

    // Glow effect (outer aura)
    const glow = ctx.createRadialGradient(
      drawX, drawY, 5,
      drawX, drawY, deco.glowRadius
    );
    glow.addColorStop(0, deco.glowColor);
    glow.addColorStop(1, "transparent");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(drawX, drawY, deco.glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Glow pulse effect
    const glowStrength = 0.8 + 0.4 * Math.sin(Date.now() / 300 + deco.x);

    // Outer glow
    ctx.shadowBlur = 25 * glowStrength;
    ctx.shadowColor = deco.glowColor;

    if (deco.type === "mushroom") {
      // Mushroom stem
      ctx.fillStyle = "#ddd";
      ctx.fillRect(drawX - deco.size * 0.2, drawY, deco.size * 0.4, deco.size);

      // Mushroom cap
      ctx.fillStyle = deco.color;
      ctx.beginPath();
      ctx.ellipse(drawX, drawY, deco.size, deco.size * 0.6, 0, Math.PI, 0);
      ctx.fill();
    } else if (deco.type === "crystal") {
      // Crystal ball
      ctx.fillStyle = deco.color;
      ctx.beginPath();
      ctx.ellipse(drawX, drawY, deco.size, deco.size, 0, Math.PI, 0);
      ctx.fill();
    }

    // Reset shadow to avoid affecting other drawings
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  });
};

export function drawEngravedWalls(ctx, camX, camY, time = Date.now()) {
  ENGRAVED_WALLS.forEach(wall => {
    const drawX = wall.x - camX;
    const drawY = wall.y - camY;

    // --- Stone slab base with bevel ---
    const slabGrad = ctx.createLinearGradient(drawX, drawY, drawX, drawY + wall.height);
    slabGrad.addColorStop(0, '#f5e7c1');
    slabGrad.addColorStop(1, '#f6e3b1ff');

    ctx.fillStyle = slabGrad;
    ctx.fillRect(drawX, drawY, wall.width, wall.height);

    // Bevel
    ctx.strokeStyle = '#b1b1b1ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX + 1, drawY + 1, wall.width - 2, wall.height - 2);
    ctx.strokeStyle = '#1f1c18';
    ctx.strokeRect(drawX + 3, drawY + 3, wall.width - 6, wall.height - 6);

    // Subtle noisy pores (seeded, tiny, cheap)
    const rng = makeRNG(wall.id * 99991);
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#464545ff';
    for (let i = 0; i < Math.floor((wall.width * wall.height) / 350); i++) {
      const px = drawX + 4 + Math.floor(rng() * (wall.width - 8));
      const py = drawY + 4 + Math.floor(rng() * (wall.height - 8));
      ctx.fillRect(px, py, 1, 1);
    }
    ctx.globalAlpha = 1;

    // --- Usable area (padding like your style) ---
    const topGap = 12, bottomGap = 12, leftGap = 12, rightGap = 12;
    const usableX = drawX + leftGap;
    const usableY = drawY + topGap;
    const usableW = wall.width - leftGap - rightGap;
    const usableH = wall.height - topGap - bottomGap;

    // Light edge chips
    drawEdgeChips(ctx, rng, drawX, drawY, wall.width, wall.height);

    // --- Engravings by style ---
    if (wall.style === 'hieroglyphs') {
      drawHieroglyphRows(ctx, rng, usableX, usableY, usableW, usableH);
    } else if (wall.style === 'cave') {
      drawCavePaint(ctx, rng, usableX, usableY, usableW, usableH);
    } else if (wall.style === 'runes') {
      drawRunePanel(ctx, rng, usableX, usableY, usableW, usableH, wall.glowColor || '#a3d5ff', time);
    }
  });
};

export const drawTorches = (ctx, camX, camY) => {
  TORCHES.forEach(torch => {
    const { x, y, scale } = torch;
    const drawX = x - camX;
    const drawY = y - camY;

    ctx.save();
    ctx.translate(drawX, drawY);
    ctx.scale(scale, scale);

    // --- Iron Bracket ---
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.rect(-6, 0, 12, 25); // vertical bracket
    ctx.rect(-15, 5, 30, 5); // cross mount
    ctx.fill();

    // --- Wooden Handle ---
    ctx.fillStyle = "#4b2e18";
    ctx.beginPath();
    ctx.rect(-4, -40, 8, 40);
    ctx.fill();

    // --- Torch Cup (holds fire) ---
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.moveTo(-10, -40);
    ctx.lineTo(10, -40);
    ctx.lineTo(6, -50);
    ctx.lineTo(-6, -50);
    ctx.closePath();
    ctx.fill();

    // --- Flame ---
    const flicker = Math.sin(Date.now() / 5 + drawX) * 2;
    const flameHeight = 35 + flicker;

    const gradient = ctx.createRadialGradient(0, -50, 5, 0, -50, flameHeight);
    gradient.addColorStop(0, "rgba(255,200,50,1)");
    gradient.addColorStop(0.4, "rgba(255,120,0,0.8)");
    gradient.addColorStop(1, "rgba(255,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, -55, 15, flameHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- Glow Effect ---
    const glow = ctx.createRadialGradient(0, -50, 10, 0, -50, 80);
    glow.addColorStop(0, "rgba(255,200,100,0.6)");
    glow.addColorStop(1, "rgba(255,200,100,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, -50, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
};

export function drawObelisks(ctx, camX, camY, playerX, playerY) {
  OBELISKS.forEach(o => {
    const drawX = o.x - camX;
    const drawY = o.y - camY;
    const rng = makeRNG(o.id * 1337);

    // Check if player is near this obelisk
    const playerDistance = Math.sqrt(
      Math.pow(playerX - (o.x + o.width/2), 2) + 
      Math.pow(playerY - (o.y + o.height/2), 2)
    );
    const isPlayerNear = playerDistance < 200;

    // pedestal sizes
    const baseW = o.width;
    const baseH = Math.max(16, Math.floor(o.height * 0.09));
    const shaftH = o.height - baseH;

    ctx.save();
    // rotate around base center for tilt
    ctx.translate(drawX + baseW / 2, drawY + o.height);
    ctx.rotate(o.tilt || 0);
    ctx.translate(-(drawX + baseW / 2), -(drawY + o.height));

    // --- PEDESTAL BASE ---
    const baseGrad = ctx.createLinearGradient(drawX, drawY + o.height - baseH, drawX, drawY + o.height);
    baseGrad.addColorStop(0, '#3b332b');
    baseGrad.addColorStop(1, '#2b2520');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(drawX, drawY + o.height - baseH, baseW, baseH);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.strokeRect(drawX + 0.5, drawY + o.height - baseH + 0.5, baseW - 1, baseH - 1);

    // --- SHAFT (slightly tapered trapezoid) ---
    const taper = 0.62; // top width fraction
    const topW = baseW * taper;
    const leftBottom = drawX;
    const rightBottom = drawX + baseW;
    const leftTop = drawX + (baseW - topW) / 2;
    const rightTop = leftTop + topW;
    const shaftTopY = drawY + o.height - baseH - shaftH;

    // broken cut line
    const isBroken = o.state === 'broken';
    const breakFrac = 0.18 + rng() * 0.2; // where it snapped from top
    const breakY = shaftTopY + shaftH * breakFrac;

    // stone gradient
    const stoneGrad = ctx.createLinearGradient(0, shaftTopY, 0, drawY + o.height - baseH);
    stoneGrad.addColorStop(0, '#5a5247');
    stoneGrad.addColorStop(1, '#3f382f');

    ctx.fillStyle = stoneGrad;
    ctx.beginPath();
    if (!isBroken) {
      // full shaft
      ctx.moveTo(leftTop,  shaftTopY);
      ctx.lineTo(rightTop, shaftTopY);
      ctx.lineTo(rightBottom, drawY + o.height - baseH);
      ctx.lineTo(leftBottom,  drawY + o.height - baseH);
      ctx.closePath();
      ctx.fill();
    } else {
      // shaft up to break
      const breakInset = 6 + rng() * 6;
      const bLeft = lerp(leftTop, leftBottom, breakFrac) + (rng() * 2 - 1) * 2;
      const bRight = lerp(rightTop, rightBottom, breakFrac) + (rng() * 2 - 1) * 2;

      ctx.moveTo(leftTop, shaftTopY);
      ctx.lineTo(rightTop, shaftTopY);
      ctx.lineTo(bRight, breakY);
      ctx.lineTo(bLeft, breakY);
      ctx.closePath();
      ctx.fill();

      // jagged fracture edge
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const jag = 6;
      for (let i = 0; i <= jag; i++) {
        const t = i / jag;
        const x = lerp(bLeft, bRight, t) + Math.sin(t * Math.PI * 3) * breakInset * 0.25;
        const y = breakY + Math.sin(t * Math.PI * 2) * 2;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // optional fallen tip on ground
      const tipH = (breakY - shaftTopY) * 0.9;
      const tipTopW = topW * 0.85;
      const tipLeft = leftTop + 10;
      const tipRight = tipLeft + tipTopW;
      const tipBottomY = shaftTopY + tipH;

      ctx.save();
      // drop it near base, rotated randomly
      const fx = drawX + baseW * (0.2 + rng() * 0.6);
      const fy = drawY + o.height - baseH - 4;
      ctx.translate(fx, fy);
      ctx.rotate(-0.7 + rng() * 0.4);
      ctx.fillStyle = stoneGrad;
      ctx.beginPath();
      ctx.moveTo(-tipTopW * 0.5, -tipH);
      ctx.lineTo(tipTopW * 0.5, -tipH);
      ctx.lineTo(tipTopW * 0.7, 0);
      ctx.lineTo(-tipTopW * 0.7, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // bevel strokes
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(leftTop + 1, shaftTopY + 1);
    ctx.lineTo(rightTop - 1, shaftTopY + 1);
    ctx.lineTo(rightBottom - 1, drawY + o.height - baseH - 1);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.moveTo(leftTop + 1, shaftTopY + 1);
    ctx.lineTo(leftBottom + 1, drawY + o.height - baseH - 1);
    ctx.stroke();

    // --- PYRAMIDION (tip) for intact only ---
    if (!isBroken) {
      const tipH = Math.max(18, shaftH * 0.12);
      const tipTopY = shaftTopY - tipH;
      const tipLeft = lerp(leftTop, leftBottom, -tipH / shaftH);
      const tipRight = lerp(rightTop, rightBottom, -tipH / shaftH);
      const tipMid = (tipLeft + tipRight) / 2;

      const tipGrad = ctx.createLinearGradient(0, tipTopY, 0, shaftTopY);
      tipGrad.addColorStop(0, '#6a5f50');
      tipGrad.addColorStop(1, '#4e453a');

      ctx.fillStyle = tipGrad;
      ctx.beginPath();
      ctx.moveTo(tipMid, tipTopY);
      ctx.lineTo(tipRight, shaftTopY);
      ctx.lineTo(tipLeft,  shaftTopY);
      ctx.closePath();
      ctx.fill();

      // glow pulse
      const glow = (0.25 + 0.25 * Math.sin(Date.now() / 450 + o.id)) * 1.0;
      ctx.save();
      ctx.shadowColor = o.tipGlowColor || '#ffe28a';
      ctx.shadowBlur = 20 + glow * 20;
      ctx.strokeStyle = o.tipGlowColor || '#ffe28a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tipMid, tipTopY);
      ctx.lineTo(tipRight, shaftTopY);
      ctx.lineTo(tipLeft, shaftTopY);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // --- ENGRAVING BANDS (seeded) ---
    if (o.engrave) {
      const bandCount = Math.max(3, Math.floor(shaftH / 70));
      for (let i = 0; i < bandCount; i++) {
        const ty = shaftTopY + (i + 1) * (shaftH / (bandCount + 1));
        const l = lerp(leftTop, leftBottom, (i + 1) / (bandCount + 1));
        const r = lerp(rightTop, rightBottom, (i + 1) / (bandCount + 1));
        drawGlyphBand(ctx, rng, l + 6, r - 6, ty, 10, 0.8);
      }
    }

    // --- ANCIENT EGYPTIAN MESSAGE (when player is near) ---
    if (isPlayerNear) {
      const message = o.message;
      const messageX = drawX + baseW / 2;
      const messageY = drawY - 80; // Position above obelisk
  
      ctx.save();
  
      // PAPYRUS SCROLL background
      const scrollWidth = 250;
      const scrollHeight = 90;
  
      // Papyrus texture gradient
      const papyrusGradient = ctx.createLinearGradient(
        messageX - scrollWidth/2, messageY,
        messageX + scrollWidth/2, messageY
      );
      papyrusGradient.addColorStop(0, '#f0e6d2');
      papyrusGradient.addColorStop(0.5, '#e8dcbe');
      papyrusGradient.addColorStop(1, '#f0e6d2');
  
      // Main scroll body
      ctx.fillStyle = papyrusGradient;
      ctx.beginPath();
      ctx.roundRect(messageX - scrollWidth/2, messageY - scrollHeight/2, scrollWidth, scrollHeight, 5);
      ctx.fill();
  
      // Papyrus texture - horizontal fibers
      ctx.strokeStyle = 'rgba(180, 160, 130, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < scrollHeight; i += 3) {
        ctx.beginPath();
        ctx.moveTo(messageX - scrollWidth/2 + 5, messageY - scrollHeight/2 + i);
        ctx.lineTo(messageX + scrollWidth/2 - 5, messageY - scrollHeight/2 + i);
        ctx.stroke();
      }
  
      // Aged edges and stains
      ctx.fillStyle = 'rgba(160, 140, 110, 0.2)';
      ctx.beginPath();
      ctx.roundRect(messageX - scrollWidth/2 + 2, messageY - scrollHeight/2 + 2, scrollWidth - 4, scrollHeight - 4, 4);
      ctx.fill();
  
      // Scroll rods (top and bottom)
      ctx.fillStyle = '#8b7e2bff'; // Dark wood color
      ctx.fillRect(messageX - scrollWidth/2 - 8, messageY - scrollHeight/2 - 4, 8, scrollHeight + 8);
      ctx.fillRect(messageX + scrollWidth/2, messageY - scrollHeight/2 - 4, 8, scrollHeight + 8);
  
      // Rod ends
      ctx.fillStyle = '#a5a65bff';
      ctx.beginPath();
      ctx.arc(messageX - scrollWidth/2 - 4, messageY - scrollHeight/2 - 4, 4, Math.PI, Math.PI * 1.5);
      ctx.arc(messageX - scrollWidth/2 - 4, messageY + scrollHeight/2 + 4, 4, Math.PI * 1.5, Math.PI * 2);
      ctx.arc(messageX + scrollWidth/2 + 4, messageY + scrollHeight/2 + 4, 4, 0, Math.PI * 0.5);
      ctx.arc(messageX + scrollWidth/2 + 4, messageY - scrollHeight/2 - 4, 4, Math.PI * 0.5, Math.PI);
      ctx.closePath();
      ctx.fill();
  
      // HIEROGLYPHIC BORDER
      ctx.strokeStyle = '#8b8713ff'; // Dark brown
      ctx.lineWidth = 2;
      ctx.strokeRect(messageX - scrollWidth/2 + 15, messageY - scrollHeight/2 + 15, scrollWidth - 30, scrollHeight - 30);
  
      // Simple hieroglyphic symbols in corners
      ctx.fillStyle = '#5c5d37ff';
      const drawAnkhSimpleGlyph = (x, y) => {
        // Ankh symbol
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(x - 1, y, 2, 8);
        ctx.fillRect(x - 5, y + 6, 10, 2);
      };
  
      drawAnkhSimpleGlyph(messageX - scrollWidth/2 + 20, messageY - scrollHeight/2 + 20);
      drawAnkhSimpleGlyph(messageX + scrollWidth/2 - 20, messageY - scrollHeight/2 + 20);
      drawAnkhSimpleGlyph(messageX - scrollWidth/2 + 20, messageY + scrollHeight/2 - 20);
      drawAnkhSimpleGlyph(messageX + scrollWidth/2 - 20, messageY + scrollHeight/2 - 20);
  
      // EGYPTIAN-STYLE TEXT
      ctx.font = '18px "Papyrus", "Arial", sans-serif';
      ctx.fillStyle = '#5d5d37ff'; // Dark brown ink
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      // Hieroglyphic text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
  
      // Split message if needed
      const words = message.split(' ');
      if (words.length > 3) {
        const line1 = words.slice(0, Math.ceil(words.length/2)).join(' ');
        const line2 = words.slice(Math.ceil(words.length/2)).join(' ');
        ctx.fillText(line1, messageX, messageY - 10);
        ctx.fillText(line2, messageX, messageY + 15);
      } else {
        ctx.fillText(message, messageX, messageY + 2);
      }
  
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
  
      ctx.restore();
    }

    ctx.restore(); // tilt
  });
};

export const drawTreasureChest = (ctx, camX, camY, openProgress = 0, resumeCollected = false) => {
  // Chest positioning and dimensions
  const chestX = 19300 - camX;
  const chestY = 340 - camY;
  const width = 100;
  const height = 60;
  const lidHeight = 25;
  const cornerRadius = 2;

  // Calculate lid rotation based on open progress (0 to 1)
  const lidRotation = Math.PI / 6 * openProgress;
  const lidPivotX = chestX;
  const lidPivotY = chestY + lidHeight;

  ctx.save();

  // ---- Draw the base ----
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#5D2906';
  ctx.lineWidth = 3;
    
  // Base rectangle
  ctx.beginPath();
  ctx.roundRect(chestX, chestY + lidHeight, width, height - lidHeight, cornerRadius);
  ctx.fill();
  ctx.stroke();

  // Wood planks
  ctx.strokeStyle = '#5D2906';
  ctx.lineWidth = 2;
  for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(chestX + (width / 5) * i, chestY + lidHeight);
      ctx.lineTo(chestX + (width / 5) * i, chestY + height);
      ctx.stroke();
  }

  // ---- Draw the lid ----
  ctx.save();
  // Apply rotation transformation for the lid
  ctx.translate(lidPivotX, lidPivotY);
  ctx.rotate(-lidRotation);
  ctx.translate(-lidPivotX, -lidPivotY);
  
  ctx.fillStyle = '#A0522D';
  ctx.strokeStyle = '#5D2906';
  ctx.lineWidth = 3;
    
  // Lid rectangle
  ctx.beginPath();
  ctx.roundRect(chestX, chestY, width, lidHeight, cornerRadius);
  ctx.fill();
  ctx.stroke();

  // Metal bands
  ctx.fillStyle = '#B87333';
  ctx.fillRect(chestX, chestY + lidHeight * 0.3, width, 5);
  ctx.fillRect(chestX, chestY + lidHeight * 0.7, width, 5);

  // ---- Draw the lock ----
  const lockX = chestX + width / 2;
  const lockY = chestY + lidHeight;
    
  // Lock base
  ctx.fillStyle = '#C0C0C0';
  ctx.beginPath();
  ctx.ellipse(lockX, lockY, 12, 10, 0, 0, Math.PI * 2);
  ctx.fill();
    
  // Keyhole
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(lockX, lockY, 6, 0, Math.PI * 2);
  ctx.fill();

  if (openProgress < 0.5) {
    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '9px DynaPuff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    // Background for readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(chestX + width/2 - 50, chestY - 28, 100, 20);
  
    // Prompt
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('A Big Reward Awaits', chestX + width/2, chestY - 18);
  };
  
  ctx.restore(); // Restore from lid transformation

  // Draw resume document if chest is open enough and resume not collected
  if (openProgress > 0.5 && !resumeCollected) {
    const docVisibility = (openProgress - 0.5) * 2;
    
    // Resume document
    ctx.fillStyle = `rgba(255, 255, 255, ${docVisibility})`;
    ctx.fillRect(chestX + width/2 - 15, chestY + lidHeight + 10, 30, 40);
    
    // Document details
    ctx.fillStyle = `rgba(200, 0, 0, ${docVisibility})`;
    ctx.fillRect(chestX + width/2 - 12, chestY + lidHeight + 15, 24, 5);
    
    ctx.fillStyle = `rgba(0, 0, 200, ${docVisibility})`;
    ctx.fillRect(chestX + width/2 - 12, chestY + lidHeight + 25, 24, 5);
    
    ctx.fillStyle = `rgba(0, 150, 0, ${docVisibility})`;
    ctx.fillRect(chestX + width/2 - 12, chestY + lidHeight + 35, 24, 5);
    
    // PDF text
    ctx.fillStyle = `rgba(0, 0, 0, ${docVisibility})`;
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Resume.pdf', chestX + width/2, chestY + lidHeight + 55);
  }

  ctx.restore();
};