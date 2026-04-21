import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Search, ArrowUpDown } from 'lucide-react'
import ScoreBar from '../components/primitives/ScoreBar'
import { JOBS, VERDICT_TONE } from '../data/dashboardData'
import { cn } from '../lib/cn'

const VERDICT_CLASS = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  amber: 'bg-amber-500/15 text-amber-700 ring-amber-500/30',
  rose:  'bg-rose-500/15 text-rose-700 ring-rose-500/30',
}

const SORT_OPTIONS = [
  { key: 'ats',   label: 'ATS score' },
  { key: 'call',  label: 'Call score' },
  { key: 'name',  label: 'Name' },
]

function flattenCandidates() {
  const rows = []
  for (const job of JOBS) {
    for (const c of job.candidates) {
      rows.push({ ...c, job: { slug: job.slug, title: job.title, department: job.department } })
    }
  }
  return rows
}

export default function CandidatesPage() {
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [verdict, setVerdict] = useState('All')
  const [sortKey, setSortKey] = useState('ats')
  const [sortDir, setSortDir] = useState('desc')

  const all = useMemo(() => flattenCandidates(), [])
  const departments = useMemo(() => ['All', ...new Set(JOBS.map((j) => j.department))], [])
  const verdicts = ['All', 'Strong Yes', 'Yes', 'Maybe', 'No']

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = all.filter((c) => {
      if (dept !== 'All' && c.job.department !== dept) return false
      if (verdict !== 'All' && c.verdict !== verdict) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.currentRole.toLowerCase().includes(q) ||
        c.job.title.toLowerCase().includes(q)
      )
    })
    const mul = sortDir === 'desc' ? -1 : 1
    filtered.sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name) * mul
      if (sortKey === 'call') return (a.callScore - b.callScore) * mul
      return (a.atsScore - b.atsScore) * mul
    })
    return filtered
  }, [all, query, dept, verdict, sortKey, sortDir])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    else { setSortKey(key); setSortDir('desc') }
  }

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
            <h1 className="text-[22px] md:text-[26px] font-semibold text-ink-900 leading-tight">Candidates</h1>
            <p className="text-[13px] text-ink-500">
              {rows.length} of {all.length} across {JOBS.length} jobs
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, role, or job"
              className="w-full h-9 rounded-lg bg-white ring-1 ring-ink-200 focus:ring-ink-400 pl-8 pr-3 text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
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
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {verdicts.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVerdict(v)}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors',
                  verdict === v
                    ? 'bg-ink-900 text-white'
                    : 'bg-white ring-1 ring-ink-200 text-ink-700 hover:bg-ink-50',
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white ring-1 ring-ink-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-[44px_1.4fr_1fr_140px_90px_110px_20px] gap-4 items-center px-5 py-2.5 border-b border-ink-100 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500 bg-ink-50/50">
            <span></span>
            <button onClick={() => toggleSort('name')} className="text-left inline-flex items-center gap-1 hover:text-ink-900">
              Candidate <ArrowUpDown size={10} className={cn(sortKey === 'name' && 'text-ink-900')} />
            </button>
            <span>Role</span>
            <button onClick={() => toggleSort('call')} className="text-left inline-flex items-center gap-1 hover:text-ink-900">
              Call score <ArrowUpDown size={10} className={cn(sortKey === 'call' && 'text-ink-900')} />
            </button>
            <button onClick={() => toggleSort('ats')} className="text-left inline-flex items-center gap-1 hover:text-ink-900">
              ATS <ArrowUpDown size={10} className={cn(sortKey === 'ats' && 'text-ink-900')} />
            </button>
            <span>Verdict</span>
            <span></span>
          </div>

          {rows.length === 0 ? (
            <div className="px-5 py-12 text-center text-[13px] text-ink-500">
              No candidates match your filters.
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {rows.map((c) => {
                const tone = VERDICT_TONE[c.verdict] || VERDICT_TONE['Yes']
                return (
                  <li key={`${c.job.slug}-${c.id}`}>
                    <Link
                      to={`/dashboard/jobs/${c.job.slug}/${c.slug}`}
                      className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[44px_1.4fr_1fr_140px_90px_110px_20px] gap-4 items-center px-4 md:px-5 py-3 hover:bg-ink-50/70 transition-colors"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-700 text-[11px] font-semibold">
                        {c.initials}
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <span className="text-[13px] font-semibold text-ink-900 truncate">{c.name}</span>
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
                      <span className="hidden md:block font-mono text-[13px] tabular text-ink-900">{c.atsScore}</span>
                      <span className={cn('hidden md:inline-flex items-center rounded-full ring-1 px-2 py-0.5 text-[11px] font-semibold', VERDICT_CLASS[tone.color])}>
                        {c.verdict}
                      </span>
                      <ChevronRight size={14} className="text-ink-300 group-hover:text-ink-600 transition-colors justify-self-end" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}
