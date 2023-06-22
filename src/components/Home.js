import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const updatedProducts = response.data.map((product) => ({
        ...product,
        popularity: getRandomPopularity(),
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const getRandomPopularity = () => {
    return Math.floor(Math.random() * 100) + 1;
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
    if (sortBy === "priceLowToHigh") {
      return filteredProducts.slice().sort((a, b) => a.price - b.price);
    }
    if (sortBy === "priceHighToLow") {
      return filteredProducts.slice().sort((a, b) => b.price - a.price);
    }
    if (sortBy === "popularity") {
      return filteredProducts
        .slice()
        .sort((a, b) => b.popularity - a.popularity);
    }
    return filteredProducts;
  };

  const filteredAndSortedProducts = sortProducts(filterProductsByCategory());

  const handleItemClick = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    const relatedProducts = products.filter(
      (product) => product.category === selectedProduct.category
    );
    navigate(`/product_detail/${productId}`, {
      state: { selectedProduct, relatedProducts },
    });
  };

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
          <option value="priceLowToHigh"> Price: Low to high </option>
          <option value="priceHighToLow"> Price: High to low </option>
          <option value="popularity">Avg. Customer review </option>
        </select>
      </div>

      <ul>
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id} onClick={() => handleItemClick(product.id)}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Popularity: {product.popularity} </p>
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
