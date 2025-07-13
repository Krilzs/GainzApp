import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeAppWrapper from "./WrapperThemeApp";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { type: "module" })
      .then((reg) => console.log("Service Worker registrado:", reg))
      .catch((err) =>
        console.error("Error al registrar el Service Worker:", err)
      );
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeAppWrapper />
  </StrictMode>
);
