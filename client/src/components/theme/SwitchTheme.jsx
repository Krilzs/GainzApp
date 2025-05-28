import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import useTheme from "../../context/theme/theme.js";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeSwitcher = () => {
  const mode = useTheme((state) => state.mode);
  const toggleMode = useTheme((state) => state.toggleMode);

  //es true si el modo es oscuro, false si es claro
  const isDarkMode = mode === "dark";

  return (
    <Stack
      direction="row"
      bgcolor={"primary.main"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography sx={{ display: "flex", color: "secondary.main" }}>
        <LightModeIcon />
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={toggleMode}
            name="themeToggle"
            color="secondary.main"
          />
        }
        sx={{ m: 0, bgcolor: "primary.main" }} // Remove default margin if needed
      />
      <Typography sx={{ display: "flex", color: "secondary.main" }}>
        <DarkModeIcon />
      </Typography>
    </Stack>
  );
};

export default ThemeSwitcher;
