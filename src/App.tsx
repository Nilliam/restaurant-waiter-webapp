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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterProvider } from "./context/FilterContext";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <FilterProvider>
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
                  <Route path="/" element={<Tabs />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:id" element={<Categories />} />
                  <Route path="/products/:categoryId" element={<Products />} />
                </Routes>
              </main>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CartProvider>
    </FilterProvider>
  );
}

export default App;
