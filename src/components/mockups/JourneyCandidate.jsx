import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Globe, ScanLine, Scale, Phone, ShieldCheck, ListOrdered, Calendar, Video, NotebookPen } from 'lucide-react'
import MockupFrame from '../primitives/MockupFrame'

export const JOURNEY_STAGES = [
  {
    key: 'submit',   icon: FileText,        title: 'Submit',        sub: 'Role, must-haves, nice-to-haves.',
    body: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between"><span className="text-[11px] text-white/60">Role</span><span className="text-[12px] font-semibold text-white">Staff Backend Engineer</span></div>
        <div className="flex items-center justify-between"><span className="text-[11px] text-white/60">Must-haves</span><span className="flex gap-1"><span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">Go</span><span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">Kafka</span><span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">5+ YoE</span></span></div>
        <div className="flex items-center justify-between"><span className="text-[11px] text-white/60">Weights</span><span className="font-mono text-[11px] tabular text-white/80">skills 35 · exp 25 · proj 25 · traj 15</span></div>
      </div>
    ),
  },
  {
    key: 'source',   icon: Globe,           title: 'Source',        sub: 'Across public profiles, not a passive inbox.',
    body: (
      <div className="flex flex-col gap-2">
        <div className="text-[12px] text-white/80">Found via open-web sourcing</div>
        <div className="flex flex-wrap gap-1.5">
          {['LinkedIn', 'GitHub', 'RepVue', 'Confs'].map(s => (
            <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] ring-1 ring-white/10">{s}</span>
          ))}
        </div>
        <div className="font-mono text-[10px] tabular text-white/50">10,400 candidates scanned this pass</div>
      </div>
    ),
  },
  {
    key: 'parse',    icon: ScanLine,        title: 'Parse',         sub: 'Every resume normalized into structured evidence.',
    body: (
      <div className="flex flex-wrap gap-1">
        {['Stripe · Staff', '2022–2025', 'Kafka', 'Go', 'Payments', 'EU expansion', 'p99 → 90ms'].map(c => (
          <span key={c} className="rounded-md bg-brand-500/15 px-2 py-0.5 text-[10px] text-brand-200 ring-1 ring-brand-400/30">{c}</span>
        ))}
      </div>
    ),
  },
  {
    key: 'score',    icon: Scale,           title: 'Score',         sub: 'Four stages, no keywords.',
    body: (
      <div className="flex flex-col gap-1.5">
        {[['Skills', 9.1], ['Impact', 8.8], ['Fit', 9.0], ['Recency', 8.4]].map(([l, v]) => (
          <div key={l} className="flex items-center gap-2">
            <span className="text-[10px] text-white/60 w-14">{l}</span>
            <div className="flex-1 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-200" style={{ width: `${v * 10}%` }} /></div>
            <span className="font-mono text-[10px] tabular text-white w-6 text-right">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: 'select',   icon: ListOrdered,     title: 'Select',        sub: 'Top 10 chosen from top 50.',
    body: (
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Rank</span>
          <span className="text-[22px] font-semibold tabular text-white">03<span className="text-white/40 text-[12px]"> / 10</span></span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Weighted</span>
          <p className="text-[22px] font-semibold tabular text-white">91</p>
        </div>
      </div>
    ),
  },
  {
    key: 'call',     icon: Phone,           title: 'Call',          sub: 'Voice-interviews, adaptive and real.',
    body: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-mint-500 animate-ping opacity-60" /><span className="relative h-2 w-2 rounded-full bg-mint-500" /></span>
          <span className="text-[11px] text-white/70">Live · 18:42</span>
        </div>
        <div className="flex items-end gap-[2px] h-6">
          {Array.from({ length: 44 }).map((_, i) => (
            <span key={i} className="w-[2px] rounded-full bg-gradient-to-t from-brand-400 to-brand-200" style={{ height: `${30 + Math.abs(Math.sin(i * 0.6)) * 60}%` }} />
          ))}
        </div>
        <div className="text-[11px] text-white/80">“Payments infra — led the partition rebalancing.”</div>
      </div>
    ),
  },
  {
    key: 'verify',   icon: ShieldCheck,     title: 'Verify',        sub: 'Claims checked before the shortlist.',
    body: (
      <ul className="flex flex-col gap-1.5">
        {[['EU rebalancing', 'verified'], ['p99 → 90ms', 'verified'], ['Team size 7', 'flagged'], ['CS · Georgia Tech', 'verified']].map(([l, s]) => (
          <li key={l} className="flex items-center justify-between text-[11px]">
            <span className="text-white/80">{l}</span>
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${s === 'verified' ? 'bg-mint-500/15 text-mint-500' : 'bg-amber-500/15 text-amber-500'}`}>{s}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    key: 'shortlist',icon: ListOrdered,     title: 'Shortlist',     sub: 'Evidence-backed, ranked, ready to invite.',
    body: (
      <div className="flex items-center justify-between rounded-lg bg-brand-500/15 ring-1 ring-brand-400/40 px-3 py-2">
        <div><span className="text-[10px] font-mono uppercase tracking-wider text-brand-200">Position</span><p className="text-[16px] font-semibold text-white">#3 of 10 shortlisted</p></div>
        <span className="rounded-full bg-mint-500/15 px-2 py-0.5 text-[11px] font-semibold text-mint-500">Strong Yes</span>
      </div>
    ),
  },
  {
    key: 'schedule', icon: Calendar,        title: 'Schedule',      sub: 'Calendars booked, reminders sent.',
    body: (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-md bg-white/5 px-2.5 py-1.5 ring-1 ring-white/10">
          <Video size={12} className="text-white/60" />
          <span className="text-[11px] text-white/80">Thu · 2:30 PM PT · 45 min</span>
          <span className="ml-auto text-[10px] text-mint-500 font-semibold">invited</span>
        </div>
        <div className="text-[10px] font-mono tabular text-white/50">Calendar + meeting link + reminders sent.</div>
      </div>
    ),
  },
  {
    key: 'notes',    icon: NotebookPen,     title: 'Sit in & take notes', sub: 'You show up. Renate captures everything.',
    body: (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse" /><span className="text-[11px] text-white/70">Transcribing live · speakers labeled</span></div>
        <div className="text-[11px] text-white/80 italic">“Summary, action items, and consistency check delivered after the call.”</div>
      </div>
    ),
  },
]

export default function JourneyCandidate({ stageIndex = 0 }) {
  const stage = JOURNEY_STAGES[Math.max(0, Math.min(stageIndex, JOURNEY_STAGES.length - 1))]
  const Icon = stage.icon

  return (
    <MockupFrame dark className="w-full" frameClassName="p-5 md:p-6 min-h-[320px]">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-white font-semibold text-[13px]">PD</div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[13px] font-semibold text-white">Priya Desai</span>
          <span className="text-[11px] text-white/50">Staff Backend Engineer · Stripe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20 text-brand-200 ring-1 ring-brand-400/40">
            <Icon size={13} />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">Stage</span>
            <span className="text-[12px] font-semibold text-white">{stage.title}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[12px] text-white/60 mb-3">{stage.sub}</p>
          <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/10 p-3">
            {stage.body}
          </div>
        </motion.div>
      </AnimatePresence>
    </MockupFrame>
  )
}
