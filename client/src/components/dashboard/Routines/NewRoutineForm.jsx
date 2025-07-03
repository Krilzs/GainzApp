import {
  Box,
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
import ExercisesBoard from "../Exercises/ExercisesBoard";
import SelectedExerciseBoard from "../Exercises/SelectedExerciseBoard";

const NewRoutine = ({
  openRoutineForm,
  handleOpenRoutineForm,
  handleRecharge,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [routineExercises, setRoutineExercises] = useState([]);
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);

  const changeExerciseIndex = (direction, exercise) => {
    const index = routineExercises.indexOf(exercise);
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    console.log(nextIndex);
    if (nextIndex < 0 || nextIndex >= routineExercises.length) return;
    const newRoutineExercises = [...routineExercises];
    newRoutineExercises.splice(index, 1);
    newRoutineExercises.splice(nextIndex, 0, exercise);
    setRoutineExercises(newRoutineExercises);
  };
  const handleClose = () => {
    setName("");
    setRoutineExercises([]);
    setStep(0);
    handleOpenRoutineForm();
  };

  const changeStep = (direction) => {
    if (direction != "next" && step == 0) return;
    direction === "next" ? setStep(step + 1) : setStep(step - 1);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const addSetToExercise = (exerciseId, newSet) => {
    console.log(newSet);
    setRoutineExercises((prevExercises) =>
      prevExercises.map((prevExercise) =>
        prevExercise._id === exerciseId
          ? { ...prevExercise, sets: newSet }
          : prevExercise
      )
    );
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

    if (step !== 2) {
      changeStep("next");
      return;
    }

    routineExercises.forEach((exercise) => {
      if (exercise.sets.length === 0) exercise.sets = [{ reps: 0, weight: 0 }];
    });

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
        maxWidth="lg"
        aria-labelledby="responsive-dialog-title"
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
        <DialogActions>
          <Button color="secondary" onClick={handleClose} size="small">
            Cancelar
          </Button>
        </DialogActions>
        <DialogTitle variant="h4" align="center">
          Crear Rutina
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-track": {
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#FF6B35",
              borderRadius: "10px",
              border: "3px solid #111",
            },
            "&::-webkit-scrollbar-corner": {
              background: "transparent",
            },
          }}
        >
          {step === 0 && (
            <Box>
              <DialogContentText
                variant="subtitle2"
                id="alert-dialog-slide-description"
              >
                Elija un nombre para su rutina.
              </DialogContentText>
              <Divider sx={{ my: 1 }} />
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
                variant="outlined"
                color="secondary"
                onChange={handleChange}
                value={name}
              />
            </Box>
          )}
          {step === 1 && (
            <Box>
              <DialogContentText
                variant="subtitle2"
                id="alert-dialog-slide-description"
              >
                Busque y seleccione los ejercicios que quiera en su rutina.
              </DialogContentText>
              <ExercisesBoard
                addRoutineExercises={addRoutineExercises}
                removeRoutineExercises={removeRoutineExercises}
              />
            </Box>
          )}
          {step === 2 && (
            <Box>
              <DialogContentText
                variant="subtitle2"
                id="alert-dialog-slide-description"
              >
                Edite la cantidad de series, repeticiones y peso de cada
                ejercicio.
              </DialogContentText>

              <SelectedExerciseBoard
                changeExerciseIndex={changeExerciseIndex}
                addSetToExercise={addSetToExercise}
                routineExercises={routineExercises}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{ pb: 4, display: "flex", justifyContent: "space-between" }}
        >
          <Button size="small" onClick={changeStep.bind(this, "")}>
            Atras
          </Button>
          {/* SELECTOR DE PASOS */}
          {/* PASO 1 */}
          {step === 0 && (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disabled={!name}
              onClick={changeStep.bind(this, "next")}
            >
              Siguiente
            </Button>
          )}
          {/* PASO 2 */}
          {step === 1 && (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disabled={!routineExercises.length}
              onClick={changeStep.bind(this, "next")}
            >
              Siguiente
            </Button>
          )}
          {/* PASO 3 */}
          {step === 2 && (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Crear
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewRoutine;
