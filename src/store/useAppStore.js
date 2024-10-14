import { create } from "zustand";

const useAppStore = create((set) => ({
  isComplete: false,
  setIsComplete: (value) => set({ isComplete: value }),

  isPlayingAudio: false,
  toggleAudio: () =>
    set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),
}));

export default useAppStore;
