import Button from "@mui/material/Button";

const NewRoutineButton = ({loading}) => {
  return (
    <>
      <Button disabled={loading} variant="contained" color="secondary">
        Crear Rutina
      </Button>
    </>
  );
};

export default NewRoutineButton;
