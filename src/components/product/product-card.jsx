import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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

export default ProductCard;
