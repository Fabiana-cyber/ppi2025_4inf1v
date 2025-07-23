import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { useState } from "react";

export default function App() {
  
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  return (
    //React Fragment
    <>
      <Header cart={cart} />
      <ProductList addToCart={addToCart} />
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


