/* eslint-disable */
import type { Ledger } from '../hooks-types';
import {
  //   ledgerCurrState,
  //   ledgerSetStateCallback,
  //   ledgerInitialState,
  //   ledgerPrevState,
  importHooksInitialState,
  importHooksCallback,
  testHooksSetState,
} from './hooks-output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */

/* ----- MAIN ----- */

//writeableHook = cb of useState
//readableHook = state of useState

export const output = ({
  initialState,
  //   prevState,
  //   currState,
  setStateCallback,
}: //   count,
Ledger): any =>
  `import { renderHook } from '@testing-library/react-hooks';
   import React, { useState } from 'react';
   import { 
   ${importHooksInitialState(initialState) + importHooksCallback(setStateCallback)}

} from '<ADD COMPONENT STORE FILEPATH>';

// Suppress 'Batcher' warnings from React conflict
console.error = jest.fn();



describe('Initial Render', () => {
    const { result } = renderHook(() => ledgerSetStateCallback());
});

describe('USESTATE', () => {});

describe('USESTATE CALLBACKS', () => {
  ${testHooksSetState(setStateCallback)}
});`;
