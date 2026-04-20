import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import ShortlistDashboard from './mockups/ShortlistDashboard'
import Button from './primitives/Button'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.15])

  return (
    <section
      ref={ref}
      id="home"
      className="relative overflow-hidden pt-[calc(76px+clamp(3rem,2rem+3vw,5rem))] pb-section-y"
    >
      <motion.div
        aria-hidden
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 dot-grid-bg"
      />
      <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-brand-200/50 blur-3xl opacity-60" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto max-w-shell px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white px-3 py-1.5 ring-1 ring-amber-500/30 shadow-soft-1">
              <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-50" /><span className="relative h-2 w-2 rounded-full bg-amber-500" /></span>
              <span className="text-[11px] font-medium text-amber-700">Q3 private beta · 8 of 10 cohort slots filled</span>
            </div>

            {/* POV kicker */}
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-700">
              The ATS was built for 1998. This is the recruiter for 2026.
            </p>

            <h1 className="text-hero font-semibold text-ink-900">
              Post a job.{' '}
              <span className="text-gradient">Get a shortlist.</span>
            </h1>

            <p className="text-lede text-ink-600 max-w-[46ch]">
              Renate sources across the web, screens every resume on evidence, voice-interviews your top candidates, and delivers a ranked, verified shortlist — autonomously, in hours.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button as="a" href="#cta" variant="primary" size="lg">
                Join the Q3 cohort <ArrowRight size={16} />
              </Button>
              <Button as="a" href="#see-it-run" variant="link" size="lg">
                Watch a 90-second demo →
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-[12px] text-ink-500">
              <div className="flex flex-col">
                <span className="text-[18px] font-semibold tabular text-ink-900">4</span>
                <span>design partners</span>
              </div>
              <div className="h-8 w-px bg-ink-200" />
              <div className="flex flex-col">
                <span className="text-[18px] font-semibold tabular text-ink-900">240</span>
                <span>interviews conducted</span>
              </div>
              <div className="h-8 w-px bg-ink-200" />
              <div className="flex flex-col">
                <span className="text-[18px] font-semibold tabular text-ink-900">7</span>
                <span>hires closed</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ y: mockupY }}
            className="lg:col-span-7 relative"
          >
            <div aria-hidden className="absolute -inset-8 bg-gradient-to-br from-brand-200/30 via-brand-100/40 to-transparent blur-2xl rounded-[36px]" />
            <div className="relative shadow-lift-2 rounded-2xl">
              <ShortlistDashboard />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex absolute -right-4 top-6 items-center gap-2 rounded-full bg-ink-900 px-3 py-1.5 text-[11px] font-medium text-white shadow-lift-1"
            >
              <Sparkles size={12} className="text-brand-300" />
              Interviewed 2h ago
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
