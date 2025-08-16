import styles from "./Product.module.css";
import { useContext, useState } from "react";
import { CartContext } from "../service/CartContext";
import { Link, useNavigate } from "react-router-dom";

export function Product({ product, onRemove }) {
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleRemove() {
    setShowModal(true);
  }

  function confirmRemove() {
    if (onRemove) onRemove(product.id);
    setShowModal(false);
  }

  function cancelRemove() {
    setShowModal(false);
  }

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
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/cart">
          <button
            onClick={() => {
              addToCart(product);
            }}
            className={styles.productButton}
          >
            <h4>ADD TO CART</h4>
          </button>
        </Link>
        <button
          onClick={handleRemove}
          className={styles.productButton}
          style={{ background: "#573bacff", color: "#fff" }}
        >
          <h4>Excluir</h4>
        </button>

        <button
          className={styles.updateButton}
          onClick={() => navigate(`/atualizar-produto/${product.id}`, { state: { product } })
          }
        >
          Atualizar
        </button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Deseja realmente excluir este produto?</p>
            <div className={styles.modalButtons}>
              <button
                onClick={confirmRemove}
                className={`${styles.modalButton} ${styles.confirmButton}`}
              >
                Confirmar
              </button>
              <button
                onClick={cancelRemove}
                className={`${styles.modalButton} ${styles.cancelButton}`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}