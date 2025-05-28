import { Box } from "@mui/material";
import NavBar from "../components/navbar/NavBar";
import PrincipalHome from "../components/home/PrincipalHome";
import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FadeInOnScroll } from "../components/home/FadeInScroll";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = () => {
  const ejerciciosRef = useRef(null);

  const handleScrollTo = (ref) => {
    if (ref.current) {
      gsap.to(window, {
        duration: 1, // Duración de la animación
        scrollTo: {
          y: ref.current, // Elemento al que scrollear
          offsetY: 64, // Offset para compensar la altura de la AppBar fija
        },
        ease: "power2.inOut", // Easing de la animación
      });
    }
  };

  return (
    <>
      <NavBar />
      <PrincipalHome
        handleScrollTo={handleScrollTo}
        ejerciciosRef={ejerciciosRef}
      />
      <FadeInOnScroll>
        {/* Aca va la parte de ejercicios */}
        <Box
          ref={ejerciciosRef}
          sx={{
            position: "relative",
            height: "100vh",
          }}
        ></Box>
      </FadeInOnScroll>
    </>
  );
};

export default Home;
