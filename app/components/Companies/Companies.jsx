"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import useMarqueeSlowOnHover from "../../hooks/useMarqueeSlowOnHover";
import styles from "./Companies.module.css";

const COMPANIES = [
  { name: "Treffix.id",       logo: "/assets/companies/company-treffix.webp" },
  { name: "Tekuton",          logo: "/assets/companies/company-tekuton.webp" },
  { name: "Nomina Games",     logo: "/assets/companies/company-nomina.webp" },
  { name: "DjuBli",           logo: "/assets/companies/company-djubli.webp" },
  { name: "Universitas Gunadarma", logo: "/assets/companies/company-gunadarma.webp" },
  { name: "CreoEngine",       logo: "/assets/companies/company-creoengine.webp" },
  { name: "Garuda Eleven",    logo: "/assets/companies/company-garudaeleven.webp" },
  { name: "Tag-Tag",          logo: "/assets/companies/company-tagtag.webp" },
  { name: "BLog",             logo: "/assets/companies/company-blog.webp" },
];

export default function Companies() {
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const trackWrapRef = useRef(null);
  useMarqueeSlowOnHover(trackWrapRef);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  // Triple the list for seamless infinite scroll
  const items = [...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <section className={styles.section} id="companies">
      <div className={styles.inner}>
        <div className={`${styles.header} ${styles.reveal}`} ref={headerRef}>
          <div className={styles.sectionLabel}>
            <i />
            Collaborations
          </div>
          <h2 className={styles.sectionTitle}>
            Companies I&apos;ve
            <br />
            worked with
          </h2>
          <p className={styles.sectionSub}>
            Across startups, agencies, game studios, and enterprise, every
            collaboration shaped the way I design today.
          </p>
        </div>
      </div>

      <div
        className={`${styles.trackWrap} ${styles.reveal} ${styles.revealD2}`}
        ref={(el) => {
          trackRef.current = el;
          trackWrapRef.current = el;
        }}
      >
        <div className={styles.track}>
          {items.map((c, i) => (
            <div key={`${c.name}-${i}`} className={styles.item}>
              <Image
                src={c.logo}
                alt={c.name}
                width={320}
                height={140}
                className={styles.logo}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
