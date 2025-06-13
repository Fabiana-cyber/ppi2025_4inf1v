import styles from "./Main.module.css";


export function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5].map((id) => (
          <div className={styles.card} key={id}>
            <img src={`https://picsum.photos/300/200?random=${id}`} alt={`Imagem $`} className={styles.image} />
            <h2>Card </h2>
            <p>Descrição do card </p>
          </div>
        ))}
      </div>
    </main>
  );
}