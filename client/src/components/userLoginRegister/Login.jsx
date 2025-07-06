import { useTheme } from "@emotion/react";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grow,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { useState } from "react";
// import { set } from "mongoose";
import useAuth from "../../context/auth/auth";
const Login = ({ loginOpen, handleLoginOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(!isLoading);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loginError, setLoginError] = useState(false);

  const setIsLoggedIn = useAuth((s) => s.setIsLoggedIn);

  const handleLoginError = (closeOrOpen) => {
    setLoginError(closeOrOpen);
  };

  const errorAlert = (
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setLoginError(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {loginError && (
        <>
          <AlertTitle>Error al Iniciar Sesion</AlertTitle>
          Por favor, revisa tus credenciales e intenta nuevamente.
        </>
      )}
    </Alert>
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoading();

    fetch("https://gainzapp.onrender.com/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        handleLoading();
        setIsLoggedIn(true);
        handleLoginOpen(); // Close the dialog
        // Handle successful login, e.g., redirect or show a success message
      } else {
        handleLoading();
        handleLoginError(true);
        setIsLoggedIn(false);
      }
    });
  };

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
            handleSubmit(e);
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
          color="secondary"
          onChange={handleChange}
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
          color="secondary"
          helperText="Deberia tener al menos 8 caracteres"
          onChange={handleChange}
        />

        <Grow
          in={loginError}
          style={{ transformOrigin: "0 0 0" }}
          {...(loginError ? { timeout: 500 } : {})}
        >
          {errorAlert}
        </Grow>

        <DialogActions>
          <Button color="error" size="small" onClick={handleLoginOpen}>
            Cancelar
          </Button>
          <Button
            color="secondary"
            loading={isLoading}
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
