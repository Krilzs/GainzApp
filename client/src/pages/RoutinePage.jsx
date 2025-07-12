import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NavBar from "../components/navbar/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RoutinePage = () => {
  const { routineId } = useParams();
  const [routineData, setRoutineData] = useState();
  useEffect(() => {
    fetch(
      /* `https://gainzapp.onrender.com/users/routines/${routineId}` */ `http://localhost:3000/users/routines/${routineId}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch routines");
        return res.json();
      })
      .then((data) => {
        setRoutineData(data);
      })
      .catch((error) => {
        console.error("Error fetching routines:", error);
      });
  }, []);

  return (
    <Box>
      <NavBar></NavBar>
      {routineData && (
        <Box display={"flex"} flexDirection={"column"}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              p: 1,
              gap: 1,
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              component={NavLink}
              to={"/dashboard"}
              sx={{ width: "fit-content" }}
            >
              <KeyboardArrowLeftIcon />
              <Typography variant="subtitle2">Rutinas</Typography>
            </Button>
            <Typography variant="h4" fontWeight={"bold"} component={"h2"}>
              {routineData.name}
            </Typography>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 2, p: 1 }}>
            <TableContainer sx={{ overflowX: "auto" }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ejercicio</TableCell>
                    <TableCell
                      color={"secondary.main"}
                      align="center"
                      sx={{ flex: 1, width: "fit-content" }}
                    >
                      Serie
                    </TableCell>
                    <TableCell
                      color={"secondary.main"}
                      align="center"
                      sx={{ flex: 1, width: "fit-content" }}
                    >
                      <Typography>Peso</Typography>
                    </TableCell>
                    <TableCell
                      color={"secondary.main"}
                      align="center"
                      sx={{ flex: 1, width: "fit-content" }}
                    >
                      Reps
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routineData.exercises.map((exercise) => (
                    <TableRow
                      key={exercise.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ width: "fit-content" }} align="left">
                        {exercise.name}
                      </TableCell>
                      <TableCell
                        sx={{ width: "fit-content", py: 1, px: 0 }}
                        align="center"
                      >
                        {exercise.sets.map((set, index) => (
                          <Box key={index} width={"100%"}>
                            <Typography>{index + 1}</Typography>
                          </Box>
                        ))}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 1, px: 0 }}>
                        {exercise.sets.map((set, index) => (
                          <Box
                            key={index}
                            display={"flex"}
                            width={"100%"}
                            justifyContent={"center"}
                          >
                            <Typography width={25}>{set.weight} </Typography>
                            <Typography>kg</Typography>
                          </Box>
                        ))}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 1, px: 0 }}>
                        {exercise.sets.map((set, index) => (
                          <Box key={index} width={"100%"}>
                            <Typography>{set.reps}</Typography>
                          </Box>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                position: { xs: "fixed", md: "relative" },
                bottom: { xs: 0 },
                justifyContent: "center",
                py: 2,
              }}
            >
              <Button
                component={NavLink}
                to={`/training/${routineId}`}
                color="secondary"
                variant="contained"
              >
                Iniciar Entrenamiento
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default RoutinePage;
