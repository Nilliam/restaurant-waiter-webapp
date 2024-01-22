import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TabWaiterLogin = ({
  waiterModalOpen,
  setWaiterModalOpen,
  tab,
  login,
}: any) => {
  const [password, setPassword] = useState<string>();
  const [table, setTable] = useState<string>();
  const textFieldRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [waiterModalOpen]);

  return (
    <Modal
      open={waiterModalOpen}
      onClose={() => setWaiterModalOpen(false)}
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
            height: "10%",
            bgcolor: "success.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" component="div" color="white">
            Login
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <TextField
              inputRef={textFieldRef}
              type="password"
              size="medium"
              id="password"
              label="SENHA"
              required
              value={password}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  if (!tab?.id) tableRef.current?.focus();
                  if (tab?.id) login(password, table);
                }
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          {!tab?.id && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 2,
              }}
            >
              <TextField
                inputRef={tableRef}
                type="text"
                size="medium"
                id="table"
                label="MESA"
                value={table}
                onKeyUp={(event) =>
                  event.key === "Enter" && login(password, table)
                }
                onChange={(event) => setTable(event.target.value)}
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => login(password)}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TabWaiterLogin;
