import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import envUrl from "../../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CustomerRegistrationProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCustomer: (customer: any) => void;
};

const CustomerRegistration = ({
  open,
  setOpen,
  setCustomer,
}: CustomerRegistrationProps) => {
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const textFieldRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState<boolean>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [open]);

  const save = async () => {
    if (!name || !phone) {
      return;
    }
    setSaving(true);

    try {
      const customer = await fetch(`${envUrl()}/customers/${name}/${phone}`, {
        method: "GET",
      }).then((response) => {
        if (!response.ok) {
          throw new Error("FAILED TO GET CUSTOMER");
        }
        return response.json();
      });

      if (customer) {
        toast.error(
          customer.phone === phone || customer.cellphone === phone
            ? "TELEFONE JÁ CADASTRADO NO CLIENTE " + customer.name
            : "NOME JÁ CADASTRADO!"
        );
        setSaving(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }

    fetch(`${envUrl()}/customers`, {
      method: "POST",
      body: JSON.stringify({ name, phone }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("FAILED TO SAVE CUSTOMER");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
        setOpen(false);
        setSaving(false);
        toast.success("CLIENTE CADASTRADO COM SUCESSO!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            Cadastrar Cliente
          </Typography>
        </Box>
        {saving ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                inputRef={textFieldRef}
                type="text"
                size="medium"
                sx={{ textTransform: "uppercase" }}
                id="name"
                label="NOME"
                required
                value={name}
                onKeyUp={(event) =>
                  event.key === "Enter" && phoneRef.current?.focus()
                }
                onChange={(event) => setName(event.target.value.toUpperCase())}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 2,
              }}
            >
              <TextField
                inputRef={phoneRef}
                type="number"
                size="medium"
                id="phone"
                label="TELEFONE"
                value={phone}
                onKeyUp={(event) => event.key === "Enter" && save()}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Box>
          </Box>
        )}
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
          {!saving && (
            <Button variant="contained" color="success" onClick={() => save()}>
              CADASTRAR
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomerRegistration;
