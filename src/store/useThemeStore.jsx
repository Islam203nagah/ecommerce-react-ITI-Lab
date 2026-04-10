import { create } from 'zustand';
export const useThemeStore = create(set => ({
    theme: 'light',

    toggleTheme: () =>
        set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export const useAuthStore = create(set => ({
    token: null,
    login: token => set({ token }),

    logout: () => set({ token: null }),
}));
