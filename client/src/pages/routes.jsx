import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";

const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    name: "Ejercicios",
    element: <Home />,
  },
  {
    path: "/",
    name: "Quienes Somos",
    element: <Home />,
  },
];
export default routes;
