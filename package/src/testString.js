const output = (writeables, readables, snapshots, initialRender) =>
  `import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  ${
    writeables.reduce((importStr, { key }) => `${importStr}${key},\n`, '')
    + readables.reduce((importStr, { key }) => `${importStr}${key},\n`, '')
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
      writeables.reduce((value, { key }) => `${value}${key}Value,\nset${key},\n`, '')
      + readables.reduce((value, { key }) => `${value}${key}Value,\n`, '')
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
  ${snapshots.reduce(
    (tests, { state, selectors }, index) =>
      selectors.length > 0
        ? `${tests}it('State-${index + 1}', () => {
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
        : tests,
    '',
  )}
})`;

export default output;

// PENDING TESTS

// /* * A little confused on this test - not sure if we are just testing our own setter fn?
//   Atom update tests require:
//   1. name/key of atom (used in string passed as first arg to 'test()')
//   2. label for read state value(prop on result.current, passed as arg to expect() AND spread into setter fn)
//   3. label for state setter fn (used in act())
//   4. argument with which setter fn can be invoked (we'd probably need to capture this w wrapper fn/method shadower)
//   5. ? ^ *captured* prior state of atom to be updated
// */
// test('todoListState should update correctly', () => { //
//   const { result } = renderRecoilHook(useStoreHook);

//   act(() => {
//     result.current.setTodoList([
//       ...result.current.todoList, // should this be prior state?
//       {
//         id: 0,
//         test: 'make hamburgers',
//         priority: 'high',
//         isComplete: true,
//       },
//     ]);
//   });

//   expect(result.current.todoList).toStrictEqual([
//     // also need to spread out prior state here ?
//     {
//       id: 0,
//       test: 'make hamburgers',
//       priority: 'high',
//       isComplete: true,
//     },
//   ]);
// });

// /* Selector (readable only) tests *flow*:
//     1. render the custom store hook
//     2. for every get() atom or selector referenced,
//         set that atom/selector state to the PRIOR state we captured via our wrapper fn/shadower methods
//         *if this === default value:
//         ... we don't need to call the setter on that piece of state
//         ... but it can't hurt
//     3. mock the state change that triggered the selector
//          i.e. call setter function on the get() atom/selector
//     4. expect the updated mock selector value to equal the one we captured via our wrapper fn/shadower methods

//    *requires*:
//   1. name/key of selector being tested (used in string passed as first arg to 'test()')
//   2. names/keys of atoms and selectors returned by selector's get() method
//   3. label of setter fn for each get() atom/selector (used in act())
//   4. prior value of each get() atom/selector (used to set prior state)
//   5. updated value of selector (arg passed to toStrictEqual())
// */

// test('filteredTodoState should update correctly', () => { // filteredTodoState gets todoListState and todoListFilterState (both atoms)
//   const { result } = renderRecoilHook(useStoreHook);

//   act(() => {
//     result.current.setTodoList([
//       // sets state of atom returned by selector's get() with prior state value
//       ...result.current.todoList,
//       {
//         id: 0,
//         test: 'make hamburgers',
//         priority: 'high',
//         isComplete: true,
//       },
//     ]);
//   });
//   // **setting todoListFilterState to PRIOR value is unneccessary in this example bc it's value === default value
//   act(() => {
//     result.current.setTodoListFilter('Show Uncompleted'); // mock the state change that triggered the selector
//   });

//   expect(result.current.filteredTodoList).toStrictEqual([]); // expect updated mock selector value to equal value we captured

//   act(() => {
//     result.current.setTodoListFilter('Show Completed'); // mock the state change that triggered the selector
//   });

//   expect(result.current.filteredTodoList).toStrictEqual([ // expect updated mock selector value to equal value we captured
//     {
//       id: 0,
//       test: 'make hamburgers',
//       priority: 'high',
//       isComplete: true,
//     },
//   ]);
// });
