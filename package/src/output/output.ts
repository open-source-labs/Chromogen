/* eslint-disable */
import type { Ledger } from '../types/types';
import type { SerializableParam } from 'recoil';
import {
  importRecoilState,
  writeableHook,
  readableHook,
  returnWriteable,
  returnReadable,
  testSelectors,
  testSetters,
  importRecoilFamily,
  atomFamilyHook,
  selectorFamilyHook,
  returnSelectorFamily,
  initializeSelectors,
  // initializeSelectorFamilies,
  returnAtomFamily,
} from './output-utils';

/* eslint-enable */

/* ----- HELPERS ----- */
export const setFilter = (selectors: string[], setters: string[]): string[] =>
  selectors.filter((key) => !setters.includes(key));

/* ----- MAIN ----- */
export const output = ({
  atoms,
  selectors,
  setters,
  atomFamilies,
  selectorFamilies,
  initialRender,
  // initialRenderFamilies,
  transactions,
  setTransactions,
}: Ledger<string, any, SerializableParam>): string =>
  `import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
${
  importRecoilState(atoms)
  + importRecoilState(selectors)
  + importRecoilFamily(atomFamilies)
  + importRecoilFamily(selectorFamilies)
}
} from '<ADD STORE FILEPATH>';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  // atoms
${writeableHook(atoms)}
  // writeable selectors
${writeableHook(setters)}
  // read-only selectors
${readableHook(setFilter(selectors, setters))}
  // atom families
${atomFamilyHook(transactions)}
  // writeable selector families
${selectorFamilyHook(selectorFamilies, true)}
  // read-only selector families
${selectorFamilyHook(selectorFamilies, false)}



  return {
${
  returnWriteable(atoms)
  + returnWriteable(setters)
  + returnReadable(setFilter(selectors, setters))
  + returnAtomFamily(transactions)
  + returnSelectorFamily(selectorFamilies, true)
  + returnSelectorFamily(selectorFamilies, false)
}\t};
};

describe('INITIAL RENDER', () => { 
  const { result } = renderRecoilHook(useStoreHook); 
  
${initializeSelectors(initialRender)}
});

describe('SELECTORS', () => {
${testSelectors(transactions)}});

describe('SETTERS', () => {
${testSetters(setTransactions)}});`;
