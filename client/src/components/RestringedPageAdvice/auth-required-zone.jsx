import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Lock as LockIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const AuthRequiredZone = ({
  title = "Acceso Restringido",
  message = "Esta sección requiere que inicies sesión para continuar. Por favor, inicia sesión o crea una cuenta para acceder al contenido.",
  variant = "card",
  icon,
  handleLoginOpen,
  handleRegisterOpen,
}) => {
  const theme = useTheme();

  const defaultIcon = (
    <Avatar
      sx={{
        width: 80,
        height: 80,
        bgcolor: alpha(theme.palette.secondary.main, 0.1),
        border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
        mb: 2,
      }}
    >
      <LockIcon
        sx={{
          fontSize: 40,
          color: theme.palette.secondary.main,
        }}
      />
    </Avatar>
  );

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: variant === "fullscreen" ? 4 : 3,
        maxWidth: 500,
        mx: "auto",
      }}
    >
      {icon || defaultIcon}

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "text.primary",
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: 4,
          lineHeight: 1.6,
          opacity: 0.8,
        }}
      >
        {message}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: "100%", maxWidth: 300 }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          onClick={handleLoginOpen}
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: "white",
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              bgcolor: alpha(theme.palette.secondary.main, 0.8),
            },
            flex: 1,
          }}
        >
          Iniciar Sesión
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<PersonAddIcon />}
          onClick={handleRegisterOpen}
          sx={{
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              bgcolor: alpha(theme.palette.secondary.main, 0.05),
            },
            flex: 1,
          }}
        >
          Registrarse
        </Button>
      </Stack>

      <Divider sx={{ width: "100%", my: 3, opacity: 0.3 }} />

      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          opacity: 0.6,
          fontSize: "0.75rem",
        }}
      >
        ¿Necesitas ayuda? Contacta con nuestro soporte
      </Typography>
    </Box>
  );

  if (variant === "fullscreen") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
          p: 2,
        }}
      >
        <Card
          elevation={8}
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
            border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
          }}
        >
          <CardContent sx={{ p: 0 }}>{content}</CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Card
      elevation={4}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.1)}`,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        my: 2,
      }}
    >
      <CardContent sx={{ p: 0 }}>{content}</CardContent>
    </Card>
  );
};

export default AuthRequiredZone;
