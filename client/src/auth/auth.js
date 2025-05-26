import { create } from "zustand";

const useAuth = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
}));

export default useAuth;
