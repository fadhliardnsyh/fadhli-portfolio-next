"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactModal from "../../components/ContactModal/ContactModal";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "UI/UX Designer" },
  { label: "Type", value: "Mobile App" },
  { label: "Category", value: "IoT · Vehicle Tracking" },
  { label: "Year", value: "2025" },
  { label: "Platform", value: "iOS & Android" },
];

const STATS = [
  { value: 3000, suffix: "+", label: "GPS devices connected" },
  { value: 6, suffix: "", label: "Core features" },
  { display: "99.9%", label: "Tracking accuracy" },
];

const CHALLENGES = [
  {
    num: "01 — Challenge",
    title: "Vehicle monitoring was locked to a desktop dashboard",
    desc: "All fleet monitoring could only be done through a desktop-based dashboard. Operators had to sit in front of a PC to see vehicle conditions — there was simply no other way.",
  },
  {
    num: "02 — Challenge",
    title: "Real-time alerts went unnoticed",
    desc: "GPS alerts and notifications only appeared on the desktop dashboard. If no one was at the PC when an alert came in, the response was delayed — and critical moments were missed entirely.",
  },
  {
    num: "03 — Challenge",
    title: "Operators had to stay glued to their PC",
    desc: "There was no mobility. Operators' ability to monitor the fleet was completely tied to being at a computer. Remote monitoring or checking in while on the field was simply not possible.",
  },
  {
    num: "04 — Challenge",
    title: "Registering new vehicles was an awkward process",
    desc: "Adding a new unit to the system required access to the desktop dashboard — but the vehicle being registered was out in the field. Two things that couldn't be done at the same place at the same time.",
  },
  {
    num: "05 — Challenge",
    title: "Checking trip data required going back to the desk",
    desc: "Viewing trip history or real-time trip status meant accessing the dashboard. There was no quick way to check vehicle movement while away from the computer.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Live GPS tracking on an interactive map",
    desc: "Every vehicle's real-time location is displayed on a live map with route tracing, giving fleet managers instant visibility at any time — from the office or on the go.",
  },
  {
    num: "02",
    title: "Driver behavior monitoring",
    desc: "The app tracks key metrics like speed, harsh braking, rapid acceleration, and idle time — helping companies identify risky drivers, reduce fuel waste, and improve road safety.",
  },
  {
    num: "03",
    title: "Automated trip recording",
    desc: "Every trip is automatically recorded with timestamps, routes, distance, and duration. No manual input needed — drivers focus on driving, managers get accurate data instantly.",
  },
  {
    num: "04",
    title: "Geofencing with instant alerts",
    desc: "Managers can draw custom zones on the map. The app triggers push notifications the moment a vehicle enters or exits a defined area — without having to check manually.",
  },
  {
    num: "05",
    title: "Fleet analytics and reports",
    desc: "A built-in analytics module summarizes trips, driving scores, fuel efficiency trends, and fleet utilization — turning raw GPS data into actionable insights, all from a single screen.",
  },
  {
    num: "06",
    title: "Real-time notifications for critical events",
    desc: "Get alerted for overspeeding, geofence violations, unauthorized usage, and more — instantly delivered to the manager's device so nothing slips through the cracks.",
  },
];

const UI_SCREENS = [
  { src: "/assets/BiTrack-App-UI01.png", label: "Live Map" },
  { src: "/assets/BiTrack-App-UI02.png", label: "Vehicle List" },
  { src: "/assets/BiTrack-App-UI03.png", label: "Trip History" },
  { src: "/assets/BiTrack-App-UI04.png", label: "Driver Profile" },
  { src: "/assets/BiTrack-App-UI05.png", label: "Analytics" },
  { src: "/assets/BiTrack-App-UI06.png", label: "Geofence" },
  { src: "/assets/BiTrack-App-UI07.png", label: "Notifications" },
  { src: "/assets/BiTrack-App-UI08.png", label: "Settings" },
];

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Real-Time Fleet Visibility",
    desc: "Managers can see every vehicle's live location on a map without making a single phone call — no more guessing where the fleet is.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Data-Driven Driver Accountability",
    desc: "Driving behavior scores give companies a clear, objective view of how each driver performs — making it easy to reward good driving and address unsafe habits.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Zero Manual Trip Logging",
    desc: "Automated recording eliminated the need for manual logbooks entirely. Every trip is captured accurately in the background — saving hours of admin work each week.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: "Instant Security Alerts",
    desc: "Geofence violations and after-hours usage are flagged immediately — giving companies the ability to respond before situations escalate.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Smarter Fleet Decisions",
    desc: "Analytics surfaced patterns that were invisible before — which routes waste fuel, which vehicles need attention, and which drivers are consistently performing well.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "A UI That Feels Effortless",
    desc: "Complex GPS and IoT data was distilled into a clean, scannable interface — managers can get the full picture in seconds, without needing training.",
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
          if (display) return; // static display — skip counter
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

export default function BiTrackPage() {
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
          <img src="/assets/bitrack-page-banner.png" alt="BiTrack Hero" />
        </div>
        <div className={styles.caseHeroContent}>
          <div className={styles.eyebrow}>
            <i />
            Project · Mobile · IoT
          </div>
          <h1 className={styles.caseTitle}>BiTrack App</h1>
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

      {/* CONTENT */}
      <div className={styles.content}>

        {/* Overview */}
        <section className={`${styles.section} ${styles.reveal}`} ref={overviewRef}>
          <div className={styles.sectionLabel}>
            <i />
            Overview
          </div>
          <h2 className={styles.sectionTitle}>
            Know where your vehicle is,
            <br />
            at all times
          </h2>
          <div className={styles.body}>
            <p>
              BiTrack is the mobile companion app for B-Log's IoT vehicle tracking
              system. It gives drivers and fleet operators a direct window into every
              GPS device installed on their vehicles — live location, current status,
              trip history, and more — all from their phone.
            </p>
            <p>
              With over 3,000 GPS devices already connected to the system, BiTrack
              handles everything from real-time tracking and dashcam previews to
              automated alerts and vehicle registration — built to be fast, reliable,
              and accurate to 99.9%.
            </p>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} display={s.display} />
            ))}
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
            Everything was chained
            <br />
            to a desktop screen
          </h2>
          <div className={styles.body}>
            <p>
              Before BiTrack existed, all fleet monitoring relied entirely on a
              desktop dashboard. There was no mobility — operators had to be at
              their computer to monitor vehicles, respond to alerts, check trips,
              or register new units.
            </p>
            <p>
              This dependency on desktop created a real bottleneck: the moment an
              operator stepped away from the PC, all critical information became
              completely out of reach.
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
            Designed to give clarity
            <br />
            at every layer
          </h2>
          <div className={styles.body}>
            <p>
              The design challenge was translating dense IoT data — live GPS
              coordinates, sensor readings, driver events — into a mobile UI that
              felt effortless to use. Every screen was built around a single
              question: what does the manager need to know right now?
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
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={imgRef}>
          <div className={styles.sectionLabel}><i />UI Preview</div>
          <h2 className={styles.sectionTitle}>
            Complex data,
            <br />
            made simple
          </h2>
        </div>
        <div className={styles.marqueeWrap}>
          {/* Row 1 — kiri */}
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrack}>
              {[...UI_SCREENS, ...UI_SCREENS, ...UI_SCREENS].map((s, i) => (
                <div
                  key={i}
                  className={styles.phoneCard}
                  onClick={() =>
                    setLightbox({ src: s.src, images: UI_SCREENS, idx: i % UI_SCREENS.length })
                  }
                >
                  <img src={s.src} alt={s.label} loading="lazy" />
                  <div className={styles.phoneCardOverlay}>
                    <span className={styles.phoneCardLabel}>{s.label}</span>
                  </div>
                  <div className={styles.phoneCardZoom}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — kanan */}
          <div className={`${styles.marqueeRow} ${styles.marqueeReverse}`}>
            <div className={styles.marqueeTrack}>
              {[...UI_SCREENS, ...UI_SCREENS, ...UI_SCREENS].map((s, i) => (
                <div
                  key={i}
                  className={styles.phoneCard}
                  onClick={() =>
                    setLightbox({ src: s.src, images: UI_SCREENS, idx: i % UI_SCREENS.length })
                  }
                >
                  <img src={s.src} alt={s.label} loading="lazy" />
                  <div className={styles.phoneCardOverlay}>
                    <span className={styles.phoneCardLabel}>{s.label}</span>
                  </div>
                  <div className={styles.phoneCardZoom}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                    </svg>
                  </div>
                </div>
              ))}
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
            From guesswork
            <br />
            to full control
          </h2>
          <div className={styles.body}>
            <p>
              BiTrack gave fleet managers something they never had before —
              complete, real-time visibility into their operations. The design
              decisions that shaped every screen directly contributed to faster
              adoption and a measurable shift in how fleets are managed.
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
      <ProjectCarousel currentId="bitrack" />

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
