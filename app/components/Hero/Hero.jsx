import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero({ onConnectClick }) {
  return (
    <section className={styles.hero} id="home">
      {/* Background layers */}
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />

      <div className={styles.heroContent}>
        <div className={styles.heroLayout}>

          {/* LEFT — copy, headline, CTA */}
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>
              <i />
              UI/UX Designer · Based in Indonesia
            </div>

            <h1 className={styles.heroH1}>
              Turning <em>complex</em> problems into clear experiences
            </h1>

            <p className={styles.heroDesc}>
              I design digital products that balance business goals with user needs —
              from research and strategy to pixel-perfect interfaces that actually work.
            </p>

            <div className={styles.heroActions}>
              <Link href="#projects" className={styles.btnPrimary}>
                See My Work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button className={styles.btnGhost} onClick={onConnectClick}>
                Let's collaborate →
              </button>
            </div>
          </div>

          {/* RIGHT — availability + stats */}
          <div className={styles.heroRight}>
            <div className={styles.heroAvail}>
              <div className={styles.availDot} />
              Open for freelance &amp; full-time opportunities
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <div className={styles.statNum}>3+</div>
                <div className={styles.statLabel}>Years of experience</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>20+</div>
                <div className={styles.statLabel}>Projects delivered</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>10+</div>
                <div className={styles.statLabel}>Happy clients</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum}>4+</div>
                <div className={styles.statLabel}>Industries covered</div>
              </div>
            </div>

            <div className={styles.statCardWide}>
              <div className={styles.statTagline}>Design that puts humans first.</div>
              <p>
                Every pixel has a purpose. Every flow has a reason. I bridge empathy
                and execution to build products people genuinely love.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
