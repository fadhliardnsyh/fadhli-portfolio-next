'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const curRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cur  = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    // ── Dot follows cursor instantly ──
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    };
    document.addEventListener('mousemove', onMove);

    // ── Ring follows with lag ──
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // ── Hover effect on interactive elements ──
    const targets = document.querySelectorAll(
      'a, button, .proj-card, [role="button"]'
    );

    const onEnter = () => {
      cur.style.width   = '16px';
      cur.style.height  = '16px';
      ring.style.width  = '54px';
      ring.style.height = '54px';
    };
    const onLeave = () => {
      cur.style.width   = '10px';
      cur.style.height  = '10px';
      ring.style.width  = '38px';
      ring.style.height = '38px';
    };

    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={curRef}  id="cursor"      className={styles.cursor} />
      <div ref={ringRef} id="cursor-ring" className={styles.ring}   />
    </>
  );
}
