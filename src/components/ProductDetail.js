import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const selectedProduct = location.state;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
