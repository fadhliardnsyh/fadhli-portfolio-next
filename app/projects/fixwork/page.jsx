"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import ContactModal from "../../components/ContactModal/ContactModal";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "UI/UX Designer" },
  { label: "Type", value: "Mobile App" },
  { label: "Active Users", value: "500+ Daily" },
  { label: "Platform", value: "iOS & Android" },
];

const STATS = [
  { num: "500+", label: "Active daily users" },
  { num: "8+", label: "Core features designed" },
  { num: "2", label: "User roles (Admin & Employee)" },
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
    title: "Simplified attendance with face recognition",
    desc: "Designed a one-tap attendance flow with real-time face scan feedback and geofence indicator. Users know exactly where they are and what they need to do — no confusion, no extra steps.",
  },
  {
    num: "02",
    title: "Role-based dashboard architecture",
    desc: "Built separate information architectures for admin and employee roles. Admins get a high-level overview with pending approvals; employees see their personal daily tasks and status.",
  },
  {
    num: "03",
    title: "Progressive disclosure for feature density",
    desc: "Instead of showing all 8+ features upfront, the home screen surfaces the 4 most-used actions with a clear grid. Secondary features are one tap away, reducing overwhelm while keeping everything accessible.",
  },
  {
    num: "04",
    title: "Clear approval status system",
    desc: "Designed a consistent status indicator system (pending, approved, rejected) across all request types with color coding and timeline views — so users always know the state of their requests at a glance.",
  },
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
            Project · HRIS Mobile App
          </div>
          <h1 className={styles.caseTitle}>Fixwork</h1>
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
              Fixwork is a client-based HRIS mobile application designed to
              streamline workforce management for companies of all sizes. The
              app handles everything from attendance tracking and leave
              management to payroll and asset requests — all in one place.
            </p>
            <p>
              With over 500+ active daily users, the challenge was to create an
              interface that's powerful enough for HR administrators, yet
              intuitive enough for everyday employees to use without training.
            </p>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.num} className={styles.statCard}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
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

        <div className={`${styles.imgBlock} ${styles.reveal}`} ref={imgRef}>
          <img src="/assets/fixwork_card.png" alt="Fixwork App Screens" />
        </div>

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

      {/* CAROUSEL */}
      <ProjectCarousel currentId="fixwork" />

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
