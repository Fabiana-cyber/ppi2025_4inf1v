import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../context/SessionContext";
import { useCart } from "../context/CartContext";
import styles from "./AdminProducts.module.css";

export default function AdminProducts() {
  const { session } = useContext(SessionContext);
  const { products, insertProduct, updateProduct, deleteProduct } = useCart();
  const [form, setForm] = useState({ title: "", description: "", price: "", thumbnail: "" });

  async function addProduct(e) {
    e.preventDefault();
    await insertProduct({
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      thumbnail: form.thumbnail,
    });
    setForm({ title: "", description: "", price: "", thumbnail: "" });
  }

  async function handleUpdatePrice(id, newPrice) {
    await updateProduct(id, { price: newPrice });
  }

  async function handleDeleteProduct(id) {
    await deleteProduct(id);
  }

  if (!session) return <p>Acesse como admin para gerenciar produtos.</p>;

  return (
    <div className={styles.adminContainer}>
      <h2>Admin: Gerenciar Produtos</h2>
      
      <div className={styles.formSection}>
        <h3>Adicionar Novo Produto</h3>
        <form onSubmit={addProduct} className={styles.form}>
          <input
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            placeholder="Preço"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            placeholder="Thumbnail URL"
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          />
          <button type="submit" className={styles.submitBtn}>Adicionar Produto</button>
        </form>
      </div>

      <hr className={styles.separator} />

      <div className={styles.productsSection}>
        <h3>Produtos Cadastrados</h3>
        {products.length === 0 ? (
          <p className={styles.emptyMessage}>Nenhum produto cadastrado.</p>
        ) : (
          <ul className={styles.productsList}>
            {products.map((p) => (
              <li key={p.id} className={styles.productItem}>
                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>{p.title}</div>
                  <div className={styles.productDescription}>{p.description}</div>
                  <div className={styles.productPrice}>R$ {p.price.toFixed(2)}</div>
                </div>
                <div className={styles.productActions}>
                  <button
                    className={styles.updateBtn}
                    onClick={() =>
                      handleUpdatePrice(p.id, p.price + 10)
                    }
                  >
                    +10 no preço
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteProduct(p.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
