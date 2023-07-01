import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import './Home.css';

const ProductCard = ({
    product: { id, title, name, image, price, popularity },
    handleItemClick
}) => (
    <ListItem
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '&:hover': {
                border: '1px solid #000',
                borderRadius: '10px'
            }
        }}
        onClick={() => handleItemClick(id)}
    >
        <ListItemText
            sx={{ width: '50%', marginBottom: 2 }}
            primaryTypographyProps={{
                align: 'center',
                marginBottom: 1
            }}
            secondaryTypographyProps={{
                align: 'center'
            }}
            primary={title}
            secondary={<img title={title} className="item-image" src={image} alt={name} />}
        />
        <ListItemText
            sx={{ width: '25%' }}
            primaryTypographyProps={{
                align: 'center'
            }}
            secondaryTypographyProps={{
                align: 'center'
            }}
            primary={`Price:`}
            secondary={` ${price} €`}
        />
        <ListItemText
            sx={{ width: '25%' }}
            primaryTypographyProps={{
                align: 'center'
            }}
            secondaryTypographyProps={{
                align: 'center'
            }}
            primary={`Popularity:`}
            secondary={`${popularity}`}
        />
    </ListItem>
);

const ProductList = ({ products, handleItemClick }) => (
    <List
        sx={{
            width: '85%'
        }}
    >
        {products.map(product => (
            <ProductCard
                key={product.id}
                product={product}
                handleItemClick={handleItemClick}
            ></ProductCard>
        ))}
    </List>
);

const InputSelector = ({ currentValue, handleChange, items, options: { labelId, id, label } }) => (
    <FormControl sx={{ minWidth: 210 }}>
        <InputLabel id={labelId}>{`${label}:`}</InputLabel>
        <Select
            labelId={labelId}
            id={id}
            value={currentValue}
            label={label}
            onChange={handleChange}
        >
            {items.map(({ value, text }) => {
                return <MenuItem value={value}>{text}</MenuItem>;
            })}
        </Select>
    </FormControl>
);

const CategorySelector = ({ currentValue, handleSelection }) => {
    const categoryItems = [
        { value: '', text: 'Show All' },
        { value: 'electronics', text: 'Electronics' },
        { value: 'jewelery', text: 'Jewelery' },
        { value: "men's clothing", text: "Men's clothing" },
        { value: "women's clothing", text: "women's clothing" }
    ];

    return (
        <InputSelector
            currentValue={currentValue}
            handleChange={handleSelection}
            items={categoryItems}
            options={{
                labelId: 'category-select-label',
                id: 'category-select',
                label: 'Filter By Category'
            }}
        ></InputSelector>
    );
};

const SortBySelector = ({ currentValue, handleSelection }) => {
    const sortByItems = [
        { value: '', text: 'Show All' },
        { value: 'priceLowToHigh', text: 'Price: Low to high' },
        { value: 'priceHighToLow', text: 'Price: High to low' },
        { value: 'popularity', text: 'Avg.Customer review' }
    ];
    return (
        <InputSelector
            currentValue={currentValue}
            handleChange={handleSelection}
            items={sortByItems}
            options={{
                labelId: 'sort-by-select-label',
                id: 'sort-by-select',
                label: 'Sort By'
            }}
        ></InputSelector>
    );
};

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
