"use client";

import { useState, useEffect, useRef } from "react";
import ProjectCarousel from "../../components/ProjectCarousel/ProjectCarousel";
import styles from "./page.module.css";

const META = [
  { label: "Role", value: "Vibe Coder / Designer" },
  { label: "Type", value: "Landing Page" },
  { label: "Category", value: "SaaS · Fleet Tech" },
  { label: "Year", value: "2026" },
];

const STATS = [
  { value: 4000, suffix: "+", label: "Units monitored via product" },
  { display: "87%", label: "Operational efficiency claim" },
  { value: 5, suffix: "", label: "Industries addressed" },
];

const STACK = [
  { name: "Next.js", logo: "/assets/logos/tools/logo-nextjs.svg", color: "#ffffff" },
  { name: "Tailwind CSS", logo: "/assets/logos/tools/logo-tailwind.svg", color: "#38BDF8" },
];

const CHALLENGES = [
  {
    num: "01 · Challenge",
    title: "Prospects had nowhere to learn about FixTrack",
    desc: "When potential customers heard about FixTrack and wanted to dig deeper, they had no page to visit. Interest showed up, but the journey stopped there. There was simply no destination for anyone curious about the product.",
  },
  {
    num: "02 · Challenge",
    title: "Marketing was flying blind on demand",
    desc: "Without a landing page, there was no way to see how many potential customers were researching FixTrack, where they were coming from, or how engaged they were. Demand existed, but marketing had no way to quantify or act on it.",
  },
  {
    num: "03 · Challenge",
    title: "Sales explained the product from scratch every time",
    desc: "Every sales conversation started at zero. Features, use cases, benefits, and differentiators had to be walked through one prospect at a time. Time that should have gone into closing was consumed by product education.",
  },
  {
    num: "04 · Challenge",
    title: "Pricing was invisible, so decisions stalled",
    desc: "Prospects had no way to see pricing until they got on a call with sales. For many, that extra step was enough to delay or drop the decision entirely. Buying signals went cold before sales ever heard them.",
  },
];

const SOLUTIONS = [
  {
    num: "01",
    title: "A single destination for every curious prospect",
    desc: "The landing page became the place FixTrack lives. Word-of-mouth referrals, sales outreach, and marketing campaigns now all point to one URL, so anyone who wants to know more finally has somewhere to go.",
  },
  {
    num: "02",
    title: "Analytics baked in, so demand becomes measurable",
    desc: "Traffic sources, engagement, and drop-off points are tracked from day one. Marketing can finally see who is showing up, where they are coming from, and which sections are resonating, so decisions stop being guesswork.",
  },
  {
    num: "03",
    title: "Features and use cases documented, so sales can close",
    desc: "Every feature, industry, and benefit is laid out on the page itself. Sales sends a link instead of running a walkthrough, prospects arrive already educated, and the conversation shifts from explaining to closing.",
  },
  {
    num: "04",
    title: "Pricing on the page, so decisions can move forward",
    desc: "Pricing is visible from the start. Prospects self-qualify before they ever reach out, and the buyers who do get in touch are already aligned on cost, so the buying journey moves faster on both sides.",
  },
];

const RESULTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "A Complex Product, Made Sellable",
    desc: "GPS, AI, geofencing, and analytics are technical concepts. The page translates all of it into outcomes anyone in fleet ops can understand within seconds.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Five Industries, One Cohesive Page",
    desc: "Visitors from logistics, mining, or hazmat can each find themselves reflected on the page, without the site feeling scattered or generic.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Trust Delivered at Every Scroll",
    desc: "Certifications, partnership logos, and hard metrics sit alongside every claim, so credibility is never something the visitor has to take on faith.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Conversion Paths for Every Reader",
    desc: "Whether the visitor is ready to sign up, ready to talk, or just curious, the page has a clear next step that removes the biggest B2B blocker: friction.",
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

export default function FixTrackPage() {
  const overviewRef = useReveal();
  const problemRef = useReveal();
  const solutionRef = useReveal();
  const previewRef = useReveal();
  const browserRef = useReveal();
  const resultsRef = useReveal();

  return (
    <>
      {/* HERO */}
      <section className={styles.caseHero}>
        <div className={styles.caseHeroBg}>
          <img
            src="/assets/projects/fixtrack/fixtrack-landing-banner.webp"
            alt="FixTrack Landing Page"
          />
        </div>
        <div className={styles.caseHeroContent}>
          <div className={styles.eyebrow}>
            <i />
            Project · Web · Landing Page · Vibe Coding
          </div>
          <h1 className={styles.caseTitle}>FixTrack Landing Page</h1>
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
            A landing page built to sell
            <br />
            a technically deep product
          </h2>
          <div className={styles.body}>
            <p>
              FixTrack is a GPS fleet and asset tracking platform with AI-powered
              analytics, serving industries from logistics and mining to hazmat
              transport. It is a serious B2B product with a lot to explain.
            </p>
            <p>
              This landing page was designed and vibe-coded end-to-end to turn
              that depth into something a fleet operator can grasp in a single
              scroll, then act on with a low-friction trial or WhatsApp chat.
            </p>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} display={s.display} />
            ))}
          </div>

          <div className={styles.stack}>
            <div className={styles.stackLabel}>Built with</div>
            <div className={styles.stackGrid}>
              {STACK.map((t) => (
                <div key={t.name} className={styles.stackCard}>
                  <div
                    className={styles.stackLogo}
                    style={{
                      background: `${t.color}14`,
                      borderColor: `${t.color}28`,
                    }}
                  >
                    <img src={t.logo} alt={t.name} />
                  </div>
                  <span className={styles.stackName}>{t.name}</span>
                </div>
              ))}
            </div>
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
            No landing page meant
            <br />
            no funnel, for anyone
          </h2>
          <div className={styles.body}>
            <p>
              FixTrack existed as a product, but not as a story anyone could go
              read. Prospects heard about it, wanted to know more, and hit a
              wall. That single missing page created problems for every team
              touching the customer journey.
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
            One landing page that
            <br />
            unlocked every team
          </h2>
          <div className={styles.body}>
            <p>
              The page was built to fix the funnel end-to-end. Prospects finally
              had a place to explore FixTrack on their own, marketing got the
              visibility they needed, and sales stopped starting every
              conversation from scratch.
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

      {/* LIVE SITE — showcase with browser preview */}
      <section className={styles.uiShowcase}>
        <div className={`${styles.uiShowcaseHeader} ${styles.reveal}`} ref={previewRef}>
          <div className={styles.sectionLabel}><i />Live Site</div>
          <h2 className={styles.sectionTitle}>
            See it in the wild.
          </h2>
          <div className={styles.body}>
            <p>
              The page is live and driving trial signups. Best experienced by
              scrolling through it end-to-end, seeing how each section addresses
              a different industry and objection.
            </p>
          </div>
          <a
            href="https://treffix.id/fixtrack"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
          >
            Visit FixTrack
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        <a
          href="https://treffix.id/fixtrack"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.browser} ${styles.reveal}`}
          ref={browserRef}
          aria-label="Open FixTrack live site in new tab"
        >
          <div className={styles.browserChrome}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.urlBar}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              treffix.id/fixtrack
            </span>
            <span className={styles.chromeSpacer} />
          </div>
          <div className={styles.browserBody}>
            <img
              src="/assets/projects/fixtrack/fixtrack-live-preview.webp"
              alt="FixTrack landing page preview"
              loading="lazy"
            />
            <div className={styles.browserOverlay}>
              <span className={styles.overlayPill}>
                Open live site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </div>
          </div>
        </a>
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
            A page that earns the sale
            <br />
            before the first conversation
          </h2>
          <div className={styles.body}>
            <p>
              The FixTrack landing page turns a technically dense product into
              something a fleet operator understands in seconds and trusts
              within minutes. Design and code shipped together, from the same
              hands, without a handoff in between.
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
      <ProjectCarousel currentId="fixtrack" />
    </>
  );
}
