import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filterProductsByCategory = () => {
    if (category === "") {
      return products;
    }
    return products.filter((product) => product.category === category);
  };

  const filteredProducts = filterProductsByCategory();

  return (
    <div>
      <h1>Product List</h1>

      <div>
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Title: {product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>
              Image: <img src={product.image} alt={product.name} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
