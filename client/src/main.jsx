import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.jsx";
const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#121212",
      paper: "#ffffff",
    },
    primary: {
      main: "#121212",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF6B35",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
