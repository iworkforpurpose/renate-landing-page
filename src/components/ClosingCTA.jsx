import { useEffect, useRef } from 'react';
import './ClosingCTA.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import DotGridBackground from './DotGridBackground';

export default function ClosingCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.closing-headline .line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.closing-sub, .closing-actions', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="closing-cta" ref={sectionRef}>
      <div className="closing-bg" aria-hidden="true">
        <DotGridBackground />
      </div>

      <div className="container closing-content">
        <h2 className="closing-headline">
          <span className="line">One agent.</span>
          <span className="line"><span className="text-gradient">The whole job.</span></span>
        </h2>
        <p className="closing-sub">
          The world's first truly autonomous AI recruiter. Always on. Always reachable.
        </p>
        <div className="closing-actions">
          <button className="btn-primary btn-primary--lg" data-cursor="magnetic">
            Book a demo
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
