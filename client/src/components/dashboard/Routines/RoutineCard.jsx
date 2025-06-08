import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { NavLink } from "react-router-dom";

const RoutineCard = ({ routine, handleDialogData }) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: { xs: 6, md: 3 },
        minHeight: { xs: 120, md: 70 },
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        ":hover": {
          boxShadow: 5,
          transform: "scale(1.01)",
          transition: "all 0.2s ease-in-out",
        },
      }}
      onClick={() => handleDialogData(routine)}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="p"
            variant="h6"
            color="text.secondary"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: { xs: "200px", sm: "300px", md: "100%" },
            }}
          >
            {routine.name}
          </Typography>
          {/* <IconButton
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => handleDialogData(routine)}
          >
            <VisibilityIcon />{" "}
            <Typography variant="subtitle2" component={"span"}>
              Ver Detalles
            </Typography>
          </IconButton> */}
        </CardContent>
      </Box>
      <CardActions>
        <IconButton
          component={NavLink}
          to={`/routines/${routine.id}`}
          aria-label="play"
          size="large"
          color="secondary"
        >
          <PlayCircleIcon sx={{ fontSize: 35 }}></PlayCircleIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RoutineCard;
