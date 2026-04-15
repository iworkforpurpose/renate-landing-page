import './mockups.css';

const WAVE = [8, 14, 20, 10, 18, 22, 14, 6, 12, 18, 22, 14, 8, 12, 16, 20, 10, 14, 18, 10];

export default function TranscriptSnippet({ onDark = false }) {
  return (
    <div className={`mock ${onDark ? 'mock--on-dark' : ''}`} aria-hidden="true">
      <div className="mock-head">
        <span className="mock-title">
          <span className="mock-title-dot" /> Voice interview · 18:42
        </span>
        <span className="mock-pill">Live</span>
      </div>

      <div className="mock-transcript">
        <div className="mock-turn">
          <span className="mock-turn-label">Renate</span>
          <span className="mock-turn-text">
            Walk me through the hardest bug you fixed at Stripe. What made it hard?
          </span>
        </div>
        <div className="mock-turn candidate">
          <span className="mock-turn-label">Priya</span>
          <span className="mock-turn-text">
            A payment dedup race — we were double-charging on retries. The tricky part was...
          </span>
        </div>
      </div>

      <div className="mock-waveform">
        {WAVE.map((h, i) => (
          <span key={i} style={{ height: `${h}px` }} />
        ))}
      </div>
    </div>
  );
}
