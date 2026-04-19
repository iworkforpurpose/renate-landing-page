import { motion } from 'framer-motion'
import { Check, AlertTriangle, Phone, Sparkles } from 'lucide-react'
import MockupFrame from '../primitives/MockupFrame'

const TRANSCRIPT = [
  { t: '00:42', who: 'Renate',  text: 'You listed Kafka at Stripe — which team owned the clusters?' },
  { t: '00:48', who: 'Priya',   text: 'Payments infra. I led the partition rebalancing for EU expansion.', badge: 'verified' },
  { t: '01:03', who: 'Renate',  text: 'Quantified impact?' },
  { t: '01:05', who: 'Priya',   text: 'We cut p99 consumer lag from 480ms to 90ms.', badge: 'verified' },
  { t: '01:37', who: 'Priya',   text: 'We processed 2M events/sec at peak.', badge: 'flagged', note: 'team figure was ~700k/s' },
]

const SIGNALS = [
  { t: '00:48', label: 'Confirmed claim', tone: 'mint' },
  { t: '01:05', label: 'Specific figure', tone: 'mint' },
  { t: '01:22', label: 'Follow-up logged', tone: 'ink' },
  { t: '01:37', label: 'Claim mismatch', tone: 'amber' },
]

const Waveform = () => {
  const bars = Array.from({ length: 32 })
  return (
    <div className="flex items-end gap-[3px] h-7 w-full">
      {bars.map((_, i) => {
        const h = 25 + Math.abs(Math.sin(i * 0.55)) * 70 + (i % 7 === 0 ? 15 : 0)
        return (
          <span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-brand-400 to-brand-700"
            style={{ height: `${Math.min(100, h)}%`, animationDelay: `${i * 40}ms` }}
          />
        )
      })}
    </div>
  )
}

const toneMap = {
  mint:  'bg-mint-500/15 text-mint-700 ring-mint-500/30',
  ink:   'bg-ink-100 text-ink-700 ring-ink-200',
  amber: 'bg-amber-100 text-amber-700 ring-amber-500/30',
}

export default function VoiceInterviewPanel({ className }) {
  return (
    <MockupFrame variant="browser" url="renate.app/call/priya-desai" className={className}>
      {/* header */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-ink-100 bg-ink-50/40">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-white">
            <Phone size={13} />
          </span>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-ink-900">Renate · Priya Desai</span>
            <span className="text-[11px] text-ink-500 tabular">18:42 duration · Completed 2h ago</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-mint-500/15 px-2 py-0.5 text-[11px] font-semibold text-mint-700">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> Completed
        </span>
      </div>

      {/* waveform */}
      <div className="px-5 py-3 border-b border-ink-100">
        <Waveform />
      </div>

      <div className="grid md:grid-cols-[1fr_200px] gap-0 divide-y md:divide-y-0 md:divide-x divide-ink-100">
        {/* transcript */}
        <div className="p-5 flex flex-col gap-3 max-h-[360px] overflow-hidden">
          {TRANSCRIPT.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="flex gap-3"
            >
              <span className="font-mono text-[11px] tabular text-ink-400 shrink-0 pt-0.5">{row.t}</span>
              <div className="min-w-0">
                <p className="text-[13px] leading-relaxed text-ink-800">
                  <span className={`font-semibold ${row.who === 'Renate' ? 'text-brand-800' : 'text-ink-900'}`}>
                    {row.who}:
                  </span>{' '}
                  {row.text}
                  {row.badge === 'verified' && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-mint-100 px-1.5 py-0.5 text-[10px] font-medium text-mint-700 align-middle">
                      <Check size={9} strokeWidth={3} /> Verified
                    </span>
                  )}
                  {row.badge === 'flagged' && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 align-middle">
                      <AlertTriangle size={9} /> Flagged
                    </span>
                  )}
                </p>
                {row.note && (
                  <p className="text-[11px] text-amber-700 mt-0.5 italic">↳ {row.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* signal column */}
        <div className="p-4 bg-ink-50/40 flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500 mb-1">Signal</span>
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.t + s.label}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className={`rounded-md px-2 py-1.5 ring-1 flex items-center justify-between text-[11px] ${toneMap[s.tone]}`}
            >
              <span className="font-medium">{s.label}</span>
              <span className="font-mono tabular opacity-70">{s.t}</span>
            </motion.div>
          ))}
          <div className="mt-auto pt-3 border-t border-ink-200/70">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500">Verdict</span>
            <p className="mt-1 text-[13px] font-semibold text-ink-900">Proceed to loop</p>
            <p className="text-[11px] text-ink-500">confidence <span className="font-mono tabular">0.87</span></p>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-ink-100 bg-white text-[11px]">
        <span className="tabular text-ink-500">Resume 94 → Call 97 · <span className="text-mint-700 font-semibold">+3</span></span>
        <span className="inline-flex items-center gap-1 text-brand-800 font-semibold">
          <Sparkles size={12} /> Recommendation attached
        </span>
      </div>
    </MockupFrame>
  )
}
