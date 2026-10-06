import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { LOGO, PHONE, PHONE_HREF, areas } from './data.js';
import ThemeToggle from './ThemeToggle.jsx';
import { Home, Services, Process, Projects, Areas, About, Faq, Emergency, Contact } from './pages.jsx';

const NAV = [
  ['/services', 'Services'],
  ['/process', 'Process'],
  ['/projects', 'Projects'],
  ['/areas', 'Areas'],
  ['/about', 'About'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
];

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  const navRef = useRef(null);
  const indRef = useRef(null);

  // one highlight pill that slides to the hovered link, and rests on the current page
  const moveInd = (el) => {
    const ind = indRef.current;
    if (!ind) return;
    if (!el) { ind.style.opacity = '0'; return; }
    ind.style.setProperty('--x', `${el.offsetLeft}px`);
    ind.style.setProperty('--w', `${el.offsetWidth}px`);
    ind.style.opacity = '1';
  };
  const syncInd = () => moveInd(navRef.current && navRef.current.querySelector('a.active'));
  useEffect(() => {
    const t = setTimeout(syncInd, 80);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncInd);
    window.addEventListener('resize', syncInd);
    return () => { clearTimeout(t); window.removeEventListener('resize', syncInd); };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('is-home', isHome);
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname, isHome]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}${!isHome ? ' solid' : ''}`}>
        <div className="topbar">
          <span className="live-dot"><i />Emergency line open 24/7</span>
          <span className="topbar-mid">Serving all of Maui</span>
          <a href={PHONE_HREF}>{PHONE}</a>
        </div>
        <div className="hbar">
          <Link className="brand" to="/" aria-label="Wai Ola Restoration home">
            <img src={LOGO} alt="" width="34" height="34" />
            <span className="brandtx"><b>Wai Ola Restoration</b><small>Water damage · Maui</small></span>
          </Link>
          <nav className="nav" aria-label="Primary navigation" ref={navRef} onMouseLeave={syncInd}>
            <span className="nav-ind" ref={indRef} aria-hidden="true" />
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to} onMouseEnter={(e) => moveInd(e.currentTarget)} onFocus={(e) => moveInd(e.currentTarget)}>{label}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle className="hide-sm" />
            <a className="hcall" href={PHONE_HREF}>
              <span className="hcall-ic"><PhoneIcon /></span>
              <span className="hcall-tx"><small>24/7 emergency</small><b>{PHONE}</b></span>
            </a>
            <button className="hmenu" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span className="burger"><i /><i /><i /></span><span className="hmenu-tx">Menu</span>
            </button>
          </div>
        </div>
        <span className="hprog" ref={progressRef} aria-hidden="true" />
      </header>

      <Outlet />

      <div className={`sheet${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}>
        <div className="sheet-card" role="dialog" aria-label="Menu">
          <button className="sheet-close" type="button" onClick={() => setMenuOpen(false)}>Close</button>
          <div className="sheet-theme"><span>Theme</span><ThemeToggle /></div>
          <a className="sheet-call" href={PHONE_HREF}>Call {PHONE}<small>Emergency line, 24/7</small></a>
          <nav className="sheet-nav" aria-label="Site pages">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/emergency">Emergency help</NavLink>
            {NAV.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          </nav>
          <h2>Areas we serve</h2>
          <div className="chips">{areas.map((a) => <span key={a}>{a}</span>)}</div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
