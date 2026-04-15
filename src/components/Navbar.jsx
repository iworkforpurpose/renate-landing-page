import { useEffect, useState } from 'react';
import './Navbar.css';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track when the navbar sits over a .dark-section so we can flip its tint + text.
  useEffect(() => {
    const darkSections = document.querySelectorAll('.dark-section');
    if (!darkSections.length) return;

    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    ) || 84;

    const observer = new IntersectionObserver(
      (entries) => {
        // Any dark section crossing the nav band → dark nav.
        const anyHit = entries.some((e) => e.isIntersecting);
        setOnDark((prev) => {
          // If no entries hit, recompute by checking all remembered states
          if (anyHit) return true;
          // Otherwise, only flip to light if *every* currently-intersecting-nav section is out
          const stillOnDark = Array.from(darkSections).some((el) => {
            const r = el.getBoundingClientRect();
            return r.top < navH && r.bottom > 0;
          });
          return stillOnDark;
        });
      },
      {
        // Trigger when a dark section's top crosses the bottom of the nav and
        // while its bottom is still below the nav top.
        rootMargin: `0px 0px -${Math.max(window.innerHeight - navH, 1)}px 0px`,
        threshold: 0
      }
    );

    darkSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { href: '#product', label: 'Product' },
    { href: '#workflow', label: 'How it works' },
    { href: '#benefits', label: 'Why Renate' }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${onDark ? 'on-dark' : ''}`}>
        <div className="container nav-content">
          <a href="#home" className="nav-logo" aria-label="Renate home">
            <img src="/logo-transparent.png" alt="Renate" />
          </a>

          <div className="nav-links" role="navigation">
            {links.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="btn-primary" data-cursor="magnetic">
              Book a demo
            </button>
            <button
              className="nav-hamburger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="nav-mobile-header">
          <span className="nav-mobile-brand">Renate</span>
          <button className="nav-mobile-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="nav-mobile-links">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
        </div>
        <div className="nav-mobile-cta">
          <button className="btn-primary" onClick={() => setMobileOpen(false)}>Book a demo</button>
        </div>
      </div>
    </>
  );
}
