export const refreshToken = async () => {
  try {
    const res = await fetch(
      "https://gainzapp.onrender.com/users/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    return res.ok;
  } catch (err) {
    console.error("Error al refrescar el token:", err);
    return false;
  }
};

export const checkAuth = async () => {
  try {
    let res = await fetch("https://gainzapp.onrender.com/check-auth", {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        res = await fetch("https://gainzapp.onrender.com/check-auth", {
          method: "GET",
          credentials: "include",
        });
        return res.ok;
      }
      return false;
    }

    return res.ok;
  } catch (err) {
    console.error("Error en checkAuth:", err);
    return false;
  }
};
