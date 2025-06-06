import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";

const ExercisesBoard = ({ addRoutineExercises, removeRoutineExercises }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/exercises", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch exercises");
        return res.json();
      })
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "background.default",
        borderRadius: 1,
        height: "50vh",
        width: "100%",
        p: 2,
        mt: 1,
        overflowY: "scroll",
      }}
    >
      <Grid container spacing={2}>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            addRoutineExercises={addRoutineExercises}
            removeRoutineExercises={removeRoutineExercises}
          />
        ))}
        {}
      </Grid>
    </Container>
  );
};

export default ExercisesBoard;
