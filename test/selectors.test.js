import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListSortState,
  sortedTodoListState,
  todoListSortedStats,
  todoListStatsState,
} from '../src/store/store';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

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

const useStoreHook = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoListFilter, setTodoListFilter] = useRecoilState(
    todoListFilterState
  );
  const [todoListSort, setTodoListSort] = useRecoilState(todoListSortState);
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const sortedTodoList = useRecoilValue(sortedTodoListState);
  const todoListSortStats = useRecoilValue(todoListSortedStats);
  const todoListStats = useRecoilValue(todoListStatsState);

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
  };
};

/* ----------- Tests ----------- */

test('todoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.todoList).toStrictEqual([]);
});

test('filteredToDoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.filteredTodoList).toStrictEqual([]);
});

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
    {
      id: 0,
      test: 'make hamburgers',
      priority: 'high',
      isComplete: true,
    },
  ]);
});

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
