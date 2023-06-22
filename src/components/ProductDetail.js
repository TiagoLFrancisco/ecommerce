import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const { selectedProduct, relatedProducts } = location.state;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const filteredRelatedProducts = relatedProducts.filter(
    (product) => product.id !== selectedProduct.id
  );

  return (
    <div>
      <h2>Product Detail</h2>
      {selectedProduct && (
        <div>
          <h3>{selectedProduct.title}</h3>
          <p>Price: ${selectedProduct.price}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>
            Image:{" "}
            <img
              className="item-image"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </p>
          <p>Related products</p>
          <div>
            {filteredRelatedProducts.map((product) => (
              <img
                key={product.id}
                className="item-image"
                src={product.image}
                alt={product.name}
              />
            ))}
          </div>

          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
