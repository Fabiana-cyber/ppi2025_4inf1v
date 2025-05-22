import styles from "./MyText.module.css";

export function MyText() {
  return (
    <div className={styles.container}>
    <div className={styles.div}>
      <h1 className={styles.title}>Meu primeiro React App</h1>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
        deserunt sapiente corporis. Iste in dolor, quibusdam ad aut eius dicta
        esse voluptatem, deserunt dolore consequatur cum sunt eaque sequi quam.
      </p>
    </div>
  </div>);
}
