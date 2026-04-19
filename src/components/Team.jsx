import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from './primitives/Section'
import { fadeRise, stagger, viewport } from '../lib/motion'

const LinkedInIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

// TODO(user): replace FOUNDERS with real team. Add `photo` field if you have headshots
// (component will fall back to initials avatar when photo is absent).
const FOUNDERS = [
  {
    initials: 'F1',
    name:     'Founder One',
    role:     'CEO · Co-founder',
    credential: 'ex-Talent at Stripe · led 200+ Staff-level hires across infra and product.',
    linkedin: '#',
  },
  {
    initials: 'F2',
    name:     'Founder Two',
    role:     'CTO · Co-founder',
    credential: 'ex-ML research at Anthropic · shipped production voice + reasoning agents.',
    linkedin: '#',
  },
  {
    initials: 'F3',
    name:     'Founder Three',
    role:     'Head of Product',
    credential: 'ex-Eng at Ramp · built internal recruiter tooling adopted by the GTM org.',
    linkedin: '#',
  },
]

export default function Team() {
  return (
    <Section
      id="team"
      bg="white"
      eyebrow="The team"
      title={<>Built by the people who've <span className="text-gradient">done this job</span> — and the people who've built the AI.</>}
      lede="Recruiting craft and AI systems, in one team. We've hired at Stripe, built research at Anthropic, and shipped internal recruiter tooling at Ramp — because that's what this job takes."
      align="center"
    >
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-4"
      >
        {FOUNDERS.map((f) => (
          <motion.div
            key={f.name}
            variants={fadeRise}
            className="group relative flex flex-col gap-3 rounded-2xl bg-white ring-1 ring-ink-100 p-5 md:p-6 hover:ring-brand-200 hover:-translate-y-0.5 transition-all duration-300 ease-out-expo shadow-soft-1 hover:shadow-lift-1"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-400 text-white text-[14px] font-semibold shadow-soft-1">
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-ink-900 truncate">{f.name}</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-brand-700">{f.role}</div>
              </div>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${f.name} on LinkedIn`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 ring-1 ring-ink-100 hover:text-brand-700 hover:ring-brand-200 transition-colors"
              >
                <LinkedInIcon size={14} />
              </a>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-600">
              {f.credential}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-4 py-2 ring-1 ring-ink-100 text-[12px] font-medium text-ink-700 hover:bg-white hover:ring-brand-200 transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse" />
          We're hiring across eng, research, and GTM
          <ArrowRight size={12} />
        </a>
      </motion.div>
    </Section>
  )
}
