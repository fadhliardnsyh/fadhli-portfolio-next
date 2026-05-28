"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactModal from "../../components/ContactModal/ContactModal";
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
    num: "01 — Challenge",
    title: "Visual identity didn't reflect the new direction",
    desc: "Treffix had evolved from a GPS hardware product company into a growing SaaS platform — but the company profile didn't show it. Visually and tonally, it still looked like the old product company.",
  },
  {
    num: "02 — Challenge",
    title: "Products and services weren't easy to understand",
    desc: "Visitors landing on the site had no clear way to understand what Treffix actually offered. The product hierarchy was buried, and there was no guided path through what they do and why it matters.",
  },
  {
    num: "03 — Challenge",
    title: "No conversion-focused layout",
    desc: "The site lacked strategic placement of calls-to-action. Visitors could browse but weren't naturally guided toward the next step — whether that was contacting sales, learning about a product, or signing up.",
  },
  {
    num: "04 — Challenge",
    title: "Generic visuals that didn't build trust",
    desc: "The existing design felt template-like — it didn't communicate technical credibility or give prospective enterprise clients confidence in the product behind the brand.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Visual identity aligned with the SaaS rebrand",
    desc: "The redesign introduced a clean, modern visual language that reflects Treffix's position as a SaaS company — removing anything that felt legacy and replacing it with components that communicate confidence and technical maturity.",
  },
  {
    num: "02",
    title: "Clear product hierarchy and navigation",
    desc: "Products, features, and services were restructured into a clear information architecture. Visitors now understand what Treffix offers within the first few seconds of landing on the page.",
  },
  {
    num: "03",
    title: "Conversion-focused layout with intentional CTAs",
    desc: "Key calls-to-action were placed at natural decision points throughout the page — encouraging visitors to take the next step without feeling pushed. Every section serves a purpose in the conversion flow.",
  },
  {
    num: "04",
    title: "Professional aesthetics that build credibility",
    desc: "A consistent typographic system, purposeful use of whitespace, and refined UI components created a look that communicates quality — giving enterprise prospects the visual confidence to take the product seriously.",
  },
];

// Screenshot desain lama (before redesign)
const UI_SCREENS_BEFORE = [
  // { src: "/assets/treffix-before-01.png", label: "Homepage" },
];

// Screenshot desain baru (after redesign)
const UI_SCREENS_NEW = [
  // { src: "/assets/treffix-new-01.png", label: "Homepage" },
];

const PLACEHOLDERS = Array.from({ length: 5 });

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Brand Identity That Matches the Product",
    desc: "The redesigned profile now communicates Treffix as a modern SaaS company — visually and tonally consistent with the platform being built behind it.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Products Are Instantly Understandable",
    desc: "A structured information hierarchy means visitors immediately grasp what Treffix offers — no digging, no confusion, no guessing what the company does.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Consistent Design System Across Pages",
    desc: "Reusable components and design tokens ensure every page feels like part of the same product — making the site scalable as new sections are added.",
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
  const [modalOpen, setModalOpen] = useState(false);
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
  const resultsRef = useReveal();

  return (
    <>
      <Navbar onConnectClick={() => setModalOpen(true)} />

      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img src="/assets/treffixid-page-banner.png" alt="Treffix Company Profile" />
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
              Treffix is a fleet and workforce management SaaS company — and its
              company profile needed to reflect exactly that. The redesign moved
              away from the old product-company feel and introduced a clean,
              modern identity that positions Treffix as a credible enterprise tech
              brand.
            </p>
            <p>
              The goal was simple: a visitor should land on the page and immediately
              understand who Treffix is, what they build, and why it matters — without
              having to dig through layers of content to find out.
            </p>
          </div>
        </section>
      </div>

      {/* UI SHOWCASE — Before redesign (after Overview) */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={imgRef}>
          <div className={styles.sectionLabel}><i />Original Design</div>
          <h2 className={styles.sectionTitle}>
            How it looked
            <br />
            before the redesign.
          </h2>
        </div>
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrack}>
              {(UI_SCREENS_BEFORE.length > 0
                ? [...UI_SCREENS_BEFORE, ...UI_SCREENS_BEFORE, ...UI_SCREENS_BEFORE]
                : [...PLACEHOLDERS, ...PLACEHOLDERS, ...PLACEHOLDERS]
              ).map((s, i) =>
                s?.src ? (
                  <div
                    key={i}
                    className={styles.desktopCard}
                    onClick={() =>
                      setLightbox({ src: s.src, images: UI_SCREENS_BEFORE, idx: i % UI_SCREENS_BEFORE.length })
                    }
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
          </div>
          <div className={`${styles.marqueeRow} ${styles.marqueeReverse}`}>
            <div className={styles.marqueeTrack}>
              {(UI_SCREENS_BEFORE.length > 0
                ? [...UI_SCREENS_BEFORE, ...UI_SCREENS_BEFORE, ...UI_SCREENS_BEFORE]
                : [...PLACEHOLDERS, ...PLACEHOLDERS, ...PLACEHOLDERS]
              ).map((s, i) =>
                s?.src ? (
                  <div
                    key={i}
                    className={styles.desktopCard}
                    onClick={() =>
                      setLightbox({ src: s.src, images: UI_SCREENS_BEFORE, idx: i % UI_SCREENS_BEFORE.length })
                    }
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
          </div>
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
              Treffix had grown significantly — but its company profile hadn't kept up.
              The existing design still reflected an earlier phase of the company, and
              it wasn't doing justice to the products being built or the direction
              the business was moving toward.
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

      {/* UI SHOWCASE — After redesign (after Solution) */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`}>
          <div className={styles.sectionLabel}><i />UI Preview</div>
          <h2 className={styles.sectionTitle}>
            The redesigned
            <br />
            experience.
          </h2>
        </div>
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrack}>
              {(UI_SCREENS_NEW.length > 0
                ? [...UI_SCREENS_NEW, ...UI_SCREENS_NEW, ...UI_SCREENS_NEW]
                : [...PLACEHOLDERS, ...PLACEHOLDERS, ...PLACEHOLDERS]
              ).map((s, i) =>
                s?.src ? (
                  <div
                    key={i}
                    className={styles.desktopCard}
                    onClick={() =>
                      setLightbox({ src: s.src, images: UI_SCREENS_NEW, idx: i % UI_SCREENS_NEW.length })
                    }
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
          </div>
          <div className={`${styles.marqueeRow} ${styles.marqueeReverse}`}>
            <div className={styles.marqueeTrack}>
              {(UI_SCREENS_NEW.length > 0
                ? [...UI_SCREENS_NEW, ...UI_SCREENS_NEW, ...UI_SCREENS_NEW]
                : [...PLACEHOLDERS, ...PLACEHOLDERS, ...PLACEHOLDERS]
              ).map((s, i) =>
                s?.src ? (
                  <div
                    key={i}
                    className={styles.desktopCard}
                    onClick={() =>
                      setLightbox({ src: s.src, images: UI_SCREENS_NEW, idx: i % UI_SCREENS_NEW.length })
                    }
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
          </div>
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
              that's consistent, credible, and ready to represent a growing SaaS company —
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

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
