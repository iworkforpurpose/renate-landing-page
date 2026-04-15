import { useEffect, useRef, useState } from 'react';
import './FeatureCurved.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Zap, Box, Lock, Globe, Database, Fingerprint, Layers, Rocket } from 'lucide-react';

const icons = [
  { Icon: Code2, color: 'var(--renate-primary)' },
  { Icon: Cpu, color: 'var(--renate-secondary)' },
  { Icon: Zap, color: 'var(--renate-accent)' },
  { Icon: Box, color: 'var(--renate-accent)' },
  { Icon: Lock, color: '#9c27b0' },
  { Icon: Globe, color: 'var(--renate-primary)' },
  { Icon: Database, color: 'var(--renate-secondary)' },
  { Icon: Fingerprint, color: 'var(--renate-accent)' },
  { Icon: Layers, color: 'var(--renate-accent)' },
  { Icon: Rocket, color: 'var(--text-primary)' }
];

export default function FeatureCurved() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef([]);
  const [typedText, setTypedText] = useState('');
  const fullText = "Empowered by the best AI agents\nto source, interview, and hire top talent.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curve animation for icons
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        const angle = (i / (icons.length - 1)) * Math.PI - Math.PI/2;
        const radius = 250;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius * 0.5 - 100;

        gsap.fromTo(icon, 
          { x: 0, y: 0, opacity: 0, scale: 0 },
          {
            x, y,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
            delay: i * 0.05
          }
        );
      });

      // Typewriter effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          let i = 0;
          const typing = setInterval(() => {
            setTypedText(fullText.substring(0, i+1));
            i++;
            if (i >= fullText.length) clearInterval(typing);
          }, 30);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [fullText]);

  return (
    <section className="feature-curved" ref={sectionRef}>
      <div className="container curved-container">
        <h2 className="typewriter-text" ref={textRef} style={{ whiteSpace: 'pre-line' }}>
          {typedText}
          <span className="cursor">|</span>
        </h2>
        
        <div className="icons-wave">
          {icons.map((item, i) => (
            <div 
              key={i} 
              className="icon-circle"
              ref={el => iconsRef.current[i] = el}
              style={{ color: item.color }}
            >
              <item.Icon size={32} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
