import create from 'zustand';

export const useStore = create((set) => ({
  recording: true,
  toggleRecording: () => set(state => ({ recording: !state.recording }))
}));