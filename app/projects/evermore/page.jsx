"use client";

import { useState, useEffect, useRef } from "react";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "UI Designer" },
  { label: "Type", value: "Landing Page" },
  { label: "Category", value: "Web3 · Game" },
  { label: "Year", value: "2023" },
];

const CHALLENGES = [
  {
    num: "01, Challenge",
    title: "The game had no web presence at all",
    desc: "Evermore Knights existed as a playable game, but there was no website for it. Anyone who heard about the game had nowhere to go to learn more, no page, no introduction, nothing.",
  },
  {
    num: "02, Challenge",
    title: "Web3 games face a steep trust barrier",
    desc: "New players approaching a Web3 game are naturally skeptical. Without a polished, credible first impression, potential players and investors would move on before giving the game a chance.",
  },
  {
    num: "03, Challenge",
    title: "Rich lore with no place to live",
    desc: "Evermore Knights had a fully developed world, characters with backstories, named maps, item systems, and factions. None of it was communicated anywhere accessible to someone discovering the game for the first time.",
  },
  {
    num: "04, Challenge",
    title: "No path for new players to follow",
    desc: "Even if someone discovered the game through word of mouth, there was no clear next step. No way to understand the game, build excitement, or know how to get involved.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "A landing page that opens the world of Evermore",
    desc: "The landing page was designed to be the game's front door, the first place anyone lands when they want to know what Evermore Knights is. Every section answers a question a new visitor would have.",
  },
  {
    num: "02",
    title: "Visual identity built for the Web3 gaming audience",
    desc: "Dark, immersive aesthetics with fantasy-meets-crypto visual language established the right tone immediately, credible enough to earn trust, dramatic enough to build excitement.",
  },
  {
    num: "03",
    title: "Sections dedicated to the game's world",
    desc: "Characters, maps, items, and core game mechanics each got their own space on the page. Visitors can explore the lore at their own pace, getting drawn deeper into the world with every scroll.",
  },
  {
    num: "04",
    title: "A clear journey from curiosity to commitment",
    desc: "The page was structured to guide visitors through a natural progression: discover the world, understand how it works, then take action, whether that's joining the community, minting, or playing.",
  },
];

const UI_SCREENS = [
  // { src: "/assets/projects/evermore/evermore-ui-01.webp", label: "Hero" },
];

const PLACEHOLDERS = Array.from({ length: 2 });

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "A World Visitors Can Explore",
    desc: "For the first time, anyone curious about Evermore Knights had a place to land, a page that answered their questions and pulled them into the game's universe.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Credibility for a Web3 Audience",
    desc: "A polished, intentional design gave Evermore Knights the visual weight needed to be taken seriously in a space where first impressions determine everything.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "Lore That Finally Had a Home",
    desc: "Characters, maps, and game mechanics that previously lived only inside the game were now presented in a way that could excite and educate newcomers before they even played.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
      </svg>
    ),
    title: "A Guided Path from Discovery to Action",
    desc: "The page naturally moved visitors from curiosity to engagement, giving the game a structured way to grow its community beyond word-of-mouth alone.",
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

export default function EvermorePage() {
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
  const uiRef = useReveal();
  const resultsRef = useReveal();

  return (
    <>
      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img src="/assets/projects/evermore/evermore-page-banner.webp" alt="Evermore Knights" />
        </div>
        <div className={styles.caseHeroContent}>
          <div className={styles.eyebrow}>
            <i />
            Project · Web · Web3 Game
          </div>
          <h1 className={styles.caseTitle}>Evermore Knights</h1>
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
            Giving a Web3 game
            <br />
            its first front door
          </h2>
          <div className={styles.body}>
            <p>
              Evermore Knights is a Web3-based fantasy RPG with a fully developed
              game world, named characters, distinct maps, item systems, and lore
              that runs deep. But for all of that, the game had no website. No place
              for someone curious to land, explore, and understand what it was.
            </p>
            <p>
              The goal of this project was to design a landing page that served as
              the game's public introduction, a place that could open up the world
              of Evermore Knights to anyone encountering it for the first time.
            </p>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Problem */}
        <section className={`${styles.section} ${styles.reveal}`} ref={problemRef}>
          <div className={styles.sectionLabel}>
            <i />
            The Problem
          </div>
          <h2 className={styles.sectionTitle}>
            A game with a world built,
            <br />
            but no window into it
          </h2>
          <div className={styles.body}>
            <p>
              Evermore Knights had everything a game needs to attract players , 
              except a way for people outside the existing community to discover
              any of it. The game existed, but publicly, it was invisible.
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
            A landing page that
            <br />
            opens the world
          </h2>
          <div className={styles.body}>
            <p>
              The design was built around one core goal: make someone who has
              never heard of Evermore Knights walk away understanding the game,
              feeling the atmosphere, and knowing exactly what to do next.
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

      {/* UI SHOWCASE */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={uiRef}>
          <div className={styles.sectionLabel}><i />UI Preview</div>
          <h2 className={styles.sectionTitle}>
            The world of Evermore,
            <br />
            on the web.
          </h2>
          <div className={styles.body}>
            <p>
              An immersive, scroll-driven landing page built to introduce the
              game's characters, maps, and lore, designed to feel like stepping
              into the world before you've even played it.
            </p>
          </div>
        </div>
        <div className={styles.screensGrid}>
          {(UI_SCREENS.length > 0 ? UI_SCREENS : PLACEHOLDERS).map((s, i) =>
            s?.src ? (
              <div
                key={i}
                className={styles.desktopCard}
                onClick={() => setLightbox({ src: s.src, images: UI_SCREENS, idx: i })}
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
            The game's world,
            <br />
            finally visible
          </h2>
          <div className={styles.body}>
            <p>
              The Evermore Knights landing page gave the game a public presence
              for the first time, turning a rich but invisible game world into
              something anyone could discover, explore, and get excited about.
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
      <ProjectCarousel currentId="evermore" />

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
