"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactModal from "../../components/ContactModal/ContactModal";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import useMarqueeSlowOnHover from "../../hooks/useMarqueeSlowOnHover";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "Product & UI/UX Designer" },
  { label: "Type", value: "Mobile App" },
  { label: "Active Users", value: "500+ Daily" },
  { label: "Platform", value: "iOS & Android" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Active daily users" },
  { value: 8, suffix: "+", label: "Core features designed" },
  { value: 3, suffix: "", label: "Companies trust Fixwork" },
];

const CHALLENGES = [
  {
    num: "01 — Challenge",
    title: "Still relying on conventional fingerprint attendance",
    desc: "Companies using Fixwork previously relied on fingerprint scanners for attendance. In larger organizations, this created long queues — employees who arrived on time were marked late simply because of the line.",
  },
  {
    num: "02 — Challenge",
    title: "No visibility into personal attendance data",
    desc: "Attendance data was held exclusively by HR. Employees had no way to check their own records, which frequently led to conflicts over disputed tardiness that could have been avoided with simple transparency.",
  },
  {
    num: "03 — Challenge",
    title: "Manual and fragmented leave & permit requests",
    desc: "Leave and permit requests were still handled manually — employees had to personally approach their supervisor, then HR, going through multiple steps just to get approval.",
  },
  {
    num: "04 — Challenge",
    title: "Tedious manual process for out-of-office visits",
    desc: "When employees needed to visit a client or attend an external meeting, the process was painfully manual — they had to take a photo with GPS metadata enabled, then manually send it to HR as proof of location.",
  },
  {
    num: "05 — Challenge",
    title: "Overtime requests still done the old-fashioned way",
    desc: "Overtime requests were handled conventionally — through paper forms or direct messages to supervisors. There was no centralized system to track, approve, or monitor overtime.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "Digitized attendance via smartphone",
    desc: "Attendance is powered by face recognition and geofencing to prevent fraud. The system is also tied to each employee's work schedule — so clock-ins outside their shift hours are automatically flagged.",
  },
  {
    num: "02",
    title: "Full attendance history at a glance",
    desc: "Employees can view their complete clock-in and clock-out history directly from their smartphone — no more asking HR for data that should've always been theirs.",
  },
  {
    num: "03",
    title: "Leave & permit requests without the hassle",
    desc: "Employees can submit leave or permit requests in seconds, without going through long manual procedures. They can also check their remaining leave balance anytime, right from the app.",
  },
  {
    num: "04",
    title: "Visit feature with multi-location support",
    desc: "Employees can log visits with full location history. Multi-location support means field teams and those with back-to-back client visits can track every stop in a single session — no manual logging required.",
  },
  {
    num: "05",
    title: "Overtime requests made simple",
    desc: "Submitting overtime no longer means filling out forms or messaging supervisors manually. Employees can raise a request from their phone and track its approval status and history in one place.",
  },
  {
    num: "06",
    title: "Real-time notifications for everything",
    desc: "Employees receive instant updates on every request status — approved, pending, or rejected. On top of that, reminders for clock-in and clock-out keep them on track, while company-wide announcements, holiday notices, and broadcasts are all delivered through the same notification system.",
  },
];

const V2_SCREENS = [
  "/assets/projects/fixwork/fixwork-v2-1.png",
  "/assets/projects/fixwork/fixwork-v2-2.png",
  "/assets/projects/fixwork/fixwork-v2-3.png",
  "/assets/projects/fixwork/fixwork-v2-4.png",
];

const UI_SCREENS = [
  { src: "/assets/projects/fixwork/Fixwork-UI01.png", label: "Login" },
  { src: "/assets/projects/fixwork/Fixwork-UI02.png", label: "Home" },
  { src: "/assets/projects/fixwork/Fixwork-UI03.png", label: "Clock In" },
  { src: "/assets/projects/fixwork/Fixwork-UI04.png", label: "Self Onboarding" },
  { src: "/assets/projects/fixwork/Fixwork-UI05.png", label: "Attendance" },
  { src: "/assets/projects/fixwork/Fixwork-UI06.png", label: "Leave" },
  { src: "/assets/projects/fixwork/Fixwork-UI07.png", label: "Payslip" },
  { src: "/assets/projects/fixwork/Fixwork-UI08.png", label: "Profile" },
  { src: "/assets/projects/fixwork/Fixwork-UI09.png", label: "Schedule" },
  { src: "/assets/projects/fixwork/Fixwork-UI10.png", label: "Notification" },
  { src: "/assets/projects/fixwork/Fixwork-UI11.png", label: "Overtime" },
  { src: "/assets/projects/fixwork/Fixwork-UI12.png", label: "Visit" },
];

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        <polyline points="16 17 20 21 24 17"/><line x1="20" y1="21" x2="20" y2="13"/>
      </svg>
    ),
    title: "500+ Active Users & Growing",
    desc: "Over 500 users open Fixwork every single day — and the number keeps climbing as more companies adopt the platform.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Attendance That's Fraud-Proof",
    desc: "Face recognition and geofencing make check-ins quick and impossible to fake — no more proxy attendance or location spoofing.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Every Request Done in Seconds",
    desc: "Leave, permits, overtime, visits — everything that used to require back-and-forth is now a few taps. No paperwork, no queuing.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Full Transparency for Every Employee",
    desc: "Attendance records, leave balance, payslip, and request statuses are always visible to employees — no more chasing HR for data. Confusion drops, trust goes up.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <polyline points="16 11 18 13 22 9"/>
      </svg>
    ),
    title: "Onboarding Without HR in the Room",
    desc: "New employees can register themselves end-to-end through the app. HR doesn't need to be present — the process runs itself.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1 2-3.5 3-3.5 3S10 7.5 10 9a2 2 0 0 0 4 0c0-1.5 1.5-3 1.5-3S13 3 12 3z"/>
        <path d="M6.5 14c-1 1-1.5 2.5-1.5 2.5S6.5 17 8 17a2 2 0 0 0 0-4c-.5 0-1 .3-1.5 1z"/>
        <path d="M17.5 14c1 1 1.5 2.5 1.5 2.5S17.5 17 16 17a2 2 0 0 1 0-4c.5 0 1 .3 1.5 1z"/>
        <path d="M12 17v4M10 21h4"/>
      </svg>
    ),
    title: "A UI That Feels Natural",
    desc: "Users noted it doesn't feel like typical enterprise software. Intuitive, approachable, and navigable without a manual or training session.",
  },
];

function AnimatedStat({ value, suffix, label }) {
  const [count, setCount] = useState(0);
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
  }, [value]);

  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.statNum}>{count}{suffix}</div>
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

export default function FixworkPage() {
  const [modalOpen, setModalOpen] = useState(false);
  // lightbox: { src, images?, idx? } — images & idx untuk navigasi prev/next
  const [lightbox, setLightbox] = useState(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);

  const closeLightbox = () => {
    setLightboxClosing(true);
    setTimeout(() => {
      setLightbox(null);
      setLightboxClosing(false);
    }, 220);
  };

  // Keyboard: Escape tutup lightbox, arrow kiri/kanan navigasi
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
  const v2Ref = useReveal();

  const marqueeWrapRef = useRef(null);
  useMarqueeSlowOnHover(marqueeWrapRef);

  return (
    <>
      <Navbar onConnectClick={() => setModalOpen(true)} />

      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img src="/assets/projects/fixwork/fixwork_banner.png" alt="Fixwork Hero" />
        </div>
        <div className={styles.caseHeroContent}>
          <div className={styles.eyebrow}>
            <i />
            Project · Mobile · HRIS
          </div>
          <h1 className={styles.caseTitle}>Fixwork App</h1>
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
        <section
          className={`${styles.section} ${styles.reveal}`}
          ref={overviewRef}
        >
          <div className={styles.sectionLabel}>
            <i />
            Overview
          </div>
          <h2 className={styles.sectionTitle}>
            A smarter way to manage
            <br />
            human resources
          </h2>
          <div className={styles.body}>
            <p>
              Fixwork is an HRIS mobile application that makes it easy for
              employees to handle attendance, leave requests, permits, and other
              work-related needs — all from their phone. Designed to fit
              companies of any scale, from small startups to large enterprises.
            </p>
            <p>
              Today, Fixwork has over 500+ active users engaging with the app
              every single day — a testament to how intuitive and essential it
              has become in their daily work life.
            </p>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Problem */}
        <section
          className={`${styles.section} ${styles.reveal}`}
          ref={problemRef}
        >
          <div className={styles.sectionLabel}>
            <i />
            The Problem
          </div>
          <h2 className={styles.sectionTitle}>
            HR processes were slow,
            <br />
            manual, and frustrating
          </h2>
          <div className={styles.body}>
            <p>
              Before Fixwork, companies relied on spreadsheets, physical forms,
              and manual approvals to manage their workforce. This created
              bottlenecks, errors, and a poor experience for both HR teams and
              employees.
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
        <section
          className={`${styles.section} ${styles.reveal}`}
          ref={solutionRef}
        >
          <div className={styles.sectionLabel}>
            <i />
            The Solution
          </div>
          <h2 className={styles.sectionTitle}>
            Designing with clarity
            <br />
            and purpose
          </h2>
          <div className={styles.body}>
            <p>
              The design approach focused on reducing cognitive load at every
              step — clear visual hierarchy, a task-first home screen, and a
              consistent component system that scaled across all features.
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
            Designed for real<br />everyday use
          </h2>
        </div>
        <div className={styles.marqueeWrap} ref={marqueeWrapRef}>
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
        <section
          className={`${styles.section} ${styles.reveal}`}
          ref={resultsRef}
        >
          <div className={styles.sectionLabel}>
            <i />
            Results
          </div>
          <h2 className={styles.sectionTitle}>
            Impact that speaks
            <br />
            for itself
          </h2>
          <div className={styles.body}>
            <p>
              Fixwork launched to real users and quickly became an essential
              tool in their daily work life. The design decisions made
              throughout the process directly contributed to adoption and
              retention.
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

      {/* V2 SNEAK PEEK */}
      <section className={styles.v2Section}>
        <div className={`${styles.v2Inner} ${styles.reveal}`} ref={v2Ref}>
          <div className={styles.v2Badge}>
            <span className={styles.v2Pulse} />
            Coming Soon
          </div>
          <h2 className={styles.v2Title}>
            Fixwork is getting<br />a major upgrade.
          </h2>
          <p className={styles.v2Sub}>
            A complete redesign with smarter flows, a more intuitive experience,
            and major improvements across every feature.
          </p>
        </div>
        <div className={styles.v2Screens}>
          {V2_SCREENS.map((src, i) => (
            <div key={i} className={styles.v2Phone} onClick={() => setLightbox({ src })}>
              <img src={src} alt={`Fixwork V2 screen ${i + 1}`} className={styles.v2PhoneImg} />
            </div>
          ))}
        </div>
        <div className={styles.v2BottomFade} />
      </section>

      {/* CAROUSEL */}
      <ProjectCarousel currentId="fixwork" />

      {lightbox && (
        <div
          className={`${styles.lightboxOverlay} ${lightboxClosing ? styles.lightboxOverlayOut : ""}`}
          onClick={closeLightbox}
        >
          <button className={styles.lightboxClose} onClick={closeLightbox}>✕</button>

          {/* Navigasi prev/next (hanya untuk UI_SCREENS yang punya images array) */}
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
            key={lightbox.src || lightbox}
            src={lightbox.src || lightbox}
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
