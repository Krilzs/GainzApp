import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Box,
  Chip,
  Typography,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import { Wifi, WifiOff, Refresh, Circle } from "@mui/icons-material";

export default function ServerConnectionIndicator({
  isConnecting = true,
  isConnected = false,
  size = "medium", // small, medium, large
}) {
  const theme = useTheme();
  const containerRef = useRef(null);
  const dotsRef = useRef(null);
  const pulseRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (isConnecting) {
        // Animación de los puntos de carga
        gsap.to(".loading-dot", {
          opacity: 0.3,
          duration: 0.6,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        // Animación del pulso
        gsap.to(pulseRef.current, {
          scale: 1.3,
          opacity: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        // Animación del icono
        gsap.to(iconRef.current, {
          rotation: 360,
          duration: 2,
          repeat: -1,
          ease: "none",
        });

        // Animación del texto
        gsap.fromTo(
          textRef.current,
          { opacity: 0.7 },
          {
            opacity: 1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
          }
        );
      } else if (isConnected) {
        // Animación de éxito
        gsap.to(containerRef.current, {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "back.out(1.7)",
        });

        gsap.to(iconRef.current, {
          rotation: 0,
          scale: 1.1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isConnecting, isConnected]);

  const getSizeProps = () => {
    switch (size) {
      case "small":
        return { iconSize: 16, fontSize: "0.75rem", padding: "4px 8px" };
      case "large":
        return { iconSize: 24, fontSize: "1rem", padding: "8px 16px" };
      default:
        return { iconSize: 20, fontSize: "0.875rem", padding: "6px 12px" };
    }
  };

  const { iconSize, fontSize, padding } = getSizeProps();

  if (isConnected) {
    return (
      <Chip
        ref={containerRef}
        icon={
          <Box ref={iconRef} sx={{ display: "flex", alignItems: "center" }}>
            <Wifi sx={{ fontSize: iconSize }} />
          </Box>
        }
        label="Conectado"
        color="success"
        variant="outlined"
        size={size}
        sx={{
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          borderColor: theme.palette.success.main,
          color: theme.palette.success.dark,
          fontWeight: 500,
          "& .MuiChip-icon": {
            color: theme.palette.success.main,
          },
        }}
      />
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        padding: padding,
        backgroundColor: alpha(theme.palette.warning.main, 0.1),
        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
        borderRadius: theme.shape.borderRadius * 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Indicador visual con pulso */}
      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        <Box
          ref={pulseRef}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: theme.palette.warning.main,
            borderRadius: "50%",
            opacity: 0.2,
          }}
        />
        <Box
          ref={iconRef}
          sx={{
            position: "relative",
            zIndex: 1,
            width: iconSize + 4,
            height: iconSize + 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WifiOff
            sx={{
              fontSize: iconSize,
              color: theme.palette.warning.dark,
            }}
          />
        </Box>
      </Box>

      {/* Texto y puntos de carga */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography
          ref={textRef}
          variant="body2"
          sx={{
            fontSize: fontSize,
            fontWeight: 500,
            color: theme.palette.warning.dark,
          }}
        >
          Conectando con servidor
        </Typography>
        <Box ref={dotsRef} sx={{ display: "flex", gap: 0.25, ml: 0.5 }}>
          <Circle
            className="loading-dot"
            sx={{
              fontSize: 4,
              color: theme.palette.warning.dark,
            }}
          />
          <Circle
            className="loading-dot"
            sx={{
              fontSize: 4,
              color: theme.palette.warning.dark,
            }}
          />
          <Circle
            className="loading-dot"
            sx={{
              fontSize: 4,
              color: theme.palette.warning.dark,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
