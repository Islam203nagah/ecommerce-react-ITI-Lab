import { create } from 'zustand';
export const useTabName = create((set) => ({

    tabName: "dashboard",


    setTabName: (newTabName) => set({ tabName: newTabName }),

}));