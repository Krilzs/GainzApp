import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingRoutines = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="secondary" />
      <Typography variant="h5" pt={2} color="text">Cargando</Typography>
    </Box>
  );
};

export default LoadingRoutines;
