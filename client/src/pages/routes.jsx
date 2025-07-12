import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import RoutinePage from "./RoutinePage.jsx";
import Training from "./Training.jsx";
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
  { path: "/training/:routineId", name: "Training", element: <Training /> },
];
export default routes;
