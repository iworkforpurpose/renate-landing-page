import { motion } from 'framer-motion'
import { Check, AlertTriangle, ChevronRight, Filter, Search, Sparkles } from 'lucide-react'
import MockupFrame from '../primitives/MockupFrame'
import { cn } from '../../lib/cn'

const ROWS = [
  { initials: 'PD', name: 'Priya Desai',   role: 'Staff Backend Eng', co: ['Stripe', 'Segment'],    resume: 94, call: 97, status: 'verified', verdict: 'Strong Yes', tone: 'mint',  expanded: true },
  { initials: 'MK', name: 'Marcus Koh',    role: 'Staff Backend Eng', co: ['Airbnb', 'Robinhood'],  resume: 91, call: 89, status: 'verified', verdict: 'Yes',         tone: 'mint' },
  { initials: 'AN', name: 'Aarav Narayan', role: 'Sr. Backend Eng',   co: ['Ramp'],                 resume: 88, call: 92, status: 'verified', verdict: 'Yes',         tone: 'mint' },
  { initials: 'JT', name: 'Jess Tran',     role: 'Staff Backend Eng', co: ['Notion', 'Figma'],      resume: 86, call: 74, status: 'flagged',  verdict: 'Maybe',       tone: 'amber' },
  { initials: 'OB', name: 'Omar Baksh',    role: 'Staff Backend Eng', co: ['Datadog'],              resume: 82, call: 85, status: 'verified', verdict: 'Yes',         tone: 'mint' },
]

const ScoreBar = ({ value, variant = 'brand' }) => (
  <div className="flex items-center gap-2">
    <div className="relative h-1.5 w-20 md:w-24 rounded-full bg-ink-100 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={cn(
          'absolute inset-y-0 left-0 rounded-full',
          variant === 'brand'
            ? 'bg-gradient-to-r from-brand-700 to-brand-500'
            : 'bg-gradient-to-r from-ink-400 to-ink-300',
        )}
      />
    </div>
    <span className="font-mono text-[12px] tabular text-ink-800 w-6 text-right">{value}</span>
  </div>
)

const StatusPill = ({ status }) => {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-mint-100 px-2 py-0.5 text-[11px] font-medium text-mint-700">
        <Check size={11} strokeWidth={3} /> Verified
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
      <AlertTriangle size={11} /> Flagged
    </span>
  )
}

const Waveform = () => {
  const bars = Array.from({ length: 56 })
  return (
    <div className="flex items-end gap-[2px] h-6 w-full">
      {bars.map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.8)) * 80 + (i % 5 === 0 ? 15 : 0)
        return (
          <span
            key={i}
            className="w-[2px] rounded-full bg-gradient-to-t from-brand-400 to-brand-600"
            style={{ height: `${Math.min(100, h)}%` }}
          />
        )
      })}
    </div>
  )
}

export default function ShortlistDashboard({ className }) {
  return (
    <MockupFrame variant="browser" url="renate.app/shortlists/staff-backend-eng" className={cn('w-full', className)}>
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-5 py-3 border-b border-ink-100 bg-ink-50/40">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-white">
            <Sparkles size={14} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-ink-900 truncate">Staff Backend Engineer</span>
            <span className="text-[11px] text-ink-500 tabular">247 sourced · 50 screened · 10 shortlisted</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 h-7 px-2.5 text-[11px] font-medium text-ink-600 rounded-md ring-1 ring-ink-200 hover:bg-white">
            <Filter size={12} /> Verified only
          </button>
          <button className="inline-flex items-center gap-1.5 h-7 px-2.5 text-[11px] font-medium text-ink-600 rounded-md ring-1 ring-ink-200 hover:bg-white">
            <Search size={12} /> Search
          </button>
        </div>
      </div>

      {/* breadcrumb funnel */}
      <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 border-b border-ink-100 bg-white text-[11px] tabular text-ink-500">
        <span>10,400 sourced</span>
        <span className="text-ink-300">→</span>
        <span>540 qualified</span>
        <span className="text-ink-300">→</span>
        <span>50 interviewed</span>
        <span className="text-ink-300">→</span>
        <span className="rounded-md bg-brand-50 px-1.5 py-0.5 font-semibold text-brand-800">10 shortlisted</span>
      </div>

      {/* table header */}
      <div className="hidden md:grid grid-cols-[40px_1.6fr_1fr_120px_120px_100px_24px] gap-3 items-center px-5 py-2 border-b border-ink-100 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500">
        <span></span>
        <span>Candidate</span>
        <span>Current</span>
        <span>Resume score</span>
        <span>Call score</span>
        <span>Status</span>
        <span></span>
      </div>

      {/* rows */}
      <ul className="divide-y divide-ink-100">
        {ROWS.map((r, i) => (
          <li key={r.initials} className="group">
            <div
              className={cn(
                'grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1.6fr_1fr_120px_120px_100px_24px] gap-3 items-center px-4 md:px-5 py-3 transition-colors',
                r.expanded ? 'bg-brand-50/40' : 'hover:bg-ink-50/70',
              )}
            >
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-semibold',
                r.tone === 'mint' ? 'bg-brand-100 text-brand-800' : 'bg-amber-100 text-amber-700',
              )}>
                {r.initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-ink-900 truncate">{r.name}</span>
                <span className="text-[11px] text-ink-500 md:hidden tabular">R {r.resume} · C {r.call}</span>
                <div className="hidden md:flex items-center gap-1.5 mt-0.5">
                  {r.co.map(c => (
                    <span key={c} className="text-[10px] rounded-md bg-ink-100/70 px-1.5 py-0.5 text-ink-600">{c}</span>
                  ))}
                </div>
              </div>
              <span className="hidden md:block text-[12px] text-ink-600">{r.role}</span>
              <div className="hidden md:block"><ScoreBar value={r.resume} variant="muted" /></div>
              <div className="hidden md:block"><ScoreBar value={r.call} /></div>
              <div className="hidden md:block"><StatusPill status={r.status} /></div>
              <ChevronRight size={16} className="text-ink-300 justify-self-end" />
            </div>

            {/* drawer peek */}
            {r.expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="overflow-hidden border-t border-brand-200/40 bg-gradient-to-b from-brand-50/60 to-white"
              >
                <div className="px-4 md:px-5 py-4 grid md:grid-cols-[1fr_220px] gap-4 items-start">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">Transcript · 00:48</span>
                      <span className="text-[10px] text-brand-700 font-medium">↳ row expanded</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-ink-800">
                      <span className="font-semibold text-brand-800">Renate:</span>{' '}
                      You listed Kafka at Stripe — which team owned the clusters?
                    </p>
                    <p className="text-[13px] leading-relaxed text-ink-800 mt-1">
                      <span className="font-semibold text-ink-900">Priya:</span>{' '}
                      Payments infra. I led the partition rebalancing for EU expansion.
                      <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-mint-100 px-1.5 py-0.5 text-[10px] font-medium text-mint-700">
                        <Check size={9} strokeWidth={3} /> Verified
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Waveform />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-ink-500 tabular">Resume 94 → Call 97</span>
                      <span className="rounded-full bg-mint-500/15 px-2 py-0.5 text-mint-700 font-semibold">Strong Yes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </li>
        ))}
      </ul>

      {/* footer strip */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-t border-ink-100 bg-ink-50/40 text-[11px] text-ink-500">
        <span className="tabular">Calibrated against 3 batches · fairness check passed</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 ring-1 ring-ink-200">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse" />
          <span className="font-medium text-ink-700">Live</span>
        </span>
      </div>
    </MockupFrame>
  )
}
