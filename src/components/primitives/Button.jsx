import { cn } from '../../lib/cn'

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none'

const variants = {
  primary: 'bg-ink-900 text-white hover:bg-brand-800 shadow-soft-1 hover:shadow-lift-1 hover:-translate-y-px',
  brand:   'bg-brand-800 text-white hover:bg-brand-700 shadow-soft-1 hover:shadow-lift-1 hover:-translate-y-px',
  ghost:   'bg-transparent text-ink-800 hover:bg-ink-100/80 ring-1 ring-ink-200 hover:ring-ink-300',
  link:    'text-ink-700 hover:text-brand-800 underline-offset-4 hover:underline px-0',
  darkGhost:'bg-transparent text-white ring-1 ring-white/20 hover:bg-white/10',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
}

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(base, variants[variant], variant !== 'link' && sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
