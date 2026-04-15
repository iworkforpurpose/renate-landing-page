import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cursor.css';

export default function Cursor({ scopeRef }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Guards: touch-only devices and users who prefer reduced motion
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduceMotion) return;

    const scope = scopeRef?.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!scope || !dot || !ring) return;

    // Center both elements on the (x, y) coordinate via xPercent/yPercent.
    // This stays correct when the ring's size changes on magnet hover.
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // Dot tracks tight to the mouse; ring trails with softer easing.
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power2.out' });

    let magnetTarget = null;

    const setMagnetized = (on) => {
      ring.classList.toggle('cursor-magnetized', on);
    };

    const onEnter = (e) => {
      // Snap to mouse position before fading in so there's no sweep-in.
      gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
      gsap.to([dot, ring], {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      magnetTarget = null;
      setMagnetized(false);
      gsap.to([dot, ring], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMove = (e) => {
      const mx = e.clientX;
      const my = e.clientY;

      dotX(mx);
      dotY(my);

      if (magnetTarget && !magnetTarget.isConnected) {
        magnetTarget = null;
        setMagnetized(false);
      }

      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        ringX(mx + (cx - mx) * 0.3);
        ringY(my + (cy - my) * 0.3);
      } else {
        ringX(mx);
        ringY(my);
      }
    };

    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor="magnetic"]');
      if (target && scope.contains(target)) {
        magnetTarget = target;
        setMagnetized(true);
      }
    };

    const onOut = (e) => {
      if (!magnetTarget) return;
      // Don't clear when moving to a descendant of the current magnet.
      if (e.relatedTarget && magnetTarget.contains(e.relatedTarget)) return;
      magnetTarget = null;
      setMagnetized(false);
    };

    scope.addEventListener('pointerenter', onEnter);
    scope.addEventListener('pointerleave', onLeave);
    scope.addEventListener('pointermove', onMove);
    scope.addEventListener('pointerover', onOver);
    scope.addEventListener('pointerout', onOut);

    return () => {
      scope.removeEventListener('pointerenter', onEnter);
      scope.removeEventListener('pointerleave', onLeave);
      scope.removeEventListener('pointermove', onMove);
      scope.removeEventListener('pointerover', onOver);
      scope.removeEventListener('pointerout', onOut);
      gsap.killTweensOf([dot, ring]);
    };
  }, [scopeRef]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
