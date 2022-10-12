import create from 'zustand';

interface RecordingState {
  recording: boolean;
  toggleRecording: () => void;
}

/*
Allows for recording to always be on during page load 
and the ability to pause recording
*/
export const useStore = create<RecordingState>((set) => ({
  recording: true,
  toggleRecording: () => {
    set((state) => ({ recording: !state.recording }), false);
  },
}));
