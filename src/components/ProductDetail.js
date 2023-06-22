import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h2>Product Detail</h2>
      {selectedProduct && (
        <div>
          <h3>{selectedProduct.title}</h3>
          <p>Price: ${selectedProduct.price}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>
            <img
              title={selectedProduct.title}
              className="item-image"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </p>
          <p>Related products:</p>
          <p>
            {filteredRelatedProducts.map((product) => (
              <img
                title={product.title}
                key={product.id}
                className="item-image"
                src={product.image}
                alt={product.name}
                onClick={() => handleItemClick(product.id)}
              />
            ))}
          </p>

          <button onClick={handleGoBack}>Back to Item List</button>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
