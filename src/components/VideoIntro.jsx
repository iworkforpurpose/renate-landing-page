import { useEffect, useRef } from 'react';
import './VideoIntro.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

export default function VideoIntro() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const playWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      // Scroll entrance animation
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cursor-following play button (single wrapper)
      const card = cardRef.current;
      const wrap = playWrapRef.current;

      const xTo = gsap.quickTo(wrap, 'x', { duration: 1.2, ease: 'power2.out' });
      const yTo = gsap.quickTo(wrap, 'y', { duration: 1.2, ease: 'power2.out' });

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xTo(x);
        yTo(y);
      };

      const onLeave = () => {
        gsap.to(wrap, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      return () => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="video-intro dark-section" ref={sectionRef}>
      <div className="container">
        <div className="video-card" ref={cardRef}>
          <div className="video-overlay">
            <div className="play-wrap" ref={playWrapRef}>
              <button className="play-button">
                <Play size={32} fill="currentColor" />
              </button>
              <span className="play-text">Play intro</span>
            </div>
          </div>
          <div className="video-placeholder">
            {/* Mocking the IDE internal interface */}
            <div className="ide-mockup">
              <div className="ide-sidebar"></div>
              <div className="ide-main">
                <div className="ide-header">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="ide-code">
                  <div className="line l1"></div>
                  <div className="line l2"></div>
                  <div className="line l3"></div>
                  <div className="line l4"></div>
                  <div className="line l5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
