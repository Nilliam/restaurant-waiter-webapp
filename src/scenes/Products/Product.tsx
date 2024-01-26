import { Add, FastfoodOutlined, Remove } from "@mui/icons-material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Card, IconButton, Stack, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";

const Product = ({ item, itemAdd, itemRemove, updateObservations }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showTextArea, setShowTextArea] = useState(false);

  const handleToggleTextArea = () => {
    setShowTextArea(!showTextArea);
  };

  const handleObservationsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    item: any
  ) => {
    updateObservations(item, event.target.value);
  };

  return (
    <Card
      sx={{
        height: 130,
        backgroundColor:
          item.quantity > 0 ? colors.blueAccent[900] : colors.grey[900],
        color: colors.grey[100],
        fontSize: "16px",
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
        <div>
          {item.product.name + (!showTextArea ? " " + item.observations : "")}
        </div>
        <div>Preço R${item.product.price}</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton size="small" onClick={handleToggleTextArea}>
            <TextSnippetIcon />
          </IconButton>
          {showTextArea && (
            <textarea
              value={item.observations}
              onChange={(e) => handleObservationsChange(e, item)}
              placeholder="Observações"
              style={{ width: "60%", height: "50px" }}
            />
          )}
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
