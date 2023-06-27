import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

function App() {
  const randomId = Math.floor(Math.random() * 4) + 1;
  const [value, setValue] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <nav>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            sx={{
              justifyContent: "flex-start",
              "& .Mui-selected": {
                color: "dimgrey",
              },
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon style={{ color: "#424242" }} />}
              href="/"
            />
            <BottomNavigationAction
              label="Shopping Basket"
              icon={<ShoppingCartIcon style={{ color: "#424242" }} />}
              href={`/shopping_basket/${randomId}`}
            />
          </BottomNavigation>
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
