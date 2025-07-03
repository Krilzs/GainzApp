import { Avatar, Box, Button, List, Stack } from "@mui/material";
import ListItemCustom from "./ListItemCustom.jsx";
import ThemeSwitcher from "../themeSwitcher/SwitchTheme.jsx";
const NavListDrawer = ({
  routes,
  drawerOpen,
  handleLoginOpen,
  handleRegisterOpen,
  isLoggedIn,
  logout,
}) => {
  return (
    <>
      <Box
        sx={{ width: "250px", height: "100%", bgcolor: "background.default" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {isLoggedIn == false && (
            <Stack spacing={1} pt={2} pl={2} direction="row">
              <Button
                onClick={handleLoginOpen}
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
            />
          )}
        </Box>
        <nav>
          <List>
            {routes.map((route, index) => {
              if (index < 3)
                return (
                  <ListItemCustom
                    route={route}
                    key={route.name}
                    drawerOpen={drawerOpen}
                    index={index}
                  />
                );
            })}
          </List>
        </nav>
      </Box>
      <ThemeSwitcher />
      {isLoggedIn == true && (
        <Button
          onClick={logout}
          color="secondary"
          sx={{ borderRadius: 0 }}
          variant="contained"
        >
          Cerrar Sesion
        </Button>
      )}
    </>
  );
};
export default NavListDrawer;
