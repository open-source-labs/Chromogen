/* eslint-disable */
import { Writeables, Readables, SelectorsArr, Snapshots, Setters } from './types/types';
/* eslint-enable */

const output = (
  writeables: Writeables<any>,
  readables: Readables<any>,
  snapshots: Snapshots,
  initialRender: SelectorsArr,
  setters: Setters,
  settables: Array<string>,
): string =>
  `import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
${
  writeables.reduce((importStr, { key }) => `${importStr}\t${key},\n`, '')
  + readables.reduce((importStr, { key }) => `${importStr}\t${key},\n`, '')
}
} from '<ADD STORE FILEPATH>';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  // atoms
${writeables.reduce(
  (str, { key }) => `${str}\tconst [${key}Value, set${key}] = useRecoilState(${key});\n`,
  '',
)}
  // writeable selectors
${settables.reduce(
  (str, key) => `${str}\tconst [${key}Value, set${key}] = useRecoilState(${key});\n`,
  '',
)}
  // read-only selectors
${readables
  .filter(({ key }) => !settables.includes(key))
  .reduce((str, { key }) => `${str}\tconst ${key}Value = useRecoilValue(${key});\n`, '')}
  return {
${
  writeables.reduce((value, { key }) => `${value}\t\t${key}Value,\n\t\tset${key},\n`, '')
  + settables.reduce((value, key) => `${value}\t\t${key}Value,\n\t\tset${key},\n`, '')
  + readables
    .filter(({ key }) => !settables.includes(key))
    .reduce((value, { key }) => `${value}\t\t${key}Value,\n`, '')
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
${snapshots.reduce((tests, { state, selectors }) => {
  const updatedAtoms = state.filter(({ updated }) => updated);
  const atomLen = updatedAtoms.length;
  const selectorLen = selectors.length;

  return atomLen !== 0 && selectorLen !== 0
    ? `${tests}\tit('${
        selectorLen > 1
          ? selectors.reduce((list, { key }, i) => {
              const last = i === selectorLen - 1;
              return `${list}${last ? 'and ' : ''}${key}${last ? '' : ', '}`;
            }, '')
          : `${selectors[0].key}`
      } should properly derive state when${
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

${selectors.reduce(
  (assertions, { key, newValue }) =>
    `${assertions}\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(
      newValue,
    )});\n\n`,
  '',
)}\t});\n\n`
    : tests;
}, '')}});

describe('SETTERS', () => {
${setters.reduce((setterTests, { state, setter }) => {
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
