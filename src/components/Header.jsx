import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router"; 
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  // Soma os itens no carrinho
  const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className={styles.container}>
      <Link to="/login" className={`${styles.link} ${styles.loginButton}`}>
      <p>Fazer Login </p>
      </Link>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>

      <Link to="/cart" className={styles.link} style={{ position: "relative" }}>
        <div className={styles.cartInfo}>
          <ShoppingBasket size={32} />

          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}

          <p>
            Total: ${" "}
            {cart
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}



