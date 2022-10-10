import { renderHook, act } from '@testing-library/react';
import useStore from '../src/store/store';

describe('INITIAL RENDER', () => {
  const { result } = renderHook(useStore);

  it('todoListState should initialize correctly', () => {
    expect(result.current.todoListState).toStrictEqual([]);
  });

  it('todoListFilterState should initialize correctly', () => {
    expect(result.current.todoListFilterState).toStrictEqual('Show All');
  });

  it('todoListSortState should initialize correctly', () => {
    expect(result.current.todoListSortState).toStrictEqual(false);
  });

  it('quoteText should initialize correctly', () => {
    expect(result.current.quoteText).toStrictEqual('');
  });

  it('quoteNumber should initialize correctly', () => {
    expect(result.current.quoteNumber).toStrictEqual(0);
  });

  it('checkBox should initialize correctly', () => {
    expect(result.current.checkBox).toStrictEqual(false);
  });

  it('searchResultState should initialize correctly', () => {
    expect(result.current.searchResultState).toStrictEqual({
      all: { searchTerm: '', results: [] },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
});

describe('STATE CHANGES', () => {
  const { result } = renderHook(useStore);

  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.addTodoListItem({ id: 2, text: 'tennis', priority: 'low', isComplete: false });
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.addTodoListItem({
        id: 3,
        text: 'baseball',
        priority: 'low',
        isComplete: false,
      });
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
      { id: 3, text: 'baseball', priority: 'low', isComplete: false },
    ]);
  });

  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.addTodoListItem({
        id: 4,
        text: 'spaghetti',
        priority: 'low',
        isComplete: false,
      });
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
      { id: 3, text: 'baseball', priority: 'low', isComplete: false },
      { id: 4, text: 'spaghetti', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.addTodoListItem({
        id: 5,
        text: 'penne alla vodka',
        priority: 'low',
        isComplete: false,
      });
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
      { id: 3, text: 'baseball', priority: 'low', isComplete: false },
      { id: 4, text: 'spaghetti', priority: 'low', isComplete: false },
      { id: 5, text: 'penne alla vodka', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.toggleItemCompletion(2);
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: true },
      { id: 3, text: 'baseball', priority: 'low', isComplete: false },
      { id: 4, text: 'spaghetti', priority: 'low', isComplete: false },
      { id: 5, text: 'penne alla vodka', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.toggleItemCompletion(4);
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: true },
      { id: 3, text: 'baseball', priority: 'low', isComplete: false },
      { id: 4, text: 'spaghetti', priority: 'low', isComplete: true },
      { id: 5, text: 'penne alla vodka', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState & searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.toggleItemCompletion(5);
      result.current.setSearchState('t', 'all');
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: true },
      { id: 3, text: 'baseball', priority: 'low', isComplete: false },
      { id: 4, text: 'spaghetti', priority: 'low', isComplete: true },
      { id: 5, text: 'penne alla vodka', priority: 'low', isComplete: true },
    ]);
    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 't',
        results: [
          { id: 2, text: 'tennis', priority: 'low', isComplete: true },
          { id: 4, text: 'spaghetti', priority: 'low', isComplete: true },
        ],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setSearchState('te', 'all');
    });

    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'te',
        results: [{ id: 2, text: 'tennis', priority: 'low', isComplete: true }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setSearchState('ten', 'all');
    });

    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'ten',
        results: [{ id: 2, text: 'tennis', priority: 'low', isComplete: true }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setSearchState('tenn', 'all');
    });

    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'tenn',
        results: [{ id: 2, text: 'tennis', priority: 'low', isComplete: true }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
});
