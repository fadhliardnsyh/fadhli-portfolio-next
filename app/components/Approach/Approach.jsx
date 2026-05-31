'use client';

import { useEffect, useRef } from 'react';
import styles from './Approach.module.css';

const IconLayout = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);
const IconResearch = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
    <path d="M8 11h6M11 8v6" />
  </svg>
);
const IconTeam = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconProduct = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconDecision = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14a5 5 0 1 0-6.18 0c.49.4.88.91 1.15 1.49.27.58.41 1.21.41 1.85v.16h3.06v-.16c0-.64.14-1.27.41-1.85.27-.58.66-1.09 1.15-1.49z" />
  </svg>
);
const IconMetrics = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="3" y1="20" x2="21" y2="20" />
  </svg>
);

const SKILLS = [
  {
    name: 'UI/UX Design',
    Icon: IconLayout,
    text: 'Crafting interfaces that feel as good as they look. I design systems and screens that are intuitive, accessible, and built to scale — from first sketch to developer handoff.',
  },
  {
    name: 'In-Depth Research',
    Icon: IconResearch,
    text: 'Decisions rooted in evidence, not opinions. I dig into user behavior through interviews, usability testing, and competitive analysis to surface insights that move the product forward.',
  },
  {
    name: 'Team Collaboration',
    Icon: IconTeam,
    text: 'Great products are built together. I work closely with PMs, engineers, and stakeholders — translating intent into clarity, and clarity into shipped product.',
  },
  {
    name: 'Product Management',
    Icon: IconProduct,
    text: 'Bridging design and business. I structure PRDs, prioritize feature scope, and align teams around what matters most — making sure the right things get built, in the right order.',
  },
  {
    name: 'Design Decision',
    Icon: IconDecision,
    text: 'Every pixel earns its place. I make trade-offs based on user impact, technical reality, and business goals — and I can articulate the why behind every call.',
  },
  {
    name: 'UX Metrics',
    Icon: IconMetrics,
    text: 'What gets measured gets improved. I define success metrics for every flow — task completion, drop-off, time-on-task — and use them to validate that design changes actually deliver value.',
  },
];

export default function Approach() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add(styles.visible);
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="approach">
      <div className={styles.inner}>

        {/* HEADER */}
        <div className={`${styles.header} ${styles.reveal}`} ref={headerRef}>
          <div className={styles.headerLeft}>
            <div className={styles.sectionLabel}>
              <i />
              Skills &amp; Expertise
            </div>
            <h2 className={styles.sectionTitle}>
              What I bring<br />to the table
            </h2>
          </div>
          <p className={styles.sectionSub}>
            The disciplines I&apos;ve sharpened over years of shipping products —
            each one earned through real projects, real teams, and real users.
          </p>
        </div>

        {/* GRID 3x2 */}
        <div className={`${styles.grid} ${styles.reveal} ${styles.revealD2}`} ref={gridRef}>
          {SKILLS.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div key={s.name} className={styles.card} style={{ '--d': `${i * 0.06}s` }}>
                <div className={styles.cardIcon}>
                  <Icon width="44" height="44" />
                </div>
                <h3 className={styles.cardTitle}>{s.name}</h3>
                <p className={styles.cardText}>{s.text}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
