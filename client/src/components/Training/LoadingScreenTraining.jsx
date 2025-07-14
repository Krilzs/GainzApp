// src/components/LoadingScreen.jsx
import { useEffect, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import gsap from "gsap";

const LoadingScreen = () => {
  const loaderRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      loaderRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    const pulse = gsap.to(loaderRef.current, {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => pulse.kill();
  }, []);

  return (
    <Box
      ref={loaderRef}
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={60} color="secondary" />
      <Typography
        variant="h6"
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          textAlign: "center",
        }}
      >
        Cargando tus ejercicios...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
