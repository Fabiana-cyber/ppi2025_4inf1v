import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useSession } from "./SessionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const LOCAL_KEY = "cart_local";
  const { session, user } = useSession();
  const [cart, setCart] = useState([]); // array of product objects with `quantity`
  const [cartLoading, setCartLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Load cart from localStorage initially
  useEffect(() => {
    const local = localStorage.getItem(LOCAL_KEY);
    if (local) {
      try {
        setCart(JSON.parse(local));
      } catch (e) {
        setCart([]);
      }
    }
  }, []);

  // Whenever cart changes and user is not authenticated, persist to localStorage
  useEffect(() => {
    if (!session) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
    }
  }, [cart, session]);

  // When session becomes available, sync local cart to Supabase and fetch server cart
  useEffect(() => {
    if (session && user) {
      (async () => {
        setCartLoading(true);
        // Merge local cart into supabase
        const local = localStorage.getItem(LOCAL_KEY);
        if (local) {
          try {
            const localItems = JSON.parse(local);
            for (const it of localItems) {
              const { error: upsertError } = await supabase.from("cart").upsert({
                user_id: user.id,
                product_id: it.id,
                quantity: it.quantity,
              }, { onConflict: ["user_id","product_id"] });
              if (upsertError) console.error("Upsert error:", upsertError.message);
            }
            localStorage.removeItem(LOCAL_KEY);
          } catch (e) {
            console.error("Error parsing local cart:", e);
          }
        }

        // Fetch cart from Supabase with product details
        const { data, error } = await supabase
          .from("cart")
          .select("id,product_id,quantity,product(*)")
          .eq("user_id", user.id);

        if (!error && data) {
          const formatted = data.map((row) => ({
            id: row.product.id,
            title: row.product.title,
            price: row.product.price,
            thumbnail: row.product.thumbnail,
            quantity: row.quantity,
            _cart_row_id: row.id,
          }));
          setCart(formatted);
        }
        setCartLoading(false);
      })();
    }
  }, [session, user]);

  async function addToCart(product) {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      return updateQtyCart(product.id, existing.quantity + 1);
    }

    const newItem = { ...product, quantity: 1 };
    setCart((prev) => [...prev, newItem]);

    if (session && user) {
      const { data, error } = await supabase
        .from("cart")
        .upsert({ user_id: user.id, product_id: product.id, quantity: 1 }, { onConflict: ["user_id","product_id"] })
        .select();
      if (error) console.error("Error adding to supabase cart:", error.message);
      else if (data && data[0]) {
        // optionally update cart row id mapping
      }
    }
  }

  async function updateQtyCart(productId, quantity) {
    if (quantity <= 0) return removeFromCart(productId);

    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );

    if (session && user) {
      const { error } = await supabase
        .from("cart")
        .upsert({ user_id: user.id, product_id: productId, quantity }, { onConflict: ["user_id","product_id"] });
      if (error) console.error("Error updating supabase cart qty:", error.message);
    }
  }

  async function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));

    if (session && user) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
      if (error) console.error("Error removing from supabase cart:", error.message);
    }
  }

  async function clearCart() {
    setCart([]);
    if (session && user) {
      const { error } = await supabase.from("cart").delete().eq("user_id", user.id);
      if (error) console.error("Error clearing supabase cart:", error.message);
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
  }

  // Fetch products for product listing
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase.from("product").select("*");
      if (!mounted) return;
      if (error) {
        setProductsError(error.message);
        setProducts([]);
      } else {
        setProducts(data || []);
        setProductsError(null);
      }
      setLoadingProducts(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
        products,
        loading: loadingProducts,
        error: productsError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}








// import { createContext, useState, useEffect, useContext } from "react";
// import { supabase } from "../utils/supabase";


// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [cartLoading, setCartLoading] = useState(false);
//   const [userSession, setUserSession] = useState(null);


//   useEffect(() => {
//     async function fetchProducts() {
//       const { data, error } = await supabase.from("product").select();
//       if (error) console.error("Error fetching products:", error.message);
//       else setProducts(data);
//       setLoadingProducts(false);
//     }
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const localCart = localStorage.getItem("cart");
//     if (localCart) setCart(JSON.parse(localCart));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);


//   const addToCart = async (product) => {
//     const existing = cart.find((item) => item.id === product.id);

//     if (existing) {
//       updateQtyCart(product.id, existing.quantity + 1);
//     } else {
//       const newItem = { ...product, quantity: 1 };
//       setCart((prev) => [...prev, newItem]);

//       if (userSession) {
//         const { error } = await supabase.from("cart").upsert({
//           user_id: userSession.user.id,
//           product_id: product.id,
//           quantity: 1,
//         });
//         if (error) console.error("Error adding to Supabase cart:", error.message);
//       }
//     }
//   };


//   const updateQtyCart = async (productId, quantity) => {
//     setCart((prev) =>
//       prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
//     );

//     if (userSession) {
//       const { error } = await supabase
//         .from("cart")
//         .upsert({ user_id: userSession.user.id, product_id: productId, quantity });
//       if (error) console.error("Error updating Supabase cart:", error.message);
//     }
//   };


//   const removeFromCart = async (productId) => {
//     setCart((prev) => prev.filter((item) => item.id !== productId));

//     if (userSession) {
//       const { error } = await supabase
//         .from("cart")
//         .delete()
//         .eq("user_id", userSession.user.id)
//         .eq("product_id", productId);
//       if (error) console.error("Error removing from Supabase cart:", error.message);
//     }
//   };


//   const clearCart = async () => {
//     setCart([]);
//     if (userSession) {
//       const { error } = await supabase.from("cart").delete().eq("user_id", userSession.user.id);
//       if (error) console.error("Error clearing Supabase cart:", error.message);
//     }
//   };


//   const fetchCart = async (session) => {
//     setUserSession(session);
//     if (!session) return;

//     setCartLoading(true);
//     const { data, error } = await supabase
//       .from("cart")
//       .select("product_id, quantity, product(*)")
//       .eq("user_id", session.user.id);

//     if (error) console.error("Error fetching cart from Supabase:", error.message);
//     else {
//       const formattedCart = data.map((item) => ({
//         ...item.product,
//         quantity: item.quantity,
//       }));
//       setCart(formattedCart);
//     }
//     setCartLoading(false);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         products,
//         loadingProducts,
//         cart,
//         cartLoading,
//         addToCart,
//         updateQtyCart,
//         removeFromCart,
//         clearCart,
//         fetchCart,
//         setUserSession,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
// export const useCart = () => useContext(CartContext);
