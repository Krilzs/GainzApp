import Exercise from "../database/schemas/Exercise.js";

export default class ExerciseModel {
  /**
   * obtiene todos los ejercicios de la base de datos
   * @async
   * @returns {promise<array>} lista de ejercicios
   * @throws {error} si no se encuentran ejercicios
   */
  static async getAllExcercises() {
    const excercise = await Exercise.find();
    if (!excercise) {
      throw new Error("No excercises found");
    }
    return excercise;
  }

  /**
   * obtiene un ejercicio por su id
   * @async
   * @param {string} id - id del ejercicio
   * @returns {promise<object>} ejercicio encontrado
   * @throws {error} si no se encuentra el ejercicio
   */
  static async getExcerciseById(id) {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    return exercise;
  }
}
