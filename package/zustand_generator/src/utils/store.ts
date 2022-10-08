import create from 'zustand';

interface RecordingState {
  recording: boolean;
  toggleRecording: () => void;
}

export const useStore = create<RecordingState>((set) => ({
  recording: true,
  toggleRecording: () => {
    set((state) => ({ recording: !state.recording }), false);
  },
}));
