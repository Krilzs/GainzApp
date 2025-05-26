import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const KEY_JWT = process.env.KEY_JWT;

const compareToken = async (token) => {
  if (!token) throw new Error("Token no valido");

  return jwt.verify(token, KEY_JWT, (err, decoded) => {
    if (err) {
      throw new Error(err);
    }
    if (!decoded) {
      throw new Error("Token no valido");
    }
    return decoded;
  });
};

export default class UserController {
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

  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.login({ email, password });
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          height: user.height,
          weight: user.weight,
        },
        KEY_JWT,
        { expiresIn: "1h" }
      );
      res
        .cookie("authToken", token, {
          httpOnly: true,
          // sameSite: "strict", // Lo comente para evitar problemas de CORS si queres despues probalo y fijate si anda igual
          maxAge: 1000 * 60 * 60,
          secure: false, // Cambiar a true en producción
        })
        .send({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      res.status(401).send(error.message);
    }
  };

  static myInfo = async (req, res) => {
    const token = req.cookies.authToken;
    try {
      const userInfo = await compareToken(token);
      res.json(userInfo);
    } catch (error) {
      res.status(401).send("Token no valido");
    }
  };

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

  static setRoutine = async (req, res) => {
    const { name } = req.body;
    const token = req.cookies.authToken;
    const routineName = `Rutina de ${name}`;
    try {
      const { id } = await compareToken(token);
      UserModel.setNewRoutine(id, routineName);
      res.status(201).send("Rutina creada");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  static logout = async (req, res) => {
    res
      .clearCookie("authToken")
      .status(200)
      .send({ message: "Sesión cerrada" });
  };

  static deleteRoutine = async (req, res) => {
    const { routineId } = req.body;
    try {
      await UserModel.deleteRoutine(routineId);
      res.status(200).send("Rutina eliminada");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

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

  static deleteExcercise = async (req, res) => {
    const { routineId, exerciseId } = req.body;
    try {
      await UserModel.deleteExcercise(routineId, exerciseId);
      res.status(200).send("Ejercicio eliminado");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
