import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import TopBar from "./scenes/global/TopBar";
import { Route, Routes } from "react-router-dom";
import Tabs from "./scenes/Tabs";
import Categories from "./scenes/Categories";
import Products from "./scenes/Products";
import { CartProvider } from "./context/CartContext";
import Cart from "./scenes/Cart/Cart";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <CartProvider>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <SideBar /> */}
          <Cart />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<Tabs/>} />
              <Route path="/categories" element={<Categories/>} />
              <Route path="/products" element={<Products/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </CartProvider>
  );
}

export default App;
