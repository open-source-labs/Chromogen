import { Reducer, useMemo, Dispatch, useState, useEffect } from 'react';
import { hooksLedger } from '../utils/hooks-ledger';
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
  // Creating state property in store to save all state changes
  store.subscribe(() => { 
    hooksLedger.state = store.getState()[reducerId];
    // console.log('HOOKSLEDGER AT FIRST STORE.SUBSCRIBE IN HOOKS-CORE-UTILS.TS', hooksLedger)
  })
  // store.subscribe(() => console.log('in hooks-core-utils.ts, store.getState()', store.getState()));

  const dispatch = useMemo<Dispatch<A>>(() => {
    const dispatch = (action: any) => {
      if (action && typeof action === 'object' && typeof action.type === 'string') {
        store.dispatch({
          type: `${reducerId}/${action.type}`,
          payload: action,
        });
      } else {
        store.subscribe(() => {
          // console.log('HOOKSLEDGER before GETSTATE', hooksLedger)
          hooksLedger.state = store.getState()[reducerId];
          console.log('HOOKSLEDGER after GETSTATE', hooksLedger)
          hooksLedger.id = reducerId;
          hooksLedger.initialState = hooksLedger.state[0];
        });
        
        store.subscribe(() => {
          hooksLedger.currState = hooksLedger.state[hooksLedger.state.length-1];
        });

        store.subscribe(() => {
          hooksLedger.dispCount = hooksLedger.dispCount + 1;
          // console.log('HOOKSLEDGER.DISPCOUNT', hooksLedger.dispCount)
        });

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

  // Returns a tuple
  return [localState, dispatch];
}
