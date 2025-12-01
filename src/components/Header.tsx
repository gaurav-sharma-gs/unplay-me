import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                    <img src="/logo.svg" alt="unplay.me logo" className={styles.logoImage} />
                    <span>unplay.me</span>
                </Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/apps" className={styles.link}>Apps</Link>
            </nav>
        </header>
    );
}
