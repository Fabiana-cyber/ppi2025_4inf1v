import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export function CartDebug() {
  const { cart } = useCart();
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    try {
      const local = localStorage.getItem("cart_local");
      setLocalCart(local ? JSON.parse(local) : []);
    } catch {
      setLocalCart([]);
    }
  }, [cart]);

  return (
    <div style={{ background: "#eee", padding: "1rem", margin: "2rem 0" }}>
      <h3>Debug Carrinho</h3>
      <div>
        <strong>Estado do contexto:</strong>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </div>
      <div>
        <strong>Conteúdo do localStorage:</strong>
        <pre>{JSON.stringify(localCart, null, 2)}</pre>
      </div>
    </div>
  );
}
