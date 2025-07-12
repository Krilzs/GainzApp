import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseAccordion from "../components/Training/ExerciseAccordion";
import { useNavigate } from "react-router-dom";
const Training = () => {
  const { routineId } = useParams();
  const [exercises, setExercises] = useState();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`https://gainzapp.onrender.com/users/routines/${routineId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch routines");
        return res.json();
      })
      .then((data) => {
        setExercises(data.exercises);
      })
      .catch((error) => {
        console.error("Error fetching routines:", error);
      });
  }, []);

  const [log, setLog] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();
  const handleLogChange = (updatedLog, isComplete) => {
    setLog(updatedLog);
    setCanSubmit(isComplete);
  };

  const handleSubmit = () => {
    setSending(true);
    if (canSubmit && routineId && log) {
      fetch("https://gainzapp.onrender.com/users/routines/history", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ routineId, log }),
      })
        .then(() => {
          setSending(false);
          navigate(`/dashboard`);
        })
        .catch((error) => {
          setSending(false);
          console.error("Error submitting log:", error);
        });
    }
  };

  return (
    <Box>
      {!exercises && <Box>Cargando Datos</Box>}
      {exercises && (
        <Box>
          <ExerciseAccordion
            exercises={exercises}
            onLogChange={handleLogChange}
          />
          <Button
            variant="contained"
            color="secondary"
            loading={sending}
            onClick={handleSubmit}
            disabled={!canSubmit}
            sx={{
              mt: 2,
              position: "fixed",
              bottom: 0,
              width: "100%",
              borderRadius: 0,
            }}
          >
            Guardar historial
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Training;
