import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./pages/routes.jsx";
import { useEffect } from "react";
import useAuth from "./auth/auth.js";

const router = createBrowserRouter(routes);

function App() {
  const setIsLoggedIn = useAuth((s) => s.setIsLoggedIn);

  useEffect(() => {
    fetch("http://localhost:3000/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return setIsLoggedIn(false);
        if (res.ok) setIsLoggedIn(true);
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
