import { Schema, model } from "mongoose";
import { routineSchema } from "./Routine.js";
import { Types } from "mongoose";
import { z } from "zod";

const objectIdSchema = z.union([
  z.string().regex(/^[0-9a-fA-F]{24}$/),
  z.instanceof(Types.ObjectId),
]);
// 1. Definición del Schema de Zod para User
const UserZodSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  routines: z
    .array(
      z.object({
        name: z.string().min(2).max(100),
        description: z.string().optional(),
        exercises: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            sets: z.array(
              z.object({
                reps: z.number(),
                weight: z.number(),
              })
            ),
            _id: objectIdSchema.optional(),
          })
        ),
        history: z
          .array(
            z.object({
              date: z.date(),
              exercises: z.array(
                z.object({
                  name: z.string(),
                  description: z.string().optional(),
                  sets: z.array(
                    z.object({
                      reps: z.number(),
                      weight: z.number(),
                    })
                  ),
                })
              ),
            })
          )
          .optional(),
        _id: objectIdSchema.optional(),
      })
    )
    .optional(),
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  routines: [routineSchema],
  refreshToken: { type: String },
});

UserSchema.pre("save", async function (next) {
  try {
    await UserZodSchema.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(
      new Error(
        `Error de validación: ${error.errors
          .map((err) => err.message)
          .join(", ")}`
      )
    );
  }
});

const User = model("User", UserSchema);
export { UserZodSchema, User };
