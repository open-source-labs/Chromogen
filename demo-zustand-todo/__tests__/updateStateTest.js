
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


describe('STATE CHANGES', () => {
  const { result } = renderHook(useStore);


  it('todoListState & quoteText should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.addTodoListItem({ "id": 2, "text": "make slides", "priority": "low", "isComplete": false });
      result.current.changeQuoteText("\"Just trust yourself, then you will know how to live.\"\n\t- Goethe");
    });


    expect(result.current.todoListState).toStrictEqual([{ "id": 2, "text": "make slides", "priority": "low", "isComplete": false }]);
    expect(result.current.quoteText).toStrictEqual("\"Just trust yourself, then you will know how to live.\"\n\t- Goethe");
  });
  it('todoListState & quoteText should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.addTodoListItem({ "id": 3, "text": "eat dinner", "priority": "low", "isComplete": false });
      result.current.changeQuoteText("\"The most successful people are those who are good at plan B.\"\n\t- James Yorke");
    });


    expect(result.current.todoListState).toStrictEqual([{ "id": 2, "text": "make slides", "priority": "low", "isComplete": false }, { "id": 3, "text": "eat dinner", "priority": "low", "isComplete": false }]);
    expect(result.current.quoteText).toStrictEqual("\"The most successful people are those who are good at plan B.\"\n\t- James Yorke");
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.toggleItemCompletion(3);
    });


    expect(result.current.todoListState).toStrictEqual([{ "id": 2, "text": "make slides", "priority": "low", "isComplete": false }, { "id": 3, "text": "eat dinner", "priority": "low", "isComplete": true }]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.toggleItemCompletion(3);
    });


    expect(result.current.todoListState).toStrictEqual([{ "id": 2, "text": "make slides", "priority": "low", "isComplete": false }, { "id": 3, "text": "eat dinner", "priority": "low", "isComplete": false }]);
  });
  it('todoListState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.toggleItemCompletion(3);
    });


    expect(result.current.todoListState).toStrictEqual([{ "id": 2, "text": "make slides", "priority": "low", "isComplete": false }, { "id": 3, "text": "eat dinner", "priority": "low", "isComplete": true }]);
  });
  it('todoListState & searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.toggleItemCompletion(2);
      result.current.setSearchState("m", "all");
    });


    expect(result.current.todoListState).toStrictEqual([{ "id": 2, "text": "make slides", "priority": "low", "isComplete": true }, { "id": 3, "text": "eat dinner", "priority": "low", "isComplete": true }]);
    expect(result.current.searchResultState).toStrictEqual({ "all": { "searchTerm": "m", "results": [{ "id": 2, "text": "make slides", "priority": "low", "isComplete": true }] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.setSearchState("ma", "all");
    });


    expect(result.current.searchResultState).toStrictEqual({ "all": { "searchTerm": "ma", "results": [{ "id": 2, "text": "make slides", "priority": "low", "isComplete": true }] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.setSearchState("mak", "all");
    });


    expect(result.current.searchResultState).toStrictEqual({ "all": { "searchTerm": "mak", "results": [{ "id": 2, "text": "make slides", "priority": "low", "isComplete": true }] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });
  });
  it('searchResultState should update correctly', () => {
    const { result } = renderHook(useStore);

    act(() => {

      result.current.setSearchState("make", "all");
    });


    expect(result.current.searchResultState).toStrictEqual({ "all": { "searchTerm": "make", "results": [{ "id": 2, "text": "make slides", "priority": "low", "isComplete": true }] }, "high": { "searchTerm": "", "results": [] }, "medium": { "searchTerm": "", "results": [] }, "low": { "searchTerm": "", "results": [] } });
  });
});