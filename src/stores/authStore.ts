import { create } from 'zustand';

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  clearAuthToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: localStorage.getItem('authToken') || null,
  setAuthToken: (token: string) => {
    localStorage.setItem('authToken', token);
    set({ authToken: token });
  },
  clearAuthToken: () => {
    localStorage.removeItem('authToken');
    set({ authToken: null });
  },
}));