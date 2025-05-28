import { UserZodSchema } from "../database/schemas/User.js";

export class UserValidate {
  /**
   * valida los datos de un nuevo usuario usando zod
   * @async
   * @param {object} newdata - datos del nuevo usuario
   * @returns {promise<object|null>} datos validados o null si falla la validacion
   */
  static async validateData(newData) {
    try {
      const validatedData = await UserZodSchema.parseAsync(newData);
      return validatedData;
    } catch (error) {
      console.log("Error de validación:", error.errors);
      return null;
    }
  }

  /**
   * valida la contrase;a usando el schema de zod
   * @async
   * @param {string} password - contrase;a a validar
   * @returns {promise<string|null>} contrase;a validada o null si es invalida
   */
  static async Password(password) {
    const passform = UserZodSchema.shape.password;
    try {
      return passform.parse(password);
    } catch (error) {
      return null;
    }
  }

  /**
   * valida el email usando el schema de zod
   * @async
   * @param {string} email - email a validar
   * @returns {promise<string|null>} email validado o null si es invalido
   */
  static async Email(email) {
    const emailform = UserZodSchema.shape.email;
    try {
      return emailform.parse(email);
    } catch (error) {
      return null;
    }
  }
}
