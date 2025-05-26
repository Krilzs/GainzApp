import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./pages/routes.jsx";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
