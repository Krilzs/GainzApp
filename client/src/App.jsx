import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./pages/routes.jsx";
import { useEffect } from "react";
import useAuth from "./context/auth/auth.js";



const router = createBrowserRouter(routes);

function App() {
  const setIsLoggedIn = useAuth((s) => s.setIsLoggedIn);

  async function checkAuth() {
    let res = await fetch("https://gainzapp.onrender.com/check-auth", {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 401) {
      // Intentar refrescar el token
      const refreshRes = await fetch(
        "https://gainzapp.onrender.com/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (refreshRes.ok) {
        // Reintenta la peticion original
        res = await fetch("https://gainzapp.onrender.com/check-auth", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) return true;
      }
      return false;
    }
    return res.ok;
  }

  useEffect(() => {
    checkAuth().then(setIsLoggedIn);
    console.log("Autentificando...")
  }, [setIsLoggedIn]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
