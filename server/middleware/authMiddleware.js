import jwt from "jsonwebtoken";

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
