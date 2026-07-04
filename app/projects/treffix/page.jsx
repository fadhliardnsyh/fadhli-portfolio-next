"use client";

import { useState, useEffect, useRef } from "react";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "UI/UX Designer" },
  { label: "Type", value: "Landing Page" },
  { label: "Year", value: "2026" },
  { label: "Platform", value: "Responsive Website" },
];

const CHALLENGES = [
  {
    num: "01, Challenge",
    title: "No clear narrative about who Treffix is",
    desc: "The site had content, but no story. There was nothing that connected the pieces into a coherent picture of what Treffix was building, where it was heading, or why any of it mattered to someone visiting for the first time.",
  },
  {
    num: "02, Challenge",
    title: "No defined audience to speak to",
    desc: "The messaging was too broad to resonate with anyone specifically. Enterprise clients, fleet operators, potential partners, none of them felt directly addressed. Without a clear target, the site ended up speaking to no one.",
  },
  {
    num: "03, Challenge",
    title: "Visitors had no path to follow",
    desc: "Content existed in isolation with no intentional flow between sections. There was no guided journey from landing to understanding, visitors were left to connect the dots themselves, and most wouldn't bother.",
  },
  {
    num: "04, Challenge",
    title: "The impression didn't match the ambition",
    desc: "For a company building serious SaaS infrastructure, the site gave no indication of the product's scale or direction. First impressions felt off, and for prospective hires or enterprise clients, that gap was hard to overlook.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "A single, clear story told from the first scroll",
    desc: "The redesign opened with a direct answer to the question the old site never addressed: what is Treffix? Every section was written and structured to build on that answer, giving visitors a coherent picture of the company before they got halfway down the page.",
  },
  {
    num: "02",
    title: "Messaging written for a specific audience",
    desc: "Instead of trying to speak to everyone, the copy and layout were shaped around enterprise clients and fleet operators, the people Treffix actually needs to convince. That focus made every word feel intentional rather than generic.",
  },
  {
    num: "03",
    title: "An intentional flow from landing to understanding",
    desc: "Sections were ordered to guide visitors through a logical journey: who Treffix is, what they build, why it matters, and what to do next. No dead ends, no orphaned content, just a clear path from arrival to action.",
  },
  {
    num: "04",
    title: "A visual identity that earns the first impression",
    desc: "The design was elevated to match the ambition behind the product, clean typography, purposeful layout, and a visual tone that signals credibility. The kind of site that makes a prospective hire or enterprise client think: this company knows what it's doing.",
  },
];

// Screenshot desain lama (before redesign)
const UI_SCREENS_BEFORE = [
  { src: "/assets/projects/treffix/treffix-before-01.webp", label: "Original Design" },
  { src: "/assets/projects/treffix/treffix-before-02.webp", label: "Original Design" },
];

// Screenshot desain baru (after redesign)
const UI_SCREENS_NEW = [
  { src: "/assets/projects/treffix/treffix-after-01.webp", label: "Redesign" },
  { src: "/assets/projects/treffix/treffix-after-02.webp", label: "Redesign" },
];

const PLACEHOLDERS = Array.from({ length: 2 });

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Brand Identity That Matches the Product",
    desc: "The redesigned profile now communicates Treffix as a modern SaaS company, visually and tonally consistent with the platform being built behind it.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Products Are Instantly Understandable",
    desc: "A structured information hierarchy means visitors immediately grasp what Treffix offers, no digging, no confusion, no guessing what the company does.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Consistent Design System Across Pages",
    desc: "Reusable components and design tokens ensure every page feels like part of the same product, making the site scalable as new sections are added.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Built for Enterprise First Impressions",
    desc: "The refined, professional visual tone gives enterprise clients and potential partners the confidence to take Treffix seriously from their very first visit.",
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add(styles.visible);
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function TreffixPage() {
  const [lightbox, setLightbox] = useState(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);

  const closeLightbox = () => {
    setLightboxClosing(true);
    setTimeout(() => {
      setLightbox(null);
      setLightboxClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && lightbox.images) {
        setLightbox((prev) => ({
          ...prev,
          idx: (prev.idx + 1) % prev.images.length,
          src: prev.images[(prev.idx + 1) % prev.images.length].src,
        }));
      }
      if (e.key === "ArrowLeft" && lightbox.images) {
        setLightbox((prev) => ({
          ...prev,
          idx: (prev.idx - 1 + prev.images.length) % prev.images.length,
          src: prev.images[(prev.idx - 1 + prev.images.length) % prev.images.length].src,
        }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const overviewRef = useReveal();
  const problemRef = useReveal();
  const solutionRef = useReveal();
  const imgRef = useReveal();
  const uiAfterRef = useReveal();
  const resultsRef = useReveal();

  return (
    <>
      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img src="/assets/projects/treffix/treffixid-page-banner.webp" alt="Treffix Company Profile" />
        </div>
        <div className={styles.caseHeroContent}>
          <div className={styles.eyebrow}>
            <i />
            Project · Web · Company Profile
          </div>
          <h1 className={styles.caseTitle}>Treffix Company Profile</h1>
          <div className={styles.metaRow}>
            {META.map((m) => (
              <div key={m.label} className={styles.metaItem}>
                <div className={styles.metaLabel}>{m.label}</div>
                <div className={styles.metaValue}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <div className={styles.content}>
        <section className={`${styles.section} ${styles.reveal}`} ref={overviewRef}>
          <div className={styles.sectionLabel}>
            <i />
            Overview
          </div>
          <h2 className={styles.sectionTitle}>
            A company profile built
            <br />
            for what Treffix is becoming
          </h2>
          <div className={styles.body}>
            <p>
              Treffix is a fleet and workforce management SaaS company, and its
              company profile needed to reflect exactly that. The redesign moved
              away from the old product-company feel and introduced a clean,
              modern identity that positions Treffix as a credible enterprise tech
              brand.
            </p>
            <p>
              The goal was simple: a visitor should land on the page and immediately
              understand who Treffix is, what they build, and why it matters, without
              having to dig through layers of content to find out.
            </p>
          </div>
        </section>
      </div>

      {/* UI SHOWCASE, Before redesign (after Overview) */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={imgRef}>
          <div className={styles.sectionLabel}><i />Original Design</div>
          <h2 className={styles.sectionTitle}>
            How it looked
            <br />
            before the redesign.
          </h2>
        </div>
        <div className={styles.screensGrid}>
          {(UI_SCREENS_BEFORE.length > 0 ? UI_SCREENS_BEFORE : PLACEHOLDERS).map((s, i) =>
            s?.src ? (
              <div
                key={i}
                className={styles.desktopCard}
                onClick={() => setLightbox({ src: s.src, images: UI_SCREENS_BEFORE, idx: i })}
              >
                <img src={s.src} alt={s.label} loading="lazy" />
                <div className={styles.desktopCardOverlay}>
                  <span className={styles.desktopCardLabel}>{s.label}</span>
                </div>
                <div className={styles.desktopCardZoom}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
            ) : (
              <div key={i} className={styles.desktopCardPlaceholder} />
            )
          )}
        </div>
      </section>

      {/* PROBLEM + SOLUTION */}
      <div className={styles.content}>
        <hr className={styles.divider} />

        {/* Problem */}
        <section className={`${styles.section} ${styles.reveal}`} ref={problemRef}>
          <div className={styles.sectionLabel}>
            <i />
            The Problem
          </div>
          <h2 className={styles.sectionTitle}>
            The old site didn't match
            <br />
            where the company was heading
          </h2>
          <div className={styles.body}>
            <p>
              When I first visited treffix.id, while applying for a job there , 
              I genuinely wasn't sure what the company did. The site had content,
              but nothing that clearly answered the most basic question: what is
              this company, and what do they build?
            </p>
            <p>
              That experience became the starting point for this redesign. If someone
              motivated enough to apply for a role there was left confused, the site
              wasn't doing its job. Treffix had grown significantly, but its company
              profile hadn't kept up.
            </p>
          </div>
          <div className={styles.challenges}>
            {CHALLENGES.map((c) => (
              <div key={c.num} className={styles.challengeCard}>
                <div className={styles.challengeNum}>{c.num}</div>
                <div className={styles.challengeTitle}>{c.title}</div>
                <div className={styles.challengeDesc}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Solution */}
        <section className={`${styles.section} ${styles.reveal}`} ref={solutionRef}>
          <div className={styles.sectionLabel}>
            <i />
            The Solution
          </div>
          <h2 className={styles.sectionTitle}>
            Redesigned from the ground up
            <br />
            for clarity and credibility
          </h2>
          <div className={styles.body}>
            <p>
              The redesign prioritized two things above all else: making the brand
              feel credible to enterprise audiences, and making the product instantly
              understandable to anyone landing on the page for the first time.
            </p>
          </div>
          <div className={styles.solutions}>
            {SOLUTIONS.map((s) => (
              <div key={s.num} className={styles.solution}>
                <div className={styles.solutionNum}>{s.num}</div>
                <div>
                  <div className={styles.solutionTitle}>{s.title}</div>
                  <div className={styles.solutionDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* UI SHOWCASE, After redesign (after Solution) */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={uiAfterRef}>
          <div className={styles.sectionLabel}><i />UI Preview</div>
          <h2 className={styles.sectionTitle}>
            The redesigned
            <br />
            experience.
          </h2>
          <div className={styles.body}>
            <p>
              A clean, modern interface that immediately communicates who Treffix is
              and what they build, designed to give enterprise visitors the confidence
              to take the next step.
            </p>
          </div>
          <a
            href="https://treffix.id/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
          >
            Visit treffix.id
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>
        <div className={styles.screensGrid}>
          {(UI_SCREENS_NEW.length > 0 ? UI_SCREENS_NEW : PLACEHOLDERS).map((s, i) =>
            s?.src ? (
              <div
                key={i}
                className={styles.desktopCard}
                onClick={() => setLightbox({ src: s.src, images: UI_SCREENS_NEW, idx: i })}
              >
                <img src={s.src} alt={s.label} loading="lazy" />
                <div className={styles.desktopCardOverlay}>
                  <span className={styles.desktopCardLabel}>{s.label}</span>
                </div>
                <div className={styles.desktopCardZoom}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
            ) : (
              <div key={i} className={styles.desktopCardPlaceholder} />
            )
          )}
        </div>
      </section>

      <div className={styles.content}>
        <hr className={styles.divider} />

        {/* Results */}
        <section className={`${styles.section} ${styles.reveal}`} ref={resultsRef}>
          <div className={styles.sectionLabel}>
            <i />
            Results
          </div>
          <h2 className={styles.sectionTitle}>
            A presence that finally
            <br />
            matches the product
          </h2>
          <div className={styles.body}>
            <p>
              The redesigned Treffix company profile gave the brand a visual identity
              that's consistent, credible, and ready to represent a growing SaaS company , 
              both internally and to prospective enterprise clients.
            </p>
          </div>
          <div className={styles.results}>
            {RESULTS.map((r) => (
              <div key={r.title} className={styles.resultCard}>
                <div className={styles.resultIcon}>{r.icon}</div>
                <div className={styles.resultTitle}>{r.title}</div>
                <div className={styles.resultDesc}>{r.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CAROUSEL */}
      <ProjectCarousel currentId="treffix" />

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className={`${styles.lightboxOverlay} ${lightboxClosing ? styles.lightboxOverlayOut : ""}`}
          onClick={closeLightbox}
        >
          <button className={styles.lightboxClose} onClick={closeLightbox}>✕</button>

          {lightbox.images && (
            <>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) => {
                    const newIdx = (prev.idx - 1 + prev.images.length) % prev.images.length;
                    return { ...prev, idx: newIdx, src: prev.images[newIdx].src };
                  });
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) => {
                    const newIdx = (prev.idx + 1) % prev.images.length;
                    return { ...prev, idx: newIdx, src: prev.images[newIdx].src };
                  });
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <div key={lightbox.idx} className={styles.lightboxMeta}>
                <span className={styles.lightboxLabel}>
                  {lightbox.images[lightbox.idx].label}
                </span>
                <span className={styles.lightboxCounter}>
                  {lightbox.idx + 1} / {lightbox.images.length}
                </span>
              </div>
            </>
          )}

          <img
            key={lightbox.src}
            src={lightbox.src}
            alt="UI Preview"
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
