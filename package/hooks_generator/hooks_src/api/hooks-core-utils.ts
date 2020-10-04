

import { debounce } from '../utils/hooks-utils';
import { hooksLedger } from '../utils/hooks-ledger';
import { recordingState } from '../utils/hooks-store';


const { state,setTransactions } = hooksLedger

const DEBOUNCE_MS = 250;

// Set timeout for recording new state
export const debouncedAddToTransactions = debounce(
  (update) => transactions.push({ update }),
  DEBOUNCE_MS,
);

//We are simulating basicStateReducer from React with trackStateReducer
export const trackStateReducer = (state,action) => {
  //We push the new state to our ledger, then return it to useReducer in hooks-api
  const dispatch = typeof action === 'function' ? action(state) : action;
  //imported from ledger
  setTransactions.push
  //We are done tracking, Chromogen passes dispatch to React
  return dispatch
}




