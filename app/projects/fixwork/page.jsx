"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactModal from "../../components/ContactModal/ContactModal";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
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
  { overlay: 0.08 },
  { overlay: 0.28 },
  { overlay: 0.52 },
  { overlay: 0.72 },
  { overlay: 0.88 },
];

const UI_SCREENS = [
  { num: "01", label: "Attendance" },
  { num: "02", label: "Dashboard" },
  { num: "03", label: "Leave Request" },
  { num: "04", label: "Visit" },
  { num: "05", label: "Overtime" },
  { num: "06", label: "Notification" },
  { num: "07", label: "Attendance History" },
  { num: "08", label: "Permit" },
];

const RESULTS = [
  {
    icon: "📈",
    title: "500+ Daily Active Users",
    desc: "Consistent daily engagement across multiple client companies, proving the design is intuitive enough for everyday use without training or support.",
  },
  {
    icon: "⚡",
    title: "Faster HR Processes",
    desc: "Attendance, leave requests, and approvals that used to take hours through manual processes now take seconds through the app.",
  },
  {
    icon: "🎯",
    title: "Zero Onboarding Friction",
    desc: "The clear UI hierarchy meant new users could navigate the app without any formal training — reducing onboarding costs for client companies.",
  },
  {
    icon: "🔧",
    title: "Scalable Design System",
    desc: "Built a consistent component library that enabled faster development cycles and easier handoff to the engineering team.",
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

  const overviewRef = useReveal();
  const problemRef = useReveal();
  const solutionRef = useReveal();
  const imgRef = useReveal();
  const resultsRef = useReveal();
  const v2Ref = useReveal();

  return (
    <>
      <Navbar onConnectClick={() => setModalOpen(true)} />

      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img src="/assets/fixwork_banner.png" alt="Fixwork Hero" />
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
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrack}>
              {[...UI_SCREENS, ...UI_SCREENS].map((s, i) => (
                <div key={i} className={styles.phoneCard}>
                  <div className={styles.phoneCardNum}>{s.num}</div>
                  <div className={styles.phoneCardLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.marqueeRow} ${styles.marqueeReverse}`}>
            <div className={styles.marqueeTrack}>
              {[...UI_SCREENS, ...UI_SCREENS].map((s, i) => (
                <div key={i} className={styles.phoneCard}>
                  <div className={styles.phoneCardNum}>{s.num}</div>
                  <div className={styles.phoneCardLabel}>{s.label}</div>
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
          {V2_SCREENS.map((s, i) => (
            <div key={i} className={styles.v2Phone}>
              <div className={styles.v2PhoneBg} />
              <div className={styles.v2PhoneVeil} style={{ opacity: s.overlay }} />
            </div>
          ))}
        </div>
        <div className={styles.v2BottomFade} />
      </section>

      {/* CAROUSEL */}
      <ProjectCarousel currentId="fixwork" />

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
