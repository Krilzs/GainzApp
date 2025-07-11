import { Box, Container, Typography } from "@mui/material";
import gsap from "gsap";
import RoutineCard from "./RoutineCard";
import { useEffect, useRef } from "react";

gsap.registerPlugin();

const DashboardPanel = ({ routines }) => {
  let isEmpty = true;

  const cardsRef = useRef([]);
  cardsRef.current = [];

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.5,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  if (routines.length != 0) {
    isEmpty = false;
  }
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        height: { xs: "100%", md: "calc(100vh - 200px)" },
        flexGrow: 1,
        borderTopLeftRadius: { xs: 50, md: 25 },
        borderTopRightRadius: { xs: 50, md: 25 },
        boxShadow: 5,
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "12px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "10px",
        },

        mt: 2,
        p: 3,
      }}
    >
      {isEmpty == true ? (
        <Box textAlign="center" component={"span"}>
          <Typography variant="h5" component="h2" color="#777">
            No hay rutinas creadas
          </Typography>
        </Box>
      ) : (
        routines.map((routine, i) => (
          <Box key={i} ref={addToRefs}>
            <RoutineCard routine={routine} key={i} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default DashboardPanel;
