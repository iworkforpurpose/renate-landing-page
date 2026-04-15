import { useEffect, useRef } from 'react';
import './BenefitsGrid.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Radar, Zap, BarChart3, ShieldCheck,
  Scale, CalendarClock, ScrollText, MessageSquare
} from 'lucide-react';

const BENEFITS = [
  { icon: Radar, title: 'Active sourcing', copy: 'Renate finds candidates for you — pipeline isn\'t limited to whoever saw the post.' },
  { icon: Zap, title: 'Hours, not weeks', copy: 'What took 2–4 weeks of screening collapses into hours of autonomous work.' },
  { icon: BarChart3, title: 'Evidence over gut feel', copy: 'Every shortlisted candidate comes with scores, transcripts, and verification data.' },
  { icon: ShieldCheck, title: 'Fewer bad hires', copy: 'The voice interview catches resume exaggeration before it costs you a full loop.' },
  { icon: Scale, title: 'Zero bias drift', copy: 'Every candidate is evaluated against the same rubric — Renate doesn\'t get tired at 4 PM.' },
  { icon: CalendarClock, title: 'Zero scheduling overhead', copy: 'Invitations, calendars, reminders, and notes are fully handled by Renate.' },
  { icon: ScrollText, title: 'Full audit trail', copy: 'Every decision is documented and traceable — from first score to final summary.' },
  { icon: MessageSquare, title: 'Always reachable', copy: 'Chat, WhatsApp, or hop on an update call — your AI recruiter is always one message away.' }
];

export default function BenefitsGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.benefit-cell', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="benefits" ref={sectionRef} id="benefits">
      <div className="container">
        <div className="benefits-header">
          <span className="section-eyebrow">What changes</span>
          <h2 className="section-title">
            What took weeks<br />
            now takes <span className="text-gradient">hours.</span>
          </h2>
          <p className="section-lede">
            Renate isn't software that runs in the background. It's an autonomous AI recruiter
            you can talk to, check in with, and direct at any point in the hiring process.
          </p>
        </div>

        <div className="benefits-grid">
          {BENEFITS.map(b => {
            const Icon = b.icon;
            return (
              <div className="benefit-cell" key={b.title}>
                <div className="benefit-icon">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div className="benefit-title">{b.title}</div>
                <div className="benefit-copy">{b.copy}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
