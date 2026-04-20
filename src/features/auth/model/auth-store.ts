import { create } from "zustand";
import type { User } from "@/entities/user";
import { setClientAuthToken } from "@/shared/api/auth-token";

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    setClientAuthToken(token);
    set({ token });
  },
  clearAuth: () => {
    setClientAuthToken(null);
    set({ user: null, token: null });
  },
}));
