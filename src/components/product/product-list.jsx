import React from 'react';
import List from '@mui/material/List';
import ProductCard from './product-card';

const ProductList = ({ products, handleItemClick }) => (
    <List
        sx={{
            width: '85%'
        }}
    >
        {products.map(product => (
            <ProductCard key={product.id} product={product} handleItemClick={handleItemClick} />
        ))}
    </List>
);

export default ProductList;
