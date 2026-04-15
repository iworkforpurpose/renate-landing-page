import { useEffect, useRef } from 'react';
import './ProblemStrip.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileStack, Filter, Phone, ShieldAlert } from 'lucide-react';

const PROBLEMS = [
  { icon: FileStack, label: '1000s of resumes', copy: 'Most never get read.' },
  { icon: Filter, label: 'Keyword filters', copy: 'Reject strong candidates.' },
  { icon: Phone, label: '20-min phone screens', copy: 'Cost 30+ minutes each.' },
  { icon: ShieldAlert, label: 'Late verification', copy: 'Wastes entire pipelines.' }
];

export default function ProblemStrip() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.problem-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="problem-strip" ref={sectionRef}>
      <div className="container">
        <div className="problem-header">
          <span className="section-eyebrow">The problem</span>
          <h2 className="section-title">
            Recruiting in 2026 is <span className="text-gradient">underwater.</span>
          </h2>
          <p className="section-lede">
            AI-assisted applications mean one opening attracts thousands of resumes overnight.
            Human effort can't bridge the gap anymore.
          </p>
        </div>

        <div className="problem-grid">
          {PROBLEMS.map(p => {
            const Icon = p.icon;
            return (
              <div className="problem-card" key={p.label}>
                <div className="problem-icon">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div className="problem-label">{p.label}</div>
                <div className="problem-copy">{p.copy}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
