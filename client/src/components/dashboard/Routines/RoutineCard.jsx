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

const RoutineCard = ({ routine }) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: { xs: 6, md: 3 },
        minHeight: { xs: 80, md: 70 },
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        textDecoration: "none",
        ":hover": {
          boxShadow: 5,
          transform: "scale(1.01)",
          transition: "all 0.2s ease-in-out",
        },
      }}
      component={NavLink}
      to={`/routines/${routine._id}`}
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
            color="text.primary"
            sx={{
              textOverflow: "ellipsis",
              textDecoration: "none",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: { xs: "200px", sm: "300px", md: "100%" },
            }}
          >
            {routine.name}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{p:0 , width:"fit-content"}}>
        <IconButton
          component={NavLink}
          to={`/routines/${routine._id}`}
          aria-label="play"
          size="small"
          color="secondary"
        >
          <PlayCircleIcon sx={{ fontSize: 35 }}></PlayCircleIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RoutineCard;
