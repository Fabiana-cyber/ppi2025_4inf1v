import styles from "./Footer.module.css";
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footer1}>
        <p>Fabiana Cunha Rodrigues</p>
        <div className={styles.icons}>
          <Github />
          <Linkedin />
        </div>
      </div>
    </footer>
  )
}