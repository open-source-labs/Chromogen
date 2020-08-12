import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
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

/* Hooks to return atom/selector values and/or modifiers 
for react-recoil-hooks-testing-library */

const getTodoListAtom = () => useRecoilState(todoListState);

const getTodoListFilterStateAtom = () => useRecoilState(todoListFilterState);

const getFilteredTodoListStateSelector = () =>
  useRecoilValue(filteredTodoListState);

const useFilteredTodoListState = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoListFilter, setTodoListFilter] = useRecoilState(
    todoListFilterState
  );
  const filteredTodoList = useRecoilValue(filteredTodoListState);

  return {
    todoList,
    setTodoList,
    todoListFilter,
    setTodoListFilter,
    filteredTodoList,
  };
};

/* ----------- Tests ----------- */

test('todoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(getTodoListAtom);
  expect(result.current[0]).toStrictEqual([]);
});

test('filteredToDoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(getFilteredTodoListStateSelector);
  expect(result.current).toStrictEqual([]);
});

test('todoListState should update correctly', () => {
  const { result } = renderRecoilHook(getTodoListAtom);
  let [todoList, setTodoList] = result.current;

  act(() => {
    setTodoList([
      ...todoList,
      {
        id: 0,
        test: 'make hamburgers',
        priority: 'high',
        isComplete: true,
      },
    ]);
  });
  [todoList, setTodoList] = result.current;

  expect(todoList).toStrictEqual([
    {
      id: 0,
      test: 'make hamburgers',
      priority: 'high',
      isComplete: true,
    },
  ]);
});

test('filteredTodoState should update correctly', () => {
  const todoListAtomResult = renderRecoilHook(getTodoListAtom).result;
  const [todoList, setTodoList] = todoListAtomResult.current;

  const todoListFilterStateResult = renderRecoilHook(getTodoListFilterStateAtom)
    .result;
  const [
    todoListFilterState,
    setTodoListFilterState,
  ] = todoListFilterStateResult.current;

  const filteredTodoListStateResult = renderRecoilHook(
    getFilteredToDoListStateSelector
  ).result;

  act(() => {
    setTodoList([
      ...todoList,
      {
        id: 0,
        test: 'make hamburgers',
        priority: 'high',
        isComplete: true,
      },
    ]);
  });

  act(() => {
    setTodoListFilterState('Show Uncompleted');
  });
  expect(filteredTodoListStateResult.current).toStrictEqual([]);

  act(() => {
    setTodoListFilterState('Show Completed');
  });
  expect(filteredTodoListStateResult.current).toStrictEqual([
    {
      id: 0,
      test: 'make hamburgers',
      priority: 'high',
      isComplete: true,
    },
  ]);
});

test('filteredTodoState should update correctly w/inclusive hook', () => {
  const { result } = renderRecoilHook(useFilteredTodoListState);

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
