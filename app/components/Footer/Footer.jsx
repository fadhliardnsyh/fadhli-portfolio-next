"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const SOCIALS = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/fadhlayy/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "medium",
    href: "https://medium.com/@fadhliardiansyah",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    name: "dribbble",
    href: "https://dribbble.com/fadhlay",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.29 10.29 0 0 0 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.161 10.161 0 0 0 6.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12a28.5 28.5 0 0 0-.75-1.665C7.29 13.95 2.17 13.778 1.692 13.763a10.294 10.294 0 0 0 2.694 5.617zm-2.727-7.504c.49.014 4.785.105 8.682-1.175a92.417 92.417 0 0 0-3.39-5.887 10.16 10.16 0 0 0-5.292 7.062zm7.158-9.083c.06.1 1.74 2.976 3.42 6.075 3.257-1.22 4.636-3.073 4.805-3.318a10.22 10.22 0 0 0-8.225-2.757zm10.17 4.02c-.2.267-1.71 2.26-5.1 3.664.214.44.422.888.612 1.34.067.16.132.316.194.47 3.39-.426 6.745.257 7.1.332a10.222 10.222 0 0 0-2.805-5.806z" />
      </svg>
    ),
  },
  {
    name: "behance",
    href: "https://www.behance.net/fadhliardians",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.38-.42 1.92-.28.53-.67.97-1.16 1.31-.49.34-1.05.59-1.69.75-.63.16-1.29.24-1.98.24H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.766-.94h2.752c-.44 1.37-1.113 2.35-2.02 2.94-.9.59-1.993.885-3.274.885-1.02 0-1.932-.162-2.742-.484-.81-.323-1.494-.775-2.06-1.36-.56-.58-.99-1.28-1.29-2.09-.3-.81-.45-1.696-.45-2.657 0-.93.158-1.8.476-2.6.32-.798.763-1.488 1.337-2.07.57-.58 1.252-1.036 2.047-1.37.796-.334 1.67-.5 2.625-.5.98 0 1.867.19 2.65.57.778.382 1.426.898 1.942 1.55.516.657.887 1.416 1.116 2.276.23.86.32 1.772.268 2.735H16.06c0 .87.27 1.7.88 2.12zm-10.71-.722c.373 0 .724-.033 1.057-.1.333-.067.624-.184.876-.35.25-.167.452-.396.6-.683.146-.29.22-.67.22-1.14 0-.943-.25-1.632-.76-2.06-.5-.43-1.17-.644-2.02-.644H3.13v5.0h3.1v-.023zm9.22-9.27c-.52 0-.97.11-1.34.336-.37.222-.62.554-.75.99h4.05c-.12-.45-.37-.78-.75-.99-.38-.22-.83-.336-1.21-.336zM6.39 10.47c.8 0 1.43-.19 1.89-.57.46-.37.69-.95.69-1.73 0-.41-.07-.75-.22-1.02-.14-.27-.34-.48-.58-.64-.24-.16-.52-.27-.832-.34-.31-.07-.636-.1-.98-.1H3.13v4.4H6.39z" />
      </svg>
    ),
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/fadhlayy/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews",  href: "/reviews" },
];

const CONTACT_LINKS = [
  {
    label: "fadhliardiansyah@gmail.com",
    href: "mailto:fadhliardiansyah@gmail.com",
  },
  {
    label: "Let's chat",
    href: "https://wa.me/6281219299192",
    target: "_blank",
  },
  {
    label: "Download CV",
    href: "/assets/Fadhli_Ardiansyah_CV.pdf",
    download: true,
  },
];

export default function Footer() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollBtn(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className={styles.footer} id="footer">
        <div className={styles.inner}>
          {/* ── TOP ── */}
          <div className={styles.top}>
            {/* Col 1 — Logo + desc + socials */}
            <div>
              <div className={styles.logoWrap}>
                <img
                  src="/assets/logo.svg"
                  alt="Fadhli Logo"
                  width={28}
                  height={28}
                />
              </div>
              <p className={styles.desc}>
                Product & UI/UX Designer crafting digital experiences that balance
                business goals with human needs. Based in Indonesia, working
                globally.
              </p>
              <div className={styles.socials}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className={`${styles.social} ${styles[`social_${s.name}`]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <div className={styles.colTitle}>Navigation</div>
              <div className={styles.links}>
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3 — Get In Touch */}
            <div>
              <div className={styles.colTitle}>Get In Touch</div>
              <div className={styles.links}>
                {CONTACT_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.target || undefined}
                    download={l.download || undefined}
                    rel={l.target ? "noopener noreferrer" : undefined}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM ── */}
          <div className={styles.bottom}>
            <p className={styles.copy}>
              © 2026 Fadhli Ardiansyah. All rights reserved.
            </p>
            <p className={styles.made}>
              Designed with <span>♥</span> in Indonesia
            </p>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <button
        className={`${styles.scrollTop} ${
          showScrollBtn ? styles.scrollTopVisible : ""
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
