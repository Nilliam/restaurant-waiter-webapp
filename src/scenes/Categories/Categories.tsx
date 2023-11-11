import { Box, Button, CardContent, Grid, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { MenuBookOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Categories = () => {
  var things = ["Beverages", "Snacks", "Sandwiches", "Vegan"];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {[...Array(20)].map((_, index) => (
          <Grid item xs={6} sm={4} md={4} lg={3} xl={2} key={index}>
            <Card
              sx={{
                height: 100,
                backgroundColor: colors.grey[900],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ width: "100%", height: "100%" }}
                component={Link}
                to="/products"
              >
                <MenuBookOutlined sx={{ position: "left", top: 0 }} />

                <CardContent sx={{ textAlign: "center" }}>
                  {things[Math.floor(Math.random() * things.length)]}
                </CardContent>
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
