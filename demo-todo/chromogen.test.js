import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  todoListState,
  todoListFilterState,
  todoListSortState,
  quoteNumberState,
  searchResultState,
} from './src/store/atoms';

import {
  filteredTodoListState,
  sortedTodoListState,
  todoListSortedStats,
  todoListStatsState,
  filteredListContentState,
  allCompleteState,
  refreshFilterState,
  searchBarSelectorFam,
} from './src/store/store';

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

  //writeable selector families
  const [searchBarSelectorFam__all__Value, setsearchBarSelectorFam__all] = useRecoilState(
    searchBarSelectorFam('all'),
  );

  //read-only selector families

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
    searchBarSelectorFam__all__Value,
    setsearchBarSelectorFam__all,
  };
};

describe('INITIAL RENDER', () => {
  const { result } = renderRecoilHook(useStoreHook);
  //Selectors
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
    expect(result.current.todoListStatsStateValue).toStrictEqual({
      totalNum: 0,
      totalCompletedNum: 0,
      totalUncompletedNum: 0,
      percentCompleted: 0,
    });
  });

  //Selector Families
  it('searchBarSelectorFam__all should initialize correctly', () => {
    expect(result.current.searchBarSelectorFam__all__Value).toStrictEqual({
      searchTerm: '',
      results: [],
    });
  });
});

describe('SELECTORS', () => {
  it('todoListStatsState should properly derive state when todoListState updates', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: { searchTerm: '', results: [] },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });
    expect(result.current.todoListStatsStateValue).toStrictEqual({
      totalNum: 1,
      totalCompletedNum: 0,
      totalUncompletedNum: 1,
      percentCompleted: 0,
    });
  });

  it('searchBarSelectorFam__all should properly derive state when searchResultState updates', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'h',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });
    expect(result.current.searchBarSelectorFam__all__Value).toStrictEqual({
      searchTerm: 'h',
      results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
    });
  });

  it('searchBarSelectorFam__all should properly derive state when searchResultState updates', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: { searchTerm: '', results: [] },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });
    expect(result.current.searchBarSelectorFam__all__Value).toStrictEqual({
      searchTerm: '',
      results: [],
    });
  });

  it('searchBarSelectorFam__all should properly derive state when searchResultState updates', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'hello',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });
    expect(result.current.searchBarSelectorFam__all__Value).toStrictEqual({
      searchTerm: 'hello',
      results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
    });
  });
});

describe('SETTERS', () => {
  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: { searchTerm: '', results: [] },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('h');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: {
        searchTerm: 'h',
        results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });

  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'h',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: { searchTerm: '', results: [] },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });

  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: { searchTerm: '', results: [] },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('h');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: {
        searchTerm: 'h',
        results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });

  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'h',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('he');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: {
        searchTerm: 'he',
        results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });

  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'he',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('hel');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: {
        searchTerm: 'hel',
        results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });

  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'hel',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('hell');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: {
        searchTerm: 'hell',
        results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });

  it('searchBarSelectorFam__all should properly set state', () => {
    const { result } = renderRecoilHook(useStoreHook);

    act(() => {
      result.current.settodoListState([
        { id: 1, text: 'hello', priority: 'low', isComplete: false },
      ]);

      result.current.settodoListFilterState('Show All');

      result.current.settodoListSortState(false);

      result.current.setquoteNumberState(220);

      result.current.setsearchResultState({
        all: {
          searchTerm: 'hell',
          results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
        },
        high: { searchTerm: '', results: [] },
        medium: { searchTerm: '', results: [] },
        low: { searchTerm: '', results: [] },
      });
    });

    act(() => {
      result.current.setsearchBarSelectorFam__all('hello');
    });

    expect(result.current.searchResultStateValue).toStrictEqual({
      all: {
        searchTerm: 'hello',
        results: [{ id: 1, text: 'hello', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
});
