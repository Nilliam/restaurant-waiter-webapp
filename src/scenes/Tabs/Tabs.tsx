import { Box, Button, CardContent, Grid, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { ReceiptLongRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

const Tabs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabs, setTabs] = useState<any[]>([]);
  const url = import.meta.env.VITE_APP_URL;
  const cart = useCart();

  useEffect(() => {
    fetch(`${url}/tabs`)
      .then((response) => response.json())
      .then((data) => setTabs(data));
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {tabs.map((tab, index) => (
          <Grid item xs={6} sm={4} md={4} lg={3} xl={2} key={index}>
            <Card
              sx={{
                height: 100,
                backgroundColor: colors.blueAccent[800],
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
                to="/categories"
                onClick={() => cart.updateTab(tab)}
              >
                <ReceiptLongRounded sx={{ position: "left", top: 0 }} />

                <CardContent sx={{ textAlign: "center" }}>
                  {tab.code}
                </CardContent>
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tabs;
