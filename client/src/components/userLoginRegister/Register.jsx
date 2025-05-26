import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { z } from "zod";

const Register = ({ registerOpen, handleRegisterOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Estilo para eliminar los botones de incremento y decremento en los inputs de tipo number
  const styleNumber = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  };

  //Esquema del registro para hacer la validacion de datos
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[a-zA-Z]/, { message: "La contraseña debe contener letras" })
      .regex(/[0-9]/, { message: "La contraseña debe contener números" }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
    age: z.coerce
      .number()
      .min(0, { message: "La edad no puede ser negativa" })
      .max(120, { message: "La edad no puede ser mayor a 120" }),
    height: z.coerce
      .number()
      .min(0, { message: "La altura no puede ser negativa" })
      .max(300, { message: "La altura no puede ser mayor a 300" }),
    weight: z.coerce
      .number()
      .min(0, { message: "El peso no puede ser negativo" })
      .max(500, { message: "El peso no puede ser mayor a 500" }),
  });

  // Estado para manejar el formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    height: 0,
    weight: 0,
  });

  const [errors, setErrors] = useState([
    {
      path: "name",
      error: "",
      hasError: false,
    },
    {
      path: "email",
      error: "",
      hasError: false,
    },
    {
      path: "password",
      error: "",
      hasError: false,
    },
    {
      path: "confirmPassword",
      error: "",
      hasError: false,
    },
    {
      path: "age",
      error: "",
      hasError: false,
    },
    {
      path: "height",
      error: "",
      hasError: false,
    },
    {
      path: "weight",
      error: "",
      hasError: false,
    },
  ]);

  //BUSCA EL ERROR POR PATH Y EN CASO DE NO TENER PARAMS LIMPIA LOS ERRORES
  const handleErrors = (path, error) => {
    setErrors((prevData) =>
      prevData.map((item) =>
        item ? { ...item, hasError: false, error: "" } : item
      )
    );

    if (path && error) {
      setErrors((prevData) =>
        prevData.map((item) =>
          item.path === path ? { ...item, hasError: true, error: error } : item
        )
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getError = (fieldName) => {
    return (
      errors.find((err) => err.path === fieldName) || {
        error: "",
        hasError: false,
      }
    );
  };

  const handleSubmit = () => {
    // Validar los datos del formulario
    if (formData.confirmPassword != formData.password) {
      handleErrors("confirmPassword", "Las contraseñas deben coincidir");
      return;
    }
    try {
      const result = registerSchema.parse(formData);
      handleErrors();
      /* RESULT CONTIENE LA DATA PARSEADA, OSEA LA DATA VALIDA PARA EL FETCH... se debe pasar todo menos el confirmPassword */

      fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.name,
          email: result.email,
          password: result.password,
          age: result.age,
          height: result.height,
          weight: result.weight,
        }),
      })
        .then((response) => {
          console.log("Response:", response);
          if (!response.ok) {
            throw new Error("Error en el registro");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Registro exitoso:", data);
          handleRegisterOpen(); // Cerrar el diálogo después del registro exitoso
        })
        .catch((error) => {
          console.error("Error al registrar:", error);
          handleErrors("email", "El correo ya está en uso");
        });

      console.log(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        handleErrors();
        error.errors.forEach((err) => {
          handleErrors(err.path[0], err.message);
        });
      }
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={registerOpen}
        onClose={handleRegisterOpen}
        maxWidth="xs"
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (e) => {
              e.preventDefault();
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
          <DialogContentText
            variant="subtitle2"
            id="alert-dialog-slide-description"
          >
            Registrate para poder acceder a todas las funcionalidades de la app
          </DialogContentText>
          <Divider textAlign="center" sx={{ mt: 4 }}>
            Registro de Usuario
          </Divider>

          <Box>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              error={getError("name").hasError}
              helperText={getError("name").error}
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Direccion de correo electronico"
              type="email"
              fullWidth
              error={getError("email").hasError}
              helperText={getError("email").error}
              variant="standard"
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
              error={getError("password").hasError}
              helperText={getError("password").error}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Contraseña"
              type="password"
              fullWidth
              variant="standard"
              error={getError("confirmPassword").hasError}
              helperText={getError("confirmPassword").error}
              onChange={handleChange}
            />
          </Box>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              required
              margin="dense"
              id="age"
              name="age"
              label="Edad"
              type="number"
              sx={styleNumber}
              variant="standard"
              error={getError("age").hasError}
              helperText={getError("age").error}
              onChange={handleChange}
            />
            <TextField
              required
              slotProps={{
                input: {
                  min: 0,
                  startAdornment: (
                    <InputAdornment position="start">cm</InputAdornment>
                  ),
                },
              }}
              margin="dense"
              id="height"
              name="height"
              label="Altura"
              type="number"
              sx={styleNumber}
              fullWidth
              variant="standard"
              error={getError("height").hasError}
              helperText={getError("height").error}
              onChange={handleChange}
            />
            <TextField
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                },
              }}
              margin="dense"
              sx={styleNumber}
              id="weight"
              name="weight"
              label="Peso"
              type="number"
              fullWidth
              variant="standard"
              error={getError("weight").hasError}
              helperText={getError("weight").error}
              onChange={handleChange}
            />
          </Stack>

          <DialogActions>
            <Button color="error" size="small" onClick={handleRegisterOpen}>
              Cancelar
            </Button>
            <Button
              color="success"
              variant="contained"
              size="medium"
              type="submit"
            >
              Siguiente
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
