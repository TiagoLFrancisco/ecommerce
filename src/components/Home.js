import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      state: { selectedProduct, relatedProducts, products: products },
    });
  };

  return (
    <div>
      <h1>Product List</h1>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">
            Filter by Category:
          </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Filter by Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Show All</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="men's clothing">Men's clothing</MenuItem>
            <MenuItem value="women's clothing">Women's clothing</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-by-select-label">Sort by:</InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={sortBy}
            label="Sort by"
            onChange={handleSortByChange}
          >
            <MenuItem value="">Show All</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to high</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to low</MenuItem>
            <MenuItem value="popularity">Avg. Customer review</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ul>
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id} onClick={() => handleItemClick(product.id)}>
            <h3>{product.title}</h3>
            <p>Price: {product.price} €</p>
            <p>Popularity: {product.popularity} </p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>
              <img
                title={product.title}
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
