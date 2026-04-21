import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Users, ChevronRight, Plus } from 'lucide-react'
import { JOBS, VERDICT_TONE } from '../data/dashboardData'
import { usePostedJobs } from '../lib/postedJobs'
import PostJobModal from '../components/PostJobModal'
import { cn } from '../lib/cn'

const formatNum = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n))

const VERDICT_CLASS = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  amber: 'bg-amber-500/15 text-amber-700 ring-amber-500/30',
  rose:  'bg-rose-500/15 text-rose-700 ring-rose-500/30',
}

function topVerdict(job) {
  const best = [...job.candidates].sort((a, b) => b.atsScore - a.atsScore)[0]
  if (!best) return null
  return { verdict: best.verdict, tone: VERDICT_TONE[best.verdict] || VERDICT_TONE['Yes'] }
}

function JobRow({ job }) {
  const fillPct = Math.round((job.stats.shortlisted / 10) * 100)
  const top = topVerdict(job)

  return (
    <Link
      to={`/dashboard/jobs/${job.slug}`}
      className="group grid grid-cols-[1fr_auto] md:grid-cols-[minmax(240px,1.6fr)_120px_minmax(200px,1.4fr)_160px_110px_28px] gap-4 items-center px-5 py-3.5 hover:bg-ink-50/70 transition-colors"
    >
      <div className="min-w-0 flex flex-col">
        <span className="text-[13.5px] font-semibold text-ink-900 truncate">{job.title}</span>
        <span className="text-[11.5px] text-ink-500 truncate">{job.location} · {job.type}</span>
      </div>

      <span className="hidden md:inline-flex self-center text-[11.5px] text-ink-600 font-medium">{job.department}</span>

      <div className="hidden md:flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-mono tabular text-ink-500">
          <span>{formatNum(job.stats.sourced)}</span>
          <span className="text-ink-300">→</span>
          <span>{job.stats.qualified}</span>
          <span className="text-ink-300">→</span>
          <span>{job.stats.interviewed}</span>
          <span className="text-ink-300">→</span>
          <span className="text-ink-900 font-semibold">{job.stats.shortlisted}</span>
        </div>
        <div className="h-1 rounded-full bg-ink-100 overflow-hidden">
          <div className="h-full bg-ink-800 rounded-full" style={{ width: `${fillPct}%` }} />
        </div>
      </div>

      <div className="hidden md:flex items-center">
        {job.candidates.slice(0, 4).map((c, i) => (
          <div
            key={c.id}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ring-2 ring-white bg-ink-100 text-ink-700',
              i > 0 && '-ml-2',
            )}
          >
            {c.initials}
          </div>
        ))}
        <span className="ml-2 text-[11.5px] text-ink-500 inline-flex items-center gap-1">
          <Users size={11} /> {job.candidates.length}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2 justify-end">
        {top && (
          <span className={cn(
            'inline-flex items-center rounded-full ring-1 px-2 py-0.5 text-[11px] font-semibold',
            VERDICT_CLASS[top.tone.color],
          )}>
            {top.verdict}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 justify-end text-ink-300 group-hover:text-ink-600 transition-colors">
        <span className="text-[11px] text-ink-400 md:hidden">{job.postedAt}</span>
        <ChevronRight size={15} />
      </div>
    </Link>
  )
}

export default function JobsPage() {
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const postedJobs = usePostedJobs()

  const allJobs = useMemo(() => [...postedJobs, ...JOBS], [postedJobs])
  const departments = useMemo(() => ['All', ...new Set(allJobs.map((j) => j.department))], [allJobs])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allJobs.filter((j) => {
      if (dept !== 'All' && j.department !== dept) return false
      if (!q) return true
      return (
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      )
    })
  }, [query, dept, allJobs])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8 pt-8 md:pt-10 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] md:text-[26px] font-semibold text-ink-900 leading-tight">Jobs posted</h1>
            <p className="text-[13px] text-ink-500">{allJobs.length} open roles · {allJobs.reduce((n, j) => n + j.candidates.length, 0)} candidates</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, dept, location"
                className="w-full h-9 rounded-lg bg-white ring-1 ring-ink-200 focus:ring-ink-400 pl-8 pr-3 text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none transition"
              />
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex h-9 flex-none items-center gap-1.5 rounded-lg bg-ink-900 px-3.5 text-[13px] font-medium text-white hover:bg-brand-800 transition shadow-soft-1"
            >
              <Plus size={14} /> Post a job
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {departments.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDept(d)}
              className={cn(
                'rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors',
                dept === d
                  ? 'bg-ink-900 text-white'
                  : 'bg-white ring-1 ring-ink-200 text-ink-700 hover:bg-ink-50',
              )}
            >
              {d}
            </button>
          ))}
          <span className="ml-auto text-[11.5px] text-ink-400">
            Showing {filtered.length} of {allJobs.length}
          </span>
        </div>

        <div className="rounded-xl bg-white ring-1 ring-ink-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-[minmax(240px,1.6fr)_120px_minmax(200px,1.4fr)_160px_110px_28px] gap-4 px-5 py-2.5 border-b border-ink-100 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500 bg-ink-50/50">
            <span>Role</span>
            <span>Department</span>
            <span>Pipeline</span>
            <span>Candidates</span>
            <span className="text-right">Top verdict</span>
            <span></span>
          </div>

          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-[13px] text-ink-500">
              No roles match "{query}".
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {filtered.map((job) => (
                <li key={job.id}>
                  <JobRow job={job} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <PostJobModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  )
}
