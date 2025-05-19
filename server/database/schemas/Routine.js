import { ExerciseSchema } from "./Exercise.js";
import { Schema, model } from "mongoose";
export const routineSchema = new Schema({
  name: { type: String, required: true },
  exercises: {
    type: [ExerciseSchema],
    validate: {
      validator: function (v) {
        return v.length <= 10; // Define el número máximo aquí (ej: 10)
      },
      message: (props) =>
        `El array de ejercicios no puede tener más de 10 elementos (tiene {VALUE}).`,
    },
  },
});

export default model("Routine", routineSchema);
