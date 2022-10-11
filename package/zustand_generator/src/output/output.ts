/* eslint-disable */
import type { Ledger } from '../types';
import { importZustandStore, testInitialState, testStateChangesAct } from './output-utils';
/* eslint-enable */

/* ----- MAIN ----- */
/* Output takes in initialRender and transactions from the ledger and tests them from the functions in output-utils*/
export const output = ({ initialRender, transactions }: Ledger): string =>
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
});`;
