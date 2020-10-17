/* eslint-disable */
// import React, { useState, useEffect, useRef } from 'react';
// import { Ledger } from '../hooks-types';

/* eslint-enable */

export interface Ledger {
  state: any;
  initialState: any;
  currState: any;
}
//storing initialState, currState, and prevState but through the store
export const hooksLedger: Ledger = {
  state: [],
  initialState: '',
  currState: '',
};

// *******Logic for tracking previous state and whether setState cb has been invoked*******
// When user first imports Chromogen into their app: initialState, currState and setStateCallback will update AND intitalState === currState
//--------
// After setStateCallback is invoked: which means tracker[0] !== currState
// 1) Check if there is anything in prevState. If so, delete. 
// 2) Increase value of count by 1 
// 3) Push value of currState to prevState
// 4) Replace currState with newly evaluated result of currState at tracker[0]