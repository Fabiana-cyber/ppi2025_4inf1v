import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext({
  
  products: [],
  loading: false,
  error: null,
  
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  insertProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

export function CartProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("product").select();
      if (error) {
        setError(`Fetching products failed! ${error.message}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();
  }, []);

  useEffect(() => {
    if (!session) {
      setCart([]);
      return;
    }
    loadCartFromDB();
  }, [session, products]);

  async function loadCartFromDB() {
    if (products.length === 0) return;

    const { data, error } = await supabase
      .from("cart")
      .select("product_id, quantity")
      .eq("user_id", session.user.id);

    if (error) {
      setError(`Error load cart ${error}`);
      return;
    }

    const merged = data
      .map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        if (!product) return;
        return { ...product, quantity: Number(item.quantity) };
      })
      .filter(Boolean);

    setCart(merged);
  }

  async function addToCart(product) {
    if (!session) {
      alert("Você precisa estar logado para usar o carrinho");
      return;
    }
    
    const existingProduct = cart.find((item) => item.id === product.id);
    const newQtd = existingProduct ? existingProduct.quantity + 1 : 1;

    const { error } = await supabase.from("cart").upsert({
      user_id: session.user.id,
      product_id: product.id,
      quantity: newQtd,
    });

    if (error) {
      setError(`Error to add to cart ${error.message}`);
      return;
    }

    setCart((prev) => {
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQtd } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  async function removeFromCart(productId) {
    if (!session) return;

    await supabase
      .from("cart")
      .delete()
      .eq("user_id", session.user.id)
      .eq("product_id", productId);

    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  async function updateQtyCart(productId, newQtd) {
    if (!session) return;

    if (newQtd <= 0) return removeFromCart(productId);

    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQtd })
      .eq("user_id", session.user.id)
      .eq("product_id", productId);

    if (error) {
      setError(`Error to updade quantity ${error.message}`);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQtd } : item
      )
    );
  }

  async function clearCart() {
    if (!session) return;

    await supabase.from("cart").delete().eq("user_id", session.user.id);
    setCart([]);
  }

  async function insertProduct(product) {
    const { data, error } = await supabase
      .from("product")
      .insert(product)
      .select()
      .single();

    if (error) {
      setError(error.message);
      return null;
    }

    setProducts((prev) => [...prev, data]);
    return data;
  }

  async function updateProduct(id, updates) {
    const { data, error } = await supabase
      .from("product")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      setError(error.message);
      return null;
    }

    setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));

    return data;
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return false;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    return true;
  }

  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    insertProduct: insertProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}