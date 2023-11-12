import {
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useCart();

  const [orderSent, setOrderSent] = useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const itens = [
    {
      id: 1,
      name: "Cheeseburger",
      price: 10.99,
    },
    {
      id: 2,
      name: "Pizza",
      price: 15.99,
    },
    {
      id: 3,
      name: "Fried Chicken",
      price: 12.99,
    },
    {
      id: 4,
      name: "Spaghetti",
      price: 9.99,
    },
    {
      id: 5,
      name: "Taco Salad",
      price: 8.99,
    },
  ];

  return (
    <>
      <Modal
        open={cart.open}
        onClose={cart.toggleCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "red",
            }}
            onClick={cart.toggleCart}
          >
            <Close />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Order
          </Typography>
          <Box sx={{ mt: 2 }}>
            {itens.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{item.name}</Typography>
                <Typography>{item.price}</Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid",
            }}
          >
            <Typography>Total {150}</Typography>
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/"
              onClick={() => {
                setOrderSent(true);
                cart.toggleCart();
              }}
            >
              Send Order
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={orderSent}
        autoHideDuration={2000}
        message="Enviado!"
        onClose={() => setOrderSent(false)}
      />
    </>
  );
};

export default Cart;
