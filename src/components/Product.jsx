import styles from "./Product.module.css";

export function Product({ product, addToCart }) {
  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* Aqui é o botão do Passo 2 */}
      <button
        onClick={() => addToCart(product)}
        className={styles.productButton} 
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}


// export function ProductList({ products, addToCart }) {
//   return (
//     <div className={styles.container}>
//       {products.map((product) => (
//         <div key={product.id} className={styles.productCard}>
//           <img
//             src={product.thumbnail}
//             alt={product.title}
//             className={styles.productImage}
//           />
//           <h2 className={styles.productTitle}>{product.title}</h2>
//           <p className={styles.productDescription}>{product.description}</p>
//           <p className={styles.productPrice}>${product.price}</p>
//           <button
//             onClick={() => addToCart(product)}
//             className={styles.productButton}
//           >
//             🛒 Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
  
// }