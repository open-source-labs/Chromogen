

import { debounce } from '../utils/hooks-utils';
import { hooksLedger } from '../utils/hooks-ledger';
import { recordingState } from '../utils/hooks-store';


const { state } = hooksLedger
//We set the length of our debounce in ms
const DEBOUNCE_MS = 250;

// Set timeout for recording new state and pushing into our state property on the hooksLedger
export const debouncedAddToTransactions = debounce(
  (update) => state.push( update ),
  DEBOUNCE_MS,
);

//We are simulating basicStateReducer from React with trackStateReducer
export const trackStateReducer = (state,action) => {
  //We push the new state to our ledger, then return it to useReducer in hooks-api
  const dispatch = typeof action === 'function' ? action(state) : action;
  //call debounce function
  debouncedAddToTransactions(dispatch)
  //We are done tracking, Chromogen passes dispatch to React
  return dispatch
}




