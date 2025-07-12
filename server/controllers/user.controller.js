import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const KEY_JWT = process.env.KEY_JWT;
const REFRESH_KEY_JWT = process.env.REFRESH_KEY_JWT;

/**
 * verifica y decodifica un token de acceso.
 * @async
 * @param {string} token - token JWT de acceso.
 * @returns {Promise<Object>} el payload decodificado del token.
 * @throws {Error} - si el token es invalido o no existe.
 */
const compareToken = async (token) => {
  if (!token) throw new Error("Token no valido");
  return jwt.verify(token, KEY_JWT, (err, decoded) => {
    if (err) throw new Error(err);
    if (!decoded) throw new Error("Token no valido");
    return decoded;
  });
};

export default class UserController {
  /**
   * registra un nuevo usuario en la base de datos.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static registerUser = async (req, res) => {
    const { name, email, password, age, height, weight } = req.body;
    try {
      const result = await UserModel.createUser({
        name,
        email,
        password,
        age,
        height,
        weight,
      });
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(400).send("Error Validacion de Datos");
    }
  };

  /**
   * inicia la sesion del usuario, genera los tokens y los guarda en cookies.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */

  static getRoutinesById = async (req, res) => {
    const { routineId } = req.params;
    const token = req.cookies.authToken;
    try {
      const { id } = await compareToken(token);
      const routine = await UserModel.getRoutinesById(id, routineId);
      res.status(200).json(routine);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.login({ email, password });
      const accessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          height: user.height,
          weight: user.weight,
        },
        KEY_JWT,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          height: user.height,
          weight: user.weight,
        },
        REFRESH_KEY_JWT,
        { expiresIn: "7d" }
      );
      await UserModel.saveRefreshToken(user.id, refreshToken);

      res
        .cookie("authToken", accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cambiar a true en produccion
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cambiar a true en produccion
        })
        .send({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      res.status(401).send(error.message);
    }
  };

  /**
   * refresca el access token usando el refresh token guardado en cookies.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token" });
    try {
      jwt.verify(refreshToken, REFRESH_KEY_JWT);
      const user = await UserModel.findByRefreshToken(refreshToken);
      if (!user)
        return res.status(403).json({ message: "Refresh token inválido" });
      const newAccessToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          height: user.height,
          weight: user.weight,
        },
        KEY_JWT,
        { expiresIn: "15m" }
      );

      res
        .cookie("authToken", newAccessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
          secure: false,
        })
        .json({ message: "Token refrescado" });
    } catch (err) {
      res.status(401).json({ message: "Refresh token inválido" });
    }
  };

  /**
   * devuelve la informacion del usuario autenticado.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static myInfo = async (req, res) => {
    const token = req.cookies.authToken;
    try {
      const userInfo = await compareToken(token);
      res.json(userInfo);
    } catch (error) {
      res.status(401).send("Token no valido");
    }
  };

  /**
   * devuelve las rutinas del usuario autenticado.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static myRoutines = async (req, res) => {
    const token = req.cookies.authToken;
    try {
      const { id } = await compareToken(token);
      const result = await UserModel.getRoutines(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  /**
   * crea una nueva rutina para el usuario autenticado.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static setRoutine = async (req, res) => {
    const { name, exercises } = req.body;
    const token = req.cookies.authToken;
    const routineName = `Rutina de ${name}`;
    try {
      const { id } = await compareToken(token);
      UserModel.setNewRoutine(id, routineName, exercises);
      res.status(201).send("Rutina creada");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  /**
   * cierra la sesion del usuario, elimina el refresh token y limpia las cookies.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      try {
        const user = await UserModel.findByRefreshToken(refreshToken);
        if (user) await UserModel.removeRefreshToken(user._id);
      } catch (err) {
        ("Error al eliminar el refresh token");
        console.error(err);
      }
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };
    res
      .clearCookie("authToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .send({ message: "Sesión cerrada" });
  };

  /**
   * elimina una rutina por su ID.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static deleteRoutine = async (req, res) => {
    const { routineId } = req.body;
    try {
      await UserModel.deleteRoutine(routineId);
      res.status(200).send("Rutina eliminada");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  /**
   * crea un nuevo ejercicio en una rutina.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static setExcercise = async (req, res) => {
    const { routineId, name, description, lastWeight, sets } = req.body;
    try {
      await UserModel.setNewExcercise(routineId, {
        name,
        description,
        lastWeight,
        sets,
      });
      res.status(200).send("Ejercicio creado");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  /**
   * elimina un ejercicio de una rutina.
   * @async
   * @param {req} req - objeto de solicitud HTTP.
   * @param {res} res - objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  static deleteExcercise = async (req, res) => {
    const { routineId, exerciseId } = req.body;
    try {
      await UserModel.deleteExcercise(routineId, exerciseId);
      res.status(200).send("Ejercicio eliminado");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  static setRoutineHistory = async (req, res) => {
    const token = req.cookies.authToken;
    const { routineId, log } = req.body;
    try {
      const { id } = await compareToken(token);
      const userId = id;
      if (!log || !userId || !routineId) {
        return res.status(400).json({ message: "Faltan datos" });
      }
      const result = await UserModel.addHistoryToRoutine(
        userId,
        routineId,
        log
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
}
