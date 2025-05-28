import App from "./App.jsx";
import useTheme from "./context/theme/theme.js";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function ThemeAppWrapper() {
  const mode = useTheme((state) => state.mode);

  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "dark" ? "#121212" : "#ddd",
        paper: mode === "dark" ? "#000000" : "#ffffff",
      },
      primary: {
        main: "#121212",
        contrastText: mode === "dark" ? "#1e1e1e" : "#ffffff",
        },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#121212",
        secondary: mode === "dark" ? "#ffffff" : "#121212",
      },
      secondary: {
        main: "#FF6B35",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

export default ThemeAppWrapper;
