


export const trackStateReducer = (state,action) => {
  //We push the new state to our ledger, then return it to useReducer in hooks-api
  const dispatch = typeof action === 'function' ? action(state) : action;
  //call debounce function
  debouncedAddToTransactions(dispatch)
  //We are done tracking, Chromogen passes dispatch to React
  return dispatch
}



