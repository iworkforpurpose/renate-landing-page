import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeRise, stagger, viewport } from '../../lib/motion'

const bgClass = {
  white: 'bg-white text-ink-800',
  ink: 'bg-ink-50 text-ink-800',
  soft: 'bg-brand-soft text-ink-800',
  dark: 'bg-ink-900 text-white',
}

export default function SplitSection({
  id,
  eyebrow,
  title,
  lede,
  reverse = false,
  bg = 'white',
  className,
  children,
  mockup,
  contentSpan = 5,
}) {
  const dark = bg === 'dark'
  const mockupSpan = 12 - contentSpan

  return (
    <section
      id={id}
      className={cn('relative w-full py-section-y', bgClass[bg], className)}
    >
      <div className="mx-auto w-full max-w-content px-5 md:px-8">
        <div className={cn(
          'grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center',
          reverse && 'md:[&>*:first-child]:order-2',
        )}>
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className={cn(
              'flex flex-col gap-5',
              `md:col-span-${contentSpan}`,
            )}
            style={{ gridColumn: `span ${contentSpan} / span ${contentSpan}` }}
          >
            {eyebrow && (
              <motion.div variants={fadeRise} className="inline-flex items-center gap-2.5">
                <span
                  className={cn(
                    'inline-block h-1.5 w-1.5 rounded-full',
                    dark ? 'bg-brand-200' : 'bg-brand-800',
                  )}
                />
                <span className={cn(
                  'text-eyebrow uppercase',
                  dark ? 'text-brand-200' : 'text-brand-700',
                )}>
                  {eyebrow}
                </span>
              </motion.div>
            )}
            {title && (
              <motion.h2
                variants={fadeRise}
                className={cn(
                  'text-section font-semibold',
                  dark ? 'text-white' : 'text-ink-900',
                )}
              >
                {title}
              </motion.h2>
            )}
            {lede && (
              <motion.p
                variants={fadeRise}
                className={cn(
                  'text-lede max-w-prose',
                  dark ? 'text-white/70' : 'text-ink-600',
                )}
              >
                {lede}
              </motion.p>
            )}
            {children && (
              <motion.div variants={fadeRise}>{children}</motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ gridColumn: `span ${mockupSpan} / span ${mockupSpan}` }}
          >
            {mockup}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
