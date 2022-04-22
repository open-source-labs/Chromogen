/* eslint-disable */
import { Ledger } from '../hooks-types';
import { importHooksId, testState, testStateChange } from './hooks-output-utils';
/* eslint-enable */

// NOTE: HooksOutput needs a beforeEach to bring down state (to instantiate state and create mock data for testing)
export const hooksOutput = ({
  state,
  id,
  dispCount
}: Ledger): any =>
  `import { renderHook } from '@testing-library/react-hooks';
   import React, { useState } from 'react';
   import { 
   ${importHooksId(id)}

} from '<ADD USESTATE HOOK FILEPATH >';

describe('USESTATE', () => {

  ${state}
  ${id}
  ${dispCount}
  
  it(${testState(state, id)});

  it(${testStateChange(state, id, dispCount)})
});`;
