import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExerciseAccordion = ({ exercises, onLogChange, history }) => {
  const theme = useTheme();
  const [workoutLog, setWorkoutLog] = useState({});

  useEffect(() => {
    if (onLogChange) {
      onLogChange(workoutLog, isFormComplete());
    }
  }, [workoutLog]);

  const handleInputChange = (exerciseId, setId, field, value) => {
    const numberValue = parseInt(value);
    if (numberValue < 0 || isNaN(numberValue)) return;

    setWorkoutLog((prev) => {
      const updated = { ...prev };
      if (!updated[exerciseId]) updated[exerciseId] = {};
      if (!updated[exerciseId][setId])
        updated[exerciseId][setId] = { reps: "", weight: "" };

      updated[exerciseId][setId][field] = numberValue;

      return updated;
    });
  };

  const isSetComplete = (entry) => entry?.reps > 0 && entry?.weight > 0;

  const isExerciseComplete = (exerciseId, sets) => {
    return sets.every((set) =>
      isSetComplete(workoutLog[exerciseId]?.[set._id])
    );
  };

  const isFormComplete = () => {
    return exercises.every((exercise) =>
      isExerciseComplete(exercise._id, exercise.sets)
    );
  };

  return (
    <div>
      {exercises.map((exercise) => {
        const completed = isExerciseComplete(exercise._id, exercise.sets);
        return (
          <Accordion key={exercise._id} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: completed
                  ? theme.palette.secondary.main
                  : theme.palette.background.paper,
                transition: "background-color 0.3s",
              }}
            >
              <Typography color={completed ? "white" : "text.primary"}>
                {exercise.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: { xs: "block", md: "flex" },
                gap: { md: 2 },
                pt: 2,
              }}
            >
              {exercise.sets.map((set, index) => {
                const entry = workoutLog[exercise._id]?.[set._id] || {};
                const historyExercise = history?.exercises?.find(
                  (e) => e.name === exercise.name
                );
                const lastSet = historyExercise?.sets?.[index];

                return (
                  <Box
                    key={set._id}
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    gap={1}
                    mb={2}
                  >
                    {lastSet && (
                      <Typography variant="caption" color="text.secondary">
                        Último: {lastSet.reps} reps - {lastSet.weight} kg
                      </Typography>
                    )}

                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        width={"fit-content"}
                        sx={{ textWrap: "nowrap" }}
                      >
                        Set {index + 1}:
                      </Typography>

                      <TextField
                        label="Reps"
                        type="number"
                        size="small"
                        inputProps={{ min: 0 }}
                        sx={{ maxWidth: "100%" }}
                        value={entry.reps ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            exercise._id,
                            set._id,
                            "reps",
                            e.target.value
                          )
                        }
                      />

                      <TextField
                        label="Peso (kg)"
                        type="number"
                        size="small"
                        sx={{ maxWidth: "100%" }}
                        inputProps={{ min: 0 }}
                        value={entry.weight ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            exercise._id,
                            set._id,
                            "weight",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ExerciseAccordion;
