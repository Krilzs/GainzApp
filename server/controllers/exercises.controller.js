import ExerciseModel from "../models/exercise.model.js";

export default class ExerciseController {

    static async getAllExercises(req, res) {
        try {
        const excercise = await ExerciseModel.getAllExcercises();
        res.status(200).json(excercise);
        } catch (error) {
        res.status(500).json(error.message);
        }
    }
    
    static async getExerciseById(req, res) {
        const { id } = req.params;
        try {
        const exercise = await ExerciseModel.getExcerciseById(id);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(200).json(exercise);
        } catch (error) {
        res.status(500).json({ message: "Error fetching exercise" });
        }
    }
}