import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NavListDrawer from "./Navlistdrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const NavBar = ({ routes }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    console.log(open);
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gym App
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {routes.map((route) => (
              <Button
                key={route.name}
                color="inherit"
                component={NavLink}
                to={route.path}
              >
                {route.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
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
          drawerOpen={handleDrawerOpen}
        ></NavListDrawer>
      </Drawer>
    </>
  );
};
export default NavBar;
