import { Schema, model } from "mongoose";

export const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  sets: {
    type: [
      {
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
      },
    ],
  },
});

export default model("Exercise", ExerciseSchema);
