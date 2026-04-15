import './mockups.css';

export default function JobForm({ onDark = false }) {
  return (
    <div className={`mock ${onDark ? 'mock--on-dark' : ''}`} aria-hidden="true">
      <div className="mock-head">
        <span className="mock-title">
          <span className="mock-title-dot" /> New requisition
        </span>
        <span className="mock-pill">Draft</span>
      </div>

      <div className="mock-field">
        <div className="mock-field-label">Role</div>
        <div className="mock-field-value">Staff Engineer — Payments</div>
      </div>

      <div className="mock-field">
        <div className="mock-field-label">Must-haves</div>
        <div className="mock-chips">
          <span className="mock-chip">5+ yrs backend</span>
          <span className="mock-chip">Distributed systems</span>
          <span className="mock-chip">Go / Rust</span>
        </div>
      </div>

      <div className="mock-field">
        <div className="mock-field-label">Nice to have</div>
        <div className="mock-chips">
          <span className="mock-chip">Fintech</span>
          <span className="mock-chip">On-call ownership</span>
        </div>
      </div>

      <div className="mock-submit">Hand over to Renate →</div>
    </div>
  );
}
