import Exercise from "../database/schemas/Exercise.js";

export default class ExerciseModel {
  static async getAllExcercises() {

    // Example function to get all excercises
    const excercise = await Exercise.find();
    if (!excercise) {
      throw new Error("No excercises found");
    }
    return excercise;
  }
  static async getExcerciseById(id) {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    return exercise;
  }
}
