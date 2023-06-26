import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";

import Cart from "./components/Cart";

function App() {
  const randomId = Math.floor(Math.random() * 4) + 1;

  return (
    <BrowserRouter>
      <div>
        <nav>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>

            <Link
              underline="hover"
              color="inherit"
              href={`/shopping_basket/${randomId}`}
            >
              Shopping Basket
            </Link>
          </Breadcrumbs>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product_detail/:id" element={<ProductDetail />} />

          <Route path="/shopping_basket/:id" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
