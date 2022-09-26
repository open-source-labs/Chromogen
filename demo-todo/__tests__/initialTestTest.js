import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  filteredTodoListState,
  sortedTodoListState,
  todoListSortedStats,
  todoListStatsState,
  filteredListContentState,
  allCompleteState,
  refreshFilterState,
  searchBarSelectorFam,

} from '../src/store/store';
import {
  todoListState,
  todoListFilterState,
  todoListSortState,
  quoteNumberState,
  searchResultState,

} from '../src/store/atoms';

// Suppress 'Batcher' warnings from React / Recoil conflict
console.error = jest.fn();

// Hook to return atom/selector values and/or modifiers for react-recoil-hooks-testing-library
const useStoreHook = () => {
  // atoms
  const [todoListStateValue, settodoListState] = useRecoilState(todoListState);
  const [todoListFilterStateValue, settodoListFilterState] = useRecoilState(todoListFilterState);
  const [todoListSortStateValue, settodoListSortState] = useRecoilState(todoListSortState);
  const [quoteNumberStateValue, setquoteNumberState] = useRecoilState(quoteNumberState);
  const [searchResultStateValue, setsearchResultState] = useRecoilState(searchResultState);

  // writeable selectors
  const [allCompleteStateValue, setallCompleteState] = useRecoilState(allCompleteState);
  const [refreshFilterStateValue, setrefreshFilterState] = useRecoilState(refreshFilterState);

  // read-only selectors
  const filteredTodoListStateValue = useRecoilValue(filteredTodoListState);
  const sortedTodoListStateValue = useRecoilValue(sortedTodoListState);
  const todoListSortedStatsValue = useRecoilValue(todoListSortedStats);
  const todoListStatsStateValue = useRecoilValue(todoListStatsState);
  const filteredListContentStateValue = useRecoilValue(filteredListContentState);

  // atom families

  // writeable selector families

  // read-only selector families




  return {
    todoListStateValue,
    settodoListState,
    todoListFilterStateValue,
    settodoListFilterState,
    todoListSortStateValue,
    settodoListSortState,
    quoteNumberStateValue,
    setquoteNumberState,
    searchResultStateValue,
    setsearchResultState,
    allCompleteStateValue,
    setallCompleteState,
    refreshFilterStateValue,
    setrefreshFilterState,
    filteredTodoListStateValue,
    sortedTodoListStateValue,
    todoListSortedStatsValue,
    todoListStatsStateValue,
    filteredListContentStateValue,
  };
};

describe('INITIAL RENDER', () => {
  const { result } = renderRecoilHook(useStoreHook);

  it('filteredTodoListState should initialize correctly', () => {
    expect(result.current.filteredTodoListStateValue).toStrictEqual([]);
  });

  it('sortedTodoListState should initialize correctly', () => {
    expect(result.current.sortedTodoListStateValue).toStrictEqual([]);
  });

  it('allCompleteState should initialize correctly', () => {
    expect(result.current.allCompleteStateValue).toStrictEqual(true);
  });

  it('filteredListContentState should initialize correctly', () => {
    expect(result.current.filteredListContentStateValue).toStrictEqual(false);
  });

  it('todoListSortedStats should initialize correctly', () => {
    expect(result.current.todoListSortedStatsValue).toStrictEqual({});
  });

  it('todoListStatsState should initialize correctly', () => {
    expect(result.current.todoListStatsStateValue).toStrictEqual({ "totalNum": 0, "totalCompletedNum": 0, "totalUncompletedNum": 0, "percentCompleted": 0 });
  });


});

describe('SELECTORS', () => {
  it('todoListSortedStats should properly derive state when todoListState updates', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([{ "id": 1, "text": "tennis", "priority": "low", "isComplete": false }]);

      result.current.settodoListFilterState("Show All");

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(23);

      result.current.setsearchResultState({ "all": { "searchTerm": "", "results": [] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });



    });
    expect(result.current.todoListSortedStatsValue).toStrictEqual({ "low": 1 });

  });

  it('todoListSortedStats should properly derive state when todoListState updates', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([{ "id": 1, "text": "tennis", "priority": "low", "isComplete": false }, { "id": 2, "text": "chinese chicken", "priority": "low", "isComplete": false }]);

      result.current.settodoListFilterState("Show All");

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(23);

      result.current.setsearchResultState({ "all": { "searchTerm": "", "results": [] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });



    });
    expect(result.current.todoListSortedStatsValue).toStrictEqual({ "low": 2 });

  });

});

describe('SETTERS', () => {
});