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
  `
import { renderHook, act } from '@testing-library/react';
${importZustandStore()}

describe('INITIAL RENDER', () => { 
  const { result } = renderHook(useStore); 
  
  ${testInitialState(initialRender)}
});`