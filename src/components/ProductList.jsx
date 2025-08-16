import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext, useState } from "react";
import { CartContext } from "../service/CartContext";
import { useNavigate } from "react-router-dom"; // Import do navigate

export function ProductList() {
  const { products, loading, error } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  // Atualiza 
  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  // Limpa o campo 
  function handleClear() {
    setSearchTerm("");
  }

  // Filtra os produtos 
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={styles.container}>

      
      <div className={styles.addProductContainer}>
        <button
          className={styles.botaoAdicionarProduto}
          onClick={() => navigate("/inserir-prod")}
        >
          Adicionar Produto +
        </button>
      </div>


      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleClear}>Clear</button>
      </div>

      
      <div className={styles.productList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

  
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}
          />
          <p>Loading products...</p>
        </div>
      )}

      {/* Error */}
      {error && <p>Error loading products: {error.message} ❌</p>}
    </div>
  );
}