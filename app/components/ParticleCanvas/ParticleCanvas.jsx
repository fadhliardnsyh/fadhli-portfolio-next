'use client';

import { useEffect, useRef } from 'react';

const COUNT = 220;

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      const el = canvas.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      scrollRef.current = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.8)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // z = depth (0 = far/dim/small, 1 = close/bright/big)
    const stars = Array.from({ length: COUNT }, () => ({
      x:       Math.random(),
      y:       Math.random(),
      z:       Math.pow(Math.random(), 1.5),
      phase:   Math.random() * Math.PI * 2,
      speed:   0.3 + Math.random() * 0.7,
    }));

    let raf;
    let t = 0;

    const tick = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      const s = scrollRef.current;
      const warp = s * s * 18;

      stars.forEach(p => {
        // move downward, closer stars faster (parallax)
        p.y += (0.00008 + s * 0.004) * p.speed * (0.2 + p.z * 0.8);
        if (p.y > 1.02) {
          p.y = -0.02;
          p.x = Math.random();
        }

        const x = p.x * W;
        const y = p.y * H;

        // size & brightness by depth
        const size  = 0.3 + p.z * 2;
        const twink = 0.75 + 0.25 * Math.sin(t * (0.8 + p.z * 1.2) + p.phase);
        const alpha = (0.2 + p.z * 0.75) * twink;

        // trail on scroll, length grows with warp
        const trailLen = warp * p.speed * (0.4 + p.z * 0.6) * 6;
        if (trailLen > 1) {
          const grad = ctx.createLinearGradient(x, y - trailLen, x, y);
          grad.addColorStop(0, `rgba(200,220,255,0)`);
          grad.addColorStop(1, `rgba(200,220,255,${alpha * 0.85})`);
          ctx.lineWidth  = size * 0.65;
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x, y - trailLen);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // star dot
        const r = Math.round(210 + p.z * 45);
        const g = Math.round(220 + p.z * 35);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},255,${alpha})`;
        ctx.fill();

        // soft glow on bright/close stars
        if (p.z > 0.65) {
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,210,255,${alpha * 0.12})`;
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
