import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

const fills = {
  brand: 'bg-gradient-to-r from-brand-700 to-brand-500',
  mint:  'bg-gradient-to-r from-mint-700 to-mint-500',
  amber: 'bg-gradient-to-r from-amber-600 to-amber-400',
  rose:  'bg-gradient-to-r from-rose-700 to-rose-500',
  muted: 'bg-gradient-to-r from-ink-500 to-ink-300',
}

export default function ScoreBar({
  value,
  max = 100,
  variant = 'brand',
  showValue = true,
  width = 'flex-1',
  className,
  delay = 0.1,
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('relative h-1.5 rounded-full bg-ink-100 overflow-hidden', width)}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
          className={cn('absolute inset-y-0 left-0 rounded-full', fills[variant])}
        />
      </div>
      {showValue && (
        <span className="font-mono text-[12px] tabular text-ink-800 w-10 text-right">{value}</span>
      )}
    </div>
  )
}
