import { atom, selector } from 'chromogen';

/* ----- ATOMS ----- */

// unsorted, unfiltered todo list
const todoListState = atom({
  key: 'todoListState',
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

/* ----- SELECTORS ---- */

// filtered todo list
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

// sorted todo list
const sortedTodoListState = selector({
  key: 'sortedTodoListState',
  get: ({ get }) => {
    const sort = get(todoListSortState);
    const list = get(filteredTodoListState);
    const high = list.filter((item) => item.priority === 'high');
    const medium = list.filter((item) => item.priority === 'medium');
    const low = list.filter((item) => item.priority === 'low');
    return sort === false ? list : [...high, ...medium, ...low];
  },
});

// priority stats
const todoListSortedStats = selector({
  key: 'todoListSortedStats',
  get: ({ get }) => {
    const list = get(sortedTodoListState);
    return list.reduce((acc, cv) => {
      acc[cv.priority] = cv.priority in acc ? acc[cv.priority] + 1 : 1;
      return acc;
    }, {});
  },
});

// completion (filter) stats
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const list = get(todoListState);
    const totalNum = list.length;
    const totalCompletedNum = list.filter((todo) => todo.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

// WRITEABLE SELECTOR - undo sort + filter
const refreshFilterState = selector({
  key: 'refreshFilterState',
  get: () => null,
  set: ({ reset }) => {
    reset(todoListSortState);
    reset(todoListFilterState);
  },
});

// PROMISE-BASED SELECTOR - fetch quote text
const quoteTextState = selector({
  key: 'quoteTextState',
  get: ({ get }) => {
    const quoteNumber = get(quoteNumberState);
    return fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        const quote = data[quoteNumber];
        return `"${quote.text}"\n\t- ${quote.author || 'unknown'}`;
      })
      .catch((err) => {
        console.log(err);
        return 'No quote available';
      });
  },
});

// ASYNC SELECTOR - fetch comic img
const xkcdState = selector({
  key: 'xkcdState',
  get: async ({ get }) => {
    const quoteNumber = get(quoteNumberState);
    try {
      // Fetch currently fails in localhost for unknown reasons
      const response = await fetch(`http://xkcd.com/${quoteNumber}/info.0.json`);
      const { img } = await response.json();
      return img;
    } catch (err) {
      // Fallback comic
      return 'https://imgs.xkcd.com/comics/api.png';
    }
  },
});

export {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListStatsState,
  todoListSortState,
  quoteNumberState,
  sortedTodoListState,
  todoListSortedStats,
  refreshFilterState,
  quoteTextState,
  xkcdState,
};
