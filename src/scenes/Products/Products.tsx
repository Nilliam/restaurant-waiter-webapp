import {
  Box,
  Button,
  CardContent,
  Grid,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { Add, FastfoodOutlined, Remove } from "@mui/icons-material";
import Product from "./Product";
import { Link } from "react-router-dom";

const Products = () => {
  var things = [
    "Burger",
    "Fries",
    "Ice Cream",
    "Pizza",
    "Pasta",
    "Salad",
    "Soup",
    "Noodles",
    "Rice",
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box p={2}>
        <Grid container spacing={2}>
          {[...Array(20)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Product />
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
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{ ml: 1 }}
          component={Link}
          to="/categories"
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default Products;
