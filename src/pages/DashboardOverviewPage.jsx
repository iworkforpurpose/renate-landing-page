import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, ChevronRight, Plus, Briefcase } from 'lucide-react'
import { JOBS, VERDICT_TONE } from '../data/dashboardData'
import { getOrg } from '../lib/auth'
import { usePostedJobs } from '../lib/postedJobs'
import { cn } from '../lib/cn'
import PostJobModal from '../components/PostJobModal'

const VERDICT_CLASS = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  amber: 'bg-amber-500/15 text-amber-700 ring-amber-500/30',
  rose:  'bg-rose-500/15 text-rose-700 ring-rose-500/30',
}

const ACTIVITY = [
  { when: '12 min ago',  actor: 'Priya Desai',    action: 'completed voice interview',  target: 'Staff Backend Engineer',    tone: 'mint' },
  { when: '48 min ago',  actor: 'Renate',         action: 'shortlisted',                 target: 'Maya Linden · Senior Product Designer', tone: 'mint' },
  { when: '2 hrs ago',   actor: 'Jordan Brooks',  action: 'scheduled onsite',            target: 'Enterprise AE',             tone: 'ink' },
  { when: 'Yesterday',   actor: 'Renate',         action: 'flagged claim mismatch on',   target: 'Jess Tran · Staff Backend Engineer', tone: 'amber' },
  { when: 'Yesterday',   actor: 'Hanna Reeve',    action: 'accepted outreach for',       target: 'Head of Product',           tone: 'ink' },
  { when: '2 days ago',  actor: 'Renate',         action: 'rejected',                    target: 'Wade Harrison · RevOps Lead', tone: 'rose' },
]

function buildMetrics(allJobs) {
  return [
    { label: 'Active roles',           value: allJobs.length,                                           delta: '+1',    dir: 'up',   sub: 'vs. last week' },
    { label: 'Candidates in pipeline', value: allJobs.reduce((n, j) => n + j.stats.qualified, 0),       delta: '+184',  dir: 'up',   sub: 'vs. last week' },
    { label: 'Interviewed (7d)',       value: allJobs.reduce((n, j) => n + j.stats.interviewed, 0),    delta: '+22',   dir: 'up',   sub: 'vs. prior 7d' },
    { label: 'Time to shortlist',      value: '4.2d',                                                   delta: '-1.1d', dir: 'down', sub: 'vs. prior 7d' },
  ]
}

function fundinglessFormat(n) {
  if (typeof n !== 'number') return n
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return n.toLocaleString()
}

export default function DashboardOverviewPage() {
  const org = getOrg()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const postedJobs = usePostedJobs()
  const [modalOpen, setModalOpen] = useState(false)

  const allJobs = [...postedJobs, ...JOBS]
  const metrics = buildMetrics(allJobs)

  const totals = allJobs.reduce(
    (acc, j) => ({
      sourced:     acc.sourced     + j.stats.sourced,
      qualified:   acc.qualified   + j.stats.qualified,
      interviewed: acc.interviewed + j.stats.interviewed,
      shortlisted: acc.shortlisted + j.stats.shortlisted,
    }),
    { sourced: 0, qualified: 0, interviewed: 0, shortlisted: 0 },
  )
  const maxFunnel = totals.sourced || 1

  const topCandidates = allJobs.flatMap((j) => j.candidates.map((c) => ({ ...c, job: j })))
    .sort((a, b) => b.atsScore - a.atsScore)
    .slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8 pt-8 md:pt-10 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] md:text-[26px] font-semibold text-ink-900 leading-tight">
              {org?.name ? `${org.name} · Overview` : 'Overview'}
            </h1>
            <p className="text-[13px] text-ink-500">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[12px] text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
              <span>Renate active · 3 interviews in progress</span>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink-900 px-3.5 text-[13px] font-medium text-white hover:bg-brand-800 transition shadow-soft-1"
            >
              <Plus size={14} /> Post a job
            </button>
          </div>
        </div>

        {postedJobs.length > 0 && (
          <div className="rounded-xl bg-white ring-1 ring-ink-200 mb-6 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink-100">
              <h2 className="text-[13.5px] font-semibold text-ink-900">Your posted jobs</h2>
              <span className="text-[11.5px] text-ink-400">{postedJobs.length} new</span>
            </div>
            <ul className="divide-y divide-ink-100">
              {postedJobs.map((j) => (
                <li key={j.id} className="px-5 py-3.5 flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Briefcase size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-[13.5px] font-semibold text-ink-900 truncate">{j.title}</span>
                      <span className="text-[11.5px] text-ink-500">{j.location}</span>
                      <span className="text-ink-300 text-[11px]">·</span>
                      <span className="text-[11.5px] text-ink-500">{j.experience}</span>
                      <span className="text-ink-300 text-[11px]">·</span>
                      <span className="text-[11.5px] text-ink-500">{j.payRange}</span>
                    </div>
                    {j.summary && (
                      <p className="text-[12.5px] text-ink-600 mt-1 line-clamp-2">{j.summary}</p>
                    )}
                  </div>
                  <span className="text-[11px] text-ink-400 flex-none tabular">{j.postedAt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl bg-white ring-1 ring-ink-200 p-4 flex flex-col gap-2">
              <span className="text-[11.5px] text-ink-500">{m.label}</span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[26px] font-semibold tabular text-ink-900 leading-none">{m.value}</span>
                <span className={cn(
                  'inline-flex items-center gap-0.5 text-[11.5px] font-medium tabular',
                  m.dir === 'up' ? 'text-mint-700' : 'text-mint-700',
                )}>
                  {m.dir === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {m.delta}
                </span>
              </div>
              <span className="text-[11px] text-ink-400">{m.sub}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Pipeline funnel */}
          <div className="lg:col-span-1 rounded-xl bg-white ring-1 ring-ink-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13.5px] font-semibold text-ink-900">Pipeline</h2>
              <span className="text-[11px] text-ink-400">across {allJobs.length} roles</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { k: 'sourced',     l: 'Sourced' },
                { k: 'qualified',   l: 'Qualified' },
                { k: 'interviewed', l: 'Interviewed' },
                { k: 'shortlisted', l: 'Shortlisted' },
              ].map(({ k, l }) => {
                const v = totals[k]
                const pct = Math.max(2, Math.round((v / maxFunnel) * 100))
                return (
                  <div key={k} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-ink-600">{l}</span>
                      <span className="font-mono tabular text-ink-900">{fundinglessFormat(v)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                      <div className="h-full bg-ink-800 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div className="lg:col-span-2 rounded-xl bg-white ring-1 ring-ink-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13.5px] font-semibold text-ink-900">Recent activity</h2>
              <Link to="/dashboard/candidates" className="text-[12px] font-medium text-ink-600 hover:text-ink-900 inline-flex items-center gap-1">
                View candidates <ChevronRight size={13} />
              </Link>
            </div>
            <ul className="flex flex-col">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-start gap-3 py-2.5 border-b border-ink-100 last:border-b-0">
                  <span className={cn(
                    'mt-1 h-1.5 w-1.5 flex-none rounded-full',
                    a.tone === 'mint'  && 'bg-mint-500',
                    a.tone === 'amber' && 'bg-amber-500',
                    a.tone === 'rose'  && 'bg-rose-500',
                    a.tone === 'ink'   && 'bg-ink-400',
                  )} />
                  <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-[13px] font-medium text-ink-900">{a.actor}</span>
                    <span className="text-[13px] text-ink-600">{a.action}</span>
                    <span className="text-[13px] text-ink-900">{a.target}</span>
                  </div>
                  <span className="text-[11.5px] text-ink-400 flex-none tabular">{a.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top candidates */}
        <div className="rounded-xl bg-white ring-1 ring-ink-200 mt-5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink-100">
            <h2 className="text-[13.5px] font-semibold text-ink-900">Top candidates this week</h2>
            <Link to="/dashboard/candidates" className="text-[12px] font-medium text-ink-600 hover:text-ink-900 inline-flex items-center gap-1">
              All candidates <ChevronRight size={13} />
            </Link>
          </div>
          <ul className="divide-y divide-ink-100">
            {topCandidates.map((c) => {
              const tone = VERDICT_TONE[c.verdict] || VERDICT_TONE['Yes']
              return (
                <li key={`${c.job.slug}-${c.id}`}>
                  <Link
                    to={`/dashboard/jobs/${c.job.slug}/${c.slug}`}
                    className="grid grid-cols-[36px_1fr_auto_auto] md:grid-cols-[36px_1.6fr_1fr_80px_110px_20px] gap-4 items-center px-5 py-3 hover:bg-ink-50/70 transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-700 text-[11px] font-semibold">
                      {c.initials}
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="text-[13px] font-semibold text-ink-900 truncate">{c.name}</span>
                      <span className="text-[11.5px] text-ink-500 truncate">{c.currentRole}</span>
                    </div>
                    <span className="hidden md:block text-[12px] text-ink-700 truncate">{c.job.title}</span>
                    <span className="hidden md:inline-flex justify-self-end font-mono text-[13px] tabular text-ink-900">{c.atsScore}</span>
                    <span className={cn(
                      'hidden md:inline-flex items-center rounded-full ring-1 px-2 py-0.5 text-[11px] font-semibold justify-self-end',
                      VERDICT_CLASS[tone.color],
                    )}>
                      {c.verdict}
                    </span>
                    <ChevronRight size={14} className="text-ink-300 justify-self-end" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <PostJobModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  )
}
