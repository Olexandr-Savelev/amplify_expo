import { create } from "zustand";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

type AuthState = {
  user: IUser | null;
  setUser: (user: any | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
