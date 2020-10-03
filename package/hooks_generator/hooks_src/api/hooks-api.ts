
/* eslint-disable */
//import useState and useReducer from React
//export useState and useReducer as chromogen components

/* useState

1. import useState from react
2. if transactions = 0 (or similar logic), push first parameter of useState into state ledger(current), transactions > 0, run function
3. Track setState (second parameter of useState) function body

*/
//Used to grab useState from the React APi
import React, { useState as reactUseState }  from 'react';

//A function that takes in useState params and pushes them to our ledger, then returns 
import { updateTracker } from './hooks-core-utils';

//A parameter to test our useState hook
import { dummyParam } from '../utils/hooks-utils';

//We need ledger to store information the developer passes into useState and setState
import { ledger } from '../utils/hooks-ledger';


//function that user imports
export function useState(initialState){
  //bring in the state property from our ledger, which is of type array
  const { state } = ledger;

  //push our the users intial state into our ledger
  state.push(initialState)

  //return out a tuple which holds state as the first element and function to update state as the second element
  return [initialState, updateTracker]
 



}


