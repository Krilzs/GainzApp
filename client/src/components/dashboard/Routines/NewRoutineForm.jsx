import {
  Accordion,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
    const formData = {
      name: name,
      exercises: routineExercises,
    };

    console.log(formData);

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
          <DialogContentText
            variant="subtitle2"
            id="alert-dialog-slide-description"
          >
            Crea una rutina en base a tus gustos y necesidades
          </DialogContentText>
          {step === 0 && (
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
          )}
          {step === 1 && (
            <ExercisesBoard
              addRoutineExercises={addRoutineExercises}
              removeRoutineExercises={removeRoutineExercises}
            />
          )}
          {step === 2 && (
            <SelectedExerciseBoard
              addSetToExercise={addSetToExercise}
              routineExercises={routineExercises}
            />
          )}
        </DialogContent>

        <DialogActions
          sx={{ pb: 4, display: "flex", justifyContent: "space-between" }}
        >
          <Button size="small" onClick={changeStep.bind(this, "")}>
            Atras
          </Button>
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
