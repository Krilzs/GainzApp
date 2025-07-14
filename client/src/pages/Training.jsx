import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseAccordion from "../components/Training/ExerciseAccordion";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/Training/LoadingScreenTraining";
const Training = () => {
  const { routineId } = useParams();
  const [exercises, setExercises] = useState();
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState();

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
        setHistory(data.history[data.history.length - 1]);
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
      {!exercises && (
        <Box>
          <LoadingScreen />
        </Box>
      )}
      {exercises && (
        <Box>
          <ExerciseAccordion
            history={history}
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
