import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import JourneyCandidate, { JOURNEY_STAGES } from './mockups/JourneyCandidate'

export default function Workflow() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 180 })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    return smooth.on('change', v => {
      const i = Math.min(JOURNEY_STAGES.length - 1, Math.max(0, Math.floor(v * JOURNEY_STAGES.length)))
      setIndex(i)
    })
  }, [smooth])

  const progressScale = useTransform(smooth, [0, 1], [0, 1])

  return (
    <section
      data-theme="dark"
      id="workflow"
      className="relative bg-ink-900 text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-brand-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${JOURNEY_STAGES.length * 50}vh` }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="mx-auto w-full max-w-shell px-5 md:px-8">
            <div className="mb-10 md:mb-14 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-200 shadow-[0_0_0_4px_rgba(212,185,255,0.15)]" />
                <span className="text-eyebrow uppercase text-brand-200">How Renate works</span>
              </div>
              <h2 className="text-section font-semibold text-white">
                One candidate. Ten stages.{' '}
                <span className="bg-gradient-to-r from-brand-200 to-brand-400 bg-clip-text text-transparent">Zero handoffs.</span>
              </h2>
              <p className="mt-4 text-lede text-white/65 max-w-prose">
                Follow Priya through Renate's full autonomous pipeline — from the form you submit to the interview you walk into already prepared.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              {/* stage rail */}
              <div className="md:col-span-4 relative">
                <div className="absolute left-[14px] top-2 bottom-2 w-px bg-white/10" />
                <motion.div
                  className="absolute left-[14px] top-2 w-px origin-top bg-gradient-to-b from-brand-300 via-brand-500 to-brand-700"
                  style={{ scaleY: progressScale, height: 'calc(100% - 16px)' }}
                />
                <ol className="flex flex-col gap-1">
                  {JOURNEY_STAGES.map((s, i) => {
                    const active = i === index
                    const passed = i < index
                    return (
                      <li key={s.key} className="relative pl-10 py-2.5">
                        <span className={cn(
                          'absolute left-[9px] top-[14px] h-2.5 w-2.5 rounded-full transition-all duration-500',
                          active
                            ? 'bg-brand-300 ring-4 ring-brand-400/25 shadow-[0_0_14px_rgba(212,185,255,0.5)]'
                            : passed
                              ? 'bg-brand-500/60'
                              : 'bg-white/20',
                        )} />
                        <span className={cn(
                          'block text-[11px] font-mono uppercase tracking-[0.18em] transition-colors',
                          active ? 'text-brand-200' : 'text-white/40',
                        )}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={cn(
                          'block text-[14px] md:text-[15px] font-semibold transition-colors',
                          active ? 'text-white' : passed ? 'text-white/60' : 'text-white/40',
                        )}>
                          {s.title}
                        </span>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* mutating card */}
              <div className="md:col-span-8">
                <div className="relative max-w-lg mx-auto">
                  <div aria-hidden className="absolute -inset-6 bg-gradient-to-br from-brand-500/20 to-transparent blur-2xl rounded-[32px]" />
                  <div className="relative">
                    <JourneyCandidate stageIndex={index} />
                  </div>
                </div>
                <p className="mt-6 text-center text-[12px] font-mono uppercase tracking-[0.18em] text-white/40">
                  Stage {String(index + 1).padStart(2, '0')} of {JOURNEY_STAGES.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
