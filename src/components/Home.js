import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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

      <Box
        sx={{ display: "flex", justifyContent: "left", marginBottom: "30px" }}
      >
        <FormControl sx={{ minWidth: 210 }}>
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

      <Box
        sx={{ display: "flex", justifyContent: "left", marginBottom: "20px" }}
      >
        <FormControl sx={{ minWidth: 210 }}>
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

      <List
        sx={{
          width: "85%",
        }}
      >
        {filteredAndSortedProducts.map((product) => (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              "&:hover": {
                border: "1px solid #000",
                borderRadius: "4px",
              },
            }}
            key={product.id}
            onClick={() => handleItemClick(product.id)}
          >
            <ListItemText
              sx={{ width: "50%", marginBottom: 2 }}
              primaryTypographyProps={{
                align: "center",

                marginBottom: 1,
              }}
              secondaryTypographyProps={{
                align: "center",
              }}
              primary={product.title}
              secondary={
                <img
                  title={product.title}
                  className="item-image"
                  src={product.image}
                  alt={product.name}
                />
              }
            />
            <ListItemText
              sx={{ width: "25%" }}
              primaryTypographyProps={{
                align: "center",
              }}
              secondaryTypographyProps={{
                align: "center",
              }}
              primary={`Price:`}
              secondary={` ${product.price} €`}
            />
            <ListItemText
              sx={{ width: "25%" }}
              primaryTypographyProps={{
                align: "center",
              }}
              secondaryTypographyProps={{
                align: "center",
              }}
              primary={`Popularity:`}
              secondary={`${product.popularity}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
