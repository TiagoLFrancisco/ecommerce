import React from 'react';
import InputSelector from '../inputs/input-selector';

const sortByItems = [
    { value: '', text: 'Show All' },
    { value: 'priceLowToHigh', text: 'Price: Low to high' },
    { value: 'priceHighToLow', text: 'Price: High to low' },
    { value: 'popularity', text: 'Avg.Customer review' }
];

const SortBySelector = ({ currentValue, handleSelection }) => (
    <InputSelector
        currentValue={currentValue}
        handleChange={handleSelection}
        items={sortByItems}
        options={{
            labelId: 'sort-by-select-label',
            id: 'sort-by-select',
            label: 'Sort By'
        }}
    />
);

export default SortBySelector;
