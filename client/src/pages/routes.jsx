import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import RoutinePage from "./RoutinePage.jsx";
import Training from "./Training.jsx";
import MoreInfo from "./MoreInfo.jsx";
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
    name: "Mas Informacios",
    element: <MoreInfo />,
  },
  {
    path: "/routines/:routineId",
    name: "RoutinePage",
    element: <RoutinePage />,
  },
  { path: "/training/:routineId", name: "Training", element: <Training /> },
];
export default routes;
