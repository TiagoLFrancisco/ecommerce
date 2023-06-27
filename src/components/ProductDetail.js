import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import "./ProductDetail.css";

function ProductDetail() {
  const location = useLocation();
  const { selectedProduct, relatedProducts, products } = location.state;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const filteredRelatedProducts = relatedProducts.filter(
    (product) => product.id !== selectedProduct.id
  );

  const handleItemClick = (productId) => {
    const newSelectedProduct = products.find(
      (product) => product.id === productId
    );
    const newRelatedProducts = products.filter(
      (product) => product.category === newSelectedProduct.category
    );

    navigate(`/product_detail/${productId}`, {
      state: {
        selectedProduct: newSelectedProduct,
        relatedProducts: newRelatedProducts,
        products: products,
      },
    });
  };

  const handleAddToCart = () => {
    window.alert(`Congratulation! This item was added to your cart.`);
    window.location.href = "/";
  };

  const handleSelectedProductClick = () => {
    //do open lightbox
  };

  return (
    <div style={{ marginLeft: 15 }}>
      <h2>Product Detail</h2>

      {selectedProduct && (
        <div>
          <List style={{ textAlign: "left", width: "98%" }}>
            <ListItem
              key={selectedProduct.id}
              onClick={() => handleSelectedProductClick}
              className="list-item"
            >
              <ListItemText
                sx={{ marginRight: 10, whiteSpace: "nowrap" }}
                primary={
                  <img
                    title={selectedProduct.title}
                    className="item-image"
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                  />
                }
                secondary={`Click to enlarge`}
              />
              <ListItemText
                sx={{ marginRight: 5, maxWidth: 700, minWidth: 100 }}
                primary={`Product: `}
                secondary={selectedProduct.title}
              />
              <ListItemText
                sx={{ marginRight: 10, whiteSpace: "nowrap" }}
                primary={`Price:`}
                secondary={`${selectedProduct.price} €`}
              />
              <ListItemText
                sx={{ marginRight: 5, minWidth: 200 }}
                primary={`Description:`}
                secondary={selectedProduct.description}
              />
            </ListItem>
          </List>
          <div>
            <Button onClick={handleAddToCart} variant="outlined">
              Add to the cart
            </Button>
          </div>

          <div>
            <Button onClick={handleGoBack} variant="outlined">
              Back to Products
            </Button>
          </div>

          <h2>Related Products</h2>

          <List>
            {filteredRelatedProducts.map((product) => (
              <ListItem
                key={product.id}
                onClick={() => handleItemClick(product.id)}
              >
                <ListItemText
                  sx={{ marginRight: 10 }}
                  primary={product.title}
                  secondary={
                    <img
                      title={product.title}
                      key={product.id}
                      className="item-image"
                      src={product.image}
                      alt={product.name}
                      onClick={() => handleItemClick(product.id)}
                    />
                  }
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
