import { createContext, useContext, useState } from "react";

type CartContextType = {
  open: boolean;
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType>({
  open: false,
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCart: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => setOpen(!open);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item: any) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  return (
    <CartContext.Provider
      value={{ open, cartItems, addToCart, removeFromCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

