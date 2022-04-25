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
    //console.log('reducerId', reducerId)
    const initialStateInStore = store.getState()[reducerId];
    return initialStateInStore === undefined ? initialState : initialStateInStore;
  }, []);

  //console.log('initialreducer state', initialReducerState)
  const [localState, setState] = useState<S>(initialReducerState);

//Creating state property in store to save all state changes
store.subscribe(() => {
  hooksLedger.state = store.getState()[reducerId]
  //console.log('hooks ledger after store is called on reducer id.', hooksLedger)
});


 //wrapped store.subscribe method inside useEffect to avoid listening to change exponentially
//  useEffect(() => {
//   const unsubscribe = store.subscribe(() => {
//     hooksLedger.state = store.getState()[reducerId]
//     console.log('hooks ledger after store is called on reducer id.', hooksLedger)
//   })
//   return unsubscribe;
//  }, [])
 


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
          //console.log('initialState', initialState)
          //hooksLedger.initialState = hooksLedger.currState;

          //hooksLedger.currState = hooksLedger.state[hooksLedger.state.length-1]
          //bug: dispCount is incremented each time store.subscribe is called
          //hooksLedger.dispCount = hooksLedger.dispCount + 1
          //console.log('dispatch count', hooksLedger.dispCount)
        });
       
        
        store.subscribe(() => {
          hooksLedger.currState = hooksLedger.state[hooksLedger.state.length-1];
         //console.log('type of initialstate', typeof hooksLedger.initialState)
        //  hooksLedger.initialState.push(hooksLedger.currState)
        //   console.log('initialState after push', hooksLedger.initialState)
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
  }
   return dispatch;
  }, []);



  
  useEffect(() => {
    const teardown = store.registerHookedReducer(reducer, initialReducerState, reducerId);
    let lastReducerState = localState;
    //console.log('local state ', localState)
    const unsubscribe = store.subscribe(() => {
      //console.log('lastReducerstate ', lastReducerState)
      const storeState: any = store.getState();
      //console.log('storeState', storeState)
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

    //console.log('local state', localState)
  // Returns a tuple
  return [localState, dispatch];

}
