import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AtualizarProduto.module.css";
import { supabase } from "../utils/supabase";

const AtualizarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.from("product").select("*").eq("id", id).single();
      if (!mounted) return;
      if (data) {
        setProduto(data);
        setNome(data.title || "");
        setPreco(data.price || "");
        setDescricao(data.description || "");
      }
    })();
    return () => (mounted = false);
  }, [id]);

  const handleAtualizar = async (e) => {
    e.preventDefault();
    await supabase.from("product").update({ title: nome, price: Number(preco), description: descricao }).eq("id", id);
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