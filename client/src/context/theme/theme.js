import { create } from "zustand";

const useTheme = create((set) => ({
  mode: "dark",
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    })),
}));

export default useTheme;
