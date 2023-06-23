import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import CartTwo from "./components/CartTwo";

function App() {
  const randomId = Math.floor(Math.random() * 10) + 1;

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul style={{ display: "flex" }}>
            <li style={{ marginRight: "40px" }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ marginRight: "40px" }}>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to={`/cart_two/${randomId}`}>CartTwo</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product_detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart_two/:id" element={<CartTwo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
