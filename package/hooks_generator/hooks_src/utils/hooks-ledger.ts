import { Ledger } from '../hooks-types';

// Storing initialState, currState, and prevState but through the store
export const hooksLedger: Ledger = {
  state: [],
  id: '',
  initialState: '',
  currState: '',
  dispCount: 0,
};