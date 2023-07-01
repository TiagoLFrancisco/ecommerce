import React from 'react';
import InputSelector from '../inputs/input-selector';

const categoryItems = [
    { value: '', text: 'Show All' },
    { value: 'electronics', text: 'Electronics' },
    { value: 'jewelery', text: 'Jewelery' },
    { value: "men's clothing", text: "Men's clothing" },
    { value: "women's clothing", text: "women's clothing" }
];

const CategorySelector = ({ currentValue, handleSelection }) => (
    <InputSelector
        currentValue={currentValue}
        handleChange={handleSelection}
        items={categoryItems}
        options={{
            labelId: 'category-select-label',
            id: 'category-select',
            label: 'Filter By Category'
        }}
    />
);

export default CategorySelector;
