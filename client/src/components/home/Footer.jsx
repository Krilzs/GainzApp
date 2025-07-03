import { Box, Container, Typography, Grid, Link } from "@mui/material";
import routes from "../../pages/routes";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.contrast",
        color: "#fff",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              GainzApp
            </Typography>
            <Typography variant="body2">
              Tu compañero ideal para alcanzar tus metas fitness. Registra tus
              entrenamientos, seguí tu progreso y rompé tus límites.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces
            </Typography>
            {routes.map((route, index) => {
              if (index < 3)
                return (
                  <Link
                    href={route.path}
                    key={route.name}
                    color="inherit"
                    underline="hover"
                    display="block"
                  >
                    {route.name}
                  </Link>
                );
            })}
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Seguinos
            </Typography>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              color="inherit"
              underline="hover"
              display="flex"
              gap={1}
            >
              <InstagramIcon />
              Instagram
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              color="inherit"
              underline="hover"
              display="flex"
              gap={1}
            >
              <TwitterIcon />
              Twitter
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              color="inherit"
              underline="hover"
              display="flex"
              gap={1}
            >
              <FacebookIcon />
              Facebook
            </Link>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} GainzApp. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
