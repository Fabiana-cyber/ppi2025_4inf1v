import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../context/SessionContext";

export default function AdminProducts() {
  const { session } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", price: "", thumbnail: "" });

  // Carregar produtos
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("product").select("*");
    if (!error) setProducts(data);
    setLoading(false);
  }

  async function addProduct(e) {
    e.preventDefault();
    const { error } = await supabase.from("product").insert([form]);
    if (!error) {
      fetchProducts();
      setForm({ title: "", description: "", price: "", thumbnail: "" });
    }
  }

  async function updateProduct(id, updatedFields) {
    const { error } = await supabase.from("product").update(updatedFields).eq("id", id);
    if (!error) fetchProducts();
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (!error) fetchProducts();
  }

  if (!session) return <p>Acesse como admin para gerenciar produtos.</p>;

  return (
    <div>
      <h2>Admin: Gerenciar Produtos</h2>
      <form onSubmit={addProduct}>
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Preço"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      <hr />

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> - R${p.price.toFixed(2)}
              <button onClick={() => deleteProduct(p.id)}>Excluir</button>
              <button
                onClick={() =>
                  updateProduct(p.id, { price: p.price + 10 }) // Exemplo de update
                }
              >
                +10 no preço
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
