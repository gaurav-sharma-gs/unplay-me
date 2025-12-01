import Header from "@/components/Header";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>unplay.me</span>
        </h1>
        <p className={styles.description}>
          A showcase of my projects, experiments, and digital playground.
        </p>
        <div className={styles.actions}>
          <Link href="/apps" className={styles.button}>
            Launch Unplay OS Interface
          </Link>
          <a href="https://www.linkedin.com/in/gauravsh92/" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.secondaryButton}`}>
            Contact Me
          </a>
        </div>
      </main>
    </div>
  );
}
