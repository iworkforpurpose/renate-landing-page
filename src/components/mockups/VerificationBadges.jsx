import './mockups.css';
import { Check, AlertTriangle } from 'lucide-react';

const CLAIMS = [
  { text: 'Led team of 8 at Stripe', status: 'ok' },
  { text: 'Shipped payments v2 in 2023', status: 'ok' },
  { text: 'AWS Solutions Architect cert', status: 'flag' },
  { text: '5y at previous role', status: 'ok' }
];

export default function VerificationBadges({ onDark = false }) {
  return (
    <div className={`mock ${onDark ? 'mock--on-dark' : ''}`} aria-hidden="true">
      <div className="mock-head">
        <span className="mock-title">
          <span className="mock-title-dot" /> Claim verification · Priya S.
        </span>
        <span className="mock-pill">3 / 4 verified</span>
      </div>

      <div className="mock-verify">
        {CLAIMS.map(c => (
          <div className="mock-verify-row" key={c.text}>
            <span className="mock-claim">{c.text}</span>
            <span className={`mock-verdict ${c.status}`}>
              {c.status === 'ok'
                ? <><Check size={10} strokeWidth={3} /> Verified</>
                : <><AlertTriangle size={10} strokeWidth={2.5} /> Flag</>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
