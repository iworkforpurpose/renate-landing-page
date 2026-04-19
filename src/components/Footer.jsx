import ComplianceStrip from './ComplianceStrip'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-shell px-5 md:px-8 py-16">
        <ComplianceStrip />
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5 flex flex-col gap-4">
            <img src="/logo-wordmark.png" alt="Renate" className="h-10 w-auto self-start" />
            <p className="text-[14px] text-ink-500 max-w-sm leading-relaxed">
              Your autonomous AI recruiter. Submit a job. Walk into every interview already prepared.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-400">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
              <span>All systems running</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink-400 mb-3">Product</div>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li><a href="#workflow"  className="text-ink-700 hover:text-brand-800">How it works</a></li>
              <li><a href="#shortlist" className="text-ink-700 hover:text-brand-800">Shortlist</a></li>
              <li><a href="#voice"     className="text-ink-700 hover:text-brand-800">Voice interview</a></li>
              <li><a href="#talk"      className="text-ink-700 hover:text-brand-800">Always reachable</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink-400 mb-3">Company</div>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li><a href="#cta" className="text-ink-700 hover:text-brand-800">Book a demo</a></li>
              <li><a href="mailto:hello@renate.in" className="text-ink-700 hover:text-brand-800">Contact</a></li>
              <li><a href="#" className="text-ink-700 hover:text-brand-800">Careers</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink-400 mb-3">Legal</div>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li><a href="#" className="text-ink-700 hover:text-brand-800">Trust center</a></li>
              <li><a href="#" className="text-ink-700 hover:text-brand-800">Privacy</a></li>
              <li><a href="#" className="text-ink-700 hover:text-brand-800">Terms</a></li>
              <li><a href="#" className="text-ink-700 hover:text-brand-800">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[12px] text-ink-400">
          <span>© {year} Renate. All rights reserved.</span>
          <span className="font-mono uppercase tracking-[0.18em]">
            Confidential · {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>
    </footer>
  )
}
