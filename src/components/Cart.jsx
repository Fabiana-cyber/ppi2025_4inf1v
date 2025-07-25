import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Cart() {
  const { cart, updateQtyCart, clearCart } = useContext(CartContext);

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index} className={styles.cartItem}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className={styles.quantityControls}>
                <button
                  onClick={() =>
                    updateQtyCart(product.id, product.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() =>
                    updateQtyCart(product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


















// import { useNavigate } from "react-router-dom";
// import styles from "./Cart.module.css";



// export default function Cart({ cart, setCart }) {
//   const navigate = useNavigate();

//   function changeQty(id, delta) {
//     setCart((cart) =>
//       cart.map((item) =>
//         item.id === id
//           ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
//           : item
//       )
//     );
//   }

//   function removeItem(id) {
//     setCart((cart) => cart.filter((item) => item.id !== id));
//   }

//   function clearCart() {
//     setCart([]);
//   }

//   // Calcula o total do carrinho
//   const total = cart.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.qty || 1),
//     0
//   );

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.title}>Carrinho de Compras</h2>
//       {cart.length === 0 ? (
//         <div>
//           <p className={styles.empty}>Seu carrinho está vazio.</p>
//           <button
//             className={styles.clearBtn}
//             style={{ marginTop: "1rem" }}
//             onClick={() => navigate(-1)}
//           >
//             Voltar
//           </button>
//         </div>
//       ) : (
//         <>
//           <ul className={styles.list}>
//             {cart.map((product) => (
//               <li key={product.id} className={styles.item}>
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className={styles.image}
//                 />
//                 <div className={styles.info}>
//                   <h3>{product.title}</h3>
//                   <div className={styles.qtyControls}>
//                     <button onClick={() => changeQty(product.id, -1)}>-</button>
//                     <span>{product.qty || 1}</span>
//                     <button onClick={() => changeQty(product.id, 1)}>+</button>
//                   </div>
//                   <span>
//                     Preço unitário: R$ {(product.price || 0).toFixed(2)}
//                   </span>
//                   <span>
//                     Subtotal: R$ {((product.price || 0) * (product.qty || 1)).toFixed(2)}
//                   </span>
//                 </div>
//                 <button
//                   className={styles.removeBtn}
//                   onClick={() => removeItem(product.id)}
//                 >
//                   Remover
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div style={{ textAlign: "right", fontWeight: "bold", marginBottom: "1rem" }}>
//             Total do carrinho: R$ {total.toFixed(2)}
//           </div>
//           <button className={styles.clearBtn} onClick={clearCart}>
//             Remover todos os itens
//           </button>
//         </>
//       )}
//     </div>
//   );
// }