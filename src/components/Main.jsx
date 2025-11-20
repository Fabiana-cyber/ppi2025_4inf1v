import styles from "./Main.module.css";

export function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5].map((id) => (
          <div className={styles.card} key={id}>
            <img 
  src={`https://picsum.photos/300/200?random=${id}`} 
  alt={`Imagem ${id}`} 
  className={styles.image}
/>
            <h2>My Text {id-1} </h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
        ))}
      </div>
    </main>
  );
}