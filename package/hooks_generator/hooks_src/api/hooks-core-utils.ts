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
import { Reducer, useMemo, Dispatch, useState, useEffect } from 'react';
import { hooksLedger } from '../utils/hooks-ledger';
// import { hooksLedger } from '../utils/hooks-ledger';
import { EnhancedStore } from '../utils/hooks-store';

export function useHookedReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  store: EnhancedStore,
  reducerId: string | number,
): [S, Dispatch<A>] {
  const initialReducerState = useMemo(() => {
    const initialStateInStore = store.getState()[reducerId];
    return initialStateInStore === undefined ? initialState : initialStateInStore;
  }, []);

  const [localState, setState] = useState<S>(initialReducerState);
  //creating state property in store to save all state changes
  store.subscribe(() => (hooksLedger.state = store.getState()[reducerId]));
  store.subscribe(() => console.log(store.getState()));
  // //creating intialState propety in store array - 1st element
  // hooksLedger.initialState = store.subscribe(() => store.getState()[reducerId][0]);
  // //creating currState in store array - last element
  // hooksLedger.currState = store.subscribe(
  //   () => store.getState()[reducerId][hooksLedger.state.length - 1],
  // );

  const dispatch = useMemo<Dispatch<A>>(() => {
    const dispatch = (action: any) => {
      if (action && typeof action === 'object' && typeof action.type === 'string') {
        //creating state property in store to save all state changes
        // hooksLedger.state = store.subscribe(() => store.getState());
        //         store.subscribe(() => hooksLedger.state = store.getState());
        // store.subscribe(() => console.log(store.getState()))
        store.dispatch({
          type: `${reducerId}/${action.type}`,
          payload: action,
        });
      } else {
        //creating state property in store to save all state changes
        // hooksLedger.state = store.subscribe(() => store.getState());
        store.subscribe(() => hooksLedger.state = store.getState()[reducerId]);
        store.subscribe(() => hooksLedger.id = reducerId);
        store.subscribe(() => hooksLedger.initialState = hooksLedger.state[0]);
        store.subscribe(() => hooksLedger.currState = hooksLedger.state[length-1]);
        store.subscribe(() => hooksLedger.dispCount = hooksLedger.dispCount + 1);
        store.subscribe(() => console.log('ledger',hooksLedger));
        store.subscribe(() => console.log(store.getState()));
        store.subscribe(() => console.log(hooksLedger));
        // //creating intialState propety in store array - 1st element
        // hooksLedger.initialState = store.subscribe(() => store.getState()[reducerId][0]);
        // //creating currState in store array - last element
        // hooksLedger.currState = store.subscribe(
        //   () => store.getState()[reducerId][hooksLedger.state.length - 1],
        // );
        store.dispatch({
          type: reducerId,
          payload: action,
        });
      }
    };

    return dispatch;
  }, []);

  useEffect(() => {
    const teardown = store.registerHookedReducer(reducer, initialReducerState, reducerId);

    let lastReducerState = localState;
    const unsubscribe = store.subscribe(() => {
      const storeState: any = store.getState();
      const reducerState = storeState[reducerId];

      if (lastReducerState !== reducerState) {
        setState(reducerState);
      }

      lastReducerState = reducerState;
    });

    return () => {
      unsubscribe();
      teardown();
    };
  }, []);

  return [localState, dispatch];
}
