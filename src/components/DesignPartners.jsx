import { motion } from 'framer-motion'
import { viewport } from '../lib/motion'

// TODO(user): replace PARTNERS with actual design-partner names and metrics as they go public.
const PARTNERS = [
  { name: 'STRIPE',  metric: '14 shortlisted · 3 hired' },
  { name: 'RAMP',    metric: '9 shortlisted · 2 hired' },
  { name: 'NOTION',  metric: '7 shortlisted · 1 hired' },
  { name: 'SEGMENT', metric: '6 shortlisted · 1 hired' },
]

export default function DesignPartners() {
  return (
    <section className="relative bg-white py-[clamp(4rem,3rem+2vw,5.5rem)] border-y border-ink-100">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
            <span className="text-eyebrow uppercase text-brand-700">Design partners</span>
          </div>
          <p className="text-[14px] md:text-[15px] text-ink-600 max-w-xl">
            Building alongside 4 teams hiring senior engineering, product, and GTM roles into 2026.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center text-center rounded-xl ring-1 ring-ink-100 bg-white hover:ring-brand-200 transition-colors px-4 py-5"
            >
              <span className="font-mono tracking-[0.2em] text-[14px] md:text-[15px] font-semibold text-ink-900">
                {p.name}
              </span>
              <span className="mt-2 text-[11px] font-mono tabular text-ink-500">
                {p.metric}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-ink-400 italic">
          Beta cohort. Names and metrics updated as partners go public.
        </p>
      </div>
    </section>
  )
}
