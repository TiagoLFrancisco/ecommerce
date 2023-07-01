import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

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
            {items.map(({ value, text }, index) => (
                <MenuItem key={index} value={value}>
                    {text}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default InputSelector;
