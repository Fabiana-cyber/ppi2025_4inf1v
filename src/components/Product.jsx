import styles from "./Product.module.css";
import { useCart } from "../context/CartContext";

export function Product({ product }) {
  const { addToCart } = useCart();

  return (
    <div key={product.id} className={styles.productCard}>
      <img
        src={product.thumbnail || "/Octocat.png"}
        alt={product.title}
        className={styles.productImage}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/Octocat.png";
        }}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>${product.price}</p>
      {/* <Link to="/cart"> */}
      <button
        onClick={() => {
          addToCart(product);
        }}
        className={styles.productButton}
      >
        ADD TO CART
      </button>
      {/* </Link> */}
    </div>
  );
}