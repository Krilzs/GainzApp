import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
const routes = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/login",
    name: "login",
    element: <Login />,
  },
  {
    path: "/register",
    name: "register",
    element: <Register />,
  }
];
export default routes;
