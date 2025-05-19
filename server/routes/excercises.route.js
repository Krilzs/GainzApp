import express from "express";
import cookieParser from "cookie-parser";
import ExerciseController from "../controllers/exercises.controller.js";
const exerciseRouter = express.Router();

// middlewares
exerciseRouter.use(express.json());
exerciseRouter.use(cookieParser());

// Define routes for user

exerciseRouter.get("/excercises", ExerciseController.getAllExercises);

exerciseRouter.get("/excercises/:id", ExerciseController.getExerciseById);

export default exerciseRouter;
