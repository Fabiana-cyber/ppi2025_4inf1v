import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [userSession, setUserSession] = useState(null);


  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("product").select();
      if (error) console.error("Error fetching products:", error.message);
      else setProducts(data);
      setLoadingProducts(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) setCart(JSON.parse(localCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const addToCart = async (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      updateQtyCart(product.id, existing.quantity + 1);
    } else {
      const newItem = { ...product, quantity: 1 };
      setCart((prev) => [...prev, newItem]);

      if (userSession) {
        const { error } = await supabase.from("cart").upsert({
          user_id: userSession.user.id,
          product_id: product.id,
          quantity: 1,
        });
        if (error) console.error("Error adding to Supabase cart:", error.message);
      }
    }
  };


  const updateQtyCart = async (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );

    if (userSession) {
      const { error } = await supabase
        .from("cart")
        .upsert({ user_id: userSession.user.id, product_id: productId, quantity });
      if (error) console.error("Error updating Supabase cart:", error.message);
    }
  };


  const removeFromCart = async (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));

    if (userSession) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", userSession.user.id)
        .eq("product_id", productId);
      if (error) console.error("Error removing from Supabase cart:", error.message);
    }
  };


  const clearCart = async () => {
    setCart([]);
    if (userSession) {
      const { error } = await supabase.from("cart").delete().eq("user_id", userSession.user.id);
      if (error) console.error("Error clearing Supabase cart:", error.message);
    }
  };


  const fetchCart = async (session) => {
    setUserSession(session);
    if (!session) return;

    setCartLoading(true);
    const { data, error } = await supabase
      .from("cart")
      .select("product_id, quantity, product(*)")
      .eq("user_id", session.user.id);

    if (error) console.error("Error fetching cart from Supabase:", error.message);
    else {
      const formattedCart = data.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      setCart(formattedCart);
    }
    setCartLoading(false);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        loadingProducts,
        cart,
        cartLoading,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
        fetchCart,
        setUserSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
