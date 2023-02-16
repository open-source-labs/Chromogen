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

export const unitOutput = (initialRender: any, action: any): string => {
  console.log('within unitOutput. init, action : ', initialRender, action);
  let retString = '';
  if (initialRender) {
    console.log('within unitOutput initialRender');
    retString += `
    import { renderHook, act } from '@testing-library/react';
    ${importZustandStore()}
    describe('INITIAL RENDER', () => {
      const { result } = renderHook(useStore);
      ${testInitialState(initialRender)}
    });
    `;
  } else if (action) {
    console.log('within unitOutput action');
    retString += `
    describe('STATE CHANGES', () => {
      const { result } = renderHook(useStore);
      ${testStateChangesAct([action])}
    });`;
  }
  return retString;
};

//NOTE: Test output is not linted/formatted in any meaningful way. The Chromogen team recommends formatting tests in line with your personal or organizational preferences;
