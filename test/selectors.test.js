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
/* Selector tests require:  
  1. name/key of selector (used in string passed as first arg to 'test()')
  ...
*/
test('filteredTodoState should update correctly', () => {
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

  act(() => {
    result.current.setTodoListFilter('Show Uncompleted');
  });

  expect(result.current.filteredTodoList).toStrictEqual([]);

  act(() => {
    result.current.setTodoListFilter('Show Completed');
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
