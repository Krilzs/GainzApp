import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";

const RoutineCard = ({ routine }) => {
  return (
    <Card sx={{ display: "flex", borderRadius: 6, height: 120 }}>
      <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {routine.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {routine.description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <IconButton component={Link} to={`/routines/${routine.id}`} aria-label="play" size="large" color="secondary">
          <PlayCircleIcon sx={{ fontSize: 35 }}></PlayCircleIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RoutineCard;
