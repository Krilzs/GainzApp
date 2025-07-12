import { useState, useEffect } from "react";
import Navbar from "../components/navbar/NavBar";
import { Box, Container, Typography } from "@mui/material";
import NewRoutineButton from "../components/dashboard/Routines/NewRoutineButton";
import DashboardPanel from "../components/dashboard/Routines/DashboardPanel";
import useAuth from "../context/auth/auth";
import PageAdvice from "../components/RestringedPageAdvice/PageAdvice";
import LoadingRoutines from "../components/dashboard/Routines/LoadingRoutines";
import NewRoutine from "../components/dashboard/Routines/NewRoutineForm";

const Dashboard = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoadingRoutines] = useState(true);
  const [openRoutineForm, setOpenRoutineForm] = useState(false);
  const [recharge, setRecharge] = useState(false);

  const handleRecharge = () => {
    setRecharge(!recharge);
  };

  const handleOpenRoutineForm = () => {
    setOpenRoutineForm(!openRoutineForm);
  };

  useEffect(() => {
    setLoadingRoutines(true);

    fetch("https://gainzapp.onrender.com/users/routines", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch routines");
        return res.json();
      })
      .then((data) => {
        setLoadingRoutines(false);
        setRoutines(data);
      })
      .catch((error) => {
        console.error("Error fetching routines:", error);
      });
  }, [recharge]);

  const isLoggedIn = useAuth((s) => s.isLoggedIn);

  if (isLoggedIn == true) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Container
          maxWidth={"md"}
          sx={{
            height: "100%",
            minHeight: "calc(100vh - 64px)",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            component={"aside"}
            disableGutters={true}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              pt: 2,

              justifyContent: "start",
            }}
          >
            <NewRoutine
              handleRecharge={handleRecharge}
              openRoutineForm={openRoutineForm}
              handleOpenRoutineForm={handleOpenRoutineForm}
            />
            <NewRoutineButton
              handleOpenRoutineForm={handleOpenRoutineForm}
              loading={loading}
            />
            <Container sx={{ display: { xs: "none" } }}>
              <Typography variant="h4" component="h3">
                Rutinas
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sed
                accusamus pariatur optio harum hic numquam, odit voluptas
                repudiandae ipsam quo modi architecto cum quidem tempora odio
                sint corrupti? Quia.
              </Typography>
            </Container>
          </Container>
          {loading ? (
            <LoadingRoutines />
          ) : (
            <DashboardPanel routines={routines} />
          )}
        </Container>
      </Box>
    );
  } else if (isLoggedIn == false) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar />
        <PageAdvice></PageAdvice>
      </Box>
    );
  }
};

export default Dashboard;
