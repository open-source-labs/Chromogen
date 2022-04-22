/* useState functionality
1. User uses our useState hook in their applciation, passing in initial state and an id
2. We keep track of all changes to state in our Redux store
3. ChromogenObserver then takes data from store to be exported to our output generator files
4. Output creates file for user
*/

/*USESTATE WITH STORE*/

import { useHookedReducer } from './hooks-core-utils';
import { useMemo, useContext, useState as useReactState } from 'react';
import { EnhancedStore, ObserverContext } from '../utils/hooks-store';

type StateAction<S> = S | ((s: S) => S);

function stateReducer<S>(state: S, action: StateAction<S>): S {
  return typeof action === 'function' ? (action as (s: S) => S)(state) : action;
}

export const useState = <S>(initialState: S | (() => S), id: string | number) => {
  const inspectorStore = useContext(ObserverContext);
  // Keeping the first values
  const [store, reducerId] = useMemo<[EnhancedStore | undefined, string | number]>(
    () => [inspectorStore, id],
    [],
  );

  if (!store || !reducerId) {
    return useReactState<S>(initialState);
  }

  const finalInitialState = useMemo<S>(
    () => (typeof initialState === 'function' ? (initialState as () => S)() : initialState),
    [],
  );

  return useHookedReducer<S, any>(
    stateReducer,
    finalInitialState,
    //created in utils/store.ts
    store,
    //key in store
    reducerId,
  );
};


// console.log(useState())