import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { useState } from "react";
const Login = ({ loginOpen, handleLoginOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  function handleLoading() {
    console.log("Loading");
    setLoading(!loading);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={loginOpen}
      onClose={handleLoginOpen}
      maxWidth="xs"
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();
            setTimeout(() => {
              handleLoading();
              handleLoginOpen();
            }, 2000);
            handleLoading();
          },
        },
      }}
      aria-describedby="alert-dialog-slide-description"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle variant="h4" align="center">
        Logo Here
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="body1"></DialogContentText>
        <DialogContentText
          variant="subtitle2"
          id="alert-dialog-slide-description"
        >
          Inicia sesion con tu cuenta, o registrate si no tienes una.
        </DialogContentText>
        <Divider textAlign="center" sx={{ mt: 4 }}>
          Inicio de Sesion
        </Divider>
        <TextField
          autoFocus
          required
          margin="dense"
          
          id="email"
          name="email"
          label="Direccion de correo electronico"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          fullWidth
          variant="standard"
          helperText="Deberia tener al menos 8 caracteres"
        />
        <DialogActions>
          <Button color="error" size="small" onClick={handleLoginOpen}>
            Cancelar
          </Button>
          <Button
            color="success"
            loading={loading}
            variant="contained"
            size="medium"
            type="submit"
            endIcon={<LoginSharpIcon />}
          >
            Entrar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default Login;
