import { Schema } from "mongoose";
import { HistoryExerciseSchema } from "./HistoryExercise.js";

export const HistorialSchema = new Schema(
  {
    exercises: {
      type: [HistoryExerciseSchema],
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
