import { Box, IconButton, Badge, useTheme } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import { tokens } from "../../theme";


const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const cart = useCart();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        sx={{ backgroundColor: colors.primary[400] }}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton sx={{ p: 1 }}>
          <SearchOutlinedIcon />
        </IconButton> */}
      </Box>

      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        <IconButton onClick={cart.toggleCart}>
          <Badge badgeContent={cart.cartItems.length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
