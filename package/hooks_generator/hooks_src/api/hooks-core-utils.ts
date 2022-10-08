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

  //Creating state property in store to save all state changes
  store.subscribe(() => {
    hooksLedger.state = store.getState()[reducerId]
  });

  const dispatch = useMemo<Dispatch<A>>(() => {

    const dispatch = (action: any) => {
      if (action && typeof action === 'object' && typeof action.type === 'string') {
        store.dispatch({
          type: `${reducerId}/${action.type}`,
          payload: action,
        });
      } else {
        //Subscribe will be called any time an action is dispatched, and some part of the state tree may potentially have changed. 
        store.subscribe(() => {
          hooksLedger.state = store.getState()[reducerId];;
          hooksLedger.id = reducerId;
          hooksLedger.initialState = hooksLedger.state;

          /* had to rid of state[0] to allow download function 
          hooksLedger.initialState = hooksLedger.state[0];*/
        });


        store.subscribe(() => {
          hooksLedger.currState = hooksLedger.state;
        });

        store.subscribe(() => {
          hooksLedger.dispCount = hooksLedger.dispCount + 1;
        });

        store.dispatch({
          type: reducerId,
          payload: action,
        });

      }
    }
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
