import { useEffect, useRef } from 'react';
import './FeatureSplit.css';
import gsap from 'gsap';

export default function FeatureSplit({ title, description, imageType, reversed }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !visualRef.current) return;
      
      gsap.fromTo(textRef.current,
        { opacity: 0, x: reversed ? 50 : -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(visualRef.current,
        { opacity: 0, x: reversed ? -50 : 50, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reversed]);

  return (
    <section className={`feature-split ${reversed ? 'reversed' : ''}`} ref={sectionRef}>
      <div className="container split-container">
        <div className="split-text" ref={textRef}>
          <h2>{title}</h2>
          <p>{description}</p>
          <a href="#" className="learn-more">
            Learn more <span className="arrow">→</span>
          </a>
        </div>
        
        <div className="split-visual" ref={visualRef}>
          <div className={`visual-card type-${imageType}`}>
            {imageType === 'code' && (
              <div className="mock-editor">
                <div className="tab">agent.ts</div>
                <div className="code-lines">
                  <div className="line c1"></div>
                  <div className="line c2"></div>
                  <div className="line c3 active"></div>
                  <div className="line c4"></div>
                </div>
              </div>
            )}
            
            {imageType === 'blocks' && (
              <div className="mock-blocks">
                <div className="block b1">Auth</div>
                <div className="block b2">Database</div>
                <div className="block b3">Vector Store</div>
              </div>
            )}
            
            {imageType === 'nodes' && (
              <div className="mock-nodes">
                <div className="node center">Agent</div>
                <div className="node satellite s1">API</div>
                <div className="node satellite s2">DOM</div>
                <div className="node satellite s3">CLI</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
