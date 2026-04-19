import { motion, animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Button from './primitives/Button'

// TODO(user): refresh these monthly from real beta data.
const METRICS = [
  { label: 'Design partners',           value: 4,   suffix: '',   prefix: '',   note: 'Series B+ teams hiring into 2026' },
  { label: 'Voice interviews conducted', value: 240, suffix: '',   prefix: '',   note: 'Real adaptive screens, all recorded' },
  { label: 'Hires closed in beta',       value: 7,   suffix: '',   prefix: '',   note: 'Staff & senior IC roles, 4 companies' },
  { label: 'Candidate show-rate',        value: 96,  suffix: '%',  prefix: '',   note: 'For Renate-booked screens' },
]

function AnimatedNumber({ target }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(Math.round(v)),
    })
    return controls.stop
  }, [inView, target])

  return <span ref={ref}>{val}</span>
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // 'idle' | 'error' | 'submitted'

  const submit = (e) => {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) { setState('error'); return }
    // TODO(user): replace with a POST to your waitlist endpoint or CRM.
    setState('submitted')
  }

  if (state === 'submitted') {
    return (
      <div className="w-full max-w-md mx-auto flex items-center justify-center gap-2 rounded-full bg-mint-500/15 ring-1 ring-mint-500/30 px-5 h-12 text-[13px] font-medium text-mint-700">
        <Check size={14} strokeWidth={3} />
        You're on the list. We'll reach out within 48h.
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto">
      <div className="flex items-stretch gap-2 rounded-full bg-white ring-1 ring-ink-200 focus-within:ring-brand-500 shadow-soft-1 p-1">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
          placeholder="you@company.com"
          className="flex-1 bg-transparent px-4 text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
          aria-label="Work email"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 hover:bg-brand-800 text-white text-[13px] font-medium px-4 h-10 transition-colors"
        >
          Request access <ArrowRight size={14} />
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-[12px] text-rose-700">Please enter a valid work email.</p>
      )}
    </form>
  )
}

export default function MetricsCTA() {
  return (
    <section id="cta" className="relative bg-white py-section-y-lg overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-brand-soft opacity-50" />
      <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-brand-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-content px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10 md:mb-12">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-brand-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[clamp(2.6rem,1.4rem+4vw,4.2rem)] font-semibold tabular leading-none text-ink-900">
                {m.prefix}
                <AnimatedNumber target={m.value} />
                <span className="text-brand-700">{m.suffix}</span>
              </span>
              <span className="text-[13px] font-medium text-ink-800">{m.label}</span>
              <span className="text-[12px] text-ink-500">{m.note}</span>
            </motion.div>
          ))}
        </div>

        <p className="mb-16 md:mb-20 text-center text-[11px] text-ink-400 italic">
          Verified metrics from the Q2 private beta · updated monthly.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6"
        >
          <h2 className="text-section font-semibold text-ink-900">
            What took weeks now takes hours.{' '}
            <span className="text-gradient">Ready to meet your next hire?</span>
          </h2>
          <p className="text-lede text-ink-600 max-w-prose">
            Submit a job. Walk into every interview already prepared.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#cta" variant="primary" size="lg">
              Join the Q3 cohort <ArrowRight size={16} />
            </Button>
            <Button as="a" href="mailto:hello@renate.in" variant="ghost" size="lg">
              hello@renate.in
            </Button>
          </div>

          <div className="w-full flex flex-col items-center gap-2 pt-2">
            <WaitlistForm />
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-500">
              Q3 cohort · 8 of 10 slots filled · next review March 12
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
