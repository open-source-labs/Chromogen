import create from 'zustand';
import { devtools } from 'zustand/middleware'


export const useStore = create(devtools((set) => ({
  recording: true,
  toggleRecording: () => { set(state => ({ recording: !state.recording }), false, 'toggleRecording') }
})));