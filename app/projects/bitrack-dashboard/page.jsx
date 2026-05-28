"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactModal from "../../components/ContactModal/ContactModal";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "UI/UX Designer" },
  { label: "Type", value: "Web Dashboard" },
  { label: "Category", value: "IoT · Fleet Management" },
  { label: "Year", value: "2025" },
  { label: "Platform", value: "Responsive Web" },
];

const STATS = [
  { value: 3000, suffix: "+", label: "GPS devices connected" },
  { value: 6, suffix: "", label: "Core features" },
  { display: "99.9%", label: "Tracking accuracy" },
];

const CHALLENGES = [
  {
    num: "01 — Challenge",
    title: "Overwhelming UI with no clear hierarchy",
    desc: "Everything competed for attention. Alerts, maps, trip data, and vehicle lists were all presented at the same visual weight — making it impossible to quickly find what mattered most.",
  },
  {
    num: "02 — Challenge",
    title: "Data overload with no actionable insights",
    desc: "The dashboard surfaced raw GPS data but never helped operators interpret it. Numbers were everywhere; patterns and decisions were nowhere.",
  },
  {
    num: "03 — Challenge",
    title: "The live map was buried",
    desc: "Real-time vehicle tracking — the most critical feature — was hidden behind multiple clicks. Finding a vehicle's current location required navigating through layers of menus.",
  },
  {
    num: "04 — Challenge",
    title: "No responsive experience",
    desc: "The dashboard only worked properly on large desktop screens. Any operator trying to use it on a smaller display encountered a broken, unusable layout.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Clear hierarchy built around operator priority",
    desc: "The redesign established a clear information hierarchy: live status first, analytics second, historical data third. Every operator lands on the page and immediately knows where to look.",
  },
  {
    num: "02",
    title: "Analytics that surface decisions, not just data",
    desc: "Raw numbers were replaced with summarized insights — charts that highlight trends, anomalies, and patterns. Operators get answers, not spreadsheets.",
  },
  {
    num: "03",
    title: "Live tracking front and center",
    desc: "The real-time map became the centerpiece of the dashboard. Fleet positions, statuses, and active trips are visible the moment the operator opens the page.",
  },
  {
    num: "04",
    title: "Responsive layout for every screen size",
    desc: "The redesigned dashboard works seamlessly across screen sizes — built with a flexible grid that adapts without breaking, so operators can use it from wherever they work.",
  },
];

const UI_SCREENS_BEFORE = [
  // { src: "/assets/bitrackv2-before-01.png", label: "Original Dashboard" },
];

const UI_SCREENS_NEW = [
  // { src: "/assets/bitrackv2-after-01.png", label: "Redesigned Dashboard" },
];

const PLACEHOLDERS = Array.from({ length: 2 });

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Fleet Visibility in One Glance",
    desc: "The redesigned dashboard surfaces what matters most immediately — operators can assess the full fleet status without scrolling or digging.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Faster Incident Response",
    desc: "With alerts and live tracking in prominent positions, operators can spot issues and respond before situations escalate.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Data That's Actually Readable",
    desc: "Complex trip and behavior data is now visualized in a way operators can interpret and act on — not just store and ignore.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "A Product That Feels Production-Ready",
    desc: "The redesign elevated BiTrack's dashboard from an internal tool to a polished, enterprise-grade product — ready to be shown to clients.",
  },
];

function AnimatedStat({ value, suffix, label, display }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          obs.disconnect();
          setVisible(true);
          if (display) return;
          const duration = 1600;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, display]);

  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.statNum}>
        {display ? (
          <span style={{ opacity: visible ? 1 : 0, transition: "opacity .6s ease" }}>
            {display}
          </span>
        ) : (
          <>{count}{suffix}</>
        )}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

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

export default function BiTrackDashboardPage() {
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
  const imgBeforeRef = useReveal();
  const problemRef = useReveal();
  const solutionRef = useReveal();
  const uiAfterRef = useReveal();
  const resultsRef = useReveal();

  return (
    <>
      <Navbar onConnectClick={() => setModalOpen(true)} />

      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img src="/assets/bitrackv2-page-banner.png" alt="BiTrack V2 Dashboard" />
        </div>
        <div className={styles.caseHeroContent}>
          <div className={styles.eyebrow}>
            <i />
            Project · Web · IoT
          </div>
          <h1 className={styles.caseTitle}>BiTrack V2 Dashboard</h1>
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
            From internal tool
            <br />
            to fleet command center
          </h2>
          <div className={styles.body}>
            <p>
              BiTrack V2 Dashboard is a complete redesign of B-Log's original fleet
              monitoring dashboard — rebuilt from the ground up for clarity, speed, and
              real operational use. The old dashboard worked, but it was built for
              engineers, not operators.
            </p>
            <p>
              With over 3,000 GPS devices connected to the system, the new dashboard
              needed to handle serious data at scale — and present it in a way that
              made fleet operators faster and more confident in every decision they make.
            </p>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} display={s.display} />
            ))}
          </div>
        </section>
      </div>

      {/* UI SHOWCASE — Before redesign */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={imgBeforeRef}>
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
            Built to work,
            <br />
            not built to be used
          </h2>
          <div className={styles.body}>
            <p>
              The original BiTrack dashboard got the job done technically — but it
              wasn't designed with operators in mind. Critical information was buried,
              the interface had no clear focus, and the experience made a complex job
              even harder than it needed to be.
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
            Redesigned around
            <br />
            how operators actually work
          </h2>
          <div className={styles.body}>
            <p>
              The redesign started with one question: what does an operator need
              to see the moment they open the dashboard? Everything else followed
              from that — structure, hierarchy, layout, and the way data is surfaced.
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

      {/* UI SHOWCASE — After redesign */}
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
              A focused, operator-first interface — where the most important
              information is always one glance away, and complex fleet data
              becomes something you can actually act on.
            </p>
          </div>
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
            A dashboard operators
            <br />
            actually want to use
          </h2>
          <div className={styles.body}>
            <p>
              The redesigned BiTrack V2 Dashboard transformed the way operators
              interact with their fleet data — turning a tool people used out of
              necessity into one they actively rely on.
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
      <ProjectCarousel currentId="bitrack-dashboard" />

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
