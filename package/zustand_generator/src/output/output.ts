/* eslint-disable */
import type { Ledger } from '../types';
import {
  importZustandStore,
  testInitialState,
  testStateChangesAct
} from './output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */
export const setFilter = (selectors: string[], setters: string[]): string[] =>
  selectors.filter((key) => !setters.includes(key));

/* ----- MAIN ----- */
export const output = ({
  initialRender,
  transactions
}: Ledger): string =>
  `
import { renderHook, act } from '@testing-library/react';
${importZustandStore()}

describe('INITIAL RENDER', () => { 
  const { result } = renderHook(useStore); 
  
  ${testInitialState(initialRender)}
});


describe('STATE CHANGES', () => { 
  const { result } = renderHook(useStore);
 
  ${testStateChangesAct(transactions)}
});`