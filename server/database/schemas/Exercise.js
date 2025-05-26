import { Schema, model } from "mongoose";

export const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: [
      {
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
      },
    ],
  },
  description: {
    type: String,
    required: true,
  },
});

export default model("Exercise", ExerciseSchema);
