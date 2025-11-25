import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useSession } from "./SessionContext";


export const CartContext = createContext();


export function CartProvider({ children }) {
  const LOCAL_KEY = "cart_local";
  const { session, user } = useSession();


  // --- 1. Inicialização Lazy (Lê do LocalStorage apenas na montagem) ---
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const local = localStorage.getItem(LOCAL_KEY);
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });


  const [cartLoading, setCartLoading] = useState(false);
  const [products, setProducts] = useState([]); // Catálogo de produtos (opcional aqui)
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);


  // --- Helper: Salvar no LocalStorage ---
  const saveToLocal = (items) => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Erro ao salvar localmente", e);
    }
  };


  // --- 2. EFEITO DE SINCRONIZAÇÃO (Merge Guest -> User) ---
  useEffect(() => {
    // Se não tem usuário, mantém o estado local atual e não faz nada de rede
    if (!user) return;


    let mounted = true;


    (async () => {
      setCartLoading(true);
      
      // A. Verificar itens "órfãos" no LocalStorage para subir (Merge)
      const localString = localStorage.getItem(LOCAL_KEY);
      if (localString) {
        try {
          const localItems = JSON.parse(localString);
          
          if (localItems.length > 0) {
            // OTIMIZAÇÃO: Prepara array para Bulk Upsert (tudo de uma vez)
            const itemsToUpsert = localItems.map(item => ({
              user_id: user.id,
              product_id: item.id,
              quantity: item.quantity
            }));


            // Envia tudo em uma única requisição
            const { error: upsertError } = await supabase
              .from("cart")
              .upsert(itemsToUpsert, { onConflict: ["user_id", "product_id"] });
            
            if (upsertError) console.error("Erro no merge do carrinho:", upsertError);
          }
          
          // Limpa o local storage apenas após tentar subir
          localStorage.removeItem(LOCAL_KEY);
        } catch (e) {
          console.error("Erro ao sincronizar carrinho local:", e);
        }
      }


      // B. Baixar a "Verdade Absoluta" do Supabase
      const { data, error } = await supabase
        .from("cart")
        .select(`
            id,
            product_id,
            quantity,
            product ( * )
        `)
        .eq("user_id", user.id);


      if (mounted) {
        if (!error && data) {
          const formatted = data.map((row) => {
            // Proteção contra produto deletado no banco
            if (!row.product) return null;
            return {
              ...row.product,        // Espalha dados do produto (title, price, img)
              quantity: row.quantity,// Usa a quantidade da tabela 'cart'
              _cart_row_id: row.id,  // ID da linha no carrinho (se precisar deletar por ID)
            };
          }).filter(Boolean);


          setCart(formatted);
        }
        setCartLoading(false);
      }
    })();


    return () => { mounted = false; };
  }, [user]); // Roda quando o usuário loga




  // --- 3. FUNÇÕES DE AÇÃO (CRUD) ---


  async function addToCart(product) {
    // 3.1. Cálculo Otimista (Atualiza UI imediatamente)
    let newCart = [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }


    setCart(newCart);


    // 3.2. Persistência (DB ou Local)
    if (user) {
      const newQty = existingItem ? existingItem.quantity + 1 : 1;
      await supabase.from("cart").upsert(
        { user_id: user.id, product_id: product.id, quantity: newQty }, 
        { onConflict: ["user_id", "product_id"] }
      );
    } else {
      saveToLocal(newCart);
    }
  }


  async function updateQtyCart(productId, quantity) {
    if (quantity <= 0) return removeFromCart(productId);


    const newCart = cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
    setCart(newCart);


    if (user) {
      await supabase.from("cart").upsert(
          { user_id: user.id, product_id: productId, quantity }, 
          { onConflict: ["user_id", "product_id"] }
      );
    } else {
      saveToLocal(newCart);
    }
  }


  async function removeFromCart(productId) {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);


    if (user) {
      await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
    } else {
      saveToLocal(newCart);
    }
  }


  async function clearCart() {
    setCart([]);
    if (user) {
      await supabase.from("cart").delete().eq("user_id", user.id);
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
  }


  // --- 4. CARREGAR PRODUTOS (Exemplo básico) ---
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase.from("product").select("*");
      if (!mounted) return;
      
      if (error) {
        setProductsError(error.message);
      } else {
        setProducts(data || []);
      }
      setLoadingProducts(false);
    })();
    return () => { mounted = false; };
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
        // Dados de produtos (opcional se você busca isso em outro lugar)
        products,
        loadingProducts,
        productsError,
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
