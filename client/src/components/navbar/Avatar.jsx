import { useState } from "react";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";
export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ pt: 2, px: 0.5 }}>
      <Button onClick={handleOpen} size="small">
        <Avatar
          src="/ruta-de-tu-avatar.jpg"
          alt="Mi Perfil"
          sx={{ width: 48, height: 48 }}
        >
          <Person4Icon />
        </Avatar>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Configuración</MenuItem>
      </Menu>
    </Box>
  );
}
