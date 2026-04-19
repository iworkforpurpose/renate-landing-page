import { motion } from 'framer-motion'
import CandidateDrawer from './mockups/CandidateDrawer'

export default function ShortlistDeepDive() {
  return (
    <section id="shortlist" className="relative bg-white py-section-y-lg">
      {/* soft brand wash */}
      <div aria-hidden className="absolute inset-0 bg-brand-soft opacity-60 pointer-events-none" />
      <div aria-hidden className="absolute inset-0 dot-grid-bg opacity-40" />

      <div className="relative mx-auto max-w-content px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800 shadow-[0_0_0_4px_rgba(63,20,135,0.15)]" />
            <span className="text-eyebrow uppercase text-brand-700">Inside the shortlist</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-section font-semibold text-ink-900"
          >
            Every shortlisted candidate <span className="text-gradient">ships with receipts.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-lede text-ink-600 max-w-prose mx-auto"
          >
            No more "trust me, this candidate is great." Score breakdown, resume evidence, verified claims, and the full call transcript — in one view, one click, every hire.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div aria-hidden className="absolute -inset-6 md:-inset-10 bg-gradient-to-br from-brand-200/40 via-brand-100/50 to-transparent blur-2xl rounded-[40px]" />
          <div className="relative shadow-lift-2 rounded-2xl">
            <CandidateDrawer />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
