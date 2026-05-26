"use client";

import { useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    avatar: "🎨",
    quote:
      "Fadhli works professionally and is really efficient as a UI/UX Designer. Really looking forward to working together again.",
    name: "Kevin Lie",
    role: "Graphic Designer · Atomix Games",
  },
  {
    id: 2,
    avatar: "💼",
    quote:
      "His eye for layout, flow, and the little details makes a seriously impressive difference. Super easy to work with and fast with edits.",
    name: "Lintang Pramesa",
    role: "HRIS Lead · Lintang Corp",
  },
  {
    id: 3,
    avatar: "🚀",
    quote:
      "Fadhli delivered designs that truly captured our vision. His professionalism made the collaboration smooth and efficient.",
    name: "Bagus Adi Wicaksono",
    role: "VP Product · Optionaler",
  },
  {
    id: 4,
    avatar: "⚡",
    quote:
      "Working with Fadhli was a pleasure from start to finish. He asks the right questions and always delivers beyond expectations.",
    name: "Rizky Pratama",
    role: "Product Manager · TechStartup ID",
  },
  {
    id: 5,
    avatar: "🔧",
    quote:
      "The design system Fadhli built saved our dev team weeks of work. Clean, scalable, and documented beautifully.",
    name: "Dimas Aryanto",
    role: "Frontend Engineer · GoTech",
  },
  {
    id: 6,
    avatar: "🌟",
    quote:
      "Fadhli has a rare combination of strong visual instinct and user empathy. He doesn't just make things look good — he makes them work better.",
    name: "Sari Dewi",
    role: "Creative Director · Brandhaus",
  },
];

// Duplicate cards untuk seamless infinite loop (sama kayak main.js asli)
const CARDS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  const labelRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        }),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    if (labelRef.current) observer.observe(labelRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.inner}>
        <div
          className={`${styles.sectionLabel} ${styles.reveal}`}
          ref={labelRef}
        >
          <i />
          Testimonials
        </div>
        <h2
          className={`${styles.sectionTitle} ${styles.reveal} ${styles.revealD1}`}
          ref={titleRef}
        >
          What collaborators say
        </h2>
      </div>

      {/* Auto-scroll track */}
      <div className={styles.trackWrap}>
        <div className={styles.track}>
          {CARDS.map((t, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.person}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
