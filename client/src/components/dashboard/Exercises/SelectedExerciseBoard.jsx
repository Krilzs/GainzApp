import { Box, Divider, Stack } from "@mui/material";
import SelectedExerciseCard from "./SelectedExerciseCard";

const SelectedExerciseBoard = ({ routineExercises, addSetToExercise }) => {
  return (
    <Box>
      <Divider sx={{my:1}}>Orden De Rutina</Divider>
      <Stack
        spacing={2}
        sx={{ backgroundColor: "background.default", borderRadius: 1 }}
      >
        {routineExercises.map((exercise, i) => (
          <SelectedExerciseCard
            addSetToExercise={addSetToExercise}
            exercise={exercise}
            i={i}
            key={i}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SelectedExerciseBoard;
