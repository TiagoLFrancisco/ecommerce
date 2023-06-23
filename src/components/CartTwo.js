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

  return (
    <div>
      {user ? (
        <div>
          <h2>
            Hello {capitalizeFirstLetter(user.name.firstname)}{" "}
            {capitalizeFirstLetter(user.name.lastname)}!
          </h2>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
}

export default CartTwo;
