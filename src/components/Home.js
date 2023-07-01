import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ProductList from './product/product-list';
import CategorySelector from './selectors/category-selector';
import SortBySelector from './selectors/sort-by-selector';

import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            const updatedProducts = response.data.map(product => ({
                ...product,
                popularity: getRandomPopularity()
            }));
            setProducts(updatedProducts);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    const getRandomPopularity = () => {
        return Math.floor(Math.random() * 100) + 1;
    };

    const handleCategoryChange = event => {
        setCategory(event.target.value);
    };

    const handleSortByChange = event => {
        setSortBy(event.target.value);
    };

    const filterProductsByCategory = () => {
        if (category === '') {
            return products;
        }
        return products.filter(product => product.category === category);
    };

    const sortProducts = filteredProducts => {
        if (sortBy === 'priceLowToHigh') {
            return filteredProducts.slice().sort((a, b) => a.price - b.price);
        }
        if (sortBy === 'priceHighToLow') {
            return filteredProducts.slice().sort((a, b) => b.price - a.price);
        }
        if (sortBy === 'popularity') {
            return filteredProducts.slice().sort((a, b) => b.popularity - a.popularity);
        }
        return filteredProducts;
    };

    const filteredAndSortedProducts = sortProducts(filterProductsByCategory());

    const handleItemClick = productId => {
        const selectedProduct = products.find(product => product.id === productId);
        const relatedProducts = products.filter(
            product => product.category === selectedProduct.category
        );

        navigate(`/product_detail/${productId}`, {
            state: { selectedProduct, relatedProducts, products: products }
        });
    };

    return (
        <Box sx={{ marginLeft: 2 }}>
            <Box>
                <Typography component="h1" variant="h4" marginTop={2} marginBottom={3}>
                    Product List
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: '30px' }}>
                <CategorySelector
                    currentValue={category}
                    handleSelection={handleCategoryChange}
                ></CategorySelector>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }}>
                <SortBySelector
                    currentValue={sortBy}
                    handleSelection={handleSortByChange}
                ></SortBySelector>
            </Box>
            <ProductList
                products={filteredAndSortedProducts}
                handleItemClick={handleItemClick}
            ></ProductList>
        </Box>
    );
};

export default Home;
