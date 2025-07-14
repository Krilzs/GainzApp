import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Grid,
  Divider,
} from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/home/Footer";
import NavBar from "../components/navbar/NavBar";
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "¿Qué es Gainz?",
    content:
      "Gainz es una app pensada para que lleves el control total de tus entrenamientos. Ideal para progresar y no perder de vista tus avances en el gimnasio.",
    bgColor: "#FF6B35",
  },
  {
    title: "¿Cómo se usa?",
    content:
      "Creá tu rutina desde nuestra base de ejercicios. Elegí cuántas series, repeticiones y el orden que quieras. Luego, iniciá tu entrenamiento y registrá pesos y reps para guardar tu progreso.",
    bgColor: "#121212",
  },
  {
    title: "Historial de progresos",
    content:
      "Cada entrenamiento queda registrado: cuánto levantaste, qué hiciste y cuándo. Así podés seguir tu evolución con datos reales y visuales.",
    bgColor: "#1e1e1e",
  },
  {
    title: "Beneficios de usar Gainz",
    content:
      "✔ Organización total de tus rutinas\n✔ Historial automático de cada sesión\n✔ Control de progreso con datos reales\n✔ Más motivación al ver tus avances",
    bgColor: "#FF6B35",
  },
  {
    title: "¿Por qué elegir Gainz?",
    content:
      "A diferencia de otras apps, Gainz está pensada para personas reales en gimnasios reales. No somos solo una hoja de cálculo: somos tu compañero de entrenamiento con inteligencia y diseño.",
    bgColor: "#121212",
  },
];

const Section = ({ title, content, bgColor, index }) => {
  const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  return (
    <Box
      ref={ref}
      sx={{
        py: 10,
        backgroundColor: bgColor,
        color: "#fff",
        clipPath:
          index % 2 === 0
            ? "polygon(0 0, 100% 5%, 100% 100%, 0% 95%)"
            : "polygon(0 5%, 100% 0, 100% 95%, 0% 100%)",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center">
          {title}
        </Typography>
        <Typography variant="h6" textAlign="center" whiteSpace="pre-line">
          {content}
        </Typography>
      </Container>
    </Box>
  );
};

export default function GainzInfoPage() {
  const theme = useTheme();

  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {sections.map((section, index) => (
          <Section key={index} {...section} index={index} />
        ))}

        <Box sx={{ py: 6, backgroundColor: theme.palette.background.paper }}>
          <Container maxWidth="lg">
            <Typography variant="h5" textAlign="center" gutterBottom>
              ¿Tenés dudas o querés saber más?
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
              Visitá nuestra página principal o escribinos para conocer todo lo
              que Gainz puede hacer por tu entrenamiento.
            </Typography>
            <Box textAlign="center">
              <Button variant="outlined" color="secondary" href="/">
                Volver al inicio
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
}
