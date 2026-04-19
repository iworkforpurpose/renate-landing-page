import { motion, AnimatePresence } from 'framer-motion'
import { Check, FileText, GitBranch, ListOrdered, Link2 } from 'lucide-react'
import MockupFrame from '../primitives/MockupFrame'

const STAGES = {
  parse: {
    label: 'Parse & Normalize',
    chips: [
      { label: 'Staff Backend Eng · Stripe', tone: 'role' },
      { label: '2022–2025', tone: 'date' },
      { label: 'Kafka', tone: 'skill' },
      { label: 'Go', tone: 'skill' },
      { label: 'Payments infra', tone: 'domain' },
    ],
  },
  evidence: {
    label: 'Evidence Map',
    claims: [
      { claim: 'Led EU Kafka rebalancing', source: '“led partition rebalancing for EU expansion”', line: 'role ▸ bullet #2' },
      { claim: 'Cut p99 lag 480→90ms', source: '“reduced p99 consumer lag 5.3× in Q2”',          line: 'role ▸ bullet #4' },
    ],
  },
  score: {
    label: 'Rubric Score',
    scores: [
      { label: 'Skills depth',     value: 9.1 },
      { label: 'Project impact',   value: 8.8 },
      { label: 'Recency',          value: 8.4 },
      { label: 'Domain fit',       value: 9.0 },
      { label: 'Trajectory',       value: 8.5 },
    ],
    total: 91,
  },
  rank: {
    label: 'Rank & Select',
    cohort: [
      { rank: 1, name: 'Priya Desai',  score: 91, highlight: true },
      { rank: 2, name: 'Marcus Koh',   score: 89 },
      { rank: 3, name: 'Aarav Narayan',score: 88 },
      { rank: 4, name: 'Jess Tran',    score: 84 },
    ],
  },
}

const chipClass = {
  role: 'bg-brand-100 text-brand-800',
  skill: 'bg-ink-100 text-ink-700',
  date: 'bg-white text-ink-600 ring-1 ring-ink-200',
  domain: 'bg-mint-100 text-mint-700',
}

export default function ScoringStageCard({ stage = 'parse' }) {
  const s = STAGES[stage]
  return (
    <MockupFrame dark className="w-full text-white" frameClassName="p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-brand-200 ring-1 ring-brand-400/40">
            {stage === 'parse' && <FileText size={14} />}
            {stage === 'evidence' && <Link2 size={14} />}
            {stage === 'score' && <GitBranch size={14} />}
            {stage === 'rank' && <ListOrdered size={14} />}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">Candidate · PD</span>
            <span className="text-[13px] font-semibold text-white">Priya Desai</span>
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-200">{s.label}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {stage === 'parse' && (
            <div className="flex flex-wrap gap-1.5">
              {s.chips.map(c => (
                <span key={c.label} className={`rounded-md px-2 py-1 text-[11px] font-medium ${chipClass[c.tone]}`}>
                  {c.label}
                </span>
              ))}
              <span className="rounded-md px-2 py-1 text-[11px] font-medium bg-white/5 text-white/60 ring-1 ring-white/10">
                + 14 more
              </span>
            </div>
          )}

          {stage === 'evidence' && (
            <ul className="flex flex-col gap-3">
              {s.claims.map((c, i) => (
                <motion.li
                  key={c.claim}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg ring-1 ring-white/10 p-3 bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[12px] font-semibold text-white">{c.claim}</span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-mint-500/15 px-1.5 py-0.5 text-[10px] font-medium text-mint-500">
                      <Check size={9} strokeWidth={3} /> linked
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 italic mb-0.5">{c.source}</p>
                  <p className="text-[10px] font-mono text-white/40 tracking-wider">{c.line}</p>
                </motion.li>
              ))}
            </ul>
          )}

          {stage === 'score' && (
            <div className="flex flex-col gap-2.5">
              {s.scores.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-[12px] text-white/70 w-24">{row.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.value * 10}%` }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-200"
                    />
                  </div>
                  <span className="font-mono text-[12px] tabular text-white w-8 text-right">{row.value.toFixed(1)}</span>
                </motion.div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/50">Weighted total</span>
                <span className="text-[22px] font-semibold tabular text-white">{s.total}<span className="text-white/40 text-[14px]">/100</span></span>
              </div>
            </div>
          )}

          {stage === 'rank' && (
            <div className="flex flex-col gap-1.5">
              {s.cohort.map((c, i) => (
                <motion.div
                  key={c.rank}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${c.highlight ? 'bg-brand-500/15 ring-1 ring-brand-400/40' : 'bg-white/[0.03]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[13px] w-5 tabular ${c.highlight ? 'text-brand-200' : 'text-white/40'}`}>
                      {String(c.rank).padStart(2, '0')}
                    </span>
                    <span className={`text-[12px] font-medium ${c.highlight ? 'text-white' : 'text-white/70'}`}>{c.name}</span>
                  </div>
                  <span className={`font-mono text-[12px] tabular ${c.highlight ? 'text-white' : 'text-white/60'}`}>{c.score}</span>
                </motion.div>
              ))}
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 mt-2">
                Top 50 advance · calibration pass ✓
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </MockupFrame>
  )
}
