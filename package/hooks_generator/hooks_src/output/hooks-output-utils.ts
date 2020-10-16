/* eslint-disable */
// import React, { useState } from 'react';
//import { hooksLedger as ledger } from '../utils/hooks-ledger';
// import { renderHook } from '@testing-library/react-hooks'
/* eslint-enable */
// import { Store } from 'redux';
// import { EnhancedStore, StateInspectorContext } from '../utils/hooks-store';

//transaction = how many times setState cb has fired

//Testing logic for user's state
//testing for edge cases in the user's app

/* ----- HELPER FUNCTIONS ----- */

/* ----- SETUP FUNCTIONS ----- */
/*
// set up functions to import user's useState and variables related to it: state variable (array), setState callback function & use regex to return outcomes
*/

//import hooks state from user's app
export function importHooksInitialState(stateArray: any) {
  return stateArray.reduce((fullStr: any, hooksState: any) => `${fullStr}\t${hooksState},\n`, '');
}

/*
//import hooks callback from user's app
export function importHooksCallback(setStateCb: any[]) {
  return setStateCb.reduce((fullStr: any, cb: any) => `${fullStr}\t${cb},\n`, '');
}

//DO WE NEED THIS??
//import state after initial invokation of setState callback
// export function importHooksUpdatedState(currStateArray) {
//   return currStateArray.reduce(
//     (fullStr, currState) =>
//       `${fullStr}\tconst [${currState}Value, cb${currState}] = useState(${currState});\n`,
//     '',
//   );
// }

//writeableHook = cb of useState
//readableHook = state of useState

//import writeable hook from user's app; MIGHT NOT NEED
export function writeableHook() {
  // will be function
}

//import readable hook from user's app; MIGHT NOT NEED
export function readableHook() {
  // will be function
}

/* ----- INITIAL RENDER ----- */
// PROB SHOULD TRACK INITIAL RENDER AND THAT IT EXISTS
// initialize hooks state

/* ----- SETSTATE CB TEST ----- */
/*
Recreate hooks version of testSetters in output-utils.ts 
    //test for variable user passes into setState of useState and make sure state is updating 

*/

// exmaple function to update previousValue

// export const storeInitialState = store.getState()[reducerId];

/*
export function testHooksSetState(useStateCallbackArray: any[]) {
  return useStateCallbackArray.reduce((callbackTests: any, ledgerSetStateCallback: any) => {
    //CREATE TEST HERE

    //if initial state exists
    if (ledgerInitialState) {
      const { params } = ledgerSetStateCallback;

      let scrubbedParams;
      //stringify params to make sure there are no special characters or empty spaces
      if (typeof params === 'string') {
        scrubbedParams = params.replace(/[^\w\s]/gi, '');
      }

      if (params !== undefined) {
        return `${callbackTests}\tit('${ledgerCurrState}__${
          scrubbedParams !== undefined ? scrubbedParams : JSON.stringify(params)
        } should properly update State', () => {
         \t\tconst { result } = renderHook(() => ledgerSetStateCallback()); 

        \t\tact(() => { 
          \t\t\tresult.current.state${ledgerCurrState}__${
          scrubbedParams !== undefined ? scrubbedParams : JSON.stringify(params)
        }(${JSON.stringify(ledgerSetStateCallback.newValue)});
          \t\t});`;
      }
    }
    return callbackTests;
  }, '');
}
//if exists, check whether setState cb exists
//if setState cb exists
//check whether there is a previous state value in transactions.state

//if initial state doesn't exist
//throw error message
//-----------------------------------------------
//if state has been set
// check whether another setState cb has been fired && transactions[state] exists in ledger
//if fired, check whether state has changed

//if state has not been set
// check whether setState cb exists
//if setState cb exists
// check whether setState cb has been fired
// if fired
//check whether hook state in ledger has been updated
*/
