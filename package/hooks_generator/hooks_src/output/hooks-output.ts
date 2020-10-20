/* eslint-disable */
import { Ledger } from '../utils/hooks-ledger';
import { importHooksInitialState, testStateChange } from './hooks-output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */

/* ----- MAIN ----- */

//writeableHook = cb of useState
//readableHook = state of useState

export const hooksOutput = ({
  state,
  id,
}: //currState,
//   count,
Ledger): any =>
  `import { renderHook } from '@testing-library/react-hooks';
   import React, { useState } from 'react';
   import { 
   ${importHooksInitialState(id)}

} from '<ADD COMPONENT STORE FILEPATH>';
// Suppress 'Batcher' warnings from React conflict
console.error = jest.fn();
describe('Initial Render', () => {
    const { result } = renderHook(() => storeSetStateCallback());
});
// describe('USESTATE', () => {
  ${testStateChange(state,id)}
});`;
