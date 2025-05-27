import {
  Avatar,
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
      <Box sx={{ width: "250px", height: "100%", bgcolor: "primary.main" }}>
        <Avatar
          sx={{ marginTop: 2, marginLeft: 2, width: 48, height: 48 }}
        ></Avatar>
        <nav>
          <List>
            {routes.map((route) => (
              <ListItemButton
                key={route.name}
                component={NavLink}
                to={route.path}
                onClick={drawerOpen}
              >
                <ListItemText
                  sx={{ color: "primary.contrastText" }}
                  variant="h1"
                  primary={route.name}
                />
              </ListItemButton>
            ))}
            <ListItemButton onClick={handleLoginOpen}>
              <ListItemText
                sx={{ color: "primary.contrastText" }}
                primary="Iniciar Sesion"
              />
            </ListItemButton>
            <ListItemButton onClick={handleRegisterOpen}>
              <ListItemText
                sx={{ color: "primary.contrastText" }}
                primary="Registrarse"
              />
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
