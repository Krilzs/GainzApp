import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import routes from "../../pages/routes";
import Login from "../userLoginRegister/Login";
import Register from "../userLoginRegister/Register";
import useAuth from "../../context/auth/auth";

const NavBar = () => {
  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };
  const handleRegisterOpen = () => {
    setRegisterOpen(!registerOpen);
  };

  const logout = () => {
    fetch("http://localhost:3000/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Logout failed");
        setOpen(false);
        setLoginOpen(false);
        setRegisterOpen(false);
        useAuth.getState().setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ height: "64px" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleDrawerOpen}>
              <MenuIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            GainzsApp
          </Typography>

          {isLoggedIn == false && (
            <Stack
              spacing={1}
              direction="row"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Button
                onClick={handleRegisterOpen}
                color="secondary"
                variant="outlined"
              >
                Registrarse
              </Button>
              <Button
                onClick={handleLoginOpen}
                color="secondary"
                variant="contained"
              >
                Iniciar Sesion
              </Button>
            </Stack>
          )}
          {isLoggedIn == true && (
            <Stack
              spacing={1}
              direction="row"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Button onClick={logout} color="secondary" variant="contained">
                Cerrar Sesion
              </Button>
            </Stack>
          )}
        </Toolbar>
        <Login loginOpen={loginOpen} handleLoginOpen={handleLoginOpen} />
        <Register
          registerOpen={registerOpen}
          handleRegisterOpen={handleRegisterOpen}
        />
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={handleDrawerOpen}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <NavListDrawer
          routes={routes}
          isLoggedIn={isLoggedIn}
          drawerOpen={handleDrawerOpen}
          handleLoginOpen={handleLoginOpen}
          handleRegisterOpen={handleRegisterOpen}
        ></NavListDrawer>
      </Drawer>
    </>
  );
};
export default NavBar;
