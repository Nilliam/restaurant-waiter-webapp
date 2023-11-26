import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useCart();

  useEffect(() => {
    if (cart.open && !cart.cartItems.length) {
      cart.toggleCart();
    }
  }, [cart.open]);

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
        <Box sx={style} id="cart-body">
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
            Your Order <strong>{cart?.tab?.code}</strong>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Quantity Product</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            {cart.cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>
                  <strong>{item.quantity} x </strong>
                  {`${item.product.id} - ${item.product.name}`}
                </Typography>
                <Typography></Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/"
              onClick={() => {
                cart.sendOrder();
                cart.toggleCart();
              }}
            >
              Send Order
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
