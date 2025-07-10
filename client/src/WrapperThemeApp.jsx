import App from "./App.jsx";
import useTheme from "./context/theme/theme.js";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import '@fontsource/anton'; 

function ThemeAppWrapper() {
  const mode = useTheme((state) => state.mode);

  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "dark" ? "#121212" : "#ddd",
        paper: mode === "dark" ? "#000000" : "#ffffff",
        contrast: mode === "dark" ? "#1e1e1e" : "#bbb",
      },
      primary: {
        main: "#121212",
        contrastText: mode === "dark" ? "#1e1e1e" : "#ffffff",
        },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#121212",
        secondary: mode === "dark" ? "#555" : "#555",
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
