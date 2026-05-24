'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [gone,   setGone]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 2000);
    const t2 = setTimeout(() => setGone(true),   2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : ''}`} id="loader">
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img
            className={styles.logo}
            src="/assets/logo.svg"
            alt="Fadhli Logo"
          />
        </div>
        <div className={styles.barWrap}>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
}
