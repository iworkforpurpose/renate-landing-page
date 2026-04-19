import { ShieldCheck, Scale, Globe, FileCheck2, ArrowRight } from 'lucide-react'

// TODO(user): wire "Trust center →" link to the real /trust page when it ships.
const CHIPS = [
  { icon: ShieldCheck, label: 'SOC 2 Type I', sub: 'in progress' },
  { icon: Scale,       label: 'NYC Local Law 144', sub: 'compliant' },
  { icon: Globe,       label: 'EU AI Act', sub: 'aligned' },
  { icon: FileCheck2,  label: 'EEOC', sub: 'bias-audited' },
]

export default function ComplianceStrip() {
  return (
    <div className="border-b border-ink-100 pb-10 mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
          <span className="text-eyebrow uppercase text-brand-700">Trust & compliance</span>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-end gap-2.5">
          {CHIPS.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.label}
                className="inline-flex items-center gap-2 rounded-md bg-ink-50 ring-1 ring-ink-100 px-2.5 py-1.5"
              >
                <Icon size={13} className="text-brand-700 shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-ink-800">{c.label}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500">{c.sub}</span>
                </div>
              </div>
            )
          })}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-700 hover:text-brand-800 ml-1"
          >
            Trust center <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  )
}
