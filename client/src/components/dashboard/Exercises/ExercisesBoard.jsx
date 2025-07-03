import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import TagSearcher from "./TagSearcher";
const ExercisesBoard = ({ addRoutineExercises, removeRoutineExercises }) => {
  const [exercises, setExercises] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [tagFilter, setTagFilter] = useState("Ninguno");
  const [searchExercises, setSearchExercises] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);

  const handleTagFilter = (e) => {
    setTagFilter(e.target.value);
  };
  const handleSearchExercises = (e) => {
    setSearchExercises(e.target.value.toLowerCase());
  };

  const handleFilterExercises = () => {
    if (searchExercises === "" && tagFilter === "Ninguno") {
      setFilteredExercises(exercises);
      setHasFilter(false);
      return;
    }

    if (tagFilter === "Ninguno") {
      setFilteredExercises(
        exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(searchExercises)
        )
      );
    } else if (tagFilter != "Ninguno") {
      const tagedExercises = exercises.filter((exercise) =>
        exercise.tags.includes(tagFilter)
      );

      setFilteredExercises(
        tagedExercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(searchExercises)
        )
      );
    }
    setHasFilter(true);
  };

  useEffect(() => {
    fetch("https://gainzapp.onrender.com/exercises", {
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
    <Box>
      <Divider sx={{my:1}}>Seleccionar Ejercicios</Divider>
      <Accordion
        variant="outlined"
        sx={{ backgroundColor: "background.contrast" }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography
            component="span"
            sx={{ width: "100%" }}
            textAlign={"center"}
          >
            Filtros
          </Typography>
        </AccordionSummary>
        <Box p={2}>
          <TextField
            fullWidth
            variant="standard"
            size="small"
            color="secondary"
            type="text"
            placeholder="Buscar ejercicio"
            onChange={handleSearchExercises}
          />
          <TagSearcher handleTagFilter={handleTagFilter}></TagSearcher>
          <Button
            color="secondary"
            sx={{ justifySelf: "center", mt: 2 }}
            onClick={handleFilterExercises}
          >
            Aplicar
          </Button>
        </Box>
      </Accordion>
      <Container
        sx={{
          backgroundColor: "background.default",
          borderRadius: 2,
          height: "100%",
          width: "100%",
          p: 2,
          mt: 1,
        }}
      >
        <Grid container spacing={2}>
          {filteredExercises.length > 0 &&
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                addRoutineExercises={addRoutineExercises}
                removeRoutineExercises={removeRoutineExercises}
              />
            ))}
          {hasFilter === true &&
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                addRoutineExercises={addRoutineExercises}
                removeRoutineExercises={removeRoutineExercises}
              />
            ))}
          {filteredExercises.length === 0 &&
            hasFilter === false &&
            exercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                addRoutineExercises={addRoutineExercises}
                removeRoutineExercises={removeRoutineExercises}
              />
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ExercisesBoard;
