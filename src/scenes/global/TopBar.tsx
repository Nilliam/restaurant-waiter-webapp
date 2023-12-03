import { Box, IconButton, Badge, useTheme, InputBase } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../../context/CartContext";
import { tokens } from "../../theme";
import { useFilter } from "../../context/FilterContext";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const filter = useFilter();
  const cart = useCart();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        sx={{ backgroundColor: colors.primary[400] }}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Pesquisar"
          value={filter.filter}
          onChange={(event) => filter.updateFilter(event.target.value)}
        />
        <IconButton sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
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
