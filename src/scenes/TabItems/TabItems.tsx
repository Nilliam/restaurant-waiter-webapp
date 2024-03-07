import { Box, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import envUrl from "../../config";
import { useCart } from "../../context/CartContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TabItemsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TabItems = ({ open, setOpen }: TabItemsProps) => {
  const [tabItems, setTabItems] = useState<any>([]);

  const cart = useCart();

  useEffect(() => {
    if (!cart?.tab?.id) {
      setTabItems([]);
      return;
    }
    fetch(`${envUrl()}/tabs/${cart?.tab?.id}/items`)
      .then((response) => response.json())
      .then((data) => setTabItems(data));
  }, [cart.tab]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} id="cart-body">
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "7%",
            bgcolor: "success.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" component="div" color="white">
            ITENS CONSUMIDOS
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
          }}
        >
          <div
            style={{ overflow: "auto", maxHeight: "450px", marginTop: "25px" }}
          >
            <strong>{cart?.tab?.code}</strong>
            <br />
            {tabItems?.map((item: any) => (
              <>
                {`${item.quantity}x  ${item.product.name} ${item.observations}`}
                <br />
                <strong style={{ fontSize: "12px" }}>
                  {(item.savingDate
                    ? new Date(item.savingDate)
                        .toLocaleString("pt-BR")
                        .replace(",", "")
                    : "") +
                    " " +
                    item.waiterName}
                </strong>
                <br />
              </>
            ))}
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default TabItems;
