import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  open: boolean;
  cartItems: any[];
  addToCart: (item: any) => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType>({
  open: false,
  cartItems: [],
  addToCart: () => {},
  toggleCart: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => setOpen(!open);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => {
      const items = [...prevItems, item]
      persistItems(items);
      return items;
    });
  };

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"));
  }, []);

  const persistItems = (items: any) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  return (
    <CartContext.Provider
      value={{ open, cartItems, addToCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

