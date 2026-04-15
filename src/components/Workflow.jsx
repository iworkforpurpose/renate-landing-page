import { useEffect, useRef } from 'react';
import './Workflow.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Globe, ScanLine, PhoneCall, ShieldCheck, ListChecks, CalendarClock } from 'lucide-react';
import JobForm from './mockups/JobForm';
import ShortlistCard from './mockups/ShortlistCard';
import TranscriptSnippet from './mockups/TranscriptSnippet';
import VerificationBadges from './mockups/VerificationBadges';

const STEPS = [
  {
    id: 'submit',
    num: '01',
    label: 'Submit',
    icon: FileText,
    title: 'You fill out one form.',
    copy: 'Role, must-haves, nice-to-haves. That\'s the whole handoff.',
    mockup: <JobForm onDark />
  },
  {
    id: 'source',
    num: '02',
    label: 'Source',
    icon: Globe,
    title: 'Renate finds candidates across the web.',
    copy: 'Active sourcing across public profiles, not a passive inbox of applicants.',
    mockup: <ShortlistCard onDark />
  },
  {
    id: 'screen',
    num: '03',
    label: 'Screen',
    icon: ScanLine,
    title: 'Reads every resume. Scores on evidence.',
    copy: 'No keyword filters — Renate grounds each score in specific projects, roles, and outcomes.',
    mockup: <ShortlistCard onDark compact />
  },
  {
    id: 'call',
    num: '04',
    label: 'Call',
    icon: PhoneCall,
    title: 'Voice-interviews top candidates.',
    copy: 'Renate picks up the phone, asks role-specific questions, and listens for signal.',
    mockup: <TranscriptSnippet onDark />
  },
  {
    id: 'verify',
    num: '05',
    label: 'Verify',
    icon: ShieldCheck,
    title: 'Checks claims before the shortlist.',
    copy: 'Resume exaggeration gets caught now, not after a full interview loop.',
    mockup: <VerificationBadges onDark />
  },
  {
    id: 'shortlist',
    num: '06',
    label: 'Shortlist',
    icon: ListChecks,
    title: 'Delivers an evidence-backed ranked list.',
    copy: 'Every candidate comes with a score, a transcript, and the reasoning behind them.',
    mockup: <ShortlistCard onDark />
  },
  {
    id: 'schedule',
    num: '07',
    label: 'Schedule',
    icon: CalendarClock,
    title: 'Books your calls. Takes your notes.',
    copy: 'Invitations, calendars, reminders, and post-interview summaries — all handled.',
    mockup: <TranscriptSnippet onDark />
  }
];

export default function Workflow() {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="workflow dark-section" ref={sectionRef} id="workflow">
      <div className="container">
        <div className="workflow-header">
          <span className="section-eyebrow">How Renate works</span>
          <h2 className="section-title">
            You fill out a form.<br />
            Renate does <span className="text-gradient">the rest.</span>
          </h2>
          <p className="section-lede">
            One AI agent owns the entire recruiting workflow — from the moment you hit submit
            to the moment you shake hands with your next hire.
          </p>
        </div>

        <div className="workflow-steps">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                className={`workflow-step ${i % 2 === 1 ? 'reverse' : ''}`}
                key={step.id}
                ref={(el) => (stepRefs.current[i] = el)}
              >
                <div className="workflow-text">
                  <div className="workflow-step-head">
                    <span className="workflow-num">{step.num}</span>
                    <span className="workflow-divider" />
                    <span className="workflow-label">
                      <Icon size={16} strokeWidth={1.75} /> {step.label}
                    </span>
                  </div>
                  <h3 className="workflow-title">{step.title}</h3>
                  <p className="workflow-copy">{step.copy}</p>
                </div>
                <div className="workflow-visual">
                  {step.mockup}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
