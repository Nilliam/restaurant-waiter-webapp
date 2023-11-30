import { Add, FastfoodOutlined, Remove } from "@mui/icons-material";
import { Card, IconButton, Stack, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Product = ({ item, itemAdd, itemRemove }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      sx={{
        height: 100,
        backgroundColor:
          item.quantity > 0 ? colors.blueAccent[900] : colors.grey[900],
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
        <div>{item.product.id}</div>
        <div>{item.product.name}</div>
        <div>Preço R${item.product.price}</div>

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
              sx={{
                backgroundColor: "#FF0800",
                color: "white",
                "&:hover": {
                  backgroundColor: "#CD5C5C",
                },
              }}
              onClick={() => itemRemove(item)}
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
              {item.quantity}
            </div>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "#8A9A5B",
                },
              }}
              onClick={() => itemAdd(item)}
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
