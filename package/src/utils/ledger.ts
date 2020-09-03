/* eslint-disable */
import type { Ledger } from '../types';
import { RecoilState, SerializableParam } from 'recoil';
/* eslint-enable */

export const ledger: Ledger<RecoilState<any>, any, SerializableParam> = {
  atoms: [],
  selectors: [],
  atomFamilies: {},
  selectorFamilies: {},
  setters: [],
  initialRender: [],
  initialRenderFamilies: [],
  transactions: [],
  setTransactions: [],
};
