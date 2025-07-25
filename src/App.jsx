import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./service/CartContext";


export default function App() {

  return (
    //React Fragment
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
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


