import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import Section from './primitives/Section'
import { viewport } from '../lib/motion'
import { cn } from '../lib/cn'

// TODO(user): replace DEMO_VIDEO_URL with your Loom / YouTube / Wistia embed URL.
// Use `?autoplay=1` suffix (or the equivalent for your provider) to auto-start inside the modal.
const DEMO_VIDEO_URL = 'https://www.loom.com/embed/REPLACE_ME?autoplay=1'

const CHAPTERS = [
  { time: '0:00', label: 'Submit',    t: 0   },
  { time: '0:32', label: 'Screen',    t: 32  },
  { time: '1:08', label: 'Shortlist', t: 68  },
]

export default function SeeItRun() {
  const [open, setOpen] = useState(false)
  const [chapter, setChapter] = useState(0)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const openAt = (i) => { setChapter(i); setOpen(true) }

  return (
    <Section
      id="see-it-run"
      bg="white"
      eyebrow="See it run"
      title={<>Watch Renate process a real role, <span className="text-gradient">end to end.</span></>}
      lede="90 seconds. One live-recorded pass: form submitted → sourced → ranked → called → shortlisted. No cuts."
      align="center"
    >
      {/* video poster */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => openAt(0)}
        className="group relative w-full max-w-[980px] mx-auto block rounded-2xl overflow-hidden ring-1 ring-ink-100 shadow-lift-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label="Play product demo"
      >
        {/* poster backdrop — tinted gradient + dot grid (no external image dependency) */}
        <div className="relative aspect-video bg-gradient-to-br from-brand-900 via-brand-800 to-ink-900">
          <div aria-hidden className="absolute inset-0 dot-grid-bg-dark opacity-40" />
          <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-[360px] w-[720px] rounded-full bg-brand-500/25 blur-3xl" />

          {/* fake UI frame preview */}
          <div aria-hidden className="absolute inset-6 md:inset-10 rounded-xl ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 h-8 px-3 border-b border-white/10 bg-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-3 text-[10px] font-mono text-white/40 tabular">renate.app/shortlist/staff-backend-eng</span>
            </div>
            <div className="p-4 md:p-5 flex flex-col gap-2 text-white/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-6 w-6 rounded-md bg-brand-500/30 ring-1 ring-brand-400/40" />
                <div className="h-2 w-40 rounded-full bg-white/10" />
                <div className="ml-auto h-2 w-20 rounded-full bg-white/10" />
              </div>
              {[90, 75, 82, 60, 70].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-white/10" />
                  <div className="h-1.5 w-24 rounded-full bg-white/10" />
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-brand-400 to-brand-200" style={{ width: `${w}px` }} />
                  <div className="ml-auto h-1.5 w-10 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-lift-2 transition-transform duration-300 ease-out-expo group-hover:scale-105">
              <span aria-hidden className="absolute inset-0 rounded-full bg-white animate-ping opacity-25" />
              <Play size={26} className="text-brand-800 ml-1" fill="currentColor" />
            </span>
          </div>

          {/* duration badge */}
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 px-2.5 py-1 text-[11px] font-mono text-white ring-1 ring-white/10">
            <Clock size={11} /> 1:30
          </div>
        </div>
      </motion.button>

      {/* chapter marks */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.label}
            onClick={() => openAt(i)}
            className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-3 py-1.5 ring-1 ring-ink-100 text-[12px] text-ink-700 hover:ring-brand-200 hover:bg-white transition-colors"
          >
            <span className="font-mono tabular text-ink-500">{c.time}</span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="font-medium">{c.label}</span>
          </button>
        ))}
      </div>

      {/* modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-ink-900/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 bg-ink-900 shadow-panel-dark"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close demo"
                className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 ring-1 ring-white/20"
              >
                <X size={16} />
              </button>
              <iframe
                title="Renate product demo"
                src={`${DEMO_VIDEO_URL}${DEMO_VIDEO_URL.includes('?') ? '&' : '?'}t=${CHAPTERS[chapter].t}`}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
