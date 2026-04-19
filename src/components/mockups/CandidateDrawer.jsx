import { motion } from 'framer-motion'
import { Check, AlertTriangle, Calendar, ArrowRight, Sparkles } from 'lucide-react'
import MockupFrame from '../primitives/MockupFrame'

const DIMENSIONS = [
  { label: 'Skills depth',    value: 94, evidence: '3 yrs leading Kafka partitioning at Stripe' },
  { label: 'Experience',      value: 88, evidence: 'Staff IC at Stripe & Segment (2018–2025)' },
  { label: 'Project impact',  value: 92, evidence: 'Cut p99 consumer lag 5.3× in one quarter' },
  { label: 'Trajectory',      value: 85, evidence: 'Sr → Staff in 2 years; owns EU launch scope' },
  { label: 'Communication',   value: 96, evidence: 'Explained failure modes with concrete examples' },
]

const VERIFICATION = [
  { claim: 'Led partition rebalancing for EU expansion', source: 'LinkedIn + transcript', status: 'verified' },
  { claim: 'Cut p99 Kafka lag 480→90ms',                  source: 'transcript · specific figures', status: 'verified' },
  { claim: 'Staff Backend @ Stripe (2022–2025)',          source: 'LinkedIn match',         status: 'verified' },
  { claim: 'Managed team of 7 engineers',                 source: 'transcript · unclear scope', status: 'flagged' },
  { claim: 'CS degree, Georgia Tech',                     source: 'transcript confirmed',   status: 'verified' },
]

const Dimension = ({ label, value, evidence }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-medium text-ink-800">{label}</span>
      <span className="font-mono text-[12px] tabular text-ink-900">{value}</span>
    </div>
    <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-500"
      />
    </div>
    <span className="text-[11px] text-ink-500 leading-snug">{evidence}</span>
  </div>
)

export default function CandidateDrawer({ className }) {
  return (
    <MockupFrame variant="browser" url="renate.app/candidate/priya-desai" className={className}>
      {/* header */}
      <div className="flex flex-wrap items-center gap-4 px-5 md:px-6 py-4 border-b border-ink-100 bg-gradient-to-b from-brand-50/70 to-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white text-sm font-semibold">PD</div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[15px] font-semibold text-ink-900">Priya Desai</span>
          <span className="text-[12px] text-ink-500">Staff Backend Engineer · Stripe (2022–2025)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">Overall</span>
            <span className="text-[22px] font-semibold tabular text-ink-900">91<span className="text-ink-400 text-[14px]">/100</span></span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-mint-500/15 px-2.5 py-1 text-mint-700 text-[11px] font-semibold">
            <Sparkles size={12} /> Strong Yes
          </div>
        </div>
      </div>

      {/* body */}
      <div className="grid md:grid-cols-5 gap-0 divide-y md:divide-y-0 md:divide-x divide-ink-100">
        {/* dimensions */}
        <div className="md:col-span-3 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">Score breakdown</span>
            <span className="text-[11px] text-ink-500">Resume 92 → Call 91 · <span className="text-rose-700">−1</span></span>
          </div>
          <div className="flex flex-col gap-4">
            {DIMENSIONS.map(d => <Dimension key={d.label} {...d} />)}
          </div>
        </div>

        {/* verification */}
        <div className="md:col-span-2 p-5 md:p-6 bg-ink-50/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">Claim verification</span>
            <span className="text-[11px] text-ink-500">4 of 5 verified</span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {VERIFICATION.map((v, i) => (
              <motion.li
                key={v.claim}
                initial={{ opacity: 0, x: 6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className={`flex items-start gap-2.5 rounded-lg p-2.5 ring-1 ${v.status === 'verified' ? 'bg-white ring-ink-100' : 'bg-amber-100/40 ring-amber-500/30 animate-pulse-amber'}`}
              >
                <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md ${v.status === 'verified' ? 'bg-mint-500/20 text-mint-700' : 'bg-amber-500/20 text-amber-700'}`}>
                  {v.status === 'verified' ? <Check size={11} strokeWidth={3} /> : <AlertTriangle size={11} />}
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-ink-800 leading-snug">{v.claim}</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-ink-500 mt-0.5">{v.source}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-6 py-3.5 border-t border-ink-100 bg-white">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-500">
          <Calendar size={12} /> Interviewed 2h ago · 18:42 duration
        </span>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 h-8 px-3 rounded-full text-[12px] font-medium text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50">
            View transcript
          </button>
          <button className="inline-flex items-center gap-1 h-8 px-3.5 rounded-full text-[12px] font-semibold text-white bg-ink-900 hover:bg-brand-800 shadow-soft-1">
            Invite to onsite <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </MockupFrame>
  )
}
