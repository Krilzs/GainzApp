import { UserZodSchema } from "../database/schemas/User.js";

export class UserValidate {
  static async validateData(newData) {
    try {
      const validatedData = await UserZodSchema.parseAsync(newData);
      return validatedData;
    } catch (error) {
      console.log("Error de validación:", error.errors);
      return null;
    }
  }

  static async Password(password) {
    const passform = UserZodSchema.shape.password;
    try {
      return passform.parse(password);
    } catch (error) {
      return null;
    }
  }

  static async Email(email) {
    const emailform = UserZodSchema.shape.email;
    try {
      return emailform.parse(email);
    } catch (error) {
      return null;
    }
  }
}
