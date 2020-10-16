/* eslint-disable */
<<<<<<< HEAD
//import React, { useState, useEffect, useRef } from 'react';
import { Ledger } from '../hooks-types';
=======
// import React, { useState, useEffect, useRef } from 'react';
// import { Ledger } from '../hooks-types';
>>>>>>> 9fb3ca7af14c2fcbbb15fc968860d3e77ea80a65

/* eslint-enable */

export interface Ledger {
  state: any;
  initialState: any;
  currState: any;
}
//storing initialState, currState, and prevState but through the store
export const hooksLedger: Ledger = {
<<<<<<< HEAD
  initialState: [], //0
  prevState: [], //0
  currState: [], // 1
  setStateCallback: [], 
  count: 0, //1
=======
  state: [],
  initialState: '',
  currState: '',
>>>>>>> 9fb3ca7af14c2fcbbb15fc968860d3e77ea80a65
};

// *******Logic for tracking previous state and whether setState cb has been invoked*******
// When user first imports Chromogen into their app: initialState, currState and setStateCallback will update AND intitalState === currState
//--------
// After setStateCallback is invoked: which means tracker[0] !== currState
// 1) Check if there is anything in prevState. If so, delete. 
// 2) Increase value of count by 1 
// 3) Push value of currState to prevState
// 4) Replace currState with newly evaluated result of currState at tracker[0]