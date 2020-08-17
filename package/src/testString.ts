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
    writeables.reduce((importStr, { key }) => `${importStr}${key},\n`, '') +
    readables.reduce((importStr, { key }) => `${importStr}${key},\n`, '')
  }
} from '<ADD STORE FILEPATH>';

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  ${writeables.reduce(
    (str, { key }) => `${str}const [${key}Value, set${key}] = useRecoilState(${key});\n`,
    '',
  )}
  ${readables.reduce((str, { key }) => `${str}const ${key}Value = useRecoilValue(${key});\n`, '')}
  return {
    ${
      writeables.reduce((value, { key }) => `${value}${key}Value,\nset${key},\n`, '') +
      readables.reduce((value, { key }) => `${value}${key}Value,\n`, '')
    } 
  };
};

describe('INITIAL RENDER', () => { 
  const { result } = renderRecoilHook(useStoreHook); 

  ${initialRender.reduce(
    (
      initialTests,
      { key, newValue },
    ) => `${initialTests}it('${key} should initialize correctly', () => {
      expect(result.current.${key}Value).toStrictEqual(${JSON.stringify(newValue)});
    });\n\n`,
    '',
  )}
});

describe('SELECTORS', () => {
  ${snapshots.reduce((tests, { state, selectors }) => {
    const updated = state.filter(({ updated }) => updated);
    const len = updated.length;
    return len && selectors.length
      ? `${tests}it('${selectors
          .slice(0, -1)
          .reduce(
            (list, { key }, i) => `${list}${key}${i === selectors.length - 2 ? ' ' : ', '}`,
            '',
          )}${
          selectors.length === 1
            ? `${selectors[selectors.length - 1].key}`
            : `and ${selectors[selectors.length - 1].key}`
        } should properly derive state when${updated
          .slice(0, -1)
          .reduce((list, { key }, i) => `${list} ${key}${i === len - 2 ? '' : ','}`, '')} ${
          len === 1 ? `${updated[len - 1].key} updates` : `and ${updated[len - 1].key} update`
        }', () => {
      const { result } = renderRecoilHook(useStoreHook);
  
      act(() => {
        ${state.reduce(
          (initializers, { key, value }) =>
            `${initializers}result.current.set${key}(${JSON.stringify(value)});\n\n`,
          '',
        )}
      });
  
      ${selectors.reduce(
        (assertions, { key, newValue }) =>
          `${assertions}expect(result.current.${key}Value).toStrictEqual(${JSON.stringify(
            newValue,
          )});\n\n`,
        '',
      )}
    });\n\n`
      : tests;
  }, '')}
})`;

export default output;
