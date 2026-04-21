import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Terminal, Palette, Compass, BrainCircuit, Briefcase, LineChart,
  ArrowLeft, ChevronRight, Sparkles,
} from 'lucide-react'
import ScoreBar from '../components/primitives/ScoreBar'
import { getJobBySlug, VERDICT_TONE } from '../data/dashboardData'
import { cn } from '../lib/cn'

const ICONS = {
  terminal: Terminal, palette: Palette, compass: Compass,
  brain: BrainCircuit, briefcase: Briefcase, chart: LineChart,
}

const VERDICT_CLASS = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  amber: 'bg-amber-500/15 text-amber-700 ring-amber-500/30',
  rose:  'bg-rose-500/15 text-rose-700 ring-rose-500/30',
}

export default function JobDetailPage() {
  const { jobId } = useParams()
  const job = getJobBySlug(jobId)

  if (!job) return <Navigate to="/dashboard/jobs" replace />

  const Icon = ICONS[job.icon] || Briefcase

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8 pt-8 md:pt-12 pb-20">
        <Link
          to="/dashboard/jobs"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 hover:text-ink-900 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Jobs posted
        </Link>

        {/* Header */}
        <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 overflow-hidden mb-8">
          <div className="p-6 md:p-8 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                <Icon size={24} />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-700">{job.department}</span>
                <h1 className="text-[clamp(1.4rem,1rem+1.2vw,2rem)] font-semibold text-ink-900 leading-tight">{job.title}</h1>
                <span className="text-[12px] text-ink-500 mt-1">{job.location} · {job.type} · Posted {job.postedAt}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-ink-200 px-3 py-1.5">
                <Sparkles size={14} className="text-brand-700" />
                <span className="text-[12px] font-medium text-ink-700">Live</span>
                <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
              </div>
            </div>
            <p className="text-ink-700 text-[0.95rem] max-w-2xl">{job.summary}</p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[12px] font-mono tabular text-ink-500">
              <span>{job.stats.sourced.toLocaleString()} sourced</span>
              <span className="text-ink-300">→</span>
              <span>{job.stats.qualified} qualified</span>
              <span className="text-ink-300">→</span>
              <span>{job.stats.interviewed} interviewed</span>
              <span className="text-ink-300">→</span>
              <span className="rounded-md bg-brand-50 px-2 py-0.5 font-semibold text-brand-800">
                {job.stats.shortlisted} shortlisted
              </span>
            </div>
          </div>
        </div>

        {/* Candidate list */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink-500">Shortlisted candidates</h2>
          <span className="text-[12px] text-ink-500">{job.candidates.length} selected</span>
        </div>

        <ul className="flex flex-col gap-3">
          {job.candidates.map((c) => {
            const tone = VERDICT_TONE[c.verdict] || VERDICT_TONE['Yes']
            return (
              <li key={c.id}>
                <Link
                  to={`/dashboard/jobs/${job.slug}/${c.slug}`}
                  className="group block rounded-2xl bg-white ring-1 ring-ink-200 hover:ring-ink-300 shadow-soft-1 hover:shadow-lift-1 transition-shadow p-4 md:p-5"
                >
                  <div className="grid grid-cols-[44px_1fr_auto] md:grid-cols-[56px_1.4fr_1fr_140px_140px_auto] gap-4 items-center">
                    <div className="flex h-11 md:h-12 w-11 md:w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-800 text-[13px] font-semibold">
                      {c.initials}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-semibold text-ink-900 truncate">{c.name}</span>
                      <span className="text-[12px] text-ink-500 truncate">{c.currentRole}</span>
                      <div className="flex md:hidden items-center gap-2 mt-1">
                        <span className={cn('inline-flex items-center gap-1 rounded-full ring-1 px-2 py-0.5 text-[10px] font-semibold', VERDICT_CLASS[tone.color])}>
                          {c.verdict}
                        </span>
                        <span className="font-mono text-[11px] text-ink-500">ATS {c.atsScore}</span>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-1.5 flex-wrap">
                      {c.companies.map((co) => (
                        <span key={co} className="text-[10px] rounded-md bg-ink-100/70 px-1.5 py-0.5 text-ink-600">
                          {co}
                        </span>
                      ))}
                    </div>

                    <div className="hidden md:flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink-500">Resume</span>
                      <ScoreBar value={c.resumeScore} variant="muted" showValue />
                    </div>

                    <div className="hidden md:flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink-500">Call</span>
                      <ScoreBar value={c.callScore} variant="brand" showValue />
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink-500">ATS</span>
                        <span className="text-[18px] font-semibold tabular text-ink-900">{c.atsScore}</span>
                      </div>
                      <span className={cn('inline-flex items-center gap-1 rounded-full ring-1 px-2.5 py-1 text-[11px] font-semibold', VERDICT_CLASS[tone.color])}>
                        {c.verdict}
                      </span>
                    </div>

                    <ChevronRight size={18} className="text-ink-300 group-hover:text-brand-700 transition-colors justify-self-end md:hidden" />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}
