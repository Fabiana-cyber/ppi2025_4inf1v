import styles from "./User.module.css";
import { useSession } from "../context/SessionContext";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export function User() {
  const { session, logout } = useSession();
  const isAdmin = session?.user?.user_metadata?.admin;

  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "", thumbnail: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

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

  async function updateProduct(e) {
    e.preventDefault();
    if (!editId) return;
    const { error } = await supabase.from("product").update(form).eq("id", editId);
    if (!error) {
      fetchProducts();
      setEditId(null);
      setForm({ title: "", description: "", price: "", thumbnail: "" });
    }
  }

  function startEdit(product) {
    setEditId(product.id);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (!error) fetchProducts();
  }

  return (
    <div>
      {session ? (
        <div className={styles.container}>
          {isAdmin ? (
            <>
              <h1>Admin Account</h1>
              <div className={styles.userInfo}>
                <p><strong>Username: </strong>{session.user.user_metadata?.username}</p>
                <p><strong>Email: </strong>{session.user.email}</p>
                <p><strong>ID: </strong>{session.user.id}</p>
              </div>
              <button className={styles.button} onClick={logout}>SIGN OUT</button>
              <hr />
              <h2>Gerenciar Produtos</h2>
              {editId ? (
                <form onSubmit={updateProduct} className={styles.form}>
                  <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  <input placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  <input placeholder="Preço" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  <input placeholder="Thumbnail URL" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
                  <button type="submit">Salvar Alterações</button>
                  <button type="button" onClick={() => { setEditId(null); setForm({ title: "", description: "", price: "", thumbnail: "" }); }}>Cancelar</button>
                </form>
              ) : (
                <form onSubmit={addProduct} className={styles.form}>
                  <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  <input placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  <input placeholder="Preço" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  <input placeholder="Thumbnail URL" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
                  <button type="submit">Adicionar Produto</button>
                </form>
              )}
              <hr />
              {loading ? (
                <p>Carregando produtos...</p>
              ) : (
                <ul>
                  {products.map((p) => (
                    <li key={p.id}>
                      <strong>{p.title}</strong> - R${Number(p.price).toFixed(2)}
                      <button onClick={() => startEdit(p)}>Editar</button>
                      <button onClick={() => deleteProduct(p.id)}>Excluir</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <h1>User Account</h1>
              <div className={styles.userInfo}>
                <p><strong>Username: </strong>{session.user.user_metadata?.username}</p>
                <p><strong>Email: </strong>{session.user.email}</p>
                <p><strong>ID: </strong>{session.user.id}</p>
              </div>
              <button className={styles.button} onClick={logout}>SIGN OUT</button>
            </>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <h1>User not signed in!</h1>
        </div>
      )}
    </div>
  );
}
