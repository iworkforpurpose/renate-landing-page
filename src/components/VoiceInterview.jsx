import SplitSection from './primitives/SplitSection'
import VoiceInterviewPanel from './mockups/VoiceInterviewPanel'
import Button from './primitives/Button'
import { Check, HeartHandshake } from 'lucide-react'

const POINTS = [
  'Asks role-specific questions tied directly to your Job Profile',
  'Verifies resume claims with targeted follow-ups',
  'Probes weak areas to separate real blockers from surface omissions',
  'Adapts in real time, like a skilled human screener',
]

const CANDIDATE_POINTS = [
  'Explicit consent before every call. Opt-out in one click.',
  'Full transcript shared with the candidate on request.',
  'Accommodations handled — extra time, text-only mode, rescheduling.',
]

export default function VoiceInterview() {
  return (
    <SplitSection
      id="voice"
      bg="white"
      eyebrow="Voice interview"
      title={<>Voice-interviews, <span className="text-gradient">conducted autonomously.</span></>}
      lede="Renate picks up the phone, asks role-specific questions, and listens for real signal. Every call is transcribed, scored, and filed — and resume exaggeration gets flagged now, not at the offer stage after you've spent a full loop."
      reverse={false}
      contentSpan={5}
      mockup={<VoiceInterviewPanel className="shadow-lift-1" />}
    >
      <ul className="flex flex-col gap-2.5 mt-4">
        {POINTS.map(p => (
          <li key={p} className="flex items-start gap-2.5 text-[14px] text-ink-700">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-brand-100 text-brand-800">
              <Check size={12} strokeWidth={3} />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {/* candidate-side trust */}
      <div className="mt-6 rounded-xl ring-1 ring-ink-100 bg-ink-50/60 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-mint-500/15 text-mint-700">
            <HeartHandshake size={13} />
          </span>
          <span className="text-[13px] font-semibold text-ink-900">Built for candidates, too.</span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {CANDIDATE_POINTS.map(p => (
            <li key={p} className="flex items-start gap-2 text-[12.5px] text-ink-600 leading-relaxed">
              <span className="mt-1 h-1 w-1 rounded-full bg-mint-500 flex-none" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button as="a" href="#see-it-run" variant="ghost" size="md">Hear a sample call →</Button>
      </div>
    </SplitSection>
  )
}
