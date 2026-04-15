import { useEffect, useRef } from 'react';
import './AlwaysReachable.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, MessageSquare, PhoneCall } from 'lucide-react';
import ChatBubble from './mockups/ChatBubble';

const CHANNELS = [
  {
    id: 'chat',
    icon: MessageCircle,
    label: 'Chat',
    title: 'Ask where the pipeline stands.',
    bubble: {
      title: 'Chat · Renate',
      pill: 'Now',
      turns: [
        { from: 'me', text: 'Where are we on the Staff Eng role?' },
        { from: 'them', text: '3 shortlisted, 7 interviews booked this week. Want the highlights?' }
      ]
    }
  },
  {
    id: 'whatsapp',
    icon: MessageSquare,
    label: 'WhatsApp',
    title: 'Text Renate from anywhere.',
    bubble: {
      title: 'WhatsApp · Renate',
      pill: 'Mobile',
      turns: [
        { from: 'me', text: 'Raise the bar on comms skills for this req.' },
        { from: 'them', text: 'Updated. Re-scoring existing pipeline now.' }
      ]
    }
  },
  {
    id: 'call',
    icon: PhoneCall,
    label: 'Call',
    title: 'Jump on a live update anytime.',
    bubble: {
      title: 'Update call · 12 min',
      pill: 'Live',
      turns: [
        { from: 'them', text: 'I\'ve flagged two candidates for you. Strong on systems, lighter on leadership.' },
        { from: 'me', text: 'Push them through. Schedule both for Thursday.' }
      ]
    }
  }
];

export default function AlwaysReachable() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.channel-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
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
    <section className="always-reachable dark-section" ref={sectionRef}>
      <div className="container">
        <div className="ar-header">
          <span className="section-eyebrow">Always on</span>
          <h2 className="section-title">
            Your recruiter,<br />
            <span className="text-gradient">one message away.</span>
          </h2>
          <p className="section-lede">
            Not a dashboard to monitor — an agent to work with. Chat, text, or hop on a call.
            Renate responds, explains its reasoning, and acts.
          </p>
        </div>

        <div className="channels-grid">
          {CHANNELS.map(c => {
            const Icon = c.icon;
            return (
              <div className="channel-card" key={c.id}>
                <div className="channel-head">
                  <span className="channel-icon"><Icon size={18} strokeWidth={1.75} /></span>
                  <span className="channel-label">{c.label}</span>
                </div>
                <h3 className="channel-title">{c.title}</h3>
                <div className="channel-visual">
                  <ChatBubble {...c.bubble} onDark />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
