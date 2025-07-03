import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
const SelectedExerciseCard = ({
  exercise,
  i,
  addSetToExercise,
  changeExerciseIndex,
}) => {
  const [sets, setSets] = useState([{ reps: 0, weight: 0 }]);
  const styleNumber = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: 50,
    textAlign: "center",
  };

  const handleClickIndex = (e) => {
    e.stopPropagation();
  };

  const handleSetValue = (e, index) => {
    e.target.value < 0 && (e.target.value = 0);
    const newSets = [...sets];
    newSets[index][e.target.name] = parseInt(e.target.value);
    setSets(newSets);
    addSetToExercise(exercise._id, newSets);
  };

  const handleAddSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  return (
    <Accordion sx={{ height: "fit-content", bgcolor: "background.default" }}>
      <AccordionSummary expandIcon={<KeyboardArrowUpIcon />}>
        <Box key={i} display={"flex"} flexDirection={"column"}>
          <Box
            component={"span"}
            display={"flex"}
            gap={2}
            p={1}
            sx={{ flexGrow: 1 }}
          >
            <Box onClick={handleClickIndex}>
              <IconButton
                size="small"
                color="secondary"
                onClick={() => changeExerciseIndex("up", exercise)}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
              <Typography textAlign={"center"} variant="subtitle2">
                {i + 1}{" "}
              </Typography>
              <IconButton
                size="small"
                color="secondary"
                onClick={() => changeExerciseIndex("down", exercise)}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Typography
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="subtitle2"
            >
              {exercise.name}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer sx={{ pt: 2 }} component={Paper}>
          <Typography textAlign={"center"} variant="subtitle2">
            Series
          </Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "50%" }}>
                  Peso
                </TableCell>
                <TableCell align="center" sx={{ width: "50%" }}>
                  Repeticiones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sets.map((set, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ width: "50%" }}>
                      <TextField
                        size="small"
                        sx={styleNumber}
                        type="number"
                        name="weight"
                        error={set.weight <= 0}
                        value={set.weight <= 0 ? 0 : set.weight}
                        onChange={(e) => handleSetValue(e, index)}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ width: "50%" }}>
                      <TextField
                        size="small"
                        sx={styleNumber}
                        value={set.reps <= 0 ? 0 : set.reps}
                        type="number"
                        name="reps"
                        error={set.reps <= 0}
                        onChange={(e) => handleSetValue(e, index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button
            sx={{ width: "100%" }}
            onClick={handleAddSet}
            color="secondary"
          >
            Agregar Serie
          </Button>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default SelectedExerciseCard;
