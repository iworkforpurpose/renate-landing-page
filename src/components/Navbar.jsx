import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/cn'
import Button from './primitives/Button'

const LINKS = [
  { href: '#voice', label: 'Voice interview' },
  { href: '#talk',  label: 'Talk to Renate' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-theme="dark"]')
    if (!darkSections.length) return

    const recompute = () => {
      const navH = 76
      const hit = Array.from(darkSections).some(el => {
        const r = el.getBoundingClientRect()
        return r.top < navH && r.bottom > navH / 2
      })
      setOnDark(hit)
    }
    recompute()
    window.addEventListener('scroll', recompute, { passive: true })
    window.addEventListener('resize', recompute)
    return () => {
      window.removeEventListener('scroll', recompute)
      window.removeEventListener('resize', recompute)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo',
          scrolled ? 'backdrop-blur-xl' : '',
          onDark
            ? 'bg-ink-900/80 text-white border-b border-white/10'
            : scrolled
              ? 'bg-white/80 text-ink-900 border-b border-ink-100'
              : 'bg-transparent text-ink-900 border-b border-transparent',
        )}
      >
        <div className="relative mx-auto max-w-shell px-5 md:px-8 h-[var(--nav-h,76px)] flex items-center justify-between" style={{ height: 76 }}>
          <Link to="/" className="flex items-center relative z-10" aria-label="Renate home">
            <img
              src="/logo-wordmark.png"
              alt="Renate"
              className={cn(
                'h-8 md:h-9 w-auto transition-[filter] duration-300',
                onDark && '[filter:brightness(0)_invert(1)]',
              )}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {LINKS.map(l => {
              const className = cn(
                'text-[13px] font-medium transition-colors',
                onDark ? 'text-white/70 hover:text-white' : 'text-ink-600 hover:text-ink-900',
              )
              return l.route ? (
                <Link key={l.to} to={l.to} className={className}>{l.label}</Link>
              ) : (
                <a key={l.href} href={l.href} className={className}>{l.label}</a>
              )
            })}
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <Link
              to="/login"
              className={cn(
                'hidden sm:inline-flex h-9 items-center rounded-lg ring-1 px-3 text-[13px] font-medium transition-colors',
                onDark
                  ? 'ring-white/20 text-white/90 hover:bg-white/10'
                  : 'ring-ink-200 text-ink-700 bg-white/80 backdrop-blur-sm hover:bg-white',
              )}
            >
              Log in
            </Link>
            <Button
              as={Link}
              to="/signup"
              variant={onDark ? 'brand' : 'primary'}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Sign Up
            </Button>
            <button
              className={cn(
                'inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg ring-1',
                onDark ? 'ring-white/20 text-white' : 'ring-ink-200 text-ink-800',
              )}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-white transition-opacity md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-5 h-[76px] border-b border-ink-100">
          <img src="/logo-wordmark.png" alt="Renate" className="h-8 w-auto" />
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="h-9 w-9 inline-flex items-center justify-center rounded-lg ring-1 ring-ink-200">
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-5">
          {LINKS.map(l => {
            const className = 'py-3 text-[18px] font-medium text-ink-900 border-b border-ink-100'
            return l.route ? (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={className}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={className}
              >
                {l.label}
              </a>
            )
          })}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg ring-1 ring-ink-200 text-ink-800 text-[15px] font-medium"
          >
            Log in
          </Link>
          <Button as={Link} to="/signup" variant="primary" size="lg" className="mt-3" onClick={() => setMobileOpen(false)}>
            Sign Up
          </Button>
        </div>
      </div>
    </>
  )
}
