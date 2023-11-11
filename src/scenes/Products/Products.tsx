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
              <Card
                sx={{
                  height: 100,
                  backgroundColor: colors.grey[900],
                  color: colors.grey[100],
                  fontSize: "10px",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, padding: "10px" }}>
                  {" "}
                  <FastfoodOutlined />{" "}
                </div>
                <div style={{ flex: 6 }}>
                  <div>Product Code: ABC123</div>
                  <div>
                    Description: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </div>
                  <div>Price: $9.99</div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div></div>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "flex-end", paddingRight: "5px" }}
                    >
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: "red", color: "white" }}
                      >
                        <Remove />
                      </IconButton>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        1
                      </div>
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: "green", color: "white" }}
                      >
                        <Add />
                      </IconButton>
                    </Stack>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: "sticky",
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
        <Button variant="contained" size="small" color="info" sx={{ ml: 1 }}>
          Back
        </Button>
        <Button variant="contained" size="small" color="success" sx={{ ml: 1 }}>
          Add
        </Button>
      </Box>
    </>
  );
};

export default Products;
