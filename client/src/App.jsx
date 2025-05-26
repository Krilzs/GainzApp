import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./pages/routes.jsx";
import { useEffect } from "react";
import useAuth from "./auth/auth.js";

const router = createBrowserRouter(routes);

function App() {
  const setIsLoggedIn = useAuth((s) => s.setIsLoggedIn);

  useEffect(() => {
    fetch("/check-auth", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
