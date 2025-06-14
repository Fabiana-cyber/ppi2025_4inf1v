import styles from "./Main.module.css";

// export function Main({ title, children }) {
//   return (
//     <div className={styles.container}>
//       <div className={styles.divImg}></div>
//       <div className={styles.divText}>
//         <h1 className={styles.title}>{title}</h1>
//         <p className={styles.text}>{children}</p>
//         <img src={`https://picsum.photos/300/200?random=${id}`} alt={`Imagem $`} className={styles.image} />
        
//       </div>
//     </div>
//   );
// }




// export function Main() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.main}>
//         <div className={styles.grid}>
//           <div className={styles.card}>
//             <h2>Card 1</h2>
//             <p>This is the first card.</p>
//           </div>
//           <div className={styles.card}>
//             <h2>Card 2</h2>
//             <p>This is the second card.</p>
//           </div>
//           <div className={styles.card}>
//             <h2>Card 3</h2>
//             <p>This is the third card.</p>
//           </div>
//           <div className={styles.card}>
//             <h2>Card 4</h2>
//             <p>This is the fourth card.</p>
//           </div>
//           <div className={styles.card}>
//             <h2>Card 5</h2>
//             <p>This is the fifth card.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



export function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5].map((id) => (
          <div className={styles.card} key={id}>
            <img src={`https://picsum.photos/300/200?random=${id}`} alt={`Imagem $`} className={styles.image} />
            <h2>My Text {id-1} </h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
        ))}
      </div>
    </main>
  );
}