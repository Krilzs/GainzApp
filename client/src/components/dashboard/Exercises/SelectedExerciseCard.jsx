import { Box, Divider, TextField, Typography } from "@mui/material";

const SelectedExerciseCard = ({ exercise, i, addSetToExercise }) => {
  const styleNumber = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: 50,
  };

  const handleSets = (e) => {
    const sets = [];
    for (let i = 0; i < e.target.value; i++) {
      sets.push({ reps: 0, weight: 0 });
    }
    addSetToExercise(exercise._id, sets);
  };

  return (
    <Box key={i} display={"flex"} flexDirection={"column"}>
      <Box
        component={"span"}
        display={"flex"}
        gap={2}
        p={1}
        sx={{ flexGrow: 1 }}
      >
        <Typography variant="subtitle2">{i + 1} </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography sx={{ flexGrow: 1 }} variant="subtitle2">
          {exercise.name}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1 }} display={"flex"} gap={2} p={1}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={1}
          alignItems={"center"}
        >
          <Typography>Series</Typography>
          <TextField
            margin="dense"
            id="sets"
            name="sets"
            type="number"
            variant="outlined"
            color="secondary"
            size="small"
            sx={styleNumber}
            onChange={handleSets}
            value={exercise.sets.length < 1 ? 0 : exercise.sets.length}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SelectedExerciseCard;
