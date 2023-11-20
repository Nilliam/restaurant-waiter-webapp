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

  if (!cart.cartItems.length) return null;

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
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>Product</Typography>
            <Typography>Quantity Price Total</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            {cart.cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{`${item.product.id} - ${item.product.name}`}</Typography>
                <Typography>{item.quantity} x {item.product.price} <b>{item.quantity * item.product.price}</b></Typography>
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
            <Typography>
              Total{" "}
              {cart.cartItems.reduce(
                (prev, item) => prev + item.quantity * item.product.price,
                0
              )}
            </Typography>
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
