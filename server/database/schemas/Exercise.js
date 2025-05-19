import { Schema, model } from "mongoose";

export const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  lastWeight: {
    type: Number,
  },
});

export default model("Exercise", ExerciseSchema);
