import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavListDrawer = ({
  routes,
  drawerOpen,
  handleLoginOpen,
  handleRegisterOpen,
}) => {
  return (
    <>
      <Box sx={{ width: "250px" }}>
        <nav>
          <List>
            {routes.map((route) => (
              <ListItemButton
                key={route.name}
                component={NavLink}
                to={route.path}
                disablePadding
                onClick={drawerOpen}
              >
                <ListItemText sx={{ color: "black" }} primary={route.name} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={handleLoginOpen} disablePadding>
              <ListItemText sx={{ color: "black" }} primary="Iniciar Sesion" />
            </ListItemButton>
            <ListItemButton onClick={handleRegisterOpen} disablePadding>
              <ListItemText sx={{ color: "black" }} primary="Registrarse" />
            </ListItemButton>
          </List>
          <Stack
            spacing={1}
            direction="row"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              onClick={handleLoginOpen}
              color="success"
              variant="contained"
            >
              Iniciar Sesion
            </Button>
            <Button
              onClick={handleRegisterOpen}
              color="success"
              variant="contained"
            >
              Registrarse
            </Button>
          </Stack>
        </nav>
      </Box>
    </>
  );
};
export default NavListDrawer;
