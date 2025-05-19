import { User } from "../database/schemas/User.js";
import { UserValidate } from "../models/user.validates.js";
import bcrypt from "bcryptjs";

export class UserModel {
  static async createUser(newUser) {
    //Validacion de Datos
    const Vresult = await UserValidate.validateData(newUser);
    if (!Vresult) throw new Error("Error Validacion de Datos");
    //Hasheo de la contrasenia
    const passwordHash = await bcrypt.hash(newUser.password, 10);
    const user = User({ ...newUser, password: passwordHash });
    //Retorno si es posible o no crear el usuario
    return user
      .save()
      .then((res) => {
        return { status: 201, message: "User Created" };
      })
      .catch((err) => {
        return { status: 400, message: "Email already in use" };
      });
  }

  static async login({ email, password }) {
    //Validacion Tipo de datos
    const validPass = await UserValidate.Password(password);
    const validEmail = await UserValidate.Email(email);
    if (!validPass || !validEmail) throw new Error("Error Validacion de Datos");

    //Consulta a la base de datos
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    //Comparacion de contrasenia hasheada
    const isRealPass = await bcrypt.compare(password, user.password);
    if (!isRealPass) throw new Error("Incorrect Password");

    //Retorno de informacion obtenida de la consulta
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      height: user.height,
      weight: user.weight,
    };
  }

  static async getRoutines(id) {
    //Consulta a la base de datos sobre las rutinas
    const userRoutines = await User.findById(id, {routines: 1 });
    if (!userRoutines) throw new Error("User Not Found");

    return userRoutines.routines;
  }

  static async setNewRoutine(id, name) {
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { routines: { name: name, exercises: [] } } },
      { new: true }
    );
    if (!user) throw new Error("User Not Found");
    return user;
  }

  static async deleteRoutine(routineId) {
    const userRoutine = await User.findOneAndUpdate(
      {
        routines: { $elemMatch: { _id: routineId } },
      },
      {
        $pull: { routines: { _id: routineId } },
      }
    );
    if (!userRoutine) throw new Error("Routine Not Found");

    return userRoutine;
  }

  static async setNewExcercise(routineId, excercise) {
    const userRoutine = await User.findOne(
      { "routines._id": routineId },
      { "routines.$": 1 }
    );
    if (!userRoutine) throw new Error("Routine Not Found");
    if (userRoutine.routines[0].exercises.length >= 10) {
      throw new Error("Routine has 10 exercises");
    }

    await User.findOneAndUpdate(
      {
        routines: { $elemMatch: { _id: routineId } },
      },
      {
        $push: { "routines.$.exercises": excercise },
      },
      { new: true }
    );

    return userRoutine;
  }

  static async deleteExcercise(routineId, excerciseId) {
    //Validacion de Datos(si existe la rutina y el ejercicio)
    const userRoutine = await User.findOne(
      { "routines._id": routineId },
      { "routines.$": 1 }
    );
    if (!userRoutine) throw new Error("Routine Not Found");

    const exerciseExists = userRoutine.routines[0].exercises.some(
      (exercise) => exercise._id.toString() === excerciseId
    );


    if (!exerciseExists) throw new Error("Exercise Not Found");

    //Eliminacion del ejercicio
    const user = await User.findOneAndUpdate(
      {
        routines: { $elemMatch: { _id: routineId } },
      },
      {
        $pull: { "routines.$.exercises": { _id: excerciseId } },
      }
    );

    return user;
  }
}
