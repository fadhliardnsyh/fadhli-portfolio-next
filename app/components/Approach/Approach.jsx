'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Approach.module.css';

const STEPS = [
  {
    num: '01',
    name: 'User Research',
    text: 'Everything starts with understanding people. I conduct interviews, usability tests, and competitive analysis to uncover real user needs, mental models, and pain points — before writing a single spec.',
  },
  {
    num: '02',
    name: 'Define',
    text: 'I synthesize research into clear problem statements, user personas, and journey maps. This phase transforms scattered insights into a focused design brief — the North Star for every decision that follows.',
  },
  {
    num: '03',
    name: 'Design',
    text: 'From rough sketches to high-fidelity prototypes, I craft interfaces that are intuitive, accessible, and visually coherent. I build design systems, not one-off screens — scalable, consistent, and developer-friendly.',
  },
  {
    num: '04',
    name: 'Test & Iterate',
    text: 'Design never ships perfect — it ships validated. I test prototypes with real users, gather feedback, and iterate fast. Every round brings the product closer to something people genuinely love.',
  },
];

export default function Approach() {
  const [openIndex, setOpenIndex] = useState(0);

  // ── Reveal on scroll ───────────────────────────────────────
  const stickyRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add(styles.visible);
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    if (stickyRef.current)   observer.observe(stickyRef.current);
    if (accordionRef.current) observer.observe(accordionRef.current);
    return () => observer.disconnect();
  }, []);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className={styles.section} id="approach">
      <div className={styles.inner}>
        <div className={styles.layout}>

          {/* ── LEFT: sticky heading ── */}
          <div className={`${styles.sticky} ${styles.reveal}`} ref={stickyRef}>
            <div className={styles.sectionLabel}>
              <i />
              My Process
            </div>
            <h2 className={styles.sectionTitle}>How I design with purpose</h2>
            <p className={styles.sectionSub}>
              A structured approach that turns ambiguity into clarity — and
              clarity into products people love.
            </p>
          </div>

          {/* ── RIGHT: accordion ── */}
          <div
            className={`${styles.accordion} ${styles.reveal} ${styles.revealD2}`}
            ref={accordionRef}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`${styles.accItem} ${openIndex === i ? styles.open : ''}`}
              >
                <button
                  className={styles.accHeader}
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <div className={styles.accLeft}>
                    <span className={styles.accNum}>{step.num}</span>
                    <span className={styles.accName}>{step.name}</span>
                  </div>
                  <div className={styles.accIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </button>

                <div className={styles.accBody}>
                  <div className={styles.accBodyInner}>
                    <p className={styles.accText}>{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
