import { Box, Container, Typography } from "@mui/material";

import RoutineCard from "./RoutineCard";
import { useState } from "react";
import RoutineModalData from "./RoutineModalData";

const DashboardPanel = ({ routines }) => {
  let isEmpty = true;

  const [dialogData, setDialogData] = useState({});
  const [dialogDataOpen, setDialogDataOpen] = useState(false);

  const handleDialogDataOpen = () => {
    setDialogDataOpen(!dialogDataOpen);
  };

  const handleDialogData = (data) => {
    setDialogData(data);
    handleDialogDataOpen();
  };

  if (routines.length != 0) {
    isEmpty = false;
  }
  return (
    <Container
      component={"main"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        height: { xs: "100%", md: "calc(100vh - 80px)" },
        flexGrow: 1,
        borderTopLeftRadius: { xs: 50, md: 25 },
        borderTopRightRadius: { xs: 50, md: 25 },
        backgroundColor: "background.contrast",
        boxShadow: 5,
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "12px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "10px",
        },

        mt: 2,
        p: 3,
      }}
    >
      {isEmpty == true ? (
        <Box textAlign="center" component={"span"}>
          <Typography variant="h5" component="h2" color="#777">
            No hay rutinas creadas
          </Typography>
        </Box>
      ) : (
        routines.map((routine, i) => (
          <RoutineCard
            routine={routine}
            key={i}
            handleDialogData={handleDialogData}
          />
        ))
      )}
      <RoutineModalData
        open={dialogDataOpen}
        handleDialogDataOpen={handleDialogDataOpen}
        dialogData={dialogData}
      />
    </Container>
  );
};

export default DashboardPanel;
