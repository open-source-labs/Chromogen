import create from 'zustand';

export const useStore = create((set) => ({
  recording: false,
  toggleRecording: () => set(state => { recording: !state.recording })
}));