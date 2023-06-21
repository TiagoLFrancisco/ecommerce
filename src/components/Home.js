import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

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

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const filterProductsByCategory = () => {
    if (category === "") {
      return products;
    }
    return products.filter((product) => product.category === category);
  };

  const sortProducts = (filteredProducts) => {
    if (sortBy === "price") {
      return filteredProducts.slice().sort((a, b) => a.price - b.price);
    }
    if (sortBy === "popularity") {
      return filteredProducts
        .slice()
        .sort((a, b) => a.popularity - b.popularity);
    }
    return filteredProducts;
  };

  const filteredAndSortedProducts = sortProducts(filterProductsByCategory());

  return (
    <div>
      <h1>Product List</h1>

      <div>
        <label htmlFor="category"> Filter by Category: </label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value=""> Show All</option>
          <option value="electronics"> Electronics</option>
          <option value="jewelery"> Jewelery</option>
          <option value="men's clothing"> Men's clothing</option>
          <option value="women's clothing"> Women's clothing</option>
        </select>
      </div>

      <div>
        <label htmlFor="sortBy"> Sort by: </label>
        <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          <option value=""> None</option>
          <option value="price"> Price</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <ul>
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>
              Image:{" "}
              <img
                className="item-image"
                src={product.image}
                alt={product.name}
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
