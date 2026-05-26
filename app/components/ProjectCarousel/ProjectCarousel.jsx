"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./ProjectCarousel.module.css";

// Semua projects — filter otomatis berdasarkan `currentId`
const ALL_PROJECTS = [
  {
    id: "fixwork",
    href: "/projects/fixwork",
    img: "/assets/fixwork_card.png",
    alt: "Fixwork HRIS Mobile App",
    tags: ["Mobile App", "HRIS"],
    title: "Fixwork — HRIS Mobile App",
    meta: "Product Design · End-to-end UX/UI for a human resource information system.",
  },
  {
    id: "garuda",
    href: "/projects/garuda",
    img: "/assets/garuda_eleven.png",
    alt: "Garuda Eleven Metaleague",
    tags: ["Web App", "Game UI"],
    title: "Garuda Eleven Metaleague",
    meta: "Game UI/UX · Web-based competitive football management game.",
  },
  {
    id: "evermore",
    href: "/projects/evermore",
    img: "/assets/evermore_knights.png",
    alt: "Evermore Knights",
    tags: ["Landing Page", "UI Design"],
    title: "Evermore Knights",
    meta: "UI Design · Immersive game landing page for a mobile RPG title.",
  },
  {
    id: "bitrack",
    href: "/projects/bitrack",
    img: null,
    emoji: "🚗",
    tags: ["Mobile App", "IoT"],
    title: "BiTrack App",
    meta: "UI/UX Design · Real-time vehicle tracking mobile app with GPS and analytics.",
  },
  {
    id: "fixwork-dashboard",
    href: "/projects/fixwork-dashboard",
    img: null,
    emoji: "🖥️",
    tags: ["Web App", "HRIS"],
    title: "Fixwork Dashboard",
    meta: "Product Design · Admin dashboard for HR managers to oversee workforce data.",
  },
  {
    id: "bitrack-dashboard",
    href: "/projects/bitrack-dashboard",
    img: null,
    emoji: "📡",
    tags: ["Web App", "IoT"],
    title: "BiTrack Dashboard",
    meta: "UI/UX Design · Fleet monitoring dashboard with live map and trip analytics.",
  },
];

export default function ProjectCarousel({ currentId }) {
  const trackRef = useRef(null);

  // Filter out current project
  const projects = ALL_PROJECTS.filter((p) => p.id !== currentId);

  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.label}>
            <i />
            Other Projects
          </div>
          <h2 className={styles.title}>More work I'm proud of</h2>
        </div>
        <div className={styles.right}>
          <Link href="/#projects" className={styles.viewAll}>
            View all projects
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <div className={styles.arrows}>
            <button
              className={styles.arrow}
              onClick={() => scroll(-1)}
              aria-label="Previous"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={styles.arrow}
              onClick={() => scroll(1)}
              aria-label="Next"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className={styles.track} ref={trackRef}>
        {projects.map((p) => (
          <Link key={p.id} href={p.href} className={styles.card}>
            <div className={styles.imgWrap}>
              {p.img ? (
                <img className={styles.img} src={p.img} alt={p.title} />
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
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
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
