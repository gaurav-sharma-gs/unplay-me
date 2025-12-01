"use client";

import styles from './SafariBar.module.css';
import Link from 'next/link';

export default function SafariBar() {
    return (
        <div className={styles.safariBar}>
            <div className={styles.trafficLights}>
                <Link href="/" className={`${styles.light} ${styles.red}`}></Link>
                <div className={`${styles.light} ${styles.yellow}`}></div>
                <div className={`${styles.light} ${styles.green}`}></div>
            </div>

            <div className={styles.controls}>
                <div className={styles.navigation}>
                    <Link href="/" className={styles.navButton}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </Link>
                    <button className={`${styles.navButton} ${styles.disabled}`} disabled>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                <div className={styles.addressBar}>
                    <svg className={styles.lockIcon} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className={styles.url}>unplay.me/apps</span>
                </div>
            </div>

            <div className={styles.placeholder}></div>
        </div>
    );
}
