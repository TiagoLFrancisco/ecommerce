import React from "react";
import { useLocation } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const selectedProduct = location.state;

  return (
    <div>
      <h2>Product Detail</h2>
      {selectedProduct && (
        <div>
          <h3>{selectedProduct.title}</h3>
          <p>Price: ${selectedProduct.price}</p>
          <p>Popularity: {selectedProduct.popularity} </p>
          <p>Category: {selectedProduct.category}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>
            Image:{" "}
            <img
              className="item-image"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
