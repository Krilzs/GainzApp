import { Grid, Typography } from "@mui/material";
import { useState } from "react";

const ExerciseCard = ({
  exercise,
  addRoutineExercises,
  removeRoutineExercises,
}) => {
  const [selected, setSelected] = useState(false);
  const [border, setBorder] = useState(0);

  const handleClick = () => {
    if (!selected) {
      addRoutineExercises(exercise);
      setSelected(!selected);
      setBorder(2);
    } else {
      removeRoutineExercises(exercise);
      setSelected(!selected);
      setBorder(0);
    }
  };

  return (
    <Grid
      size={6}
      sx={{
        border: border,
        backgroundColor: "background.contrast",
        height: "10vh",
        borderRadius: 2,
        p: 1,
      }}
      onClick={handleClick}
    >
      <Typography>{exercise.name}</Typography>
    </Grid>
  );
};

export default ExerciseCard;
