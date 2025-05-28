import ExerciseModel from "../models/exercise.model.js";

export default class ExerciseController {
  /**
   * obtiene todos los ejercicios de la base de datos y los devuelve en la respuesta
   * @async
   * @param {req} req - objeto de solicitud http
   * @param {res} res - objeto de respuesta http
   * @returns {promise<void>}
   */
  static async getAllExercises(req, res) {
    try {
      const excercise = await ExerciseModel.getAllExcercises();
      res.status(200).json(excercise);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  /**
   * obtiene un ejercicio por su id y lo devuelve en la respuesta
   * @async
   * @param {req} req - objeto de solicitud http
   * @param {res} res - objeto de respuesta http
   * @returns {promise<void>}
   */
  static async getExerciseById(req, res) {
    const { id } = req.params;
    try {
      const exercise = await ExerciseModel.getExcerciseById(id);
      if (!exercise) {
        return res.status(404).json({ message: "exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      res.status(500).json({ message: "error fetching exercise" });
    }
  }
}
