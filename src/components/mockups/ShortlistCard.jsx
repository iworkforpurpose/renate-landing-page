import './mockups.css';
import { Check } from 'lucide-react';

const ROWS = [
  { initials: 'PS', name: 'Priya S.', sub: '7y Staff Eng · Stripe', score: 94, verified: true },
  { initials: 'DN', name: 'Daniel N.', sub: '6y Backend · Ramp', score: 91, verified: true },
  { initials: 'AO', name: 'Amara O.', sub: '5y ML · Scale', score: 88, verified: true }
];

export default function ShortlistCard({ onDark = false, compact = false }) {
  return (
    <div className={`mock ${onDark ? 'mock--on-dark' : ''}`} aria-hidden="true">
      <div className="mock-head">
        <span className="mock-title">
          <span className="mock-title-dot" /> Today's shortlist — Staff Engineer
        </span>
        <span className="mock-pill">3 of 847</span>
      </div>

      {(compact ? ROWS.slice(0, 2) : ROWS).map(r => (
        <div className="mock-row" key={r.initials}>
          <div className="mock-avatar">{r.initials}</div>
          <div className="mock-meta">
            <div className="mock-name">{r.name}</div>
            <div className="mock-sub">
              {r.sub}
              {r.verified && (
                <>
                  <span className="mock-check"><Check size={10} strokeWidth={3} /></span>
                  verified
                </>
              )}
            </div>
          </div>
          <div className="mock-score">{r.score}</div>
        </div>
      ))}
    </div>
  );
}
