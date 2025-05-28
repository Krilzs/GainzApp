import { create } from "zustand";

const useAuth = create((set) => ({
  isLoggedIn: null,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
}));

export default useAuth;
