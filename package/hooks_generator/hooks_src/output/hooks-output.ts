/* eslint-disable */
import React, { useState } from 'react';
// import ledger from types
// import types
/* eslint-enable */

//transaction = how many times setState cb has fired

//Testing logic for user's state
//testing for edge cases in the user's app

/* ----- HELPER FUNCTIONS ----- */

/* ----- SETUP FUNCTIONS ----- */
/*
// Create setup functions like importRecoilState,importRecoilFamily, etc for hooks 

// set up functions to import user's useState and variables related to it: state variable (array), setState callback function 
    // use regex to return outcomes
*/

//import hooks state from user's app
export function importHooksState() {
  //will be an array
}

//import hooks callback from user's app
export function importHooksCallback() {
  //will be function
}

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

/* ----- SELECTORS TEST ----- */
/*
Recreate hooks version of testSetters in output-utils.ts 
    //test for variable user passes into setState of useState and make sure state is updating 

*/

export function testHooksSetState() {
  const updatedState;

  let scrubbedParams;
  //stringify params to make sure there are no special characters or empty spaces

  //CREATE TEST HERE

  //test whether state is set or not set;

  //if state has been set
  // check whether another setState cb has been fired && previousState.length !== 0 in ledger
  //if fired, check whether state has changed

  //if state has not been set
  // check whether setState cb exists
  //if setState cb exists
  // check whether setState cb has been fired
  // if fired
  //check whether hook state in ledger has been updated
}

export function testSetters(setTransactionArray: SetTransaction[]): string {
  return setTransactionArray.reduce((setterTests, { state, setter }) => {
    const updatedAtoms = state.filter(({ updated }) => updated);
    if (setter) {
      const { params } = setter;

      let scrubbedParams;
      if (typeof params === 'string') {
        scrubbedParams = params.replace(/[^\w\s]/gi, '');
      }

      return params !== undefined
        ? `${setterTests}\tit('${setter.key}__${
            scrubbedParams !== undefined ? scrubbedParams : JSON.stringify(params)
          } should properly set state', () => {
          \t\tconst { result } = renderRecoilHook(useStoreHook);
          
          \t\tact(() => {
          ${initializeAtoms(state, false)}\t\t});
          
          \t\tact(() => { 
          \t\t\tresult.current.set${setter.key}__${
            scrubbedParams !== undefined ? scrubbedParams : JSON.stringify(params)
          }(${JSON.stringify(setter.newValue)});
          \t\t});
          
          ${assertState(updatedAtoms)}\t});\n\n`
        : `${setterTests}\tit('${setter.key} should properly set state', () => {
            \t\tconst { result } = renderRecoilHook(useStoreHook);
            
            \t\tact(() => {
            ${initializeAtoms(state, false)}\t\t});
            
            \t\tact(() => { 
            \t\t\tresult.current.set${setter.key}(${JSON.stringify(setter.newValue)});
            \t\t});
            
            ${assertState(updatedAtoms)}\t});\n\n`;
    } else return setterTests;
  }, '');
}
