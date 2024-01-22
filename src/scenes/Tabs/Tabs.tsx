import { Box, Button, CardContent, Grid, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { ReceiptLongRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import TabWaiterLogin from "./TabWaiterLogin";
import envUrl from "../../config";
import { useFilter } from "../../context/FilterContext";

const Tabs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabs, setTabs] = useState<any[]>([]);
  const [filteredTabs, setFilteredTabs] = useState<any[]>([]);
  const [tab, setTab] = useState<any>();
  const [waiterModalOpen, setWaiterModalOpen] = useState<boolean>(false);
  const cart = useCart();
  const filter = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${envUrl()}/tabs`)
      .then((response) => response.json())
      .then((data) => setTabs(data));
  }, []);

  useEffect(() => {
    if (!filter.filter) {
      setFilteredTabs(tabs);
      return;
    }
    setFilteredTabs(
      tabs.filter((tab) =>
        tab.code?.toLowerCase()?.includes(filter.filter.toLowerCase())
      )
    );
  }, [tabs, filter.filter]);

  const login = (password: string, table: string) => {
    fetch(`${envUrl()}/waiters/login`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        return response.json();
      })
      .then((waiter: any) => {
        if (table) {
          tab.code = tab.code + " M " + table;
        }
        cart.updateTab(tab);
        cart.updateWaiter(waiter);
        setWaiterModalOpen(false);
        navigate("/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {filteredTabs.map((tab, index) => (
          <Grid item xs={6} sm={4} md={4} lg={3} xl={2} key={index}>
            <Card
              sx={{
                height: 100,
                backgroundColor: tab.id
                  ? colors.blueAccent[800]
                  : colors.grey[900],
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
                onClick={() => {
                  setTab(tab);
                  setWaiterModalOpen(true);
                }}
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
      <TabWaiterLogin
        waiterModalOpen={waiterModalOpen}
        setWaiterModalOpen={setWaiterModalOpen}
        tab={tab}
        login={login}
      />
    </Box>
  );
};

export default Tabs;
