import { motion } from 'framer-motion'
import { Sparkles, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import MockupFrame from '../primitives/MockupFrame'
import { cn } from '../../lib/cn'

const THREAD = [
  {
    t: '9:14 AM', who: 'me',
    body: "Where are we on the Staff Backend role?",
  },
  {
    t: '9:14 AM', who: 'renate',
    body: "540 passed semantic match. 50 in ranked shortlist. 18 voice-interviewed today. 5 recommended — all verified.",
    extras: (
      <div className="mt-2 rounded-md bg-white/5 ring-1 ring-white/10 p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Sourced from</span>
          <span className="text-[10px] font-mono tabular text-white/50">last 72h</span>
        </div>
        <div className="flex flex-col gap-1">
          {[['Stripe', 3], ['Airbnb', 2], ['Ramp', 1], ['Notion', 1]].map(([co, n]) => (
            <div key={co} className="flex items-center gap-2 text-[11px]">
              <span className="w-16 text-white/70">{co}</span>
              <div className="flex-1 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-brand-400" style={{ width: `${n * 22}%` }} /></div>
              <span className="font-mono tabular text-white/60 w-4 text-right">{n}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    t: '11:02 AM', who: 'me',
    body: "Raise the bar on systems depth. Drop comms weight by 10.",
  },
  {
    t: '11:02 AM', who: 'renate',
    body: "Updated rubric. Re-scoring 540 now. ETA 38 min. I’ll flag any moves in/out of top 10.",
  },
  {
    t: '2:30 PM', who: 'renate',
    flag: true,
    body: "Flagged: candidate #4 (Jess Tran) couldn’t speak to the migration they listed at Notion. Verification drops Exp 88 → 74. Keep or bump?",
  },
  {
    t: '2:31 PM', who: 'me',
    body: "Pass. Push #5 and #7 to Thursday.",
  },
  {
    t: '2:31 PM', who: 'renate',
    body: "On it. Invites out in 30s. Both calendars free 2:30 PT. Reminders queued.",
    extras: (
      <div className="mt-2 flex flex-wrap gap-1.5">
        {['Invites sent', 'Calendar matched', 'Notes agent attached'].map(chip => (
          <span key={chip} className="inline-flex items-center gap-1 rounded-md bg-mint-500/15 px-2 py-0.5 text-[10px] font-medium text-mint-500 ring-1 ring-mint-500/30">
            ✓ {chip}
          </span>
        ))}
      </div>
    ),
  },
]

const CHANNELS = [
  { key: 'chat',     label: 'Chat',     icon: Sparkles },
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { key: 'call',     label: 'Call',     icon: Phone },
]

export default function ThreadedConversation({ className }) {
  const [channel, setChannel] = useState('chat')

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* channel pills */}
      <div className="mx-auto flex items-center gap-1 rounded-full bg-ink-100/70 p-1 ring-1 ring-ink-200">
        {CHANNELS.map(c => {
          const Icon = c.icon
          const active = channel === c.key
          return (
            <button
              key={c.key}
              onClick={() => setChannel(c.key)}
              className={cn(
                'relative inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[12px] font-medium transition-colors',
                active ? 'text-white' : 'text-ink-600 hover:text-ink-800',
              )}
            >
              {active && (
                <motion.span
                  layoutId="channel-pill"
                  className="absolute inset-0 rounded-full bg-ink-900"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-1.5"><Icon size={12} /> {c.label}</span>
            </button>
          )
        })}
      </div>

      <MockupFrame dark={channel !== 'chat' ? false : true} variant="browser" url={channel === 'whatsapp' ? 'whatsapp · +1 (415) 555-0188' : channel === 'call' ? 'renate.app/call-notes' : 'renate.app/chat'} className="w-full">
        <div className={cn(
          'flex flex-col gap-3 p-5 max-h-[440px] overflow-hidden',
          channel === 'whatsapp' && 'bg-[#E7DED2]/30',
          channel === 'call' && 'bg-white',
        )}>
          {THREAD.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className={cn(
                'flex gap-2.5',
                msg.who === 'me' ? 'flex-row-reverse' : 'flex-row',
              )}
            >
              {msg.who === 'renate' && (
                <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-brand-700 to-brand-400 text-white text-[10px] font-semibold">R</div>
              )}
              <div className={cn('max-w-[78%]', msg.who === 'me' && 'text-right')}>
                <div className={cn(
                  'inline-block rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed text-left',
                  msg.who === 'me'
                    ? (channel === 'whatsapp' ? 'bg-[#DCF8C6] text-ink-900 rounded-br-md' : 'bg-ink-900 text-white rounded-br-md')
                    : (channel === 'whatsapp'
                        ? 'bg-white text-ink-900 rounded-bl-md ring-1 ring-ink-100'
                        : channel === 'call'
                          ? 'bg-ink-50 text-ink-800 rounded-bl-md ring-1 ring-ink-100'
                          : 'bg-ink-100/80 text-ink-800 rounded-bl-md'),
                  msg.flag && 'ring-1 ring-amber-500/40',
                )}>
                  {msg.flag && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 mb-1.5">
                      ⚠ Flagged
                    </span>
                  )}
                  <p>{msg.body}</p>
                  {msg.extras}
                </div>
                <p className="mt-0.5 text-[10px] font-mono tabular text-ink-400">{msg.t}{msg.who === 'renate' && ' · Renate'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </MockupFrame>
    </div>
  )
}
