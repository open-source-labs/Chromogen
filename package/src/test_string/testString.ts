/* eslint-disable */
import { Ledger } from '../types/types';
import {
  importRecoilState,
  stateHook,
  valueHook,
  returnState,
  returnValue,
  testInitialize,
  testSelectors,
  testSetters,
} from './helpers'
/* eslint-enable */

/* ----- HELPERS ----- */
const setFilter = (selectors: string[], setters: string[]): string[] =>
  selectors.filter((key) => !setters.includes(key));

/* ------------------- */

export const output = ({
  atoms,
  selectors,
  setters,
  initialRender,
  transactions,
  setTransactions,
}: Ledger<string>): string =>
  `import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
${importRecoilState(atoms) + importRecoilState(selectors)}
} from '<ADD STORE FILEPATH>';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  // atoms
${stateHook(atoms)}
  // writeable selectors
${stateHook(setters)}
  // read-only selectors
${valueHook(setFilter(selectors, setters))}
  return {
${returnState(atoms) + returnState(setters) + returnValue(setFilter(selectors, setters))}\t};
};

describe('INITIAL RENDER', () => { 
  const { result } = renderRecoilHook(useStoreHook); 

${testInitialize(initialRender)}});

describe('SELECTORS', () => {
${testSelectors(transactions)}});

describe('SETTERS', () => {
${testSetters(setTransactions)}});`;
