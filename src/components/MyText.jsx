import styles from "./MyText.module.css";

export function MyText({ title, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.divImg}></div>
      <div className={styles.divText}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
}
