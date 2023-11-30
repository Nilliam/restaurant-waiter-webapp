import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Product from "./Product";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import envUrl from "../../config";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState<any[]>([]);
  const [items, setItens] = useState<any[]>([]);
  const { categoryId } = useParams();
  const cart = useCart();

  useEffect(() => {
    fetch(`${envUrl()}/products/${categoryId}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [categoryId]);

  useEffect(() => {
    setItens([...products.map((product) => ({ quantity: 0, product }))]);
  }, [products]);

  const itemAdd = (item: any) => {
    const updatedItems = items.map((currentItem) => {
      if (currentItem === item) {
        return { ...currentItem, quantity: currentItem.quantity + 1 };
      }
      return currentItem;
    });
    setItens(updatedItems);
  };

  const itemRemove = (item: any) => {
    const updatedItems = items.map((currentItem) => {
      if (currentItem === item && currentItem.quantity > 0) {
        return { ...currentItem, quantity: currentItem.quantity - 1 };
      }
      return currentItem;
    });
    setItens(updatedItems);
  };

  return (
    <>
      <Box p={2}>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Product item={item} itemAdd={itemAdd} itemRemove={itemRemove} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: colors.grey[900],
          color: colors.grey[100],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="info"
          sx={{ ml: 1 }}
          component={Link}
          to="/categories"
        >
          Back
        </Button>
        <Typography>
          <strong>{cart.tab && cart.tab.code}</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{ ml: 1 }}
          component={Link}
          to="/categories"
          onClick={() =>
            items.forEach((item) => item.quantity && cart.addToCart(item))
          }
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default Products;
