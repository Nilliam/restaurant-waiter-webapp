import { Box, Button, CardContent, Grid, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { MenuBookOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState<any[]>([]);
  const url = import.meta.env.VITE_APP_URL;
  const { id } = useParams();

  useEffect(() => {
    fetch(`${url}/categories${id ? `/${id}` : ""}`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [id]);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
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
                to={
                  category.hasChildren
                    ? `/categories/${category.id}`
                    : `/products/${category.id}`
                }
              >
                <MenuBookOutlined sx={{ position: "left", top: 0 }} />

                <CardContent sx={{ textAlign: "center" }}>
                  {category.name}
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
