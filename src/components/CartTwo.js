import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./Cart.css";

function CartTwo() {
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

  return (
    <div>
      <h1>Cart</h1>

      {user ? (
        <div>
          <h2>
            Hello {capitalizeFirstLetter(user.name.firstname)}{" "}
            {capitalizeFirstLetter(user.name.lastname)}!
          </h2>
          {productsInCart.length > 0 ? (
            <div>
              <h3>Products in Cart:</h3>
              <ul>
                {productsInCart.map((product) => (
                  <div key={product.id}>
                    <img
                      title={product.title}
                      className="cart-item-image"
                      src={product.image}
                      alt={product.name}
                    />{" "}
                    {product.title}
                    <p>Price: {product.price} €</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div>No products in cart</div>
          )}
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
}

export default CartTwo;
