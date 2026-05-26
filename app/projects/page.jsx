"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";


const PROJECTS = [
  {
    id: "fixwork",
    href: "/projects/fixwork",
    img: "/assets/fixwork_card.png",
    color: "#f5c518",
    title: "Fixwork",
    cat: "Mobile · HRIS",
    year: "2025",
  },
  {
    id: "garuda",
    href: "/projects/garuda",
    img: "/assets/garuda_eleven.png",
    color: "#1f6fe2",
    title: "Garuda Eleven Metaleague",
    cat: "Web-Based Game · Football Manager",
    year: "2025",
  },
  {
    id: "evermore",
    href: "/projects/evermore",
    img: "/assets/evermore_knights.png",
    color: "#7c3fe2",
    title: "Evermore Knights",
    cat: "Web · Landing Page",
    year: "2024",
  },
  {
    id: "vehicle",
    href: "/projects/vehicle",
    img: null,
    color: "#e2511f",
    title: "Vehicle Tracker",
    cat: "Mobile · IoT",
    year: "2024",
  },
];

const ALL_FILTERS = ["All", ...Array.from(new Set(
  PROJECTS.flatMap((p) => p.cat.split(" · "))
))];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const heroRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.06 }
    );
    if (heroRef.current) io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat.split(" · ").includes(active));

  return (
    <main className={styles.main}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} ${styles.reveal}`} ref={heroRef}>
          <p className={styles.eyebrow}><i />Projects</p>
          <h1 className={styles.heroTitle}>
            Work built over<br /><em>3+ years</em> of design
          </h1>
          <p className={styles.heroSub}>
            Every project here is a real problem I helped solve — across mobile apps,
            web platforms, game UI, and IoT products.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.badge}>{PROJECTS.length} Projects</span>
            <span className={styles.badge}>Product &amp; UI/UX Design</span>
          </div>
        </div>
      </section>

      {/* ── FILTER ───────────────────────────────────────────── */}
      <div className={styles.filterWrap}>
        <div className={styles.filterInner}>
          {ALL_FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${active === f ? styles.filterActive : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ─────────────────────────────────────────────── */}
      <section className={styles.gridSection}>
        <div className={styles.grid} key={active}>
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={styles.card}
              style={{ "--accent": p.color, animationDelay: `${i * 0.07}s` }}
            >
              <div className={styles.cardImg} style={{ background: `${p.color}18` }}>
                {p.img ? (
                  <img src={p.img} alt={p.title} />
                ) : (
                  <div className={styles.cardImgFallback}>
                    <span style={{ color: p.color }}>{p.title.slice(0, 2).toUpperCase()}</span>
                  </div>
                )}
                <div className={styles.cardOverlay} />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTags}>
                    {p.cat.split(" · ").map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.cardYear}>{p.year}</span>
                </div>
                <div className={styles.cardBottom}>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <span className={styles.arrow}>↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
