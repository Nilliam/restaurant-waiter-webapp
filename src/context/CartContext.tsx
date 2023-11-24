import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  open: boolean;
  cartItems: any[];
  addToCart: (item: any) => void;
  toggleCart: () => void;
  tab: any;
  updateTab: (tab: any) => void;
};

const CartContext = createContext<CartContextType>({
  open: false,
  cartItems: [],
  addToCart: () => {},
  toggleCart: () => {},
  tab: undefined,
  updateTab: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<any>();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => setOpen(!open);

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
      value={{ open, cartItems, addToCart, toggleCart, tab, updateTab }}
    >
      {children}
    </CartContext.Provider>
  );
};
