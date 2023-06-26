import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Cart.css";
import { List, ListItem, ListItemText } from "@mui/material";

function Cart() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCartItems();
    fetchCarts();
    fetchUsers();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchCarts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/carts");
      setCarts(response.data);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const user = getUserById(parseInt(id));

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getProductsInCart = () => {
    const cart = carts.find((cart) => cart.userId === parseInt(id));
    if (cart) {
      const productsInCart = cart.products.map((product) => {
        const cartProduct = products.find((p) => p.id === product.productId);
        return {
          ...cartProduct,
          quantity: product.quantity,
        };
      });
      return productsInCart;
    }
    return [];
  };

  const productsInCart = getProductsInCart();

  const updateQuantity = (productId, newQuantity) => {
    const updatedProducts = productsInCart.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: parseInt(newQuantity),
        };
      }
      return product;
    });
    const updatedCarts = carts.map((cart) => {
      if (cart.userId === parseInt(id)) {
        return {
          ...cart,
          products: updatedProducts.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  const deleteCartItem = (productId) => {
    const updatedCartItems = productsInCart.filter(
      (item) => item.id !== productId
    );
    const updatedCarts = carts.map((cart) => {
      if (cart.userId === parseInt(id)) {
        return {
          ...cart,
          products: updatedCartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    productsInCart.forEach((product) => {
      subtotal += product.price * product.quantity;
    });
    return subtotal.toFixed(2);
  };

  const handleCheckOut = () => {
    const confirmCheckOut = window.confirm(
      `Are you sure you want to check out? \nYour total is: ${calculateSubtotal()} €`
    );

    if (confirmCheckOut) {
      window.location.href = "/";
    }
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    productsInCart.forEach((product) => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  };

  return (
    <div style={{ marginLeft: 15 }}>
      <Box>
        <Typography component="h1" variant="h4" marginTop={2}>
          Shopping Basket
        </Typography>
      </Box>

      {user ? (
        <div>
          <Box>
            <Typography component="h2" variant="h5" marginTop={4}>
              Hey {capitalizeFirstLetter(user.name.firstname)}{" "}
              {capitalizeFirstLetter(user.name.lastname)}!
            </Typography>
          </Box>

          <Box marginTop={1} marginBottom={4}>
            <Typography component="span" variant="body1">
              Are you ready to checkout?
            </Typography>
          </Box>

          {productsInCart.length > 0 ? (
            <div>
              <Typography component="span" variant="body1">
                Please confirm your products:
              </Typography>

              <List style={{ textAlign: "left", width: "98%" }}>
                {productsInCart.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText
                      sx={{ marginRight: 5, width: 10 }}
                      primary={"Quantity: "}
                      secondary={
                        <TextField
                          type="number"
                          inputProps={{
                            min: 1,
                            max: 99,
                          }}
                          value={product.quantity}
                          onChange={(e) =>
                            updateQuantity(product.id, e.target.value)
                          }
                        />
                      }
                    />
                    <ListItemText
                      sx={{ marginRight: 5, width: 10 }}
                      primary={
                        <img
                          width={100}
                          title={product.title}
                          src={product.image}
                          alt={product.name}
                        />
                      }
                      secundary={"Click to enlarge"}
                    />
                    <ListItemText
                      sx={{ marginRight: 5, width: 100 }}
                      primary={product.title}
                    />
                    <ListItemText
                      sx={{ marginRight: 5, width: 10 }}
                      primary={"Price: "}
                      secondary={`${product.price} €`}
                    />
                    <ListItemText
                      sx={{ marginRight: 5, width: 10 }}
                      primary={"Total price: "}
                      secondary={`${(product.price * product.quantity).toFixed(
                        2
                      )} €`}
                    />
                    <Button
                      onClick={() => deleteCartItem(product.id)}
                      variant="outlined"
                    >
                      Delete Item
                    </Button>
                  </ListItem>
                ))}
              </List>

              <Typography component="h2" variant="h5" sx={{ marginTop: 3 }}>
                Subtotal{" "}
                <Typography component="span" variant="body1">
                  ({getTotalQuantity()} items):
                </Typography>{" "}
                {calculateSubtotal()} €
              </Typography>

              <Button
                onClick={handleCheckOut}
                variant="outlined"
                sx={{ marginTop: 3 }}
              >
                Check Out
              </Button>
            </div>
          ) : (
            <div>
              <p>
                <Typography component="span" variant="body1">
                  Ops! No products in cart!
                </Typography>
              </p>

              <Button onClick={handleGoBack} variant="outlined">
                Back to Products
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          <Typography component="span" variant="body1">
            Ops! User not found!
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Cart;
