import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import AppRoutes from "./AppRoutes";

const App = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
