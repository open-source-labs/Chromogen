/* eslint-disable */
import { Ledger } from '../utils/hooks-ledger';
import { importHooksInitialState, testState, testStateChange } from './hooks-output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */

/* ----- MAIN ----- */

//writeableHook = cb of useState
//readableHook = state of useState

export const hooksOutput = ({
  state,
  id,
  dispCount,
}: //currState,
//   count,
Ledger): any =>
  `import { renderHook } from '@testing-library/react-hooks';
   import React, { useState } from 'react';
   import { 
   ${importHooksInitialState(id)}

} from '<ADD USESTATE HOOK FILEPATH>';

describe('USESTATE', () => {
  it(${testState(state,id)});

  it(${testStateChange(state, id, dispCount)});
});`;
