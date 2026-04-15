import { useEffect, useRef } from 'react';
import './Hero.css';
import gsap from 'gsap';
import Cursor from './Cursor';
import DotGridBackground from './DotGridBackground';
import ShortlistCard from './mockups/ShortlistCard';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 });
      gsap.from('.hero-headline .line', { y: 60, opacity: 0, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.25 });
      gsap.from('.hero-subheadline', { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.7 });
      gsap.from('.hero-ctas > *', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.85 });
      gsap.from('.hero-mockup', { y: 40, opacity: 0, scale: 0.96, duration: 1.1, ease: 'power3.out', delay: 0.6 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <Cursor scopeRef={heroRef} />
      <div className="hero-background" aria-hidden="true">
        <DotGridBackground />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            YOUR AUTONOMOUS AI RECRUITER
          </div>

          <h1 className="hero-headline">
            <span className="line">One AI agent that</span>
            <span className="line"><span className="text-gradient">sources, screens,</span></span>
            <span className="line"><span className="text-gradient">calls, and hires.</span></span>
          </h1>

          <p className="hero-subheadline">
            Submit a job. Renate delivers an evidence-backed shortlist — autonomously.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" data-cursor="magnetic">
              Book a demo
              <ArrowRight size={16} />
            </button>
            <a className="hero-link" href="#workflow">
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-mockup" aria-hidden="true">
          <ShortlistCard />
        </div>
      </div>

      <div className="hero-scrollhint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
