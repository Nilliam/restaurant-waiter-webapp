import { Box, Button, CardContent, Grid, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { ReceiptLongRounded } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import TabWaiterLogin from "./TabWaiterLogin";
import envUrl from "../../config";
import { useFilter } from "../../context/FilterContext";
import CustomerRegistration from "../CustomerRegistration";

const Tabs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabs, setTabs] = useState<any[]>([]);
  const [filteredTabs, setFilteredTabs] = useState<any[]>([]);
  const [tab, setTab] = useState<any>();
  const [waiterModalOpen, setWaiterModalOpen] = useState<boolean>(false);
  const [customerModalOpen, setCustomerModalOpen] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>();
  const cart = useCart();
  const filter = useFilter();
  const navigate = useNavigate();

  const fetchTabs = () => {
    fetch(`${envUrl()}/tabs`)
      .then((response) => response.json())
      .then((data) => setTabs(data));
  };

  useEffect(() => {
    fetchTabs();
    setInterval(() => {
      fetchTabs();
    }, 10000);
  }, []);

  useEffect(() => {
    if (!filter.filter) {
      setFilteredTabs(tabs);
      return;
    }

    fetch(`${envUrl()}/tabs?customerName=${filter.filter}`)
      .then((response) => response.json())
      .then((data: any) => {
        setFilteredTabs([
          ...tabs.filter((tab) =>
            tab.code?.toLowerCase()?.includes(filter.filter.toLowerCase())
          ),
          ...data,
        ]);
      });
  }, [tabs, filter.filter]);

  useEffect(() => {
    if (customer) {
      setWaiterModalOpen(true);
    }
  }, [customer]);

  const buildNewTab = () => {
    if (tab) {
      return tab;
    }

    return {
      code: customer?.name,
      clientId: customer?.id,
    };
  };

  const login = (password: string, table?: string) => {
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
        const newTab = buildNewTab();

        if (table) {
          newTab.code = newTab.code + " M " + table;
        }

        cart.updateTab(newTab);
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
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2} key={"0"}>
          <Card
            sx={{
              height: 110,
              backgroundColor: colors.greenAccent[800],
              color: colors.grey[100],
              fontSize: "16px",
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
                setCustomerModalOpen(true);
              }}
            >
              <GroupAddIcon sx={{ position: "left", top: 0 }} />

              <CardContent sx={{ textAlign: "center", fontWeight: "bold" }}>
                NOVO CLIENTE
              </CardContent>
            </Button>
          </Card>
        </Grid>
        {filteredTabs.map((tab) => (
          <Grid item xs={6} sm={4} md={4} lg={3} xl={2} key={tab.code}>
            <Card
              sx={{
                height: 110,
                backgroundColor: tab.id
                  ? colors.blueAccent[800]
                  : colors.grey[900],
                color: colors.grey[100],
                fontSize: "16px",
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

      <CustomerRegistration
        open={customerModalOpen}
        setOpen={setCustomerModalOpen}
        setCustomer={setCustomer}
      />
    </Box>
  );
};

export default Tabs;
