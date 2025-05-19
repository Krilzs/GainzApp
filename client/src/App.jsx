import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Routes, Route } from "react-router-dom";
import routes from "./pages/routes.jsx";
import NavBar from "./components/navbar/Navbar.jsx";
import { Box } from "@mui/material";


function App() {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "110vh" }}>
      <NavBar routes={routes}></NavBar>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
}

export default App;
