import { ExerciseSchema } from "./Exercise.js";
import { Schema } from "mongoose";

export const HistorialSchema = new Schema(
  {
    exercises: {
      type: [ExerciseSchema],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false, // Opcional: evita generar un _id para cada historial si no lo necesitás
    timestamps: false, // Usamos solo "date"
  }
);
