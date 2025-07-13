import { useEffect, useState } from "react";
import { Button, Snackbar } from "@mui/material";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("PWA instalada por el usuario");
    } else {
      console.log("El usuario canceló la instalación");
    }
    setDeferredPrompt(null);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      message="¿Querés instalar Gainz como app?"
      action={
        <Button color="secondary" size="small" onClick={handleInstallClick}>
          Instalar
        </Button>
      }
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
};

export default InstallPWAButton;
