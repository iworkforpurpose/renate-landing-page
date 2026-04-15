import React, { useState, useRef } from 'react';
import './FeaturesTabbed.css';
import gsap from 'gsap';
import { Search, ListFilter, Video, BriefcaseBusiness, ArrowRight } from 'lucide-react';

const TABS = [
  {
    id: 'sourcing',
    label: 'Sourcing',
    icon: Search,
    title: 'Automated Candidate Sourcing: Find the Perfect Match',
    description: 'Renate actively scours multiple platforms to identify and engage top-tier candidates for your roles, completely hands-free. We integrate with global talent pools to bring you quality talent faster than ever before.',
    btnText: 'Start Sourcing',
    imgUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'shortlisting',
    label: 'Shortlisting',
    icon: ListFilter,
    title: 'Intelligent Resume Screening: Zero Bias, 100% Precision',
    description: 'Instantly analyze and rank thousands of resumes against your specific criteria. Renate cuts through the noise to surface the very best matches, saving your HR team hundreds of manual screening hours.',
    btnText: 'Try Smart Screen',
    imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'interviewing',
    label: 'Interviewing',
    icon: Video,
    title: 'AI-Powered Autonomous Interviews: Scaling Culture Fit',
    description: 'Deploy our conversational AI agents to conduct initial screening profiles via voice or chat. We evaluate candidates on technical skills, soft skills, and culture fit in a bias-free environment.',
    btnText: 'Experience an Interview',
    imgUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hiring',
    label: 'Hiring',
    icon: BriefcaseBusiness,
    title: 'Seamless Onboarding & Offers: Close the Deal Faster',
    description: 'Automate the final stages of your hiring pipeline. From generating dynamic offer letters to seamless data synchronization with your existing ATS, Renate ensures a premium experience for every new hire.',
    btnText: 'Learn More',
    imgUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export default function FeaturesTabbed() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const contentRef = useRef(null);

  const handleTabClick = (id) => {
    if (activeTab === id) return;
    
    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(id);
        // Animate in
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  };

  const activeContent = TABS.find(t => t.id === activeTab);

  return (
    <section className="features-tabbed" id="platform">
      <div className="container">
        <div className="ft-header">
          <div className="ft-badge"><span>●</span> OUR PLATFORM</div>
          <h2>Everything Your Hiring Pipeline Needs,<br/>In One AI Platform</h2>
          <p>From initial outreach to final offer—automate manual tasks, reach wider talent pools, and build stellar teams faster.</p>
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
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
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
              <h3>{activeContent.title}</h3>
              <p>{activeContent.description}</p>
              
              <div className="ft-actions">
                <button className="btn-primary">
                  {activeContent.btnText}
                  <ArrowRight size={18} />
                </button>
                <button className="btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
            <div className="ft-img-col">
              <div className="ft-mockup-wrapper">
                <img src={activeContent.imgUrl} alt={activeContent.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
