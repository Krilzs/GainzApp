import { useEffect, useRef } from "react";
import { Box, Typography, CircularProgress, Paper, Stack } from "@mui/material";
import { gsap } from "gsap";

const ServerLoadingNotice = () => {
  const containerRef = useRef();
  const loaderRef = useRef();

  useEffect(() => {
    // Animación de entrada general
    gsap.fromTo(
      containerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Animación pulsante del loader
    gsap.to(loaderRef.current, {
      scale: 1.1,
      duration: 0.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 5 },
          borderRadius: 4,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid",
          borderColor: "background.contrast",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box ref={loaderRef}>
            <CircularProgress
              thickness={5}
              size={60}
              sx={{ color: "secondary.main" }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{ color: "text.primary", fontWeight: "bold", mt: 1 }}
          >
            Cargando desde el servidor
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", lineHeight: 1.6 }}
          >
            Estamos preparando todo para vos. Esta página necesita una conexión activa al servidor.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ServerLoadingNotice;
