import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Sidebar from './Sidebar'
import { clearSignedUp } from '../lib/auth'

function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
}

export default function AppShell() {
  useScrollToTop()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-ink-50/40 text-ink-800 font-display antialiased">
      <Sidebar />

      <div className="hidden md:block fixed top-5 right-6 z-30">
        <button
          type="button"
          onClick={() => { clearSignedUp(); navigate('/') }}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg ring-1 ring-ink-200 bg-white px-3 text-[13px] font-medium text-ink-700 hover:bg-ink-50 transition-colors"
        >
          <LogOut size={14} /> Log out
        </button>
      </div>

      <div className="md:pl-[240px] pt-[64px] md:pt-0">
        <Outlet />
      </div>
    </div>
  )
}
