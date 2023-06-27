import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./ProductDetail.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ProductDetail() {
  const location = useLocation();
  const { selectedProduct, relatedProducts, products } = location.state;
  const navigate = useNavigate();
  const [openLightBox, setOpenLightBox] = React.useState(false);

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

  return (
    <Box sx={{ marginLeft: 2 }}>
      <Box>
        <Typography component="h1" variant="h4" marginTop={2} marginBottom={2}>
          Product Detail
        </Typography>
      </Box>

      {selectedProduct && (
        <Box>
          <Box>
            <List sx={{ marginRight: "2%" }}>
              <ListItem
                key={selectedProduct.id}
                onClick={() => setOpenLightBox(true)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  "&:hover": {
                    border: "1px solid #000",
                    borderRadius: "10px",
                  },
                }}
              >
                <ListItemText
                  sx={{
                    width: "40%",
                    minWidth: "20%",
                    marginBottom: 2,
                  }}
                  primaryTypographyProps={{
                    align: "center",
                  }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
                  primary={
                    <img
                      title={selectedProduct.title}
                      width={150}
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                    />
                  }
                  secondary={`Click to enlarge`}
                />
                <ListItemText
                  sx={{ width: "30%" }}
                  primaryTypographyProps={{
                    align: "center",
                  }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
                  primary={`Product: `}
                  secondary={selectedProduct.title}
                />
                <ListItemText
                  sx={{ width: "20%" }}
                  primaryTypographyProps={{
                    align: "center",
                  }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
                  primary={`Price:`}
                  secondary={`${selectedProduct.price} €`}
                />
                <ListItemText
                  sx={{ width: "90%" }}
                  primaryTypographyProps={{
                    align: "center",
                  }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
                  primary={`Description:`}
                  secondary={selectedProduct.description}
                />
              </ListItem>
            </List>
            <Box marginBottom={4}>
              <Button
                onClick={handleAddToCart}
                variant="outlined"
                sx={{ marginLeft: "7%" }}
              >
                Add to the cart
              </Button>
            </Box>
          </Box>

          <Lightbox
            open={openLightBox}
            close={() => setOpenLightBox(false)}
            slides={[
              {
                src: selectedProduct.image,
              },
            ]}
          />

          <Box>
            <Typography
              component="h2"
              variant="h5"
              marginBottom={1}
              marginLeft={2}
            >
              Not quite what you're looking for? Don't worry:{" "}
              <Button
                onClick={handleGoBack}
                variant="outlined"
                sx={{ marginLeft: 2, marginBottom: 1 }}
              >
                Continue Shopping!
              </Button>
            </Typography>
          </Box>

          <Box>
            <Typography component="h2" variant="h6" marginLeft={2}>
              Before you go, check our related products!
            </Typography>
          </Box>

          <List
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {filteredRelatedProducts.map((product) => (
              <ListItem
                key={product.id}
                onClick={() => handleItemClick(product.id)}
                sx={{
                  "&:hover": {
                    border: "1px solid #000",
                    borderRadius: "10px",
                  },
                }}
              >
                <ListItemText
                  sx={{ marginBottom: 2 }}
                  primaryTypographyProps={{
                    align: "left",
                    marginBottom: 1,
                  }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
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
        </Box>
      )}
    </Box>
  );
}

export default ProductDetail;
