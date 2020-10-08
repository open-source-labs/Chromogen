/* eslint-disable */
//import useState and useReducer from React
//export useState and useReducer as chromogen components

/* useState

1. import useState from react
2. if transactions = 0 (or similar logic), push first parameter of useState into state ledger(current), transactions > 0, run function
3. Track setState (second parameter of useState) function body

*/
//Used to grab useState from the React APi
// import { useState as reactUseState }  from 'react';

//A function that takes in useState params and pushes them to our ledger, then returns 
//import { trackStateReducer } from './hooks-core-utils';

//A parameter to test our useState hook
//import { dummyParam } from '../utils/hooks-utils';

//We need ledger to store information the developer passes into useState and setState
import { hooksLedger } from '../utils/hooks-ledger';


//function that user imports
// export function useState<S>(initialState: (() => S) | S,):[S,Dispatch<BasicStateAction<S>>]{
//   //bring in the state property from our ledger, which is of type array
//   const { state } = hooksLedger;

//   //push our the users intial state into our ledger
//  state.push(initialState)

//   //return out a useReducer function
//   // from react and pass in our trackStateReducer
//   return useReducer(trackStateReducer,(initialState))
 



// }

// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

export function useState<S>(initState: S | (() => S)) {
  //bring in the state property from our ledger, which is of type array
  const { initialState, currState, setStateCallback } = hooksLedger;

  // const [state, setState] = reactUseState(initState)

  //push our the users intial state into our ledger
  initialState.push(initState)
  // currState.push(state)
  // setStateCallback.push(setState)

  // Actual React useState function

//HooksChromogenObserver needs to update ledger before return
setTimeout (() => {
  console.log('wait for updated ledger');
  
  // Return currState, callback SHOULD BE LAST
  return [currState, setStateCallback];
}, 1000)
  
 
return initialState;


}