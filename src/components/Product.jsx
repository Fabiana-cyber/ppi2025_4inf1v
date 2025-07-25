import styles from "./Product.module.css";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";
import { Link } from "react-router";

export function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div key={product.id} className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>${product.price}</p>
      <Link to="/cart">
        <button
          onClick={() => {
            addToCart(product);
          }}
          className={styles.productButton}
        >
          <h4> ADD TO CART </h4>
        </button>
      </Link>
    </div>
  );
}











//tion ProductList({ products, addToCart }) {
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