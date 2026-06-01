"use client";

import { usePathname } from "next/navigation";
import styles from "./Atmosphere.module.css";

export default function Atmosphere() {
  const pathname = usePathname() || "";
  // Atmosphere only on the home page — other pages get a clean solid
  // canvas so banners, content, and the footer sit on consistent dark.
  if (pathname !== "/") return null;

  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blob1}`} />
      <span className={`${styles.blob} ${styles.blob2}`} />
      <span className={`${styles.blob} ${styles.blob3}`} />
      <span className={`${styles.blob} ${styles.blob4}`} />
      <span className={styles.noise} />
    </div>
  );
}
