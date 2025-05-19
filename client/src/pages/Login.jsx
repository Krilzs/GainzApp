import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          pt: 10,
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
      </Box>
    </>
  );
};
export default Login;
