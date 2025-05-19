import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavListDrawer = ({ routes, drawerOpen }) => {
  return (
    <>
      <Box sx={{ width: "250px" }}>
        <nav>
          <List>
            {routes.map((route) => (
              <ListItem
                key={route.name}
                component={NavLink}
                to={route.path}
                disablePadding
              >
                <ListItemButton onClick={drawerOpen}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText sx={{ color: "black" }} primary={route.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </>
  );
};
export default NavListDrawer;
