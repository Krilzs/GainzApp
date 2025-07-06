import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import RoutinePage from "./RoutinePage.jsx";
const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    name: "Mis Rutinas",
    element: <Dashboard />,
  },
  {
    path: "/AboutUs",
    name: "Quienes Somos",
    element: <Home />,
  },
  {
    path: "/routines/:routineId",
    name: "RoutinePage",
    element: <RoutinePage />,
  },
];
export default routes;
