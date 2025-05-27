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
        if (!res.ok) {
          if (res.status === 401) {
            console.error("Unauthorized access");
            return setIsLoggedIn(false);
          }
          console.error("Error checking auth status: ", res.statusText);
          throw new Error("Failed to check authentication status");
        }
        if (res.ok) setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error("Unauthorized: ", err);
      });
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
