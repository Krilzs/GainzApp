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
} from "@mui/material";
import NavBar from "../components/navbar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RoutinePage = () => {
  const { routineId } = useParams();
  const [routineData, setRoutineData] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/users/routines/${routineId}`, {
      method: "GET",
      credentials: "include",
    })
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
          <Container maxWidth="lg" sx={{ mt: 2, p: 1 }}>
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
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default RoutinePage;
