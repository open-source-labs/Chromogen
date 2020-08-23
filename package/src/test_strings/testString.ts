/* eslint-disable */
import { Ledger } from '../types/types';
/* eslint-enable */

const output = ({
  atoms,
  selectors,
  setters,
  initialRender,
  snapshots,
  setTransactions,
}: Ledger): string =>
  `import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
${
  atoms.reduce((importStr, { key }) => `${importStr}\t${key},\n`, '')
  + selectors.reduce((importStr, key) => `${importStr}\t${key},\n`, '')
}
} from '<ADD STORE FILEPATH>';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  // atoms
${atoms.reduce(
  (str, { key }) => `${str}\tconst [${key}Value, set${key}] = useRecoilState(${key});\n`,
  '',
)}
  // writeable selectors
${setters.reduce(
  (str, key) => `${str}\tconst [${key}Value, set${key}] = useRecoilState(${key});\n`,
  '',
)}
  // read-only selectors
${selectors
  .filter((key) => !setters.includes(key))
  .reduce((str, key) => `${str}\tconst ${key}Value = useRecoilValue(${key});\n`, '')}
  return {
${
  atoms.reduce((value, { key }) => `${value}\t\t${key}Value,\n\t\tset${key},\n`, '')
  + setters.reduce((value, key) => `${value}\t\t${key}Value,\n\t\tset${key},\n`, '')
  + selectors
    .filter((key) => !setters.includes(key))
    .reduce((value, key) => `${value}\t\t${key}Value,\n`, '')
}\t};
};

describe('INITIAL RENDER', () => { 
  const { result } = renderRecoilHook(useStoreHook); 

${initialRender.reduce(
  (
    initialTests,
    { key, newValue },
  ) => `${initialTests}\tit('${key} should initialize correctly', () => {
\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(newValue)});
\t});\n\n`,
  '',
)}});

describe('SELECTORS', () => {
${snapshots.reduce((tests, { state, updates }) => {
  const updatedAtoms = state.filter(({ updated }) => updated);
  const atomLen = updatedAtoms.length;

  return atomLen !== 0 && updates.length !== 0
    ? `${tests}\tit('properly derive state when ${
        atomLen > 1
          ? updatedAtoms.reduce((list, { key }, i) => {
              const last = i === atomLen - 1;
              return `${list}${last ? 'and ' : ''}${key}${last ? 'update' : ', '}`;
            }, '')
          : `${updatedAtoms[0].key} updates`
      }', () => {
\t\tconst { result } = renderRecoilHook(useStoreHook);

\t\tact(() => {
${state.reduce(
  (initializers, { key, value }) =>
    `${initializers}\t\t\tresult.current.set${key}(${JSON.stringify(value)});\n\n`,
  '',
)}\t\t});

${updates.reduce(
  (assertions, { key, newValue }) =>
    `${assertions}\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(
      newValue,
    )});\n\n`,
  '',
)}\t});\n\n`
    : tests;
}, '')}});

describe('SETTERS', () => {
${setTransactions.reduce((setterTests, { state, setter }) => {
  const updatedAtoms = state.filter(({ updated }) => updated);

  return setter
    ? `${setterTests}\tit('${setter.key} should properly set state', () => {
\t\tconst { result } = renderRecoilHook(useStoreHook);

\t\tact(() => {
${state.reduce(
  (setterInitializers, { key, previous }) =>
    `${setterInitializers}\t\t\tresult.current.set${key}(${JSON.stringify(previous)});\n\n`,
  '',
)}\t\t});

\t\tact(() => { 
\t\t\tresult.current.set${setter.key}(${JSON.stringify(setter.newValue)});
\t\t});

${updatedAtoms.reduce(
  (setterAssertions, { key, value }) =>
    `${setterAssertions}\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(
      value,
    )});\n\n`,
  '',
)}\t});\n\n`
    : `${setterTests}`;
}, '')}});`;

export default output;
