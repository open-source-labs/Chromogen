import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListSortState,
  sortedTodoListState,
  todoListSortedStats,
  todoListStatsState,
  refreshFilterState,
} from '../src/store/store';

// using react testing library alone might make more sense
// test('filteredTodoListState should correctly derive state', () => {
//   // first arg needs to be custom hook
//   const { result } = renderRecoilHook(() => filteredTodoListState, {
//     states: [
//       {
//         recoilState: todoListFilterState,
//         initialValue: 'Show Completed',
//       },
//       {
//         recoilState: todoListState,
//         initialValue: [
//           {
//             id: 0,
//             test: 'make hamburgers',
//             priority: 'high',
//             isComplete: true,
//           },
//         ],
//       },
//     ],
//   });
//   expect(result.current).toBe(0);
// });

/* Hook to return atom/selector values and/or modifiers 
for react-recoil-hooks-testing-library */

/* Setup requires:
  1. *name or key* of every atom and selector, and whether each is read + write or readonly
  2. labels for value + setter functions – these are user-defined within a component 
       *** we can either grab those from the app (how?) OR
       assume them on the basis of convention (e.g. we infer [todoList, setTodoList] from 'todoListState' )
*/
const useStoreHook = () => {
  // atoms - read + write
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoListFilter, setTodoListFilter] = useRecoilState(todoListFilterState);
  const [todoListSort, setTodoListSort] = useRecoilState(todoListSortState);
  // selectors - read only
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const sortedTodoList = useRecoilValue(sortedTodoListState);
  const todoListSortStats = useRecoilValue(todoListSortedStats);
  const todoListStats = useRecoilValue(todoListStatsState);
  // selector - read + write
  const [refreshFilter, setRefreshFilter] = useRecoilState(refreshFilterState);

  return {
    todoList,
    setTodoList,
    todoListFilter,
    setTodoListFilter,
    todoListSort,
    setTodoListSort,
    filteredTodoList,
    sortedTodoList,
    todoListSortStats,
    todoListStats,
    refreshFilter,
    setRefreshFilter,
  };
};

/* Initial state tests require:  
  1. name/key of atom (used in string passed as first arg to 'test()')
  2. label for read state value (prop on result.current, passed as arg to expect())
  3. *captured* inital state value (arg passed to toStrictEqual())  
*/
test('todoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.todoList).toStrictEqual([]);
});

test('filteredToDoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.filteredTodoList).toStrictEqual([]);
});

/* Atom update tests require:  
  1. name/key of atom (used in string passed as first arg to 'test()')
  2. label for read state value(prop on result.current, passed as arg to expect() AND spread into setter fn)
  3. label for state setter fn (used in act())
  4. argument with which setter fn can be invoked (we'd probably need to capture this w wrapper fn/method shadower)
*/
test('todoListState should update correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);

  act(() => {
    result.current.setTodoList([
      ...result.current.todoList,
      {
        id: 0,
        test: 'make hamburgers',
        priority: 'high',
        isComplete: true,
      },
    ]);
  });

  expect(result.current.todoList).toStrictEqual([
    // also need to spread out initial state here
    {
      id: 0,
      test: 'make hamburgers',
      priority: 'high',
      isComplete: true,
    },
  ]);
});

/* Selector tests flow:
    1. render the custom store hook
    2. for every get() atom or selector referenced by the selector being tested, 
        set that atom/selector state to the PRIOR state we captured via our wrapper fn/shadower methods
        *this may be the default value – 
        ... if it is, we don't need to call the setter on that piece of state
        ... but it can't hurt
    3. mock the state change that triggered the selector
         i.e. call setter function on the get() atom/selector

   requires:  
  1. name/key of selector (used in string passed as first arg to 'test()')
  2. names/keys of atoms and selectors returned by selector's get() method
  3. label for state setter fn for each get() atom/selector (used in act())
  ...
*/
test('filteredTodoState should update correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);

  act(() => {
    result.current.setTodoList([
      // sets state of atom returned by selector's get() with prior stata
      ...result.current.todoList,
      {
        id: 0,
        test: 'make hamburgers',
        priority: 'high',
        isComplete: true,
      },
    ]);
  });
  /* setting todoListFilterState to PRIOR value is unneccessary in this example bc it's value === default value */
  act(() => {
    result.current.setTodoListFilter('Show Uncompleted'); // mock the state change that triggered the selector
  });

  expect(result.current.filteredTodoList).toStrictEqual([]);

  act(() => {
    result.current.setTodoListFilter('Show Completed'); // sets state of atom returned by selector's get()
  });

  expect(result.current.filteredTodoList).toStrictEqual([
    {
      id: 0,
      test: 'make hamburgers',
      priority: 'high',
      isComplete: true,
    },
  ]);
});
