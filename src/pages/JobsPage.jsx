import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Terminal, Palette, Compass, BrainCircuit, Briefcase, LineChart,
  Users, ArrowRight, Sparkles,
} from 'lucide-react'
import { JOBS } from '../data/dashboardData'
import { cn } from '../lib/cn'

const ICONS = {
  terminal:  Terminal,
  palette:   Palette,
  compass:   Compass,
  brain:     BrainCircuit,
  briefcase: Briefcase,
  chart:     LineChart,
}

const ACCENT = {
  brand: { tileBg: 'bg-brand-100', tileText: 'text-brand-800', badgeBg: 'bg-brand-50', badgeText: 'text-brand-800', fill: 'from-brand-700 to-brand-500' },
  rose:  { tileBg: 'bg-rose-100',  tileText: 'text-rose-700',  badgeBg: 'bg-rose-50',  badgeText: 'text-rose-700',  fill: 'from-rose-700 to-rose-400' },
  amber: { tileBg: 'bg-amber-100', tileText: 'text-amber-700', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', fill: 'from-amber-600 to-amber-400' },
  mint:  { tileBg: 'bg-mint-100',  tileText: 'text-mint-700',  badgeBg: 'bg-mint-100', badgeText: 'text-mint-700',  fill: 'from-mint-700 to-mint-500' },
}

const formatNum = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n))

function JobCard({ job }) {
  const Icon = ICONS[job.icon] || Briefcase
  const a = ACCENT[job.accent] || ACCENT.brand
  const fillPct = Math.round((job.stats.shortlisted / 10) * 100)

  return (
    <Link to={`/dashboard/jobs/${job.slug}`} className="group block">
      <div className="relative rounded-2xl bg-white ring-1 ring-ink-200 hover:ring-ink-300 shadow-soft-1 hover:shadow-lift-1 transition-shadow overflow-hidden">
        <div className="relative p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', a.tileBg, a.tileText)}>
              <Icon size={20} />
            </div>
            <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium', a.badgeBg, a.badgeText)}>
              {job.department}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[17px] font-semibold text-ink-900 leading-snug">{job.title}</h3>
            <p className="text-[12px] text-ink-500">{job.location} · {job.type} · {job.postedAt}</p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono tabular text-ink-500">
            <span>{formatNum(job.stats.sourced)} sourced</span>
            <span className="text-ink-300">→</span>
            <span>{job.stats.qualified} qualified</span>
            <span className="text-ink-300">→</span>
            <span>{job.stats.interviewed} interviewed</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono uppercase tracking-[0.14em] text-ink-500">Shortlisted</span>
              <span className="font-semibold text-ink-900 tabular">{job.stats.shortlisted} / 10</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-ink-100 overflow-hidden">
              <div
                className={cn('absolute inset-y-0 left-0 rounded-full bg-gradient-to-r', a.fill)}
                style={{ width: `${fillPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              {job.candidates.slice(0, 3).map((c, i) => (
                <div
                  key={c.id}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ring-2 ring-white',
                    a.tileBg, a.tileText,
                    i > 0 && '-ml-2',
                  )}
                >
                  {c.initials}
                </div>
              ))}
              <span className="ml-2 text-[11px] text-ink-500 inline-flex items-center gap-1">
                <Users size={11} /> {job.candidates.length} candidates
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-700 group-hover:text-brand-800 transition-colors">
              View <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function JobsPage() {
  const departments = ['All', ...new Set(JOBS.map((j) => j.department))]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8 pt-10 md:pt-14 pb-20">
        <div className="flex flex-col gap-4 mb-10">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
            <span className="text-eyebrow uppercase text-brand-700">Jobs posted</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-[clamp(1.8rem,1.2rem+1.6vw,2.4rem)] font-semibold text-ink-900 leading-tight max-w-2xl">
              Live pipelines you've opened
            </h1>
            <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-ink-200 px-3 py-1.5">
              <Sparkles size={14} className="text-brand-700" />
              <span className="text-[12px] font-medium text-ink-700">Renate is interviewing live</span>
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {departments.map((d, i) => (
              <button
                key={d}
                className={cn(
                  'rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors',
                  i === 0
                    ? 'bg-ink-900 text-white'
                    : 'bg-white ring-1 ring-ink-200 text-ink-700 hover:bg-ink-50',
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
