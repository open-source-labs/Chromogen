/* eslint-disable */
import type { RecoilState } from 'recoil';
import { atom } from 'recoil';
/* eslint-enable */

// Recording toggle
export const recordingState: RecoilState<boolean> = atom<boolean>({
  key: 'recordingState',
  default: true,
});
