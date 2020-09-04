import { selector, selectorFamily } from 'chromogen';
import {
  todoListState,
  todoListFilterState,
  todoListSortState,
  quoteNumberState,
  searchResultState,
  myNumberState,
} from './atoms';

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
  key: 'mismatchSortedTodoList',
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

// is filtered list non-empty? (determines whether check-all displays)
const filteredListContentState = selector({
  key: 'filteredListContentState',
  get: ({ get }) => !!get(filteredTodoListState).length,
});

// WRITEABLE GET/SET SELECTOR - (un)check all filtered items
const allCompleteState = selector({
  key: 'mismatchAllComplete',
  // if any item in filteredList is not complete, allComplete is false
  get: ({ get }) => !get(filteredTodoListState).some(({ isComplete }) => !isComplete),
  set: ({ get, set }, newValue) => {
    // update ONLY items in filtered list
    const lookupTable = {};
    get(todoListState).forEach((item) => {
      lookupTable[item.id] = item;
    });
    get(filteredTodoListState).forEach((item) => {
      lookupTable[item.id] = {
        ...item,
        isComplete: newValue,
      };
    });
    set(todoListState, Object.values(lookupTable));
  },
});

// WRITEABLE RESET SELECTOR - undo sort + filter
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
        console.error(err);
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
      // Fetch much be proxied through cors-anywhere to test on localhost
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/http://xkcd.com/${quoteNumber}/info.0.json`,
      );
      const { img } = await response.json();
      return img;
    } catch (err) {
      // Fallback comic
      return 'https://imgs.xkcd.com/comics/api.png';
    }
  },
});

const searchBarSelectorFam = selectorFamily({
  key: 'searchBarSelectorFam',
  get: (searchFilter) => ({ get }) => get(searchResultState)[searchFilter],
  set: (searchFilter) => ({ get, set }, searchTerm) => {
    set(searchResultState, (prevState) => {
      const newResults = get(todoListState).filter((todo) => {
        if (searchTerm !== '' && todo.text.includes(searchTerm))
          return searchFilter === 'all' ? true : todo.priority === searchFilter;
        return false;
      });
      return { ...prevState, [searchFilter]: { searchTerm, results: newResults } };
    });
  },
});

const searchBarVanillaSelector = selector({
  key: 'searchBarVanillaSelector',
  get: ({ get }) => get(searchResultState).all,
  set: ({ get, set }, searchTerm) => {
    set(searchResultState, (prevState) => {
      const newResults = get(todoListState).filter((todo) => {
        if (searchTerm !== '' && todo.text.includes(searchTerm)) return true;
        return false;
      });
      return { ...prevState, all: { searchTerm, results: newResults } };
    });
  },
});

const myMultipliedState = selectorFamily({
  key: 'myMultipliedState',
  get: (multiplier) => ({ get }) => get(myNumberState) * multiplier,

  // optional set
  set: (multiplier) => ({ set }, newValue) => set(myNumberState, newValue / multiplier),
});

export {
  filteredTodoListState,
  filteredListContentState,
  todoListStatsState,
  allCompleteState,
  sortedTodoListState,
  todoListSortedStats,
  refreshFilterState,
  quoteTextState,
  xkcdState,
  searchBarSelectorFam,
  searchBarVanillaSelector,
  myMultipliedState,
};
