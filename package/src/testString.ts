import { Writeables, Readables, SelectorsArr, Snapshots } from './types/types';

const output = (
  writeables: Writeables<any>,
  readables: Readables<any>,
  snapshots: Snapshots,
  initialRender: SelectorsArr,
): string =>
  `import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
${
  writeables.reduce((importStr, { key }) => `${importStr}\t${key},\n`, '') +
  readables.reduce((importStr, { key }) => `${importStr}\t${key},\n`, '')
}
} from '<ADD STORE FILEPATH>';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
${writeables.reduce(
  (str, { key }) => `${str}\tconst [${key}Value, set${key}] = useRecoilState(${key});\n`,
  '',
)}
${readables.reduce((str, { key }) => `${str}\tconst ${key}Value = useRecoilValue(${key});\n`, '')}
  return {
  ${
    writeables.reduce((value, { key }) => `${value}\t${key}Value,\n\tset${key},\n`, '') +
    readables.reduce((value, { key }) => `${value}\t${key}Value,\n`, '')
  }
  };
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
)}
});

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
  )}
\t\t});

${selectors.reduce(
  (assertions, { key, newValue }) =>
    `${assertions}\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(
      newValue,
    )});\n\n`,
  '',
)}
\t});\n\n`
    : tests;
}, '')}
})`;

export default output;
