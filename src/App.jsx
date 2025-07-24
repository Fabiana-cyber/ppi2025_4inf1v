import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import Cart from "./components/Cart";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";


export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
       
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 1) + 1, price: product.price }
            : item
        );
      }
      
      return [...prevCart, { ...product, qty: 1, price: product.price }];
    });
  }

  return (
    //React Fragment
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}





















































// import "./styles/theme.css";
// import "./styles/global.css";
// // import { LuckyNumber } from "./components/LuckyNumber";

// // import { Header } from "./components/Header";
// import { ProductList } from "./components/ProductList";
// // import { Main } from "./components/Main";
// // import { Footer } from "./components/Footer";


// export default function App() {

//   return (
//     //React Fragment
//     <>

//     <ProductList/>
    
//     {/* <Header />
//       <LuckyNumber /> */}
      
//       {/* <Main/>
//       <div className='spacer'></div>
//       <Footer/>   */}
//   </>
//   );
// }


