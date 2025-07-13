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
      .register(`${import.meta.env.BASE_URL}service-worker.js`)
      .then((reg) => {
        console.log("Service Worker registrado:", reg);

        reg.onupdatefound = () => {
          const newWorker = reg.installing;
          newWorker.onstatechange = () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log(
                "¡Nueva versión disponible! Recargá para ver los cambios."
              );
            }
          };
        };
      })
      .catch((err) => {
        console.error("Error al registrar el Service Worker:", err);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeAppWrapper />
  </StrictMode>
);
