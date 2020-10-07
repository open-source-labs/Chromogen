// /* eslint-disable */

// import { debounce } from '../utils/hooks-utils';
// import { hooksLedger } from '../utils/hooks-ledger';
// import { recordingState } from '../utils/hooks-store';
// import { BasicStateAction } from '../hooks-types';


// const { state } = hooksLedger
// //We set the length of our debounce in ms
// const DEBOUNCE_MS = 250;

// // Set timeout for recording new state and pushing into our state property on the hooksLedger
// export const debouncedAddToTransactions = debounce(
//   (update: any) => state.push( update ),
//   DEBOUNCE_MS,
// );

// //We are simulating basicStateReducer from React with trackStateReducer
// export function trackStateReducer<S>(state: S,action: BasicStateAction<S>): S {
//   //We push the new state to our ledger, then return it to useReducer in hooks-api
//   const dispatch: S = typeof action === 'function' ? action(state) : action;
//   //call debounce function
//   debouncedAddToTransactions(dispatch)
//   //We are done tracking, Chromogen passes dispatch to React
//   return dispatch
// }




