"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ComingSoon.module.css";

export default function ComingSoon({ title = "Project", tag = "Project" }) {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  // Animate progress bar
  useEffect(() => {
    const target = Math.floor(Math.random() * 30) + 55; // 55–85%
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= target) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 197, 24, ${p.o})`;
        ctx.fill();
      });

      // Draw connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(245, 197, 24, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className={styles.page}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Background glow */}
      <div className={styles.glow} />
      <div className={styles.glowB} />

      {/* Grid */}
      <div className={styles.grid} />

      {/* Content */}
      <div className={styles.content}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {tag} · In Progress
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          <span className={styles.titleSub}>Coming</span>
          <span className={styles.titleMain}>{title}</span>
        </h1>

        {/* Description */}
        <p className={styles.desc}>
          This Project is currently being crafted with care.
          <br />
          Check back soon — something worth reading is on its way.
        </p>

        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Documentation progress</span>
            <span className={styles.progressNum}>{progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {[
            { label: "Research & Discovery", done: true },
            { label: "Design Process", done: true },
            { label: "Writing Project", done: false },
            { label: "Visual Documentation", done: false },
          ].map((s) => (
            <div
              key={s.label}
              className={`${styles.step} ${s.done ? styles.stepDone : ""}`}
            >
              <div className={styles.stepIcon}>
                {s.done ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/#projects" className={styles.back}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to all projects
        </Link>
      </div>
    </section>
  );
}
