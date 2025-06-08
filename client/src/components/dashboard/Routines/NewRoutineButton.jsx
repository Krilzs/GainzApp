import { Fab } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const NewRoutineButton = ({ loading, handleOpenRoutineForm }) => {
  return (
    <Fab
      disabled={loading}
      onClick={handleOpenRoutineForm}
      color="secondary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
};

export default NewRoutineButton;
