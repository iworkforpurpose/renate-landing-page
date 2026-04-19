import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeRise, stagger, viewport } from '../../lib/motion'

const bgClass = {
  white: 'bg-white text-ink-800',
  ink: 'bg-ink-50 text-ink-800',
  soft: 'bg-brand-soft text-ink-800',
  dark: 'bg-ink-900 text-white',
}

export default function Section({
  id,
  eyebrow,
  title,
  lede,
  align = 'center',
  bg = 'white',
  className,
  contentClassName,
  children,
}) {
  const dark = bg === 'dark'

  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-section-y',
        bgClass[bg],
        className,
      )}
    >
      <div className={cn('mx-auto w-full max-w-content px-5 md:px-8', contentClassName)}>
        {(eyebrow || title || lede) && (
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className={cn(
              'mb-12 md:mb-16 flex flex-col gap-5',
              align === 'center' && 'items-center text-center max-w-3xl mx-auto',
              align === 'left' && 'items-start text-left',
            )}
          >
            {eyebrow && (
              <motion.div variants={fadeRise} className="inline-flex items-center gap-2.5">
                <span
                  className={cn(
                    'inline-block h-1.5 w-1.5 rounded-full',
                    dark ? 'bg-brand-200 shadow-[0_0_0_4px_rgba(212,185,255,0.18)]' : 'bg-brand-800 shadow-[0_0_0_4px_rgba(63,20,135,0.15)]',
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
                  dark ? 'text-white/65' : 'text-ink-600',
                )}
              >
                {lede}
              </motion.p>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  )
}
