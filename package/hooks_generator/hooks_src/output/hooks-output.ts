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
<<<<<<< HEAD
   ${importHooksInitialState(initialState) + importHooksCallback(setStateCallback)}
=======
   ${importHooksInitialState(initialState)}

>>>>>>> 9fb3ca7af14c2fcbbb15fc968860d3e77ea80a65
} from '<ADD COMPONENT STORE FILEPATH>';
// Suppress 'Batcher' warnings from React conflict
console.error = jest.fn();
describe('Initial Render', () => {
    const { result } = renderHook(() => storeSetStateCallback());
});
// describe('USESTATE', () => {});
describe('USESTATE CALLBACKS', () => {
});`;
