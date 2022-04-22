import { useRef } from 'react';
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
 //wrapped store.subscribe method inside useEffect to avoid listening to change exponentially
 useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    hooksLedger.state = store.getState()[reducerId]
    //console.log('hooks', hooksLedger.state)
  })
  return unsubscribe;
 }, [])
 
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
          hooksLedger.initialState = hooksLedger.state[0];

          hooksLedger.currState = hooksLedger.state[hooksLedger.state.length-1]
          //bug: dispCount is incremented each time store.subscribe is called
          hooksLedger.dispCount = hooksLedger.dispCount + 1
          //console.log('hooksLedger.state', hooksLedger.state)
          console.log('dispatch count', hooksLedger.dispCount)
        });
       
        store.dispatch({
          type: reducerId,
          payload: action,
        });

    }
  }
   return dispatch;
  }, [hooksLedger.dispCount]);

  // useEffect(() => {

  //   store.subscribe(() => {
  //     hooksLedger.state = store.getState()[reducerId];;
  //     hooksLedger.id = reducerId;
  //     hooksLedger.initialState = hooksLedger.state[0];

  //     hooksLedger.currState = hooksLedger.state[hooksLedger.state.length-1]
  //     //bug: dispCount is incremented each time store.subscribe is called
  //     hooksLedger.dispCount = hooksLedger.dispCount + 1
  //     //console.log('hooksLedger.state', hooksLedger.state)
  //     console.log('dispatch count', hooksLedger.dispCount)
  //   });
  // }, [hooksLedger.dispCount])



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
