import { User } from "../database/schemas/User.js";
import { UserValidate } from "../models/user.validates.js";
import bcrypt from "bcryptjs";

export class UserModel {
  /**
   * crea un nuevo usuario en la base de datos.
   * @async
   * @param {Object} newUser - datos del nuevo usuario.
   * @param {string} newUser.name - nombre del usuario.
   * @param {string} newUser.email - email del usuario.
   * @param {string} newUser.password - contrase;a del usuario.
   * @param {number} newUser.age - edad del usuario.
   * @param {number} newUser.height - altura del usuario.
   * @param {number} newUser.weight - peso del usuario.
   * @returns {Promise<{status: number, message: string}>} promesa con el status y el mensaje.
   * @throws {Error} si la validacion de datos falla.
   */
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

  /**
   * inicia sesion de usuario validando credenciales.
   * @async
   * @param {Object} params - parametros de login.
   * @param {string} params.email - email del usuario.
   * @param {string} params.password - contrase;a del usuario.
   * @returns {Promise<Object>} datos del usuario autenticado.
   * @throws {Error} si la validacion falla o las credenciales son incorrectas.
   */
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

  /**
   * obtiene las rutinas de un usuario por su ID.
   * @async
   * @param {string} id - ID del usuario.
   * @returns {Promise<Array>} lista de rutinas del usuario.
   * @throws {Error} si el usuario no existe.
   */
  static async getRoutines(id) {
    //Consulta a la base de datos sobre las rutinas
    const userRoutines = await User.findById(id, { routines: 1 });
    if (!userRoutines) throw new Error("User Not Found");

    return userRoutines.routines;
  }

  /**
   * crea una nueva rutina para el usuario.
   * @async
   * @param {string} id - ID del usuario.
   * @param {string} name - nombre de la rutina.
   * @returns {Promise<Object>} usuario actualizado.
   * @throws {Error} si el usuario no existe.
   */
  static async setNewRoutine(id, name, newExercises) {
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { routines: { name: name, exercises: newExercises } } },
      { new: true }
    );
    if (!user) throw new Error("User Not Found");
    return user;
  }

  static async getRoutinesById(id, routineId) {
    const user = await User.find(
      { _id: id },
      { routines: { $elemMatch: { _id: routineId } } }
    );
    if (!user) throw new Error("User Not Found");
    return user[0].routines[0];
  }

  /**
   * elimina una rutina por su ID.
   * @async
   * @param {string} routineId - ID de la rutina.
   * @returns {Promise<Object>} usuario actualizado.
   * @throws {Error} si la rutina no existe.
   */
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

  /**
   * crea un nuevo ejercicio en una rutina.
   * @async
   * @param {string} routineId - ID de la rutina.
   * @param {Object} excercise - datos del ejercicio.
   * @param {string} excercise.name - nombre del ejercicio.
   * @param {string} excercise.description - descripcion del ejercicio.
   * @param {number} excercise.lastWeight - ultimo peso usado.
   * @param {Array} excercise.sets - series del ejercicio.
   * @returns {Promise<Object>} rutina actualizada.
   * @throws {Error} si la rutina no existe o tiene 10 ejercicios.
   */
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

  /**
   * elimina un ejercicio de una rutina.
   * @async
   * @param {string} routineId - ID de la rutina.
   * @param {string} excerciseId - ID del ejercicio.
   * @returns {Promise<Object>} usuario actualizado.
   * @throws {Error} si la rutina o el ejercicio no existen.
   */
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

  /**
   * guarda el refresh token de un usuario.
   * @async
   * @param {string} userId - ID del usuario.
   * @param {string} refreshToken - refresh token a guardar.
   * @returns {Promise<void>}
   */
  static async saveRefreshToken(userId, refreshToken) {
    await User.updateOne({ _id: userId }, { refreshToken });
  }

  /**
   * elimina el refresh token de un usuario.
   * @async
   * @param {string} userId - ID del usuario.
   * @returns {Promise<void>}
   */
  static async removeRefreshToken(userId) {
    await User.updateOne({ _id: userId }, { $unset: { refreshToken: "" } });
  }

  /**
   * busca un usuario por su refresh token.
   * @async
   * @param {string} refreshToken - refresh token a buscar.
   * @returns {Promise<Object|null>} usuario encontrado o null.
   */
  static async findByRefreshToken(refreshToken) {
    return User.findOne({ refreshToken });
  }

  static async addHistoryToRoutine(userId, routineId, log) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const routine = user.routines.id(routineId);
    if (!routine) throw new Error("Rutina no encontrada");

    const newEntry = {
      date: new Date(),
      exercises: routine.exercises.map((exercise) => ({
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets.map((set) => {
          const entry = log?.[exercise._id.toString()]?.[set._id.toString()];
          const reps = Number(entry?.reps);
          const weight = Number(entry?.weight);
          return {
            reps: isNaN(reps) ? 0 : reps,
            weight: isNaN(weight) ? 0 : weight,
          };
        }),
      })),
    };

    routine.history.push(newEntry);

    const updatedUser = await user.save();

    return updatedUser;
  }
}
