/* eslint-disable */
import type { Ledger } from '../types';
import { RecoilState, SerializableParam } from 'recoil';
/* eslint-enable */

export const ledger: Ledger<RecoilState<any>, any, SerializableParam> = {
  atoms: [],
  selectors: [], //get
  atomFamilies: {},
  selectorFamilies: {},
  setters: [], //set
  initialRender: [],
  initialRenderFamilies: [],
  transactions: [], //get
  setTransactions: [], //set
};
