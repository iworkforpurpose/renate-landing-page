import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Users, Menu, X, LogOut } from 'lucide-react'
import { cn } from '../lib/cn'
import { clearSignedUp } from '../lib/auth'

const NAV = [
  { to: '/dashboard',            label: 'Dashboard',    icon: LayoutDashboard, end: true },
  { to: '/dashboard/jobs',       label: 'Jobs posted',  icon: Briefcase,       end: false },
  { to: '/dashboard/candidates', label: 'Candidates',   icon: Users,           end: false },
]

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-3 h-10 text-[13.5px] font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-800'
                  : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-brand-500"
                  />
                )}
                <Icon size={16} className={isActive ? 'text-brand-700' : 'text-ink-500 group-hover:text-ink-700'} />
                <span className="truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}

function MobileAuth() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => { clearSignedUp(); navigate('/') }}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg ring-1 ring-ink-200 bg-white px-3 text-[13px] font-medium text-ink-700"
    >
      <LogOut size={14} /> Log out
    </button>
  )
}

function SidebarInner({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center h-[76px] px-5 border-b border-ink-100">
        <Link to="/dashboard" aria-label="Dashboard home" onClick={onNavigate} className="flex items-center">
          <img src="/logo-wordmark.png" alt="Renate" className="h-8 w-auto" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <NavItems onNavigate={onNavigate} />
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* desktop rail */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-[240px] bg-white border-r border-ink-100">
        <SidebarInner />
      </aside>

      {/* mobile top bar */}
      <div className="md:hidden fixed inset-x-0 top-0 z-40 h-[64px] bg-white/90 backdrop-blur-sm border-b border-ink-100 flex items-center justify-between px-5">
        <Link to="/dashboard" aria-label="Dashboard home" className="flex items-center">
          <img src="/logo-wordmark.png" alt="Renate" className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <MobileAuth />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-ink-200 text-ink-800"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-ink-900/40"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white shadow-lift-2 transition-transform',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-end h-[64px] px-3 border-b border-ink-100">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-ink-200 text-ink-800"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarInner onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  )
}
