'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef    = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const dot    = dotRef.current;
    const shadow = shadowRef.current;
    if (!dot || !shadow) return;

    let mx = 0, my = 0;
    let sx = 0, sy = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const animate = () => {
      sx += (mx - sx) * 0.08;
      sy += (my - sy) * 0.08;
      shadow.style.left = sx + 'px';
      shadow.style.top  = sy + 'px';
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={shadowRef} className={styles.shadow} />
      <div ref={dotRef}    className={styles.dot}    />
    </>
  );
}
