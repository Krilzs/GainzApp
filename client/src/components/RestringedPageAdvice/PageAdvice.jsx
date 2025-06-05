import { Box, Container } from "@mui/material";
import AuthRequiredZone from "./auth-required-zone";
import { useState } from "react";
import Login from "../userLoginRegister/Login";
import Register from "../userLoginRegister/Register";

const PageAdvice = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };
  const handleRegisterOpen = () => {
    setRegisterOpen(!registerOpen);
  };
  return (
    <Container>
      <Box>
        <AuthRequiredZone
          handleLoginOpen={handleLoginOpen}
          handleRegisterOpen={handleRegisterOpen}
        />
      </Box>
      <Login loginOpen={loginOpen} handleLoginOpen={handleLoginOpen} />
      <Register
        registerOpen={registerOpen}
        handleRegisterOpen={handleRegisterOpen}
      />
    </Container>
  );
};

export default PageAdvice;
