// Procedural, animated "footage" for each stage. Duotone: deep navy + one teal accent.
// Every scene is draw(ctx, w, h, t) so the portal engine samples it like a video frame.

const TAU = Math.PI * 2;
const frac = (x) => x - Math.floor(x);
const rnd = (i) => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);

const ACC = '58,184,198';
const LIGHT = '169,219,226';

function vgrad(c, w, h, stops) {
  const g = c.createLinearGradient(0, 0, 0, h);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  c.fillStyle = g;
  c.fillRect(0, 0, w, h);
}

function wave(c, w, h, y0, amp, freq, phase, fill, line) {
  c.beginPath();
  c.moveTo(0, h);
  for (let x = 0; x <= w; x += Math.max(4, w / 120)) {
    const y = y0 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.3 - phase * 1.4) * amp * 0.4;
    c.lineTo(x, y);
  }
  c.lineTo(w, h);
  c.closePath();
  c.fillStyle = fill;
  c.fill();
  if (line) {
    c.strokeStyle = line;
    c.lineWidth = Math.max(1, w / 700);
    c.stroke();
  }
}

// faint engineering grid used behind every scene
function grid(c, w, h, a = 0.05) {
  c.strokeStyle = `rgba(${LIGHT},${a})`;
  c.lineWidth = 1;
  const s = Math.max(24, w / 22);
  c.beginPath();
  for (let x = 0; x <= w; x += s) { c.moveTo(x, 0); c.lineTo(x, h); }
  for (let y = 0; y <= h; y += s) { c.moveTo(0, y); c.lineTo(w, y); }
  c.stroke();
}

const scenes = {
  respond(c, w, h, t) {
    vgrad(c, w, h, [[0, '#04101c'], [0.6, '#0a2640'], [1, '#04121f']]);
    grid(c, w, h);
    const cx = w * 0.5, cy = h * 0.62, R = Math.max(w, h) * 0.9;
    for (let i = 0; i < 4; i++) {
      const p = frac(t * 0.22 + i / 4);
      c.beginPath();
      c.arc(cx, cy, p * R, 0, TAU);
      c.strokeStyle = `rgba(${ACC},${(1 - p) * 0.4})`;
      c.lineWidth = Math.max(1, w / 500);
      c.stroke();
    }
    c.beginPath();
    c.arc(cx, cy, Math.max(3, w / 160), 0, TAU);
    c.fillStyle = `rgba(${LIGHT},.9)`;
    c.fill();
    for (let i = 0; i < 3; i++) {
      wave(c, w, h, h * (0.8 + i * 0.07), h * 0.012, 0.008 + i * 0.002, t * (0.5 + i * 0.15) + i, `rgba(${ACC},${0.12 - i * 0.03})`, `rgba(${LIGHT},${0.18 - i * 0.05})`);
    }
  },

  extract(c, w, h, t) {
    vgrad(c, w, h, [[0, '#04101c'], [1, '#0b2c46']]);
    grid(c, w, h);
    const lv = h * (0.46 + 0.34 * (1 - frac(t * 0.1)));
    const g = c.createLinearGradient(0, lv, 0, h);
    g.addColorStop(0, `rgba(${ACC},.5)`);
    g.addColorStop(1, 'rgba(4,18,31,.95)');
    wave(c, w, h, lv, h * 0.012, 0.009, t * 1.0, g, `rgba(${LIGHT},.5)`);
  },

  dry(c, w, h, t) {
    vgrad(c, w, h, [[0, '#08141f'], [0.6, '#12293c'], [1, '#1c3b52']]);
    grid(c, w, h, 0.06);
    c.lineCap = 'butt';
    for (let i = 0; i < 14; i++) {
      const sp = 0.05 + (i % 4) * 0.02;
      const x = frac(t * sp + rnd(i)) * (w + 400) - 200;
      const y = h * (0.12 + (i / 14) * 0.76) + Math.sin(t * 1.1 + i) * 6;
      const len = w * (0.1 + rnd(i + 2) * 0.1);
      const g = c.createLinearGradient(x - len, 0, x, 0);
      g.addColorStop(0, `rgba(${LIGHT},0)`);
      g.addColorStop(1, `rgba(${LIGHT},.4)`);
      c.strokeStyle = g;
      c.lineWidth = Math.max(1.2, w / 520);
      c.beginPath();
      c.moveTo(x - len, y);
      c.lineTo(x, y);
      c.stroke();
    }
    // equipment silhouettes: two air movers
    for (const fx of [0.22, 0.78]) {
      c.fillStyle = 'rgba(4,18,31,.7)';
      c.strokeStyle = `rgba(${LIGHT},.35)`;
      c.lineWidth = 1.2;
      const bw = w * 0.1, bh = h * 0.1, bx = w * fx - bw / 2, by = h * 0.86 - bh;
      c.fillRect(bx, by, bw, bh);
      c.strokeRect(bx, by, bw, bh);
      c.beginPath();
      c.arc(bx + bw / 2, by + bh / 2, bh * 0.32, 0, TAU);
      c.stroke();
    }
  },

  verify(c, w, h, t) {
    vgrad(c, w, h, [[0, '#03101c'], [1, '#0a2a4a']]);
    const cols = 14, rows = 8;
    const sx = w / cols, sy = h / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const v = 0.5 + 0.5 * Math.sin(t * 0.5 + i * 0.7 + j * 0.45);
        // wet = muted slate, dry = accent
        const a = 0.25 + v * 0.65;
        c.beginPath();
        c.arc(sx * (i + 0.5), sy * (j + 0.5), (1.8 + v * 3) * (w / 1000 + 0.4), 0, TAU);
        c.fillStyle = v > 0.55 ? `rgba(${ACC},${a})` : `rgba(120,150,170,${a * 0.7})`;
        c.fill();
      }
    }
    const x = frac(t * 0.14) * w;
    const g = c.createLinearGradient(x - w * 0.1, 0, x, 0);
    g.addColorStop(0, `rgba(${ACC},0)`);
    g.addColorStop(1, `rgba(${LIGHT},.22)`);
    c.fillStyle = g;
    c.fillRect(x - w * 0.1, 0, w * 0.1, h);
    c.fillStyle = `rgba(${LIGHT},.85)`;
    c.fillRect(x - 1, 0, 2, h);
  },

  restore(c, w, h, t) {
    vgrad(c, w, h, [[0, '#0c3a58'], [0.55, '#2b7690'], [0.56, '#0d4a66']]);
    const sea = c.createLinearGradient(0, h * 0.55, 0, h);
    sea.addColorStop(0, '#1d6c86');
    sea.addColorStop(1, '#062236');
    wave(c, w, h, h * 0.56, h * 0.006, 0.01, t * 0.7, sea, null);
    for (let i = 0; i < 4; i++) {
      wave(c, w, h, h * (0.64 + i * 0.09), h * (0.01 + i * 0.003), 0.007 + i * 0.002, t * (0.5 + i * 0.15) + i * 2, `rgba(${LIGHT},${0.12 - i * 0.025})`, `rgba(${LIGHT},${0.3 - i * 0.07})`);
    }
    grid(c, w, h, 0.035);
  },
};

export function drawScene(name, c, w, h, t) {
  (scenes[name] || scenes.respond)(c, w, h, t);
}
