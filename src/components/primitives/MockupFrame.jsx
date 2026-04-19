import { cn } from '../../lib/cn'

export default function MockupFrame({
  variant = 'plain',
  url = 'renate.app/shortlist/staff-backend-eng',
  className,
  frameClassName,
  dark = false,
  children,
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden',
        dark
          ? 'bg-ink-900/80 ring-1 ring-white/10 shadow-panel-dark'
          : 'bg-white ring-1 ring-ink-100/80 shadow-panel-ring',
        className,
      )}
    >
      {/* hairline accent */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px',
          dark
            ? 'bg-gradient-to-r from-transparent via-brand-300/50 to-transparent'
            : 'bg-gradient-to-r from-transparent via-brand-300/60 to-transparent',
        )}
      />

      {variant === 'browser' && (
        <div
          className={cn(
            'flex items-center gap-3 h-9 px-4 border-b',
            dark ? 'border-white/5 bg-ink-900/80' : 'border-ink-100 bg-ink-50/60',
          )}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          </div>
          <div
            className={cn(
              'flex-1 h-5 rounded-md flex items-center justify-center text-[11px] font-mono',
              dark ? 'bg-white/5 text-white/50' : 'bg-white text-ink-500 ring-1 ring-ink-100',
            )}
          >
            {url}
          </div>
        </div>
      )}

      <div className={cn('relative', frameClassName)}>{children}</div>
    </div>
  )
}
