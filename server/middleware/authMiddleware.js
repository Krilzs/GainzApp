import jwt from "jsonwebtoken";

/**
 * middleware de autenticacion para rutas protegidas
 *
 * verifica el token jwt enviado en las cookies
 * @param {req} req - objeto de solicitud http
 * @param {res} res - objeto de respuesta http
 * @param {next} next - funcion next de express
 * @returns {void}
 */
function authenticate(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const isLogged = jwt.verify(token, process.env.KEY_JWT);
    if (!isLogged) return res.status(401).json({ message: "Invalid token" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default authenticate;
