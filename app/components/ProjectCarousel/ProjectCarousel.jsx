"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./ProjectCarousel.module.css";
import ALL_PROJECTS from "../../data/projects";

export default function ProjectCarousel({ currentId }) {
  const projects = ALL_PROJECTS.filter((p) => p.id !== currentId);
  const trackRef  = useRef(null);
  const idxRef    = useRef(0);   // 0 … projects.length-1 (posisi di set real)
  const timerRef  = useRef(null);

  // Render 3× supaya bisa wrap seamless:
  // [copy A (0…n-1)] [real (n…2n-1)] [copy B (2n…3n-1)]
  const tripled = [...projects, ...projects, ...projects];
  const n = projects.length;

  /* ── helpers ────────────────────────────────────────────── */

  // Absolut scrollLeft untuk rendered index ke-i
  const scrollForIdx = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = track.querySelectorAll("a");
    if (!cards[i]) return 0;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    return cards[i].offsetLeft - padLeft;
  }, []);

  // Scroll ke rendered index (real set = n + realIdx)
  const scrollTo = useCallback((renderedIdx, behavior = "smooth") => {
    trackRef.current?.scrollTo({ left: scrollForIdx(renderedIdx), behavior });
  }, [scrollForIdx]);

  /* ── inisialisasi: mulai di awal set real ───────────────── */
  useEffect(() => {
    requestAnimationFrame(() => scrollTo(n, "instant"));
  }, [n, scrollTo]);

  /* ── auto-scroll ────────────────────────────────────────── */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (idxRef.current + 1) % n;
      idxRef.current = next;

      if (next === 0) {
        // Akan wrap: scroll ke copy B card-0, lalu silent reset ke real card-0
        scrollTo(n * 2, "smooth");
        setTimeout(() => scrollTo(n, "instant"), 500);
      } else {
        scrollTo(n + next, "smooth");
      }
    }, 5000);
  }, [n, scrollTo]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  /* ── tombol prev / next ─────────────────────────────────── */
  const handleNext = useCallback(() => {
    const next = (idxRef.current + 1) % n;
    idxRef.current = next;

    if (next === 0) {
      // Wrap forward: scroll ke copy B card-0 → silent reset ke real card-0
      scrollTo(n * 2, "smooth");
      setTimeout(() => scrollTo(n, "instant"), 500);
    } else {
      scrollTo(n + next, "smooth");
    }
    startTimer();
  }, [n, scrollTo, startTimer]);

  const handlePrev = useCallback(() => {
    const prev = (idxRef.current - 1 + n) % n;
    idxRef.current = prev;

    if (prev === n - 1) {
      // Wrap backward: scroll ke copy A card-(n-1) → silent reset ke real card-(n-1)
      scrollTo(n - 1, "smooth");
      setTimeout(() => scrollTo(n * 2 - 1, "instant"), 500);
    } else {
      scrollTo(n + prev, "smooth");
    }
    startTimer();
  }, [n, scrollTo, startTimer]);

  /* ── render ─────────────────────────────────────────────── */
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.label}>
            <i />
            Other Projects
          </div>
          <h2 className={styles.title}>More work I'm proud of</h2>
        </div>
        <div className={styles.right}>
          <Link href="/projects" className={styles.viewAll}>
            View all projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <div className={styles.navBtns}>
            <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous project">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className={styles.navBtn} onClick={handleNext} aria-label="Next project">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Track — tripled list */}
      <div className={styles.track} ref={trackRef}>
        {tripled.map((p, i) => (
          <Link key={`${p.id}-${i}`} href={p.href} className={styles.card}>
            <div className={styles.imgWrap}>
              {p.img ? (
                <img className={styles.img} src={p.img} alt={p.title} />
              ) : (
                <div className={`${styles.img} ${styles.imgPlaceholder}`} style={{ background: `${p.color}18` }}>
                  <span style={{ color: p.color }}>{p.emoji || p.title.slice(0, 2).toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className={styles.overlay} />
            <div className={styles.body}>
              <div className={styles.tags}>
                {p.cat.split(" · ").map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <div className={styles.cardTitle}>{p.title}</div>
              <div className={styles.cardMeta}>{p.meta}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
