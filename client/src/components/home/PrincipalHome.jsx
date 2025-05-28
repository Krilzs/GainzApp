import { alpha, Box, Button, Typography } from "@mui/material";
import { FadeInOnScroll } from "./FadeInScroll";

const PrincipalHome = ({ handleScrollTo, ejerciciosRef }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        backgroundImage: `url(https://us.123rf.com/450wm/jalephoto/jalephoto1506/jalephoto150600039/40765814-retrato-de-un-hombre-f%C3%ADsicamente-fit-en-moderno-gimnasio-foto-blanco-y-negro.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha("#000", 0.5),
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "800px",
          px: 2,
        }}
      >
        <FadeInOnScroll>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            Bienvenido a <br />
            Gainz
          </Typography>

          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Entrena inteligente, crece fuerte. <br />
            Tu progreso empieza aquí.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => handleScrollTo(ejerciciosRef)}
            sx={{ mr: 2, color: "text.primary" }}
          >
            Explorar
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderColor: "secondary.main", color: "text.primary" }}
          >
            Más Información
          </Button>
        </FadeInOnScroll>
      </Box>
    </Box>
  );
};

export default PrincipalHome;