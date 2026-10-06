import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PHONE, PHONE_HREF, LOGO, areas, services } from './data.js';

const ICONS = {
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  wind: 'M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7',
  mold: 'M12 3a4 4 0 0 1 4 4 4 4 0 0 1 3 4 4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4 4 4 0 0 1 3-4 4 4 0 0 1 4-4z',
  storm: 'M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 17 9a3.5 3.5 0 0 1 0 7H7zM9 19l-1 3M13 19l-1 3M17 19l-1 3',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  pipe: 'M3 9h8v6H3zM11 11h6a3 3 0 0 1 3 3v5M20 19v2',
  ac: 'M4 6h16v8H4zM8 18v3M12 18v3M16 18v3M8 10h8',
  sewer: 'M5 20h14M7 20V9a5 5 0 0 1 10 0v11M10 13h4',
  building: 'M5 21V5l7-2 7 2v16M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  meter: 'M4 18a8 8 0 1 1 16 0M12 18l4-6M7 18h.01M17 18h.01M12 10v.01',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  stain: 'M3 6h18M3 6v3c0 1.5 1.5 3 3 3s2-1 3-1 1.5 2 3 2 3-1.5 3-3 2-1 3-1M12 16c1.5 2 2 3 2 4a2 2 0 0 1-4 0c0-1 .5-2 2-4z',
  smell: 'M5 15c0-3 3-3 3-6s-3-3-3-5M12 15c0-3 3-3 3-6s-3-3-3-5M19 15c0-3 3-3 3-6M3 19h18',
  floor: 'M3 8l9-4 9 4-9 4zM3 12l9 4 9-4M3 16l9 4 9-4',
  paint: 'M5 4h14v6H5zM12 10v4M10 14h4v6h-4z',
  bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6',
};

export function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export function Count({ n, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1200);
        setV(n * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return <span ref={ref}>{prefix}{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}{suffix}</span>;
}

// loads and plays only while on screen, so pages stay light
export function LazyVideo({ src, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.getAttribute('src')) v.setAttribute('src', src);
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} className={className} muted loop playsInline preload="none" aria-hidden="true" />;
}

export const Heading = ({ eyebrow, children, sub, center }) => (
  <div className={center ? 'head center' : 'head'}>
    {eyebrow && <div className="eyebrow rv">{eyebrow}</div>}
    <h2 className="rv">{children}</h2>
    {sub && <p className="sub rv">{sub}</p>}
  </div>
);

export function PageHero({ title, sub, crumb }) {
  return (
    <section className="pagehero">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><b>{crumb || title}</b></nav>
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ title = 'Need help right now?', text = 'Our emergency line is staffed 24 hours a day, every day.' }) {
  return (
    <section className="ctaband">
      <div className="wrap ctainner rv">
        <div>
          <h2>{title}</h2>
          <p className="sub">{text}</p>
        </div>
        <div className="ctabtns">
          <a className="btn p" href={PHONE_HREF}>Call {PHONE}</a>
          <Link className="btn g" to="/contact">Request a crew</Link>
        </div>
      </div>
    </section>
  );
}

export function Page({ title, description, children }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.bento,.steps,.pillars,.signs,.jobs,.reviews,.sectors,.causes,.reel,.tables,.statgrid').forEach((g) => {
      [...g.children].forEach((c, i) => c.style.setProperty('--i', String(i)));
    });
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  // card hover effect: spotlight + edge glow follow the cursor, and the card tilts slightly
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return undefined;
    const onMove = (e) => {
      const el = e.target.closest && e.target.closest('.fx');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.classList.add('fx-live');
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
      el.style.setProperty('--ry', ((x / r.width - 0.5) * 6).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((0.5 - y / r.height) * 6).toFixed(2) + 'deg');
    };
    const onOut = (e) => {
      const el = e.target.closest && e.target.closest('.fx');
      if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <div className="home">
      {children}
      <footer className="sitefoot">
        <div className="footcrest" aria-hidden="true">
          <svg className="fc fc3" viewBox="0 0 2880 80" preserveAspectRatio="none"><path d="M0 0 H2880 V44 C2640 80 2400 8 2160 44 C1920 80 1680 8 1440 44 C1200 80 960 8 720 44 C480 80 240 8 0 44 Z" /></svg>
          <svg className="fc fc2" viewBox="0 0 2880 80" preserveAspectRatio="none"><path d="M0 0 H2880 V44 C2640 80 2400 8 2160 44 C1920 80 1680 8 1440 44 C1200 80 960 8 720 44 C480 80 240 8 0 44 Z" /></svg>
          <svg className="fc fc1" viewBox="0 0 2880 80" preserveAspectRatio="none"><defs><linearGradient id="fcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#071e33" stopOpacity="0" /><stop offset="0.55" stopColor="#071e33" stopOpacity="0.92" /><stop offset="1" stopColor="#071e33" /></linearGradient></defs><path className="fcfill" d="M0 0 H2880 V44 C2640 80 2400 8 2160 44 C1920 80 1680 8 1440 44 C1200 80 960 8 720 44 C480 80 240 8 0 44 Z" /><path className="fcline" d="M2880 44 C2640 80 2400 8 2160 44 C1920 80 1680 8 1440 44 C1200 80 960 8 720 44 C480 80 240 8 0 44" /></svg>
        </div>
        <div className="footwaves" aria-hidden="true">
          <svg className="fw fw1" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="M0 60 C240 100 480 20 720 60 S1200 100 1440 60 S1920 20 2160 60 S2640 100 2880 60 V120 H0Z" /></svg>
          <svg className="fw fw2" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="M0 70 C300 20 560 110 720 70 S1140 20 1440 70 S2000 110 2160 70 S2580 20 2880 70 V120 H0Z" /></svg>
          <svg className="fw fw3" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="M0 84 C200 60 520 108 720 84 S1240 60 1440 84 S1960 108 2160 84 S2680 60 2880 84 V120 H0Z" /></svg>
        </div>
        <div className="wrap footmain">
          <div className="fcol brandcol rv">
            <Link to="/" className="footlogo"><img src={LOGO} alt="" width="38" height="38" /><b>Wai Ola Restoration</b></Link>
            <p>24/7 water mitigation and restoration across Maui. Fast response, measured drying and insurance-ready documentation.</p>
            <a className="footcall" href={PHONE_HREF}>{PHONE}</a>
            <span className="footlive"><i />Emergency line open now</span>
          </div>
          <nav className="fcol rv" aria-label="Company" style={{ transitionDelay: '80ms' }}>
            <h4>Explore</h4>
            <Link to="/process">Process</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/areas">Service area</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/emergency">Emergency help</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <nav className="fcol rv" aria-label="Services" style={{ transitionDelay: '160ms' }}>
            <h4>Services</h4>
            {services.map((s) => <Link key={s} to="/services">{s}</Link>)}
          </nav>
          <div className="fcol rv" style={{ transitionDelay: '240ms' }}>
            <h4>We serve</h4>
            <div className="footareas">{areas.map((a) => <span key={a}>{a}</span>)}</div>
          </div>
        </div>
        <div className="wrap footbar">
          <span>© 2026 Wai Ola Restoration · Mockup</span>
          <span className="footnote">Placeholder phone, credentials and reviews. Photos and video: Pexels (free license).</span>
          <button className="totop" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">Back to top <span>↑</span></button>
        </div>
      </footer>
      <div className="mbar">
        <a className="a" href={PHONE_HREF}>Call now</a>
        <Link className="b" to="/emergency">Emergency steps</Link>
      </div>
    </div>
  );
}

// featured video + playlist: click a clip to switch, and the next one plays when a clip ends
export function VideoShowcase({ items }) {
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  const wrap = useRef(null);
  const main = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      const v = main.current;
      if (!v) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  const cur = items[i];
  return (
    <div className="showcase rv" ref={wrap}>
      <div className="stage-video">
        <video
          key={cur.src}
          ref={main}
          src={cur.src}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={(e) => setP((e.currentTarget.currentTime / (e.currentTarget.duration || 1)) * 100)}
          onEnded={() => { setP(0); setI((i + 1) % items.length); }}
        />
        <span className="livebadge"><i />On the job</span>
        <div className="cap">
          <h3>{cur.label}</h3>
          <p>{cur.text}</p>
        </div>
      </div>
      <div className="playlist">
        {items.map((it, k) => (
          <button key={it.src} type="button" className={`clip${k === i ? ' on' : ''}`} onClick={() => { setP(0); setI(k); }} style={k === i ? { '--p': `${p}%` } : undefined}>
            <span className="thumb"><video src={`${it.src}#t=0.6`} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} /></span>
            <span className="clipinfo"><b>{it.label}</b><small>{it.text}</small></span>
            <span className="num">0{k + 1}</span>
            <span className="bar" />
          </button>
        ))}
      </div>
    </div>
  );
}
