import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Cart.css";

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
      <h2>Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            <img
              title={item.title}
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />
            {item.title}
          </p>
          <p>Price: {item.price} €</p>
          <p>
            Quantity:{" "}
            <input
              type="number"
              min="1"
              max="99"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
            />
          </p>
          <button onClick={() => deleteCartItem(item.id)}>Delete Item</button>
        </div>
      ))}

      <p>Total Amount: {calculateTotalAmount()} €</p>
      <button onClick={handleCheckOut}>Check Out</button>
    </div>
  );
}

export default Cart;
