import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, AlertTriangle, X,
  Sparkles, Calendar, TrendingUp, TrendingDown,
} from 'lucide-react'
import ScoreBar from '../components/primitives/ScoreBar'
import Button from '../components/primitives/Button'
import { getCandidate, getJobBySlug, VERDICT_TONE } from '../data/dashboardData'
import { cn } from '../lib/cn'

const VERDICT_CLASS = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  amber: 'bg-amber-500/15 text-amber-700 ring-amber-500/30',
  rose:  'bg-rose-500/15 text-rose-700 ring-rose-500/30',
}

const VERDICT_BIG = {
  mint:  { text: 'text-mint-700',  ring: 'ring-mint-500/40',  bg: 'bg-mint-500/10',  icon: Check },
  amber: { text: 'text-amber-700', ring: 'ring-amber-500/40', bg: 'bg-amber-500/10', icon: AlertTriangle },
  rose:  { text: 'text-rose-700',  ring: 'ring-rose-500/40',  bg: 'bg-rose-500/10',  icon: X },
}

const SUB_LABELS = {
  skills:        'Skills depth',
  experience:    'Experience',
  impact:        'Project impact',
  trajectory:    'Trajectory',
  communication: 'Communication',
}

export default function CandidateDetailPage() {
  const { jobId, candidateId } = useParams()
  const job = getJobBySlug(jobId)
  const c = getCandidate(jobId, candidateId)

  if (!job || !c) return <Navigate to="/dashboard/jobs" replace />

  const tone = VERDICT_TONE[c.verdict] || VERDICT_TONE['Yes']
  const big = VERDICT_BIG[tone.color]
  const VerdictIcon = big.icon
  const verdictWord = c.verdict.split(' ').pop().toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-ink-50/40"
    >
      <div className="mx-auto max-w-content px-5 md:px-8 pt-8 md:pt-12 pb-20">
        <Link
          to={`/dashboard/jobs/${job.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 hover:text-ink-900 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to {job.title}
        </Link>

        {/* Hero */}
        <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 overflow-hidden mb-8">
          <div className="p-6 md:p-8 flex flex-wrap items-center gap-6">
            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-brand-800 text-white text-lg font-semibold">
              {c.initials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-700">{job.department} · {job.title}</span>
              <h1 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] font-semibold text-ink-900 leading-tight">{c.name}</h1>
              <span className="text-[13px] text-ink-600 mt-1">{c.currentRole}</span>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {c.companies.map((co) => (
                  <span key={co} className="text-[11px] rounded-md bg-ink-100/70 px-1.5 py-0.5 text-ink-600">
                    {co}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">ATS Score</span>
              <span className="text-[44px] md:text-[52px] font-semibold tabular leading-none text-ink-900">
                {c.atsScore}<span className="text-ink-300 text-[20px] md:text-[24px]">/100</span>
              </span>
              <span className={cn('inline-flex items-center gap-1 rounded-full ring-1 px-2.5 py-1 text-[12px] font-semibold', VERDICT_CLASS[tone.color])}>
                <Sparkles size={12} /> {c.verdict}
              </span>
            </div>
          </div>
        </div>

        {/* Strengths / Weaknesses */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-mint-500/15 text-mint-700">
                  <TrendingUp size={13} />
                </span>
                Strengths
              </h2>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-400">{c.strengths.length} noted</span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {c.strengths.map((s) => (
                <li key={s.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-mint-500/15 text-mint-700">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-ink-900 leading-snug">{s.title}</p>
                    <p className="text-[12px] text-ink-600 leading-relaxed mt-0.5">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/15 text-amber-700">
                  <TrendingDown size={13} />
                </span>
                Weaknesses
              </h2>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-400">{c.weaknesses.length} noted</span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {c.weaknesses.map((w) => (
                <li key={w.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-amber-500/15 text-amber-700">
                    <AlertTriangle size={11} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-ink-900 leading-snug">{w.title}</p>
                    <p className="text-[12px] text-ink-600 leading-relaxed mt-0.5">{w.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ATS breakdown */}
        <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[14px] font-semibold text-ink-900">ATS score breakdown</h2>
            <span className="text-[11px] text-ink-500">Resume {c.resumeScore} → Call {c.callScore} · weighted 91/100</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(c.subScores).map(([k, v], i) => (
              <div key={k} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-ink-800">{SUB_LABELS[k] || k}</span>
                  <span className="font-mono text-[12px] tabular text-ink-900">{v.toFixed(1)}</span>
                </div>
                <ScoreBar value={v * 10} showValue={false} delay={0.05 + i * 0.03} />
              </div>
            ))}
          </div>
        </div>

        {/* Final verdict */}
        <div className="rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft-1 overflow-hidden mb-8">
          <div className="p-8 md:p-10 flex flex-col items-center text-center gap-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink-500">Final verdict</span>
            <div className="flex flex-col items-center gap-3">
              <div className={cn('inline-flex h-14 w-14 items-center justify-center rounded-full ring-2', big.ring, big.bg, big.text)}>
                <VerdictIcon size={28} strokeWidth={3} />
              </div>
              <h2 className={cn('text-[clamp(2.4rem,1.8rem+2.5vw,3.6rem)] font-semibold tracking-tight leading-none', big.text)}>
                {verdictWord}
              </h2>
            </div>
            <p className="max-w-2xl text-[0.95rem] md:text-[1rem] text-ink-700 leading-relaxed">
              {c.verdictExplanation}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button as="a" href="#" variant="ghost" size="md">
                <Calendar size={14} /> View transcript
              </Button>
              <Button as="a" href="#" variant="primary" size="md">
                Invite to onsite <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <Link
            to={`/dashboard/jobs/${job.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 hover:text-ink-900 transition-colors"
          >
            <ArrowLeft size={14} /> All candidates
          </Link>
          <Link
            to="/dashboard/jobs"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 hover:text-ink-900 transition-colors"
          >
            Jobs posted <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
