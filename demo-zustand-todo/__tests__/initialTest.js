import { renderHook, act } from '@testing-library/react';
import useStore from '../src/store/store';

describe('INITIAL RENDER', () => {
  const { result } = renderHook(useStore);

  it('todoListState should initialize correctly', () => {
    expect(result.current.todoListState).toStrictEqual([]);
  });
  it('todoListFilterState should initialize correctly', () => {
    expect(result.current.todoListFilterState).toStrictEqual("Show All");
  });
  it('todoListSortState should initialize correctly', () => {
    expect(result.current.todoListSortState).toStrictEqual(false);
  });
  it('quoteText should initialize correctly', () => {
    expect(result.current.quoteText).toStrictEqual("");
  });
  it('quoteNumber should initialize correctly', () => {
    expect(result.current.quoteNumber).toStrictEqual(0);
  });
  it('checkBox should initialize correctly', () => {
    expect(result.current.checkBox).toStrictEqual(false);
  });
  it('searchResultState should initialize correctly', () => {
    expect(result.current.searchResultState).toStrictEqual({ "all": { "searchTerm": "", "results": [] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });
  });

});