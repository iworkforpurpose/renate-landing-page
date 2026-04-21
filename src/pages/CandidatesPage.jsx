import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Users } from 'lucide-react'
import ScoreBar from '../components/primitives/ScoreBar'
import { JOBS, VERDICT_TONE } from '../data/dashboardData'
import { cn } from '../lib/cn'

const VERDICT_CLASS = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  amber: 'bg-amber-500/15 text-amber-700 ring-amber-500/30',
  rose:  'bg-rose-500/15 text-rose-700 ring-rose-500/30',
}

function flattenCandidates() {
  const rows = []
  for (const job of JOBS) {
    for (const c of job.candidates) {
      rows.push({ ...c, job: { slug: job.slug, title: job.title, department: job.department } })
    }
  }
  return rows.sort((a, b) => b.atsScore - a.atsScore)
}

export default function CandidatesPage() {
  const rows = flattenCandidates()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8 pt-10 md:pt-14 pb-20">
        <div className="flex flex-col gap-2 mb-8">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
            <span className="text-eyebrow uppercase text-brand-700">Candidates</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-[clamp(1.8rem,1.2rem+1.6vw,2.4rem)] font-semibold text-ink-900 leading-tight">
              All candidates
            </h1>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-500">
              <Users size={13} /> {rows.length} across {JOBS.length} job{JOBS.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 overflow-hidden">
          <div className="hidden md:grid grid-cols-[48px_1.4fr_1fr_140px_100px_120px_24px] gap-4 items-center px-5 py-3 border-b border-ink-100 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500 bg-ink-50/40">
            <span></span>
            <span>Candidate</span>
            <span>Role</span>
            <span>Call score</span>
            <span>ATS</span>
            <span>Verdict</span>
            <span></span>
          </div>

          <ul className="divide-y divide-ink-100">
            {rows.map((c) => {
              const tone = VERDICT_TONE[c.verdict] || VERDICT_TONE['Yes']
              return (
                <li key={`${c.job.slug}-${c.id}`}>
                  <Link
                    to={`/dashboard/jobs/${c.job.slug}/${c.slug}`}
                    className="group grid grid-cols-[44px_1fr_auto] md:grid-cols-[48px_1.4fr_1fr_140px_100px_120px_24px] gap-4 items-center px-4 md:px-5 py-3 hover:bg-ink-50/70 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-800 text-[12px] font-semibold">
                      {c.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] font-semibold text-ink-900 truncate">{c.name}</span>
                      <span className="text-[11.5px] text-ink-500 truncate">{c.currentRole}</span>
                      <div className="flex md:hidden items-center gap-2 mt-1">
                        <span className={cn('inline-flex items-center rounded-full ring-1 px-2 py-0.5 text-[10px] font-semibold', VERDICT_CLASS[tone.color])}>
                          {c.verdict}
                        </span>
                        <span className="font-mono text-[11px] text-ink-500">ATS {c.atsScore}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col min-w-0">
                      <span className="text-[12px] text-ink-700 truncate">{c.job.title}</span>
                      <span className="text-[11px] text-ink-500 truncate">{c.job.department}</span>
                    </div>
                    <div className="hidden md:block">
                      <ScoreBar value={c.callScore} variant="brand" showValue />
                    </div>
                    <span className="hidden md:block font-mono text-[14px] tabular text-ink-900">{c.atsScore}</span>
                    <span className={cn('hidden md:inline-flex items-center rounded-full ring-1 px-2.5 py-1 text-[11px] font-semibold', VERDICT_CLASS[tone.color])}>
                      {c.verdict}
                    </span>
                    <ChevronRight size={16} className="text-ink-300 group-hover:text-brand-700 transition-colors justify-self-end" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
