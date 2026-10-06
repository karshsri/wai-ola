import { useEffect, useState } from 'react';

const KEY = 'wo-theme';
const read = () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

function Sun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function Moon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(read);

  // keep every toggle on the page in sync
  useEffect(() => {
    const sync = () => setTheme(read());
    window.addEventListener('wo-theme', sync);
    return () => window.removeEventListener('wo-theme', sync);
  }, []);

  const flip = () => {
    const next = read() === 'light' ? 'dark' : 'light';
    const apply = () => {
      document.documentElement.setAttribute('data-theme', next);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f5fafc' : '#04121f');
      try { localStorage.setItem(KEY, next); } catch { /* private mode */ }
      window.dispatchEvent(new Event('wo-theme'));
    };
    // soft cross-fade where the browser supports it
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  const isLight = theme === 'light';
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={flip}
    >
      <span className="tt-track" aria-hidden="true"><Moon /><Sun /></span>
      <span className="tt-knob" aria-hidden="true">{isLight ? <Sun /> : <Moon />}</span>
    </button>
  );
}
