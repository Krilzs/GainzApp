import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
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
import ConnectionIndicator from "../Connection/ConnectionIndicator";

import GainzLogo from "../../../static/photos/GainzLogo.png";
import { NavLink } from "react-router-dom";
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
    fetch("https://gainzapp.onrender.com/users/logout", {
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
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: { xs: "end", md: "flex-start" },
                width: "100%",
              }}
            >
              <Box
                component={NavLink}
                to={"/"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={GainzLogo}
                  style={{
                    width: "auto",
                    height: "64px",
                    objectFit: "contain",
                    scale: 1.5,
                  }}
                />
              </Box>

              <Box>
                <List sx={{ display: { xs: "none", md: "flex" }, px: 1 }}>
                  {routes.map((route, index) => {
                    if (index < 3)
                      return (
                        <Typography
                          route={route}
                          component={NavLink}
                          fontFamily={"anton"}
                          to={route.path}
                          variant="h6"
                          sx={{
                            px: 1,
                            color: "text.secondary",
                            textDecoration: "none",
                            transition: "all 0.2s ease-in-out",
                            ":hover": {
                              transition: "all 0.2s ease-in-out",
                              color: "secondary.dark",
                              textDecorationColor: "secondary.dark",
                              textDecorationThickness: "3px",
                            },
                          }}
                          key={route.name}
                          index={index}
                        >
                          {route.name.toUpperCase()}
                        </Typography>
                      );
                  })}
                </List>
              </Box>
            </Box>
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
          {isLoggedIn == null && (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ConnectionIndicator isConnecting={true} isConnected={false} />
            </Box>
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
          logout={logout}
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
