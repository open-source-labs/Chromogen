import { renderHook, act } from '@testing-library/react';
import {
  useToDoStore
} from '../src/store/store';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library

describe('INITIAL RENDER', () => {
  const { result } = renderHook(useToDoStore);

  console.log({ result });
  console.log(result.current);

  it('filteredTodoListState should initialize correctly', () => {
    expect(result.current.todoListState).toStrictEqual([]);
  });

  it('todoListFilterState should initialize correctly', () => {
    expect(result.current.todoListFilterState).toStrictEqual('Show All');
  });

  // it('allCompleteState should initialize correctly', () => {
  //   expect(result.current.allCompleteStateValue).toStrictEqual(true);
  // });

  // it('filteredListContentState should initialize correctly', () => {
  //   expect(result.current.filteredListContentStateValue).toStrictEqual(false);
  // });

  // it('todoListSortedStats should initialize correctly', () => {
  //   expect(result.current.todoListSortedStatsValue).toStrictEqual({});
  // });

  // it('todoListStatsState should initialize correctly', () => {
  //   expect(result.current.todoListStatsStateValue).toStrictEqual({ "totalNum": 0, "totalCompletedNum": 0, "totalUncompletedNum": 0, "percentCompleted": 0 });
  // });


});