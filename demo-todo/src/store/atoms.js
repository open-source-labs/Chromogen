import { atom } from 'chromogen';

/* ----- ATOMS ----- */

// unsorted, unfiltered todo list
const todoListState = atom({
  key: 'mismatchTodoList',
  default: [], // array of objects - each object has id, text, isComplete, and priority props
});

// filter select
const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

// toggle sort
const todoListSortState = atom({
  key: 'todoListSortState',
  default: false,
});

// random number for fetching quote & comic
const quoteNumberState = atom({
  key: 'quoteNumberState',
  default: Math.floor(Math.random() * 1643),
});

const searchResultState = atom({
  key: 'searchResultState',
  default: {
    all: {
      searchTerm: '',
      results: [],
    },
    high: {
      searchTerm: '',
      results: [],
    },
    medium: {
      searchTerm: '',
      results: [],
    },
    low: {
      searchTerm: '',
      results: [],
    },
  },
});

export {
  todoListState,
  todoListFilterState,
  todoListSortState,
  quoteNumberState,
  searchResultState,
};
