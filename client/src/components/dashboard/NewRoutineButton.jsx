import Button from "@mui/material/Button";

const NewRoutineButton = ({ loading, handleOpenRoutineForm }) => {
  return (
    <Button
      disabled={loading}
      onClick={handleOpenRoutineForm}
      variant="contained"
      color="secondary"
    >
      Crear Rutina
    </Button>
  );
};

export default NewRoutineButton;
