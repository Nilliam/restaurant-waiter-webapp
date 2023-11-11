import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import TopBar from "./scenes/global/TopBar";
import { Route, Routes } from "react-router-dom";
import Tabs from "./scenes/Tabs";
import Categories from "./scenes/Categories";
import Products from "./scenes/Products";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <SideBar /> */}

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
  );
}

export default App;
