import { Schema } from "mongoose";

export const HistoryExerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    sets: [
      {
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
      },
    ],
  },
  { _id: false }
);
