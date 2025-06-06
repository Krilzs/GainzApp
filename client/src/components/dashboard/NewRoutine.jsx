import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ExercisesBoard from "./ExercisesBoard";

const NewRoutine = ({
  openRoutineForm,
  handleOpenRoutineForm,
  handleRecharge,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [routineExercises, setRoutineExercises] = useState([]);
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const addRoutineExercises = (newExercise) => {
    setRoutineExercises((prevExercises) => [...prevExercises, newExercise]);
  };
  const removeRoutineExercises = (newExercise) => {
    setRoutineExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise._id !== newExercise._id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      exercises: routineExercises,
    };

    fetch("http://localhost:3000/users/routines", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        handleOpenRoutineForm();
        handleRecharge();
        console.log("Routine created successfully");
      } else {
        handleRecharge();
        console.error("Failed to create routine");
      }
    });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="xs"
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (e) => {
              handleSubmit(e);
            },
          },
        }}
        open={openRoutineForm}
        onClose={handleOpenRoutineForm}
      >
        <DialogTitle variant="h4" align="center">
          Crear Rutina
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="subtitle2"
            id="alert-dialog-slide-description"
          >
            Crea una rutina en base a tus gustos y necesidades
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="name"
            label="Nombre"
            type="text"
            helperText='Las rutinas tienen como prefijo "Rutina de "'
            fullWidth
            variant="standard"
            color="secondary"
            onChange={handleChange}
            value={name}
          />
          <Divider sx={{ my: 3, width: "100%" }} textAlign="center">
            Elegir Ejercicios
          </Divider>
          <ExercisesBoard
            addRoutineExercises={addRoutineExercises}
            removeRoutineExercises={removeRoutineExercises}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 4 }}>
          <Button color="error" size="small" onClick={handleOpenRoutineForm}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="small"
            type="submit"
            color="secondary"
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewRoutine;
