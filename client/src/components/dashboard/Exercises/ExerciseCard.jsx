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
      size={12}
      sx={{
        border: border,
        color: "secondary.main",
        backgroundColor: "background.contrast",
        height: "100%",
        borderRadius: 2,
        p: 1,
      }}
      onClick={handleClick}
    >
      <Typography
        color="text.primary"
        variant="subtitle2"
        sx={{ height: "100%", cursor: "pointer", textAlign: "center" }}
      >
        {exercise.name}
      </Typography>
    </Grid>
  );
};

export default ExerciseCard;
