// similar function logic as wrapSetter (recoil)
// If transactions length === 0, use closure to reset boolean
// If we are recording state, and our transactions length > 0, create flag for promise check, debounce, setTimeout to pass in new state value (curr state), return setState function with the user passed in values
// 
//returnedPromise, settimeout, return closure function: promise check and debounce, return setState function with the user passed in values

import { debounce } from '../utils/hooks-utils';
import { ledger } from '../utils/hooks-ledger';
import { recordingState } from '../utils/hooks-store';


const { state,transactions } = ledger

const DEBOUNCE_MS = 250;

// Set timeout for selector get calls
export const debouncedAddToTransactions = debounce(
  (update) => transactions.push({ update }),
  DEBOUNCE_MS,
);

export const updateTracker = (update) => {
//instantiate a boolean for our promise check to be false
//check promise and return update in closure
  return (newUpdate) => {

    if (recordingState) {
        debouncedAddToTransactions(newUpdate);
      }
    transactions.push(newUpdate);
    return newUpdate
  }
}




