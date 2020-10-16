/* eslint-disable */
import { Ledger } from '../utils/hooks-ledger';
import { importHooksInitialState } from './hooks-output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */

/* ----- MAIN ----- */

//writeableHook = cb of useState
//readableHook = state of useState

export const hooksOutput = ({
  initialState,
}: //currState,
//   count,
Ledger): any =>
  `import { renderHook } from '@testing-library/react-hooks';
   import React, { useState } from 'react';
   import { 
   ${importHooksInitialState(initialState)}

} from '<ADD COMPONENT STORE FILEPATH>';

// Suppress 'Batcher' warnings from React conflict
console.error = jest.fn();



describe('Initial Render', () => {
    const { result } = renderHook(() => storeSetStateCallback());
});

// describe('USESTATE', () => {});

describe('USESTATE CALLBACKS', () => {
});`;
