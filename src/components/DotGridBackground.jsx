import React, { useEffect, useRef } from 'react';

const DotGridBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let width = 0;
    let height = 0;
    let dots = [];
    
    const mouse = { x: -1000, y: -1000, hovering: false };
    
    const CONFIG = {
      spacing: 32, // Distance between dots
      radius: 1.5, // Base radius
      interactionRadius: 200, // Magnetic field size
      pullStrength: 0.3, // How much cursor pulls the dots
      friction: 0.85, // Spring dampening
      springForce: 0.1 // Spring speed back to origin
    };

    const resize = () => {
      // Container size
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initDots();
    };

    const initDots = () => {
      dots = [];
      const scaleFactor = 15;
      const goldenAngle = 137.5 * (Math.PI / 180);
      
      // Place the center of the radial burst slightly off-center (left side)
      const centerX = width * 0.3;
      const centerY = height * 0.5;

      // Ensure dots cover the entire screen by finding the furthest corner
      const maxDistanceX = Math.max(centerX, width - centerX);
      const maxDistanceY = Math.max(centerY, height - centerY);
      const maxRadius = Math.sqrt(maxDistanceX * maxDistanceX + maxDistanceY * maxDistanceY);
      
      // Calculate needed dots to reach maxRadius smoothly
      const calculatedDots = Math.floor(Math.pow((maxRadius * 1.1) / scaleFactor, 2));
      // Cap at 10000 to maintain 60fps performance on huge screens
      const numDots = Math.min(calculatedDots, 10000);

      for (let i = 1; i <= numDots; i++) {
        const radius = scaleFactor * Math.sqrt(i);
        const angle = i * goldenAngle;
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        dots.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          nRadius: radius / Math.max(1, maxRadius), 
          angle: angle
        });
      }
    };

    const getColor = (dot, distance, isHovering) => {
      const MAX_DIST = CONFIG.interactionRadius;
      
      // Renate brand colors are fundamentally a deep purple (Hue ~264)
      const baseHue = 264;
      // Map the dot's radial position to a lightness value (lighter at center, darker at edges)
      const baseLightness = 85 - dot.nRadius * 25; 

      if (!isHovering || distance >= MAX_DIST) {
        // Base state: faintly visible purple
        return `hsla(${baseHue}, 70%, ${baseLightness}%, 0.15)`;
      }

      // Proximity ratio (1 = touching cursor, 0 = at interactionRadius edge)
      const proximity = 1 - (distance / MAX_DIST);
      
      // On hover, the dots become deeply saturated and richer/darker in color 
      // corresponding to --renate-primary (#3F1487) and --renate-secondary (#9156EC)
      const activeLightness = baseLightness - proximity * 20;
      
      return `hsla(${baseHue}, ${80 + proximity * 20}%, ${Math.max(activeLightness, 30)}%, ${0.3 + proximity * 0.7})`;
    };

    let animationFrameId;

    const animate = () => {
      // Clear background with white color
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        let distance = Number.MAX_VALUE;

        if (mouse.hovering) {
          const dx = mouse.x - dot.baseX;
          const dy = mouse.y - dot.baseY;
          distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < CONFIG.interactionRadius) {
            const pullPhase = 1 - (distance / CONFIG.interactionRadius);
            targetX = dot.baseX + dx * pullPhase * CONFIG.pullStrength;
            targetY = dot.baseY + dy * pullPhase * CONFIG.pullStrength;
          }
        }
        
        // Spring physics back to target
        const fSpringX = (targetX - dot.x) * CONFIG.springForce;
        const fSpringY = (targetY - dot.y) * CONFIG.springForce;
        
        dot.vx = (dot.vx + fSpringX) * CONFIG.friction;
        dot.vy = (dot.vy + fSpringY) * CONFIG.friction;
        
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Active dot size logic
        const isActive = mouse.hovering && distance < CONFIG.interactionRadius;
        const rad = isActive 
          ? CONFIG.radius + (1 - distance / CONFIG.interactionRadius) * 1.5 
          : CONFIG.radius;
          
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = getColor(dot, distance, mouse.hovering);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Only track if cursor is within the hero/canvas bounds roughly (or just global)
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.hovering = true;
    };
    
    const handleMouseLeave = () => {
      mouse.hovering = false;
    };

    // Attach events to window so it tracks correctly even if over other elements
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default DotGridBackground;
