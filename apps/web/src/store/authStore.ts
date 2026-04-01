import { create } from "zustand";
import { AuthResponse, User } from "../types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  restoreFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  setUser: (user) => {
    set({ user });
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  },
  setToken: (token) => {
    set({ token });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },
  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  restoreFromStorage: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        set({ token, user: JSON.parse(user) });
      }
    }
  },
}));
