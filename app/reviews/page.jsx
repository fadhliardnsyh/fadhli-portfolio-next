"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

const REVIEWS = [
  {
    id: 1,
    quote: "Fadhli works professionally and is really efficient as a UI/UX Designer. Really looking forward to working together again.",
    name: "Kevin Lie",
    role: "Graphic Designer",
    company: "Atomix Games",
    initials: "KL",
  },
  {
    id: 2,
    quote: "His eye for layout, flow, and the little details makes a seriously impressive difference. Super easy to work with and fast with edits.",
    name: "Lintang Pramesa",
    role: "HRIS Lead",
    company: "Lintang Corp",
    initials: "LP",
  },
  {
    id: 3,
    quote: "Fadhli delivered designs that truly captured our vision. His professionalism made the collaboration smooth and efficient.",
    name: "Bagus Adi Wicaksono",
    role: "VP Product",
    company: "Optionaler",
    initials: "BA",
  },
  {
    id: 4,
    quote: "Working with Fadhli was a pleasure from start to finish. He asks the right questions and always delivers beyond expectations.",
    name: "Rizky Pratama",
    role: "Product Manager",
    company: "TechStartup ID",
    initials: "RP",
  },
  {
    id: 5,
    quote: "The design system Fadhli built saved our dev team weeks of work. Clean, scalable, and documented beautifully.",
    name: "Dimas Aryanto",
    role: "Frontend Engineer",
    company: "GoTech",
    initials: "DA",
  },
  {
    id: 6,
    quote: "Fadhli has a rare combination of strong visual instinct and user empathy. He doesn't just make things look good — he makes them work better.",
    name: "Sari Dewi",
    role: "Creative Director",
    company: "Brandhaus",
    initials: "SD",
  },
];

export default function ReviewsPage() {
  const heroRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    if (heroRef.current) io.observe(heroRef.current);
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className={styles.main}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} ${styles.reveal}`} ref={heroRef}>
          <p className={styles.eyebrow}><i />Reviews</p>
          <h1 className={styles.heroTitle}>
            What collaborators<br /><em>say about me</em>
          </h1>
          <p className={styles.heroSub}>
            Feedback from clients, product managers, engineers, and creatives
            I've worked with across different projects and companies.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.badge}>{REVIEWS.length} Reviews</span>

          </div>
        </div>
      </section>

      {/* ── GRID ─────────────────────────────────────────────── */}
      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {REVIEWS.map((r, i) => (
            <div
              key={r.id}
              className={`${styles.card} ${styles.reveal}`}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
            >
              <p className={styles.quote}>"{r.quote}"</p>

              <div className={styles.person}>
                <div className={styles.avatar}>{r.initials}</div>
                <div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.role}>{r.role} · {r.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
