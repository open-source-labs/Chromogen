/* eslint-disable */
import type { Ledger } from '../types';
import {
  importZustandStore,
  testInitialState
} from './output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */
export const setFilter = (selectors: string[], setters: string[]): string[] =>
  selectors.filter((key) => !setters.includes(key));

/* ----- MAIN ----- */
export const output = ({
  initialRender,
}: Ledger<string, any, any>): string =>
  `import { renderHook, act } from '@testing-library/react';
import 
${importZustandStore()}
 from '<ADD STORE FILEPATH>';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

describe('INITIAL RENDER', () => { 
  const { result } = renderHook(useStoreHook); 
  
  ${testInitialState(initialRender)}
});`