import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  todoListState,
  todoListFilterState,
  todoListSortState,
  refreshFilterState,
  filteredTodoListState,
  sortedTodoListState,
  todoListSortedStats,
  todoListStatsState,
} from '../src/store/store';

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  // atoms & writeable selectors
  const [todoListStateValue, settodoListState] = useRecoilState(todoListState);
  const [todoListFilterStateValue, settodoListFilterState] = useRecoilState(todoListFilterState);
  const [todoListSortStateValue, settodoListSortState] = useRecoilState(todoListSortState);
  const [refreshFilterStateValue, setrefreshFilterState] = useRecoilState(refreshFilterState);

  // selectors - read only
  const filteredTodoListStateValue = useRecoilValue(filteredTodoListState);
  const sortedTodoListStateValue = useRecoilValue(sortedTodoListState);
  const todoListSortedStatsValue = useRecoilValue(todoListSortedStats);
  const todoListStatsStateValue = useRecoilValue(todoListStatsState);

  return {
    todoListStateValue,
    settodoListState,
    todoListFilterStateValue,
    settodoListFilterState,
    todoListSortStateValue,
    settodoListSortState,
    refreshFilterStateValue,
    setrefreshFilterState,
    filteredTodoListStateValue,
    sortedTodoListStateValue,
    todoListSortedStatsValue,
    todoListStatsStateValue,
  };
};

/* Initial state tests require:  
  1. name/key of atom (used in string passed as first arg to 'test()')
  2. label for read state value (prop on result.current, passed as arg to expect())
  3. *captured* inital state value (arg passed to toStrictEqual())  
*/
test('filteredTodoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.filteredTodoListStateValue).toStrictEqual([]);
});

test('sortedTodoListState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.sortedTodoListStateValue).toStrictEqual([]);
});

test('todoListSortedStats should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.todoListSortedStatsValue).toStrictEqual({});
});

test('todoListStatsState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.todoListStatsStateValue).toStrictEqual({
    totalNum: 0,
    totalCompletedNum: 0,
    totalUncompletedNum: 0,
    percentCompleted: 0,
  });
});

test('refreshFilterState should initialize correctly', () => {
  const { result } = renderRecoilHook(useStoreHook);
  expect(result.current.refreshFilterStateValue).toStrictEqual(null);
});

/* Test that selectors return the correct value for a given state */
test('selectorName should return correct value for a given state', () => {
  const { result } = renderRecoilHook(useStoreHook);

  act(() => {
    result.current.settodoListState([
      { id: 1, text: 'Moment of truth round 4', priority: 'medium', isComplete: false },
    ]);

    result.current.settodoListFilterState('Show All');

    result.current.settodoListSortState(false);

    result.current.setrefreshFilterState(null);
  });

  expect(result.current.filteredTodoListStateValue).toStrictEqual([
    { id: 1, text: 'Moment of truth round 4', priority: 'medium', isComplete: false },
  ]);

  expect(result.current.sortedTodoListStateValue).toStrictEqual([
    { id: 1, text: 'Moment of truth round 4', priority: 'medium', isComplete: false },
  ]);

  expect(result.current.todoListSortedStatsValue).toStrictEqual({ medium: 1 });

  expect(result.current.todoListStatsStateValue).toStrictEqual({
    totalNum: 1,
    totalCompletedNum: 0,
    totalUncompletedNum: 1,
    percentCompleted: 0,
  });
});

test('selectorName should return correct value for a given state', () => {
  const { result } = renderRecoilHook(useStoreHook);

  act(() => {
    result.current.settodoListState([
      { id: 1, text: 'Moment of truth round 4', priority: 'medium', isComplete: true },
    ]);

    result.current.settodoListFilterState('Show All');

    result.current.settodoListSortState(false);

    result.current.setrefreshFilterState(null);
  });

  expect(result.current.filteredTodoListStateValue).toStrictEqual([
    { id: 1, text: 'Moment of truth round 4', priority: 'medium', isComplete: true },
  ]);

  expect(result.current.sortedTodoListStateValue).toStrictEqual([
    { id: 1, text: 'Moment of truth round 4', priority: 'medium', isComplete: true },
  ]);

  expect(result.current.todoListSortedStatsValue).toStrictEqual({ medium: 1 });

  expect(result.current.todoListStatsStateValue).toStrictEqual({
    totalNum: 1,
    totalCompletedNum: 1,
    totalUncompletedNum: 0,
    percentCompleted: 1,
  });
});
