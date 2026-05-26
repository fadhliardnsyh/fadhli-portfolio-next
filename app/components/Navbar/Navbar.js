'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

// Nav links config — sesuaikan href kalau struktur routing berubah
const NAV_LINKS = [
  { label: 'About Me',  href: '/about'    },
  { label: 'Projects',  href: '/projects' },
  { label: 'Reviews',   href: '/reviews'  },
];

const SOCIAL_LINKS = [
  { label: 'in',  href: 'https://linkedin.com/in/fadhli' },
  { label: 'M',   href: 'https://medium.com/@fadhli'     },
  { label: '◉',   href: '#'                               },
  { label: 'Be',  href: 'https://behance.net/fadhli'     },
  { label: 'IG',  href: 'https://instagram.com/fadhli'   },
];

export default function Navbar({ onConnectClick }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const lastY = useRef(0);

  // ── Scroll behaviour (sama persis kayak main.js) ──────────────────────────
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);

    if (y > 120) {
      if (y > lastY.current + 8)  setHidden(true);
      if (y < lastY.current - 8)  setHidden(false);
    } else {
      setHidden(false);
    }
    lastY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ── Lock body scroll saat mobile menu buka ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Close menu on ESC ─────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function closeMenu() { setMenuOpen(false); }

  function handleConnectClick() {
    closeMenu();
    onConnectClick?.(); // memanggil handler dari parent (bisa buka ContactModal)
  }

  // ── Nav classnames ─────────────────────────────────────────────────────────
  const navClass = [
    styles.nav,
    scrolled ? styles.scrolled : '',
    hidden    ? styles.hidden   : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* ── NAV BAR ──────────────────────────────────────────────────────── */}
      <nav className={navClass} id="nav">
        {/* Logo kiri */}
        <Link href="/" className={styles.navLogo} aria-label="Fadhli Ardiansyah — Home">
          <Image src="/assets/logo.svg" alt="Fadhli Logo" width={36} height={36} priority unoptimized />
        </Link>

        {/* Center pill */}
        <div className={styles.navPill} role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className={styles.navPillLink}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA kanan — desktop */}
        <div className={styles.navRight}>
          <button
            className={styles.navConnectBtn}
            id="connectBtn"
            onClick={handleConnectClick}
            aria-label="Open contact form"
          >
            Let's Connect
          </button>
        </div>

        {/* Hamburger — mobile */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          id="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── MOBILE MENU ──────────────────────────────────────────────────── */}
      <div
        id="mobileMenu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ label, href }, i) => (
          <Link
            key={href}
            href={href}
            className={styles.mobLink}
            style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            onClick={closeMenu}
          >
            {label}
          </Link>
        ))}

        <button
          className={`${styles.mobLink} ${styles.mobCta}`}
          style={{ animationDelay: '0.2s' }}
          onClick={handleConnectClick}
        >
          Let's Connect
        </button>

        <div className={styles.mobSocials}>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              className={styles.mobSocial}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}