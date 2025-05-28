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
  TableRow,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavListDrawer = ({
  routes,
  drawerOpen,
  handleLoginOpen,
  handleRegisterOpen,
  isLoggedIn,
}) => {
  return (
    <>
      <Box sx={{ width: "250px", height: "100%", bgcolor: "primary.main" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {isLoggedIn == false && (
            <Stack spacing={1} pt={2} pl={2} direction="row">
              <Button
                onClick={handleLoginOpen}
                sx={{ textWrap: "nowrap" }}
                color="secondary"
                size="small"
                variant="contained"
              >
                Iniciar Sesion
              </Button>
              <Button
                onClick={handleRegisterOpen}
                color="secondary"
                size="small"
                variant="outlined"
              >
                Registrarse
              </Button>
            </Stack>
          )}
          {isLoggedIn == true && (
            <Avatar
              sx={{ marginTop: 2, marginLeft: 2, width: 48, height: 48 }}
            ></Avatar>
          )}
        </Box>
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
          </List>
        </nav>
      </Box>
    </>
  );
};
export default NavListDrawer;
