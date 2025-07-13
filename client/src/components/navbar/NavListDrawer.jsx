import { Avatar, Box, Button, Container, List, Stack } from "@mui/material";
import ListItemCustom from "./ListItemCustom.jsx";
import ThemeSwitcher from "../themeSwitcher/SwitchTheme.jsx";
import ConnectionIndicator from "../Connection/ConnectionIndicator.jsx";
import AvatarMenu from "./Avatar.jsx";
import InstallPWAButton from "./InstallPWAButton.jsx";
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
          {isLoggedIn == null && (
            <Box px={2} pt={2}>
              <ConnectionIndicator isConnecting={true} isConnected={false} />
            </Box>
          )}
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
          {isLoggedIn == true && <AvatarMenu></AvatarMenu>}
          <InstallPWAButton />
        </Box>
        <nav>
          <List sx={{ p: 0 }}>
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
