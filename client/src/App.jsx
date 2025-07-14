import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./pages/routes.jsx";
import { useEffect } from "react";
import useAuth from "./context/auth/auth.js";
import InstallPWAButton from "./components/navbar/InstallPWAButton.jsx";
import { checkAuth, refreshToken } from "./utils/authUtils.js";
const router = createBrowserRouter(routes);

function App() {
  const setIsLoggedIn = useAuth((s) => s.setIsLoggedIn);

  useEffect(() => {
    // Verifica autenticación al iniciar la app
    checkAuth().then(setIsLoggedIn);

    // Refresca el token cada 14 minutos
    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 14);

    return () => clearInterval(interval);
  }, [setIsLoggedIn]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <InstallPWAButton />
    </>
  );
}

export default App;
