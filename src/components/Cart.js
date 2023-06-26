import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "./Cart.css";
import { List, ListItem, ListItemText } from "@mui/material";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const products = response.data;

      const randomProducts = getRandomProducts(products, 3);

      const cartItems = randomProducts.map((product) => ({
        ...product,
        quantity: 1,
      }));

      setCartItems(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const deleteCartItem = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return totalAmount.toFixed(2);
  };

  const handleCheckOut = () => {
    const confirmCheckOut = window.confirm(
      `Are you sure you want to check out? \nYour total is: ${calculateTotalAmount()} €`
    );

    if (confirmCheckOut) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Typography component="h1" variant="h3" marginTop={1}>
        Cart
      </Typography>
      <Typography component="h2" variant="h5" marginTop={4}>
        Shopping Cart:
      </Typography>

      <List style={{ marginLeft: 20, textAlign: "left", width: "90%" }}>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              sx={{ marginRight: 10, width: 30 }}
              primary={"Quantity: "}
              secondary={
                <TextField
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 99,
                  }}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              }
            />
            <ListItemText
              sx={{ marginRight: 10, width: 60 }}
              primary={
                <img
                  title={item.title}
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
              }
            />
            <ListItemText
              sx={{ marginRight: 10, width: 150 }}
              primary={item.title}
            />
            <ListItemText
              primary={"Price: "}
              secondary={`${item.price} €`}
              sx={{ marginRight: 10, width: 30 }}
            />
            <Button onClick={() => deleteCartItem(item.id)} variant="outlined">
              Delete Item
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography component="h2" variant="h5">
        Subtotal{" "}
        <Typography component="span" variant="body1">
          (3 items):
        </Typography>{" "}
        {calculateTotalAmount()} €
      </Typography>

      <Button onClick={handleCheckOut} variant="outlined">
        Check Out
      </Button>
    </div>
  );
}

export default Cart;
