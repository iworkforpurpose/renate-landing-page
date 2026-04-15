import { useState, useRef } from 'react';
import './FeaturesTabbed.css';
import gsap from 'gsap';
import { Globe, ScanLine, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import ShortlistCard from './mockups/ShortlistCard';
import JobForm from './mockups/JobForm';
import TranscriptSnippet from './mockups/TranscriptSnippet';
import VerificationBadges from './mockups/VerificationBadges';

const TABS = [
  {
    id: 'source',
    label: 'Source',
    icon: Globe,
    title: 'Active sourcing, not a passive inbox.',
    description:
      'Renate goes out and finds candidates across public profiles — your pipeline isn\'t limited to whoever happened to see the post.',
    Visual: JobForm
  },
  {
    id: 'screen',
    label: 'Screen',
    icon: ScanLine,
    title: 'Reads every resume. Scores on evidence.',
    description:
      'No keyword filters. Every score is grounded in specific projects, roles, and outcomes — so strong candidates don\'t get thrown out because they used the wrong word.',
    Visual: ShortlistCard
  },
  {
    id: 'interview',
    label: 'Interview',
    icon: PhoneCall,
    title: 'Voice interviews, conducted autonomously.',
    description:
      'Renate picks up the phone, asks role-specific questions, and listens for real signal. Every call is transcribed, scored, and filed.',
    Visual: TranscriptSnippet
  },
  {
    id: 'verify',
    label: 'Verify',
    icon: ShieldCheck,
    title: 'Claims checked before the shortlist.',
    description:
      'Resume exaggeration gets flagged now, not at the offer stage after you\'ve spent a full loop on someone who didn\'t actually ship what they claimed.',
    Visual: VerificationBadges
  }
];

export default function FeaturesTabbed() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const contentRef = useRef(null);

  const handleTabClick = (id) => {
    if (activeTab === id) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(id);
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  };

  const active = TABS.find(t => t.id === activeTab);
  const ActiveVisual = active.Visual;

  return (
    <section className="features-tabbed" id="product">
      <div className="container">
        <div className="ft-header">
          <span className="section-eyebrow">The platform</span>
          <h2 className="section-title">
            Everything the hiring pipeline needs,<br />
            in <span className="text-gradient">one AI agent.</span>
          </h2>
          <p className="section-lede">
            From the first resume to the post-interview summary — owned end to end,
            with an audit trail at every step.
          </p>
        </div>

        <div className="ft-tabs-wrapper">
          <ul className="ft-tabs">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id} className="ft-tab-item">
                  <button
                    className={`ft-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
                    <span>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ft-content-box">
          <div className="ft-content-inner" ref={contentRef}>
            <div className="ft-text-col">
              <h3>{active.title}</h3>
              <p>{active.description}</p>

              <div className="ft-actions">
                <button className="btn-primary" data-cursor="magnetic">
                  Book a demo
                  <ArrowRight size={16} />
                </button>
                <a className="ft-link" href="#workflow">
                  See the full workflow
                </a>
              </div>
            </div>
            <div className="ft-visual-col">
              <div className="ft-visual-wrapper">
                <ActiveVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
