import { useState, useEffect } from "react";
import Navbar from "../components/navbar/NavBar";
import { Box, Container } from "@mui/material";
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
        <Box
          sx={{
            height: "100%",
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Container
            component={"aside"}
            disableGutters={true}
            sx={{
              width: {xs: "100%", md: "fit-content"},
              display: "flex",
              flexDirection: "column",
              p: 2,
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
          </Container>
          {loading ? (
            <LoadingRoutines />
          ) : (
            <DashboardPanel routines={routines} />
          )}
        </Box>
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
