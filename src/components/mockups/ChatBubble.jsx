import './mockups.css';

export default function ChatBubble({ title, pill, turns, onDark = true }) {
  return (
    <div className={`mock ${onDark ? 'mock--on-dark' : ''}`} aria-hidden="true">
      <div className="mock-head">
        <span className="mock-title">
          <span className="mock-title-dot" /> {title}
        </span>
        {pill && <span className="mock-pill">{pill}</span>}
      </div>
      <div className="mock-chat">
        {turns.map((t, i) => (
          <div key={i} className={`mock-bubble ${t.from === 'me' ? 'mine' : 'theirs'}`}>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
