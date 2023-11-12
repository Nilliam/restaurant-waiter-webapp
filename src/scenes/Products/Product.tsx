import { Add, FastfoodOutlined, Remove } from "@mui/icons-material";
import { Card, IconButton, Stack, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quantity, setQuantity] = useState(0);

  const add = () => {
    setQuantity(quantity + 1);
  };

  const remove = () => {
    if (quantity === 0) return;
    setQuantity(quantity - 1);
  };

  return (
    <Card
      sx={{
        height: 100,
        backgroundColor: quantity > 0 ? colors.blueAccent[900] : colors.grey[900],
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
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              onClick={remove}
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
              {quantity}
            </div>
            <IconButton
              size="small"
              sx={{ backgroundColor: "green", color: "white" }}
              onClick={add}
            >
              <Add />
            </IconButton>
          </Stack>
        </div>
      </div>
    </Card>
  );
};

export default Product;
