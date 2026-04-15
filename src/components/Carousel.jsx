import { useRef } from 'react';
import './Carousel.css';

const devData = [
  { id: 1, role: 'Frontend Engineer', text: '"Renate AI wrote my entire auth flow in seconds."', color: 'var(--renate-primary)' },
  { id: 2, role: 'Backend Dev', text: '"Generates perfect scalable architectures with a click."', color: 'var(--renate-secondary)' },
  { id: 3, role: 'Full Stack', text: '"It feels like I have 5 senior engineers pairing with me at all times."', color: 'var(--renate-accent)' },
  { id: 4, role: 'DevOps', text: '"Cloud deployments are practically hands-free now."', color: 'var(--renate-accent)' }
];

const blogData = [
  { id: 1, title: 'The Next Gen of Agents', tag: 'Engineering', date: 'April 2026' },
  { id: 2, title: 'How we built Renate AI', tag: 'Product', date: 'March 2026' },
  { id: 3, title: 'Unleashing Gemini for Devs', tag: 'AI', date: 'Feb 2026' }
];

export default function Carousel({ type }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const isDev = type === 'developers';
  const data = isDev ? devData : blogData;

  return (
    <section className={`carousel-section ${type}`}>
      <div className="container">
        <div className="carousel-header">
          <h2>{isDev ? 'Loved by developers everywhere' : 'Latest articles'}</h2>
          <div className="carousel-nav">
            <button onClick={() => scroll('left')}>←</button>
            <button onClick={() => scroll('right')}>→</button>
          </div>
        </div>

        <div className="carousel-track" ref={scrollRef}>
          {data.map((item) => (
            <div key={item.id} className="carousel-card">
              {isDev ? (
                <>
                  <div className="card-top" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <span className="role">{item.role}</span>
                  </div>
                  <p className="quote">{item.text}</p>
                </>
              ) : (
                <>
                  <div className="blog-placeholder"></div>
                  <div className="blog-meta">
                    <span className="tag">{item.tag}</span>
                    <span className="date">{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
