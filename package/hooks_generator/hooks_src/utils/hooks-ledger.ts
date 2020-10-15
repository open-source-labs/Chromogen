/* eslint-disable */
//import React, { useState, useEffect, useRef } from 'react';
import { Ledger } from '../hooks-types';

/* eslint-enable */

// Import & add type for ledger later on?

// Ledger will contain state(current, prev), when setState is invoked = count > 0

export const hooksLedger: Ledger = {
  initialState: [], //0
  prevState: [], //0
  currState: [], // 1
  setStateCallback: [], 
  count: 0, //1
};

// *******Logic for tracking previous state and whether setState cb has been invoked*******
// When user first imports Chromogen into their app: initialState, currState and setStateCallback will update AND intitalState === currState
//--------
// After setStateCallback is invoked: which means tracker[0] !== currState
// 1) Check if there is anything in prevState. If so, delete. 
// 2) Increase value of count by 1 
// 3) Push value of currState to prevState
// 4) Replace currState with newly evaluated result of currState at tracker[0]