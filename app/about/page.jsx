"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

/* ── DATA — ganti dengan info yang sesuai ───────────────────── */

const BIODATA = {
  born: "Batam, December 14, 1998",
  from: "Bekasi, Indonesia",
  hobbies: ["Running"],
};

const RUNNING_PHOTOS = [
  { src: "/assets/running-1.webp", alt: "Running" },
  { src: "/assets/running-2.webp", alt: "Running" },
  { src: "/assets/running-3.webp", alt: "Running" },
];

const EXPERIENCE = [
  {
    company: "Treffix.id",
    position: "UI/UX Designer",
    period: "Nov 2024 – Present",
    location: "Tangerang",
    logo: "/assets/treffix-logo.png",
    bullets: [
      "Designed UI for web dashboards including HRMS, Fleet Management, and Warehouse Management systems.",
      "Conducted UAT directly with end users using positive and negative test scenarios.",
      "Structured PRDs to define features, user flows, and technical requirements.",
      "Led cross-functional collaboration across designers and developers to ensure efficient workflow.",
    ],
  },
  {
    company: "Tekuton",
    position: "UI/UX Designer",
    period: "Apr 2024 – Jul 2024",
    location: "South Tangerang, Banten",
    logo: "/assets/tekuton-logo.png",
    bullets: [
      "Created UI designs for Creoplay, a Web3 marketplace.",
      "Conducted client interviews to understand needs and provided design recommendations.",
      "Collaborated with the developer team to assist in implementing designs.",
    ],
  },
  {
    company: "Nomina Games",
    position: "UI/UX Designer",
    period: "Nov 2022 – Nov 2023",
    location: "South Tangerang, Banten",
    logo: "/assets/nomina-logo.png",
    bullets: [
      "Created UI designs for landing pages, dashboards, mobile apps, Web3 marketplace, and game UI.",
      "Developed user flows and information architecture for both users and product teams.",
      "Presented research results and designs to Creative Lead, Product Owner, and stakeholders.",
    ],
  },
  {
    company: "DjuBli",
    position: "UI/UX Designer",
    period: "May 2022 – Oct 2022",
    location: "Jakarta Metropolitan Area",
    logo: "/assets/djubli-logo.png",
    bullets: [
      "Created UI design for DjuBli website and mobile apps (marketplace).",
      "Developed a new design system for website and mobile apps.",
      "Conducted UAT and presented research results and designs to the owner.",
    ],
  },
  {
    company: "Universitas Gunadarma",
    position: "IT Support · Laboratory Assistant",
    period: "Oct 2018 – Oct 2020",
    location: "Depok, West Java",
    logo: "/assets/logo-gunadarma-alt.png",
    bullets: [
      "Conducted maintenance and troubleshooting on laboratory computers.",
      "Provided technical support for lab users.",
    ],
  },
];

const EDU = [
  {
    institution: "Universitas Gunadarma",
    major: "Bachelor's of Engineering, Computer Science",
    period: "2016 – 2020",
    logo: "/assets/logo-gunadarma-alt.png",
    bullets: [
      "Served as a lab assistant for 2 years in IT Support for the Intermediate Accounting laboratory.",
      "Final project: an Android-based learning app using Augmented Reality, allowing users to explore historical buildings worldwide in 3D with audio and text explanations. Received an A grade.",
    ],
  },
  {
    institution: "Purwadhika Digital Technology School",
    major: "UI/UX Designer Job Connector",
    period: "Oct 2021 – Apr 2022",
    logo: "/assets/logo-purwadhika-icon.jfif",
    bullets: [
      "Studied all aspects of UI/UX Design including fundamentals, UX Research, Ideate & Define, and design execution.",
      "Completed real-case projects and a final graduation project.",
    ],
  },
];

const SKILLS = [
  "UI Design", "UX Design", "User Research", "Wireframing",
  "Comparative Research", "Qualitative Research", "Game User Interface",
  "Product Design", "Usability Testing", "Slicing",
  "User Acceptance Testing", "Product Management", "3D Design",
];

const TOOLS = [
  { name: "Figma",   logo: "/assets/logo-figma.png",   color: "#1ABCFE" },
  { name: "Jira",    logo: "/assets/logo-jira.png",    color: "#0052CC" },
  { name: "Maze",    logo: "/assets/logo-maze.png",    color: "#FF4747" },
  { name: "Miro",    logo: "/assets/logo-miro.png",    color: "#FFDD00" },
  { name: "Blender", logo: "/assets/logo-blender.png", color: "#EA7600" },
];

/* ─────────────────────────────────────────────────────────── */

export default function AboutPage() {
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const r = (i) => (el) => (refs.current[i] = el);

  return (
    <main className={styles.main}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`${styles.heroLeft} ${styles.reveal}`} ref={r(0)}>
          <p className={styles.eyebrow}><i />About Me</p>
          <h1 className={styles.heroName}>
            Fadhli<br />Ardiansyah
          </h1>
          <p className={styles.heroRole}>Product Designer · UI/UX Designer · Bekasi, Indonesia</p>
          <p className={styles.heroSummary}>
            I'm a product designer who bridges the gap between business goals
            and human needs. With 3+ years of experience across mobile and web,
            I craft digital products that feel intuitive and actually work.
          </p>
        </div>

        <div className={`${styles.heroRight} ${styles.reveal} ${styles.revealD1}`} ref={r(1)}>
          <div className={styles.photoAccent} />
          <div className={styles.photoFrame}>
            <img src="/assets/photo.png" alt="Fadhli Ardiansyah" />
          </div>
        </div>
      </section>

      {/* ── BIODATA ──────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`} ref={r(2)}>
        <div className={styles.inner}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>01</span>
            <span className={styles.secLabel}>Biodata</span>
          </div>

          <div className={styles.biodataGrid}>
            <div className={styles.infoList}>
              {[
                ["Place of Birth", BIODATA.born],
                ["Hometown", BIODATA.from],
                ["Hobbies", BIODATA.hobbies.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className={styles.infoRow}>
                  <span className={styles.infoKey}>{k}</span>
                  <span className={styles.infoVal}>{v}</span>
                </div>
              ))}
            </div>

            <div className={styles.runningGrid}>
              {RUNNING_PHOTOS.map((p, i) => (
                <div key={i} className={`${styles.runningPhoto} ${styles[`run${i}`]}`}>
                  <img src={p.src} alt={p.alt} />
                  {/* fallback style jika foto belum ada */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`} ref={r(3)}>
        <div className={styles.inner}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>02</span>
            <span className={styles.secLabel}>Experience</span>
          </div>

          <div className={styles.expList}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className={styles.expItem}>
                <div className={styles.expHeader}>
                  <div className={styles.expLeft}>
                    <div className={styles.expLogo}>
                      <img src={exp.logo} alt={exp.company}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                    <div>
                      <h3 className={styles.expCompany}>{exp.company}</h3>
                      <p className={styles.expPosition}>{exp.position}</p>
                    </div>
                  </div>
                  <div className={styles.expMeta}>
                    <span className={styles.expPeriod}>{exp.period}</span>
                    <span className={styles.expLocation}>{exp.location}</span>
                  </div>
                </div>
                <ul className={styles.expBullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ─────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`} ref={r(4)}>
        <div className={styles.inner}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>03</span>
            <span className={styles.secLabel}>Education</span>
          </div>

          <div className={styles.expList}>
            {EDU.map((e, i) => (
              <div key={i} className={styles.expItem}>
                <div className={styles.expHeader}>
                  <div className={styles.expLeft}>
                    <div className={styles.expLogo}>
                      <img src={e.logo} alt={e.institution}
                        onError={(ev) => { ev.target.style.display = "none"; }}
                      />
                    </div>
                    <div>
                      <h3 className={styles.expCompany}>{e.institution}</h3>
                      <p className={styles.expPosition}>{e.major}</p>
                    </div>
                  </div>
                  <div className={styles.expMeta}>
                    <span className={styles.expPeriod}>{e.period}</span>
                  </div>
                </div>
                <ul className={styles.expBullets}>
                  {e.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS & TOOLS ────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`} ref={r(5)}>
        <div className={styles.inner}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>04</span>
            <span className={styles.secLabel}>Skills &amp; Tools</span>
          </div>

          <div className={styles.stGrid}>
            <div>
              <p className={styles.stTitle}>Skills</p>
              <div className={styles.skillsList}>
                {SKILLS.map((s) => (
                  <span key={s} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>

            <div>
              <p className={styles.stTitle}>Tools</p>
              <div className={styles.toolsGrid}>
                {TOOLS.map((t) => (
                  <div key={t.name} className={styles.toolCard}>
                    <div
                      className={styles.toolLogo}
                      style={{
                        background: `${t.color}14`,
                        borderColor: `${t.color}28`,
                      }}
                    >
                      {t.logo
                        ? <img src={t.logo} alt={t.name} />
                        : <span style={{ color: t.color }}>{t.name.slice(0, 2)}</span>}
                    </div>
                    <span className={styles.toolName}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
