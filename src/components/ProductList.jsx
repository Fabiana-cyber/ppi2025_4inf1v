import { useEffect, useState } from "react";   
import Styles from "./ProductList.module.css";
import { circularProgressClasses } from "@mui/material";

export function ProductList() {

var category = "smartphones";
var limit = 10;
var apiUrl =`https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

const [products, setProducts] = React.useState([]);
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState(null);

useEffect(() => {
    async function fetchProducts() {
      try {
        const response = fetch(apiUrl); 
        const data = response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    }

  fetchProducts();

}, []);

  return (
    <div className={Styles.container}>
         <h1>TJA megastore</h1>
         {products.map((product) => (
            <div key={product.id} className={Styles.product}>
              <img 
               src={product.thumbnail} 
               alt={product.title} 
               className={Styles.productImage} 
               />
                <h2 className={Styles.productTitle}>{product.title}</h2>
                <p className={Styles.productDescription}>{product.description}</p>
                <p className={Styles.productPrice}>${product.price}</p>
    </div>
            ))}
            {loading && (
                circularProgress
                thickness={5}
                <styLe></styLe>
            )
    </div>  
  );
}

   
