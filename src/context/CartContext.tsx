import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import envUrl from "../config";

type CartContextType = {
  open: boolean;
  cartItems: any[];
  addToCart: (item: any) => void;
  toggleCart: () => void;
  tab: any;
  updateTab: (tab: any) => void;
  sendOrder: () => void;
  updateWaiter: (waiter: any) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType>({
  open: false,
  cartItems: [],
  addToCart: () => {},
  toggleCart: () => {},
  tab: undefined,
  updateTab: () => {},
  sendOrder: () => {},
  updateWaiter: () => {},
  clear: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<any>();
  const [waiter, setWaiter] = useState<any>();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const updateWaiter = (waiter: any) => {
    setWaiter(waiter);
  };

  const toggleCart = () => setOpen(!open);

  const clear = () => {
    setCartItems([]);
    setTab(undefined);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("tab");
  };

  const sendOrder = () => {
    if (!tab || !waiter || !cartItems.length) return;

    fetch(`${envUrl()}/tabs`, {
      method: "POST",
      body: JSON.stringify({ ...tab, waiterId: waiter?.id, items: cartItems }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        clear();
        toast.success("PEDIDO ENVIADO COM SUCESSO!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCart = (item: any) => {
    setCartItems((prevItems) => {
      const items = [...prevItems, item];
      persistItems(items);
      return items;
    });
  };

  const updateTab = (item: any) => {
    setTab(item);
    localStorage.setItem("tab", JSON.stringify(item));
  };

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"));
    localStorage.getItem("tab") &&
      setTab(JSON.parse(localStorage.getItem("tab") || "{}"));
  }, []);

  const persistItems = (items: any) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  return (
    <CartContext.Provider
      value={{
        open,
        cartItems,
        addToCart,
        toggleCart,
        tab,
        updateTab,
        sendOrder,
        updateWaiter,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
