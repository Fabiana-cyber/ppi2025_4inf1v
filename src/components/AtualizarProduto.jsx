import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AtualizarProduto.module.css";
import { CartContext } from "../service/CartContext";

const AtualizarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(CartContext);

  const produto = products.find((p) => String(p.id) === String(id));


  const [nome, setNome] = useState(produto?.title || "");
  const [preco, setPreco] = useState(produto?.price || "");
  const [descricao, setDescricao] = useState(produto?.description || "");

  const handleAtualizar = (e) => {
    e.preventDefault();
    updateProduct({
      ...produto,
      title: nome,
      price: Number(preco),
      description: descricao,
    });
    alert("Produto atualizado com sucesso!");
    navigate("/");
  };

  if (!produto) {
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>Produto não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Atualizar Produto</h2>
      <form className={styles.form} onSubmit={handleAtualizar}>
        <label className={styles.label}>
          Nome:
          <input
            className={styles.input}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Preço (R$):
          <input
            className={styles.input}
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <label className={styles.label}>
          Descrição:
          <textarea
            className={styles.textarea}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <button
          className={styles.botaoAtualizar}
          type="submit"
        >
          Atualizar Produto
        </button>
      </form>
    </div>
  );
};

export default AtualizarProduto;