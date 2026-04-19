import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FileText, Link2, GitBranch, ListOrdered } from 'lucide-react'
import ScoringStageCard from './mockups/ScoringStageCard'
import { cn } from '../lib/cn'

const STAGES = [
  {
    key: 'parse',
    icon: FileText,
    eyebrow: '01 · Parse & normalize',
    title: 'Extract structured evidence from the raw resume.',
    body: 'Roles, tech, dates, project titles, impact claims — each pulled into a normalized schema. Suspicious or malformed submissions get flagged before any scoring touches them.',
  },
  {
    key: 'evidence',
    icon: Link2,
    eyebrow: '02 · Evidence map',
    title: 'Every claim is linked to a specific resume line.',
    body: 'Not keyword matching. Each skill or achievement in the normalized profile carries a pointer back to the exact sentence it came from — the receipt you can audit.',
  },
  {
    key: 'score',
    icon: GitBranch,
    eyebrow: '03 · Rubric score',
    title: 'Score on depth, impact, recency, fit, and trajectory.',
    body: 'A dimension-by-dimension rubric, weighted to your Job Profile. No single number carries the decision — every sub-score is inspectable, comparable, and stable across batches.',
  },
  {
    key: 'rank',
    icon: ListOrdered,
    eyebrow: '04 · Rank & select',
    title: 'Top 50 advance, calibration check keeps it fair.',
    body: 'A calibration pass ensures scores stay consistent regardless of when a resume was processed or how strong a particular batch was. The top 10 are selected on tightened rubric weights favoring evidence over credentials.',
  },
]

export default function ScoringPipeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 200 })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    return smooth.on('change', v => {
      const i = Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length)))
      setIndex(i)
    })
  }, [smooth])

  const progressScale = useTransform(smooth, [0, 1], [0, 1])

  return (
    <section
      data-theme="dark"
      id="scoring"
      className="relative bg-ink-900 text-white"
    >
      {/* ambient gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-brand-700/25 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-brand-500/15 blur-3xl" />
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${STAGES.length * 70}vh` }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="mx-auto w-full max-w-shell px-5 md:px-8">
            <div className="mb-10 md:mb-14 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-200 shadow-[0_0_0_4px_rgba(212,185,255,0.15)]" />
                <span className="text-eyebrow uppercase text-brand-200">How scoring works</span>
              </div>
              <h2 className="text-section font-semibold text-white">
                Keyword ATS is dead. Every score, grounded.
              </h2>
              <p className="mt-4 text-lede text-white/70 max-w-prose">
                Every score is grounded in a specific project, role, or outcome — with the exact line from the resume as receipt.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
              {/* stage list */}
              <ol className="md:col-span-5 flex flex-col gap-2 relative">
                <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/10" />
                <motion.div
                  className="absolute left-[18px] top-2 w-px origin-top bg-gradient-to-b from-brand-300 to-brand-500"
                  style={{ scaleY: progressScale, height: 'calc(100% - 16px)' }}
                />
                {STAGES.map((s, i) => {
                  const Icon = s.icon
                  const active = i === index
                  return (
                    <li key={s.key} className="relative pl-14 py-4">
                      <div className={cn(
                        'absolute left-0 top-4 flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-500 ease-out-expo',
                        active
                          ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white ring-2 ring-brand-400/40 shadow-[0_0_30px_rgba(145,86,236,0.4)]'
                          : 'bg-white/5 text-white/40 ring-1 ring-white/10',
                      )}>
                        <Icon size={15} />
                      </div>
                      <div className={cn(
                        'transition-opacity duration-500',
                        active ? 'opacity-100' : 'opacity-50',
                      )}>
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-brand-200">
                          {s.eyebrow}
                        </span>
                        <h3 className={cn(
                          'mt-1 text-[20px] md:text-[22px] font-semibold leading-tight',
                          active ? 'text-white' : 'text-white/60',
                        )}>
                          {s.title}
                        </h3>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-2 text-[14px] text-white/65 leading-relaxed max-w-md"
                          >
                            {s.body}
                          </motion.p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>

              {/* mutating card */}
              <div className="md:col-span-7 md:sticky md:top-24">
                <div className="relative">
                  <div aria-hidden className="absolute -inset-6 bg-gradient-to-br from-brand-500/20 to-transparent blur-2xl rounded-[32px]" />
                  <div className="relative">
                    <ScoringStageCard stage={STAGES[index].key} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 justify-center">
                  {STAGES.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-1 rounded-full transition-all duration-500',
                        i === index ? 'w-10 bg-brand-400' : 'w-4 bg-white/15',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
