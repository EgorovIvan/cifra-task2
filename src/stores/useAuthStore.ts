import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
    authToken: string | null;
    setAuthToken: (token?: string) => void;
    clearAuthToken: () => void;
}

export const useAuthStore = create<AuthState, [], [["zustand/persist", unknown]]>(
    persist((set) => ({
        authToken: null,
        setAuthToken: (token?: string) => {
            set({authToken: token});
        },
        clearAuthToken: () => {
            set({authToken: null});
        },
        }),
        {
            name: 'authToken',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
