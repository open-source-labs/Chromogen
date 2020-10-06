/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Ledger } from '../types';
/* eslint-enable */

// Import & add type for ledger later on?

// Ledger will contain state(current, prev), when setState is invoked = count > 0

export const hooksLedger: any {
  transactions: {
    initialState: [],
    prevState: [], 
    currState: '',
    useStateCallback: [], 
    count: 0,
    
   }
};
