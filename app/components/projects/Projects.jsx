'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'fixwork',
    href: '/projects/fixwork',
    img: '/assets/fixwork_card.png',
    alt: 'Fixwork HRIS Mobile App',
    tags: ['Mobile App', 'HRIS'],
    title: 'Fixwork — HRIS Mobile App',
    meta: 'Product Design · End-to-end UX/UI for a human resource information system.',
  },
  {
    id: 'garuda',
    href: '#',
    img: '/assets/garuda_eleven.png',
    alt: 'Garuda Eleven Metaleague',
    tags: ['Web App', 'Game UI'],
    title: 'Garuda Eleven Metaleague',
    meta: 'Game UI/UX · Web-based competitive football management game.',
  },
  {
    id: 'evermore',
    href: '#',
    img: '/assets/evermore_knights.png',
    alt: 'Evermore Knights',
    tags: ['Landing Page', 'UI Design'],
    title: 'Evermore Knights',
    meta: 'UI Design · Immersive game landing page for a mobile RPG title.',
  },
  {
    id: 'vehicle',
    href: '#',
    img: null,
    emoji: '🚗',
    tags: ['Dashboard', 'IoT'],
    title: 'Vehicle Tracker Dashboard',
    meta: 'UI/UX Design · Real-time fleet monitoring with map integration and analytics.',
  },
];

export default function Projects() {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add(styles.visible);
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current)   observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>

        {/* Header */}
        <div className={`${styles.header} ${styles.reveal}`} ref={headerRef}>
          <div>
            <div className={styles.sectionLabel}><i />Selected Work</div>
            <h2 className={styles.sectionTitle}>Projects I'm proud of</h2>
          </div>
          <Link href="#" className={styles.seeAll}>
            View all works
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className={`${styles.grid} ${styles.reveal} ${styles.revealD1}`} ref={gridRef}>
          {PROJECTS.map((p) => (
            <Link key={p.id} href={p.href} className={styles.card}>
              <div className={styles.imgWrap}>
                {p.img ? (
                  <img className={styles.img} src={p.img} alt={p.alt} />
                ) : (
                  <div className={`${styles.img} ${styles.imgPlaceholder}`}>
                    {p.emoji}
                  </div>
                )}
              </div>
              <div className={styles.overlay} />
              <div className={styles.body}>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.title}>{p.title}</div>
                <div className={styles.meta}>{p.meta}</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
