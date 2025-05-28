import { create } from "zustand";

/**
 * hook de zustand para manejar la sesion del usuario
 * @returns {object} objeto con el estado de autenticacion y el setter
 * @property {boolean | null} isLoggedIn - indica si el usuario esta autenticado (true), no autenticado (false) o sin verificar (null)
 * @property {function} setIsLoggedIn - funcion para actualizar el estado de autenticacion
 */
const useAuth = create((set) => ({
  isLoggedIn: null,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
}));

export default useAuth;
