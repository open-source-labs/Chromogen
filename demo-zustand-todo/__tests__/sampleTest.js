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

  it('checkBox & quoteText & todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setCheckBox();
      result.current.setCheckBox();
      result.current.changeQuoteText(
        '"Your ability to learn faster than your competition is your only sustainable competitive advantage."\n\t- Arie de Gues',
      );
      result.current.addTodoListItem({ id: 2, text: 'tennis', priority: 'low', isComplete: false });
    });

    expect(result.current.checkBox).toStrictEqual(true);
    expect(result.current.quoteText).toStrictEqual(
      '"Your ability to learn faster than your competition is your only sustainable competitive advantage."\n\t- Arie de Gues',
    );
    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
    ]);
  });
  it('checkBox & todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setCheckBox();
      result.current.setCheckBox();
      result.current.addTodoListItem({ id: 3, text: 'hockey', priority: 'low', isComplete: false });
      result.current.setCheckBox();
    });

    expect(result.current.checkBox).toStrictEqual(false);
    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
      { id: 3, text: 'hockey', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.addTodoListItem({ id: 4, text: 'hocka', priority: 'low', isComplete: false });
      result.current.setCheckBox();
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
      { id: 3, text: 'hockey', priority: 'low', isComplete: false },
      { id: 4, text: 'hocka', priority: 'low', isComplete: false },
    ]);
  });
  it('todoListState & searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.addTodoListItem({ id: 5, text: 'canoe', priority: 'low', isComplete: false });
      result.current.setCheckBox();
      result.current.setSearchState('c', 'all');
    });

    expect(result.current.todoListState).toStrictEqual([
      { id: 2, text: 'tennis', priority: 'low', isComplete: false },
      { id: 3, text: 'hockey', priority: 'low', isComplete: false },
      { id: 4, text: 'hocka', priority: 'low', isComplete: false },
      { id: 5, text: 'canoe', priority: 'low', isComplete: false },
    ]);
    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'c',
        results: [
          { id: 3, text: 'hockey', priority: 'low', isComplete: false },
          { id: 4, text: 'hocka', priority: 'low', isComplete: false },
          { id: 5, text: 'canoe', priority: 'low', isComplete: false },
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
      result.current.setSearchState('ca', 'all');
    });

    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'ca',
        results: [{ id: 5, text: 'canoe', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setSearchState('can', 'all');
    });

    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'can',
        results: [{ id: 5, text: 'canoe', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {
      result.current.setSearchState('cano', 'all');
    });

    expect(result.current.searchResultState).toStrictEqual({
      all: {
        searchTerm: 'cano',
        results: [{ id: 5, text: 'canoe', priority: 'low', isComplete: false }],
      },
      high: { searchTerm: '', results: [] },
      medium: { searchTerm: '', results: [] },
      low: { searchTerm: '', results: [] },
    });
  });
});
