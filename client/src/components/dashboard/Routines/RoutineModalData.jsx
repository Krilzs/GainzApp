import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";

const RoutineModalData = ({ dialogData, handleDialogDataOpen, open }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let lastUpdate = "No realizado";
  if (dialogData.updatedAt) {
    lastUpdate = dialogData.updatedAt.split("T")[0];
  }

  return (
    <Dialog open={open} fullWidth={true} fullScreen={fullScreen}>
      <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
        <Box component="div">
          <Typography variant="subtitle2" color="secondary">
            Actualizado : {lastUpdate}
          </Typography>
        </Box>
        <IconButton
          onClick={handleDialogDataOpen}
          size="small"
          color="inherit"
          aria-label="close"
        >
          <CloseIcon sx={{ width: 35, height: 35 }} />
        </IconButton>
      </DialogActions>
      <DialogTitle variant="h4" component="h2">
        {dialogData.name}
      </DialogTitle>
      <DialogContent>
        {dialogData.exercises && dialogData.exercises.length > 0
          ? dialogData.exercises.map((exercise, i) => (
              <div key={i}>
                <p>{exercise.name}</p>
              </div>
            ))
          : false}
      </DialogContent>
    </Dialog>
  );
};

export default RoutineModalData;
