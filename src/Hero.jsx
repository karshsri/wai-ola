import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import { PHONE, PHONE_HREF, stageList, states, previews } from './data.js';
import { drawScene } from './scenes.js';

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const raf = () => new Promise((r) => requestAnimationFrame(r));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ORDER = stageList.map((s) => s.toLowerCase());
const TILT = 0; // 3D tilt off: it warped the text and made the photo layer drift off the canvas window
const Q = 0.5; // scene render scale (soft water reads fine at half-res)

function animateValue(setter, duration) {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setter(ease(p));
      if (p < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

function retrigger(el, cls) {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

function PortalPreview({ pKey, canBack, dir }) {
  const p = previews[pKey];
  const isCall = pKey === 'call';
  return (
    <>
    <div className="pv-bg" key={`bg-${pKey}`}><img src={p.img} alt="" style={{ objectPosition: p.pos }} /></div>
    <div className={`pv${dir < 0 ? ' back' : ''}`} key={pKey}>
      <div className="pv-top"><span>{isCall ? 'Final step' : 'Up next'}</span><b>{p.num}</b></div>
      <h3 className="pv-title">{p.title}</h3>

      {p.visual === 'level' && (
        <div className="pv-vis pv-level">
          <div className="pv-tank"><div className="pv-water" /></div>
          <div className="pv-stat"><small>{p.stat[0]}</small><b>{p.stat[1]} <i>→</i> {p.stat[2]}</b></div>
        </div>
      )}
      {p.visual === 'humidity' && (
        <div className="pv-vis pv-hum">
          <svg className="pv-fan" viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="3" /><path d="M24 21c0-8 4-11 8-9-1 6-4 8-8 9zM27 24c8 0 11 4 9 8-6-1-8-4-9-8zM24 27c0 8-4 11-8 9 1-6 4-8 8-9zM21 24c-8 0-11-4-9-8 6 1 8 4 9 8z" /></g></svg>
          <div className="pv-stat"><small>{p.stat[0]}</small><b>{p.stat[1]} <i>→</i> {p.stat[2]}</b>
            <span className="pv-bar"><em /></span>
          </div>
        </div>
      )}
      {p.visual === 'readings' && (
        <ul className="pv-vis pv-rows">
          {p.rows.map(([n, v, s], i) => (
            <li key={n} className={s} style={{ animationDelay: `${0.15 + i * 0.18}s` }}><i style={{ animationDelay: `${0.5 + i * 0.35}s` }} /><span>{n}</span><b>{v}</b></li>
          ))}
        </ul>
      )}
      {p.visual === 'checklist' && (
        <ul className="pv-vis pv-checks">
          {p.items.map((it, i) => (
            <li key={it} style={{ animationDelay: `${0.2 + i * 0.22}s` }}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>{it}</li>
          ))}
        </ul>
      )}
      {p.visual === 'call' && (
        <div className="pv-vis pv-call"><span className="pv-ring"><i /></span><b>{PHONE}</b></div>
      )}

      <ul className="pv-lines">{p.lines.map((l) => <li key={l}>{l}</li>)}</ul>
      <div className="pv-hint">
        <span className={`pv-back${canBack ? '' : ' off'}`}>← Back</span>
        <span className="pv-fwd">{isCall ? 'Call' : 'Next'} →</span>
      </div>
    </div>
    </>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState('respond');
  const [side, setSide] = useState('right');
  const [dir, setDir] = useState(1);
  const sideRef = useRef('right');
  const state = states[current];
  const canBack = ORDER.indexOf(current) > 0;

  const experienceRef = useRef(null);
  const portalRef = useRef(null);
  const portalCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const listRef = useRef(null);
  const cursorRef = useRef(null);
  const overlayRef = useRef(null);
  const currentRef = useRef('respond');
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    currentRef.current = current;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    retrigger(listRef.current, 'is-switching');
  }, [current]);

  useEffect(() => {
    const experience = experienceRef.current;
    const portal = portalRef.current;
    const canvas = portalCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const bgCanvas = bgCanvasRef.current;
    const bctx = bgCanvas.getContext('2d');
    const cursor = cursorRef.current;
    const body = document.body;
    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    const off2 = document.createElement('canvas');
    const o2ctx = off2.getContext('2d');
    const ov = overlayRef.current;

    const S = {
      busy: false, rotX: 0, rotY: 0, targetX: 0, targetY: 0,
      expansion: 0, maskScale: 0, canvasOpacity: 1, transitionActive: false,
      swapping: false, swap: 1, oldPreview: null, oldBg: null, dir: 1,
    };
    let alive = true;
    let last = performance.now();
    const pointer = { x: -100, y: -100 };
    const orbit = { x: -100, y: -100 };

    /* ---------- sizing ---------- */
    function resizeCanvas() {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const iw = window.innerWidth, ih = window.innerHeight;
      canvas.width = iw * d;
      canvas.height = ih * d;
      canvas.style.width = iw + 'px';
      canvas.style.height = ih + 'px';
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const hr = experience.getBoundingClientRect();
      for (const c of [bgCanvas]) {
        c.width = Math.round(hr.width * Q);
        c.height = Math.round(hr.height * Q);
      }
      off.width = Math.round(iw * Q);
      off.height = Math.round(ih * Q);
      off2.width = off.width;
      off2.height = off.height;
    }

    function drawShade(c) {
      const ih = window.innerHeight, iw = window.innerWidth;
      const g = c.createLinearGradient(0, ih * 0.52, 0, ih);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,.88)');
      c.fillStyle = g;
      c.fillRect(0, ih * 0.52, iw, ih * 0.48);
    }
    function roundedPoints(w, h, r) {
      r = Math.max(0, Math.min(r, w / 2, h / 2));
      const arcs = [
        [w / 2 - r, -h / 2 + r, -Math.PI / 2, 0],
        [w / 2 - r, h / 2 - r, 0, Math.PI / 2],
        [-w / 2 + r, h / 2 - r, Math.PI / 2, Math.PI],
        [-w / 2 + r, -h / 2 + r, Math.PI, Math.PI * 1.5],
      ];
      const pts = [];
      for (const [ax, ay, a0, a1] of arcs) {
        for (let i = 0; i <= 10; i++) {
          const a = a0 + ((a1 - a0) * i) / 10;
          pts.push([ax + r * Math.cos(a), ay + r * Math.sin(a)]);
        }
      }
      return pts;
    }
    function project(pts, rx, ry, cx, cy) {
      const ax = (rx * Math.PI) / 180, ay = (ry * Math.PI) / 180;
      const cax = Math.cos(ax), sax = Math.sin(ax), cay = Math.cos(ay), say = Math.sin(ay);
      return pts.map(([x, y]) => {
        const xx = x * cay, yy = y * cax;
        const z = x * say - y * sax;
        const p = 850 / (850 + z);
        return [cx + xx * p, cy + yy * p];
      });
    }

    function draw(now) {
      if (!alive) return;
      const dt = Math.min(40, now - last);
      last = now;
      const t = now / 1000;
      const k = Math.min(1, dt * 0.009);
      S.rotX += (S.targetX - S.rotX) * k;
      S.rotY += (S.targetY - S.rotY) * k;

      const iw = window.innerWidth, ih = window.innerHeight;
      const hr = experience.getBoundingClientRect();
      // the hero is the only place the engine paints; skip all work once scrolled past
      if (hr.bottom < 0 || hr.top > ih) {
        ctx.clearRect(0, 0, iw, ih);
        requestAnimationFrame(draw);
        return;
      }

      const st = states[currentRef.current];
      const swapping = S.swapping;
      const sw = S.swap;
      if (swapping && S.oldBg) {
        drawScene(S.oldBg, bctx, bgCanvas.width, bgCanvas.height, t);
        bctx.globalAlpha = sw;
        drawScene(st.scene, bctx, bgCanvas.width, bgCanvas.height, t);
        bctx.globalAlpha = 1;
      } else {
        drawScene(st.scene, bctx, bgCanvas.width, bgCanvas.height, t);
      }

      ctx.clearRect(0, 0, iw, ih);
      const rect = portal.getBoundingClientRect();
      const e = S.expansion;
      // when expanding, grow to fill the hero (not the whole viewport)
      const tw = hr.width, th = hr.height;
      const tcx = hr.left + tw / 2, tcy = hr.top + th / 2;
      const rcx = rect.left + rect.width / 2, rcy = rect.top + rect.height / 2;
      const cx = rcx + (tcx - rcx) * e;
      const cy = rcy + (tcy - rcy) * e;
      const baseW = rect.width + (tw - rect.width) * e;
      const baseH = rect.height + (th - rect.height) * e;
      const pop = swapping ? 1 - 0.05 * Math.sin(Math.PI * sw) : 1;
      const scale = e ? 1 : S.maskScale * pop;
      const w = baseW * scale, h = baseH * scale;
      const r = 28 * (1 - e) * scale;
      const rx = S.rotX * (1 - e), ry = S.rotY * (1 - e);

      if (ov) {
        ov.style.transform = `perspective(850px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
        ov.style.opacity = String(Math.min(1, S.maskScale * 1.3));
      }

      if (w > 1 && h > 1) {
        drawScene(st.portalScene, octx, off.width, off.height, t + 3);
        if (swapping && S.oldPreview) drawScene(S.oldPreview, o2ctx, off2.width, off2.height, t + 3);
        const pts = project(roundedPoints(w, h, r), rx, ry, cx, cy);
        ctx.save();
        ctx.globalAlpha = S.canvasOpacity;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = '#030303';
        ctx.fillRect(0, 0, iw, ih);
        if (swapping && S.oldPreview) {
          // in-place change: the new scene wipes across the card, left to right
          ctx.drawImage(off2, 0, 0, iw, ih);
          const back = S.dir < 0;
          const wipeX = back ? cx + w / 2 - w * sw : cx - w / 2 + w * sw;
          ctx.save();
          ctx.beginPath();
          if (back) ctx.rect(wipeX, 0, iw - wipeX, ih);
          else ctx.rect(0, 0, wipeX, ih);
          ctx.clip();
          ctx.drawImage(off, 0, 0, iw, ih);
          ctx.restore();
          ctx.fillStyle = 'rgba(169,219,226,.9)';
          ctx.fillRect(wipeX - 1, cy - h / 2, 2, h);
        } else {
          ctx.drawImage(off, 0, 0, iw, ih);
        }
        if (S.transitionActive) drawShade(ctx);
        ctx.restore();
        if (e < 0.02) {
          ctx.beginPath();
          pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.closePath();
          ctx.strokeStyle = 'rgba(255,255,255,.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }

    /* ---------- reveals ---------- */
    async function revealMask() {
      retrigger(experience, 'mask-revealing');
      S.maskScale = 0;
      await animateValue((v) => (S.maskScale = v), 1050);
    }
    function revealPlanetContent() {
      retrigger(experience, 'content-revealing');
    }
    async function startExperience() {
      body.classList.add('intro-ready');
      revealMask();
      await sleep(500);
      revealPlanetContent();
    }

    /* ---------- travel ---------- */
    function resetAfterError() {
      S.transitionActive = false;
      S.expansion = 0;
      S.maskScale = 1;
      S.canvasOpacity = 1;
      experience.classList.remove('is-transitioning', 'is-committing');
      S.busy = false;
    }
    async function travel(direction = 1) {
      const st = states[currentRef.current];
      if (S.busy) return;
      const idx = ORDER.indexOf(currentRef.current);
      let target;
      if (direction < 0) {
        if (idx <= 0) return; // already at the first stage
        target = ORDER[idx - 1];
      } else {
        if (!st.nextKey) {
          window.location.href = PHONE_HREF; // final stage: the card becomes the call button
          return;
        }
        target = st.nextKey;
      }
      S.busy = true;
      S.targetX = 0;
      S.targetY = 0;
      try {
        // the card stays where it is; its content wipes over to the new stage
        S.oldPreview = st.portalScene;
        S.oldBg = st.scene;
        S.dir = direction;
        S.swap = 0;
        S.swapping = true;
        flushSync(() => {
          setDir(direction);
          setCurrent(target);
        });
        currentRef.current = target;
        retrigger(experience, 'content-revealing');
        await animateValue((v) => (S.swap = v), 1100);
      } catch {
        /* fall through to cleanup */
      } finally {
        S.swapping = false;
        S.swap = 1;
        S.busy = false;
      }
    }

    /* ---------- pointer / cursor / scroll ---------- */
    function inHero() {
      const hr = experience.getBoundingClientRect();
      return pointer.y >= hr.top && pointer.y <= hr.bottom && pointer.y > 0;
    }
    function syncCursorScope() {
      const inside = inHero();
      body.classList.toggle('in-hero', inside);
      if (!inside) cursor.classList.remove('is-visible');
    }
    function onMove(e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      syncCursorScope();
      if (inHero()) cursor.classList.add('is-visible');
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      if (ov && e.pointerType !== 'touch') {
        ov.style.setProperty('--px', (nx * 2).toFixed(3));
        ov.style.setProperty('--py', (ny * 2).toFixed(3));
      }
      if (e.pointerType === 'touch' || S.busy) return;
      S.targetY = nx * 37.4 * TILT;
      S.targetX = ny * -33 * TILT;
    }
    const onLeave = () => {
      S.targetX = 0;
      S.targetY = 0;
      if (ov) { ov.style.setProperty('--px', '0'); ov.style.setProperty('--py', '0'); }
    };
    const onDocLeave = () => cursor.classList.remove('is-visible');
    const onEnter = () => cursor.classList.add('is-enter');
    const onPortalMove = (e) => {
      const r = portal.getBoundingClientRect();
      const s = e.clientX < r.left + r.width / 2 ? 'left' : 'right';
      if (s !== sideRef.current) {
        sideRef.current = s;
        setSide(s);
      }
    };
    const onPortalClick = (e) => {
      let d = 1;
      if (e.detail !== 0) { // detail 0 = keyboard activation, which always goes forward
        const r = portal.getBoundingClientRect();
        if (e.clientX < r.left + r.width / 2) d = -1;
      }
      travel(d);
    };
    const onPortalKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); travel(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); travel(1); }
    };
    const onExit = () => cursor.classList.remove('is-enter');
    const onScroll = () => syncCursorScope();
    function cursorLoop() {
      if (!alive) return;
      orbit.x += (pointer.x - orbit.x) * 0.2;
      orbit.y += (pointer.y - orbit.y) * 0.2;
      cursor.style.transform = `translate3d(${orbit.x}px,${orbit.y}px,0)`;
      requestAnimationFrame(cursorLoop);
    }

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('mouseleave', onDocLeave);
    portal.addEventListener('pointerenter', onEnter);
    portal.addEventListener('pointerleave', onExit);
    portal.addEventListener('click', onPortalClick);
    portal.addEventListener('pointermove', onPortalMove);
    portal.addEventListener('keydown', onPortalKey);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll, { passive: true });

    resizeCanvas();
    requestAnimationFrame(draw);
    requestAnimationFrame(cursorLoop);
    body.classList.add('preload-complete');
    const boot = setTimeout(startExperience, 150);

    return () => {
      alive = false;
      clearTimeout(boot);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('mouseleave', onDocLeave);
      portal.removeEventListener('pointerenter', onEnter);
      portal.removeEventListener('pointerleave', onExit);
      portal.removeEventListener('click', onPortalClick);
      portal.removeEventListener('pointermove', onPortalMove);
      portal.removeEventListener('keydown', onPortalKey);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      body.classList.remove('in-hero', 'intro-ready');
    };
  }, []);

  return (
    <>
      <main className="experience" data-planet={current} ref={experienceRef}>
        <div className="backgrounds" aria-hidden="true">
          <video className="hero-video" src="/media/hero-leak.mp4" autoPlay muted loop playsInline preload="auto" />
          <canvas id="background-canvas" ref={bgCanvasRef} className="background-canvas" />
        </div>
        <div className="shade" aria-hidden="true" />
        <div className="hero-veil" aria-hidden="true" />

        <div className="hero-copy">
          <div className="hero-badge"><i />24/7 water mitigation · Maui, Hawaii</div>
          <h1 className="hero-title">Water damage,<br /><em>handled.</em></h1>
          <p className="hero-sub">Certified crews dispatched within the hour. We extract, dry and document every job, and deal with your insurance so you do not have to.</p>
          <div className="hero-cta">
            <a className="btn p" href={PHONE_HREF}>Call {PHONE}</a>
            <Link className="btn g" to="/emergency">Emergency steps</Link>
          </div>
          <ul className="hero-trust">
            <li>Family-owned</li>
            <li>Fully insured</li>
            <li>Direct insurance billing</li>
          </ul>
        </div>

        <canvas id="portal-canvas" ref={portalCanvasRef} className="portal-canvas" aria-hidden="true" />
        <section className="portal-wrap chrome" aria-label="Next stage">
          <div className="portal-heading">
            <span>Next:</span>
            <span><span id="next-number">{state.number}</span> <strong id="next-name">{state.next}</strong></span>
          </div>
          <div className="portal-box" data-side={side} data-first={canBack ? undefined : ''}>
            <button className="portal" id="portal" ref={portalRef} type="button" aria-label={state.nextKey ? `Next stage: ${state.next}. Click the left half to go back.` : `Call ${PHONE} for a free inspection. Click the left half to go back.`} />
            <div className="portal-overlay" ref={overlayRef} aria-hidden="true">
              <PortalPreview pKey={state.nextKey || 'call'} canBack={canBack} dir={dir} />
            </div>
          </div>
        </section>

        <aside className="stage-panel chrome" ref={listRef} aria-label="Restoration stages" aria-live="polite">
          <div className="stage-top">
            <span className="stage-no">Stage {stageList.indexOf(state.name) + 1} of {stageList.length}</span>
            <h2 className="stage-name">{state.name}</h2>
          </div>
          <p className="stage-text">{state.facts[0][1]}</p>
          <ol className="stepper">
            {stageList.map((p, i) => (
              <li key={p} className={p === state.name ? 'active' : i < stageList.indexOf(state.name) ? 'done' : ''}><span>{i + 1}</span><em>{p}</em></li>
            ))}
          </ol>
        </aside>

        <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
          <span className="cursor-orbit" /><span className="cursor-dot" /><span className="cursor-label">{side === 'left' ? (canBack ? 'Back' : 'First') : state.cursor}</span>
        </div>
      </main>

    </>
  );
}
