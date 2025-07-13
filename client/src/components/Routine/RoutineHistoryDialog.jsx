import {
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RoutineHistoryDialog = ({
  routineHistory,
  open,
  onClose,
  fullScreen,
}) => {
  return (
    <>
      {routineHistory && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          maxWidth={false}
          onClose={onClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Historial de Entrenamientos
          </DialogTitle>
          <DialogContent>
            {routineHistory.map((routine, index) => {
              const date = new Date(routine.date);
              const formattedDate = date.toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Accordion key={index} disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{formattedDate}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    {routine.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} style={{ marginBottom: "1rem" }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {exercise.name}
                        </Typography>
                        {exercise.sets.map((set, setIndex) => (
                          <Typography
                            key={setIndex}
                            variant="body2"
                            sx={{ ml: 2 }}
                          >
                            Serie {setIndex + 1}: {set.weight} kg - {set.reps}{" "}
                            reps
                          </Typography>
                        ))}
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RoutineHistoryDialog;
