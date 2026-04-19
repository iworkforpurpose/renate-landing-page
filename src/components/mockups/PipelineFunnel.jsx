import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const NODES = [
  { value: 10400, label: 'sourced',     sub: 'across the open web' },
  { value: 540,   label: 'qualified',   sub: 'meet hard requirements' },
  { value: 50,    label: 'interviewed', sub: 'adaptive voice screens' },
  { value: 10,    label: 'shortlisted', sub: 'evidence-backed', highlight: true },
]

function CountUp({ target }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(Math.round(v)),
    })
    return controls.stop
  }, [inView, target])

  return (
    <span ref={ref} className="font-mono tabular">
      {val.toLocaleString()}
    </span>
  )
}

export default function PipelineFunnel() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 items-stretch">
        {NODES.map((n, i) => (
          <div key={n.label} className="relative flex flex-col">
            {/* connector */}
            {i > 0 && (
              <svg className="absolute -left-3 md:-left-6 top-8 hidden md:block" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <motion.path
                  d="M2 12 L22 12 M16 6 L22 12 L16 18"
                  stroke="#CED1D9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                />
              </svg>
            )}

            <div className={`flex flex-col items-start gap-1 rounded-xl p-4 md:p-5 ring-1 ${n.highlight ? 'bg-brand-50 ring-brand-200/70' : 'bg-white ring-ink-100'}`}>
              <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${n.highlight ? 'text-brand-700' : 'text-ink-500'}`}>
                {String(i + 1).padStart(2, '0')} · {n.label}
              </span>
              <span className={`text-[clamp(1.8rem,1rem+2vw,2.6rem)] font-semibold tabular leading-none ${n.highlight ? 'text-brand-800' : 'text-ink-900'}`}>
                <CountUp target={n.value} />
              </span>
              <span className={`text-[12px] ${n.highlight ? 'text-brand-700/80' : 'text-ink-500'}`}>{n.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
