import { useState } from "react";
import styles from "./InserirProd.module.css"; 
import { useNavigate } from "react-router-dom";

const InserirProd = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  

  const navigate = useNavigate();

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log({ nome, preco, descricao, imagem });
    alert("Produto adicionado com sucesso!");
    navigate("/"); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Adicionar Produto</h2>
      <form className={styles.form} onSubmit={handleSalvar}>
        <label className={styles.label}>
          Nome:
          <input
            className={styles.input}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
          />
        </label>
        <label className={styles.label}>
          Descrição:
          <textarea
            className={styles.textarea}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <label className={styles.label}>
        </label>
        <button className={styles.botao} type="submit">
          Salvar Produto
        </button>
      </form>
    </div>
  );
};

export default InserirProd;
