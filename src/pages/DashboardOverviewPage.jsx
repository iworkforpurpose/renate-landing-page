import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, Users, Sparkles, ArrowRight } from 'lucide-react'
import { JOBS } from '../data/dashboardData'

export default function DashboardOverviewPage() {
  const totalJobs = JOBS.length
  const totalCandidates = JOBS.reduce((n, j) => n + j.candidates.length, 0)
  const totalShortlisted = JOBS.reduce((n, j) => n + j.stats.shortlisted, 0)
  const totalInterviewed = JOBS.reduce((n, j) => n + j.stats.interviewed, 0)

  const stats = [
    { label: 'Jobs posted',   value: totalJobs,         icon: Briefcase },
    { label: 'Candidates',    value: totalCandidates,   icon: Users },
    { label: 'Interviewed',   value: totalInterviewed,  icon: Sparkles },
    { label: 'Shortlisted',   value: totalShortlisted,  icon: Sparkles },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-shell px-5 md:px-8 pt-10 md:pt-14 pb-20">
        <div className="flex flex-col gap-2 mb-10">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
            <span className="text-eyebrow uppercase text-brand-700">Overview</span>
          </div>
          <h1 className="text-[clamp(1.8rem,1.2rem+1.6vw,2.4rem)] font-semibold text-ink-900 leading-tight">
            Welcome back
          </h1>
          <p className="text-[14px] text-ink-600">A snapshot of your pipelines across all open roles.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-500">{label}</span>
                <Icon size={14} className="text-ink-400" />
              </div>
              <span className="text-[32px] font-semibold tabular text-ink-900 leading-none">{value}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Link to="/dashboard/jobs" className="group rounded-2xl bg-white ring-1 ring-ink-200 hover:ring-ink-300 shadow-soft-1 hover:shadow-lift-1 transition-shadow p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                <Briefcase size={18} />
              </div>
              <ArrowRight size={16} className="text-ink-400 group-hover:text-brand-700 transition-colors" />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-900">Jobs posted</h2>
            <p className="text-[13px] text-ink-600">
              {totalJobs} open role{totalJobs === 1 ? '' : 's'}. Open any pipeline to review candidates and verdicts.
            </p>
          </Link>

          <Link to="/dashboard/candidates" className="group rounded-2xl bg-white ring-1 ring-ink-200 hover:ring-ink-300 shadow-soft-1 hover:shadow-lift-1 transition-shadow p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-mint-700">
                <Users size={18} />
              </div>
              <ArrowRight size={16} className="text-ink-400 group-hover:text-brand-700 transition-colors" />
            </div>
            <h2 className="text-[16px] font-semibold text-ink-900">Candidates</h2>
            <p className="text-[13px] text-ink-600">
              {totalCandidates} candidate{totalCandidates === 1 ? '' : 's'} across all roles. Sort by ATS score and verdict.
            </p>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
