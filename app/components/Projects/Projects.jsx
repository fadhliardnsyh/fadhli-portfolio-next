"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Projects.module.css";
import ALL_PROJECTS from "../../data/projects";

const SELECTED_IDS = ["fixwork", "bitrack", "garuda", "treffix"];

const PROJECTS = SELECTED_IDS
  .map((id) => ALL_PROJECTS.find((p) => p.id === id))
  .filter(Boolean)
  .sort((a, b) => Number(b.year) - Number(a.year))
  .map((p) => ({
    id: p.id,
    href: p.href,
    img: p.img,
    color: p.color,
    title: p.title,
    cat: p.cat,
    year: `'${String(p.year).slice(-2)}`,
  }));

export default function Projects() {
  const previewRef = useRef(null);
  const thumbRef = useRef(null);
  const px = useRef(0);
  const py = useRef(0);
  const tx = useRef(0);
  const ty = useRef(0);
  const raf = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    tx.current = window.innerWidth / 2;
    ty.current = window.innerHeight / 2;
    px.current = tx.current;
    py.current = ty.current;

    const onMove = (e) => {
      tx.current = e.clientX;
      ty.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      px.current += (tx.current - px.current) * 0.12;
      py.current += (ty.current - py.current) * 0.12;
      if (previewRef.current) {
        previewRef.current.style.left = px.current + "px";
        previewRef.current.style.top = py.current + "px";
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    // Scroll reveal for rows
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    rowsRef.current.forEach((el) => el && io.observe(el));

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      io.disconnect();
    };
  }, []);

  const handleEnter = (p) => {
    const thumb = thumbRef.current;
    if (p.img) {
      thumb.style.backgroundImage = `url(${p.img})`;
      thumb.style.backgroundSize = "cover";
      thumb.style.backgroundPosition = "center";
    } else {
      thumb.style.backgroundImage = `linear-gradient(150deg, ${p.color}, var(--bg) 130%)`;
    }
    previewRef.current?.classList.add(styles.previewShow);
  };

  const handleLeave = () => {
    previewRef.current?.classList.remove(styles.previewShow);
  };

  return (
    <section className={styles.section} id="projects">
      <div className={styles.preview} ref={previewRef}>
        <div className={styles.previewThumb} ref={thumbRef} />
      </div>

      <div className={styles.inner}>
        <div className={styles.sectionLabel}>
          <i />
          Selected Work
        </div>

        <div className={styles.list}>
          {PROJECTS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={styles.row}
              ref={(el) => (rowsRef.current[i] = el)}
              onMouseEnter={() => handleEnter(p)}
              onMouseLeave={handleLeave}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className={styles.idx}>0{i + 1}</span>
              <span className={styles.title}>{p.title}</span>
              <span className={styles.cat}>{p.cat}</span>
              <span className={styles.yr}>{p.year}</span>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/projects" className={styles.viewAll}>
            View all my works
            <span className={styles.viewAllArrow}>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
