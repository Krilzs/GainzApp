import { useState, useEffect } from "react";
import Navbar from "../components/navbar/NavBar";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import NewRoutineButton from "../components/dashboard/NewRoutineButton";
import DashboardPanel from "../components/dashboard/Dashboard";
import useAuth from "../context/auth/auth";
import PageAdvice from "../components/RestringedPageAdvice/PageAdvice";
import LoadingRoutines from "../components/dashboard/LoadingRoutines";

const Dashboard = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoadingRoutines] = useState(true);

  useEffect(() => {
    setLoadingRoutines(true);

    fetch("http://localhost:3000/users/routines", {
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
  }, []);

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
            maxWidth="md"
            sx={{ width: "fit-content", pt: 2 }}
          >
            <NewRoutineButton loading={loading}></NewRoutineButton>
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
