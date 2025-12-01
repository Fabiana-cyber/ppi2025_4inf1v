import "./styles/theme.css";
import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "./context/SessionContext";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { CadastroUsuario } from "./components/CadastroUsuario";
import Reader from "./components/Reader";
import { User } from "./components/User";
import AdminProducts from "./components/AdminProducts";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login value="signin" />} />
          <Route path="/register" element={<Login value="register" />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/reader" element={<Reader />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<AdminProducts />} />
        </Routes>
      </CartProvider>
    </SessionProvider>
  );
}

export default App;













// import "./styles/theme.css";
// import "./styles/global.css";
// import { ProductList } from "./components/ProductList";
// import { Header } from "./components/Header";
// import { Route, Routes } from "react-router";
// import { Cart } from "./components/Cart";
// import { CartProvider } from "./context/CartContext";
// import { Login } from "./components/Login";
// import { ToastContainer } from "react-toastify";
// import { User } from "./components/User";
// // import "react-toastify/dist/ReactToastify.css";

// export default function App() {

//   return (
//     <>
//      <ToastContainer />
//       <CartProvider>
//         <Header />
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/signin" element={<Login value="signin" />} />
//           <Route path="/register" element={<Login value="register" />} />
//           <Route path="/user" element={<User />} />
//         </Routes>
//       </CartProvider>
//     </>
//   );
// }