import create from 'zustand';
// import {
//   todoListState,
//   todoListFilterState,
//   todoListSortState,
//   quoteNumberState,
//   searchResultState,
// } from './atoms';

const useToDoStore = create((set) => ({
  todoListState: [
    {
      id: 1,
      text: 'test text',
      isComplete: false, 
      priority: 'medium',
    },
  ],
  
  todoListFilterState: 'Show All',

  todoListSortState: false,

  quoteText: 'Hope it dont fuck up',

  changeQuoteText: (text) => set(state => ({quoteText: text})),

  quoteNumber: 0,

  changeQuoteNumber: () => set(state => ({quoteNumber: Math.floor(Math.random() * 1643)})),

  setAllComplete: () => set(state =>
    ({ todoListState: 
      state.todoListState.some(todo => todo.isComplete === false) ? 
      state.todoListState.map(todo => {return{...todo, isComplete: true}}) :
      state.todoListState.map(todo => {return{...todo, isComplete: false}})
    })),
  
  addTodoListItem: todo => set(state => ({ todoListState: [...state.todoListState, todo] })),

  deleteTodoListItem: id =>
    set(state => ({ todoListState: state.todoListState.filter(todo => todo.id !== id)})),

  editItemText: (text, id) => set(state => ({ todoListState: state.todoListState.map(todo => {
    if (todo.id === id) {
      return {...todo, text: text};
    }else{
      return todo;
    };
  })
  })),
  
  toggleItemCompletion: id => set(state =>
  ({todoListState: state.todoListState.map(todo => {
     if (todo.id === id) {
      return {...todo, isComplete: !todo.isComplete};
    }else{
      return todo;
    }; 
  })
  })),
    
  searchResultState: {
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
}));

/* ----- SELECTORS ---- */

// filtered todo list
// const filteredTodoListState = selector({
//   key: 'filteredTodoListState',
//   get: ({ get }) => {
//     const filter = get(todoListFilterState);
//     const list = get(todoListState);

//     switch (filter) {
//       case 'Show Completed':
//         return list.filter((item) => item.isComplete);
//       case 'Show Uncompleted':
//         return list.filter((item) => !item.isComplete);
//       default:
//         return list;
//     }
//   },
// });

// // sorted todo list
// const sortedTodoListState = selector({
//   key: 'mismatchSortedTodoList',
//   get: ({ get }) => {
//     const sort = get(todoListSortState);
//     const list = get(filteredTodoListState);
//     const high = list.filter((item) => item.priority === 'high');
//     const medium = list.filter((item) => item.priority === 'medium');
//     const low = list.filter((item) => item.priority === 'low');
//     return sort === false ? list : [...high, ...medium, ...low];
//   },
// });

// // priority stats
// const todoListSortedStats = selector({
//   key: 'todoListSortedStats',
//   get: ({ get }) => {
//     const list = get(sortedTodoListState);
//     return list.reduce((acc, cv) => {
//       acc[cv.priority] = cv.priority in acc ? acc[cv.priority] + 1 : 1;
//       return acc;
//     }, {});
//   },
// });

// // completion (filter) stats
// const todoListStatsState = selector({
//   key: 'todoListStatsState',
//   get: ({ get }) => {
//     const list = get(todoListState);
//     const totalNum = list.length;
//     const totalCompletedNum = list.filter((todo) => todo.isComplete).length;
//     const totalUncompletedNum = totalNum - totalCompletedNum;
//     const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//     };
//   },
// });

// // is filtered list non-empty? (determines whether check-all displays)
// const filteredListContentState = selector({
//   key: 'filteredListContentState',
//   get: ({ get }) => !!get(filteredTodoListState).length,
// });

// // WRITEABLE GET/SET SELECTOR - (un)check all filtered items
// const allCompleteState = selector({
//   key: 'mismatchAllComplete',
//   // if any item in filteredList is not complete, allComplete is false
//   get: ({ get }) => !get(filteredTodoListState).some(({ isComplete }) => !isComplete),
//   set: ({ get, set }, newValue) => {
//     // update ONLY items in filtered list
//     const lookupTable = {};
//     get(todoListState).forEach((item) => {
//       lookupTable[item.id] = item;
//     });
//     get(filteredTodoListState).forEach((item) => {
//       lookupTable[item.id] = {
//         ...item,
//         isComplete: newValue,
//       };
//     });
//     set(todoListState, Object.values(lookupTable));
//   },
// });

// // WRITEABLE RESET SELECTOR - undo sort + filter
// const refreshFilterState = selector({
//   key: 'refreshFilterState',
//   get: () => null,
//   set: ({ reset }) => {
//     reset(todoListSortState);
//     reset(todoListFilterState);
//   },
// });

// // PROMISE-BASED SELECTOR - fetch quote text
// const quoteTextState = selector({
//   key: 'quoteTextState',
//   get: ({ get }) => {
//     const quoteNumber = get(quoteNumberState);
//     return fetch('https://type.fit/api/quotes')
//       .then((response) => response.json())
//       .then((data) => {
//         const quote = data[quoteNumber];
//         return `"${quote.text}"\n\t- ${quote.author || 'unknown'}`;
//       })
//       .catch((err) => {
//         console.error(err);
//         return 'No quote available';
//       });
//   },
// });

// ASYNC SELECTOR - fetch comic img
// const xkcdState = selector({
//   key: 'xkcdState',
//   get: async ({ get }) => {
//     const quoteNumber = get(quoteNumberState);
//     try {
//       // Fetch much be proxied through cors-anywhere to test on localhost
//       const response = await fetch(
//         `https://cors-anywhere.herokuapp.com/http://xkcd.com/${quoteNumber}/info.0.json`,
//       );
//       const { img } = await response.json();
//       return img;
//     } catch (err) {
//       // Fallback comic
//       return 'https://imgs.xkcd.com/comics/api.png';
//     }
//   },
// });

// const searchBarSelectorFam = selectorFamily({
//   key: 'searchBarSelectorFam',
//   get: (searchFilter) => ({ get }) => get(searchResultState)[searchFilter],
//   set: (searchFilter) => ({ get, set }, searchTerm) => {
//     set(searchResultState, (prevState) => {
//       const newResults = get(todoListState).filter((todo) => {
//         if (searchTerm !== '' && todo.text.includes(searchTerm))
//           return searchFilter === 'all' ? true : todo.priority === searchFilter;
//         return false;
//       });
//       return { ...prevState, [searchFilter]: { searchTerm, results: newResults } };
//     });
//   },
// });

// export {
//   filteredTodoListState,
//   filteredListContentState,
//   todoListStatsState,
//   allCompleteState,
//   sortedTodoListState,
//   todoListSortedStats,
//   refreshFilterState,
//   quoteTextState,
//   //xkcdState,
//   searchBarSelectorFam,
// };

export { useToDoStore };

/*todoListState,  default: [],
todoListFilterState, default: 'Show All',
todoListSortState, default:false,
quoteNumberState default: Math.floor(Math.random() * 1643),
searchResultState,
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
*/
