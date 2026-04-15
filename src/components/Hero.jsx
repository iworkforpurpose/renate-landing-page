import { useEffect, useRef } from 'react';
import './Hero.css';
import gsap from 'gsap';
import Cursor from './Cursor';
import DotGridBackground from './DotGridBackground';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from('.hero-headline span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });
      
      gsap.from('.hero-subheadline', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });
      
      gsap.from('.hero-ctas', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <Cursor scopeRef={heroRef} />
      <div className="hero-background">
        <DotGridBackground />
      </div>
      
      <div className="container hero-container" ref={textRef}>
        <div className="hero-content">
          <div className="hero-sublogo">
            <span className="material-symbols-outlined"></span>
            RENATE AI AGENT
          </div>
          
          <h1 className="hero-headline">
            <span className="text-line">AI that</span>
            <span className="text-gradient">hires</span>
            <span className="text-line">for you</span>
          </h1>
          
          <p className="hero-subheadline">
            We source, shortlist, interview and hire for you
          </p>
          
          <div className="hero-ctas">
            <button className="btn-primary" data-cursor="magnetic">
              Talk to us!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
