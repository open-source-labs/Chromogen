import { create } from 'chromogen-zustand';

const useToDoStore = create((set) => ({
  todoListState: [],

  todoListFilterState: 'Show All',

  todoListSortState: false,

  resetFiltersAndSorted: () => set(() => ({ todoListFilterState: 'Show All', todoListSortState: false })),

  toggleSort: () => set(state => ({ todoListSortState: !state.todoListSortState })),

  setFilter: filter => set(() => ({ todoListFilterState: filter })),

  quoteText: '',

  changeQuoteText: (text) => set(state => ({ quoteText: text })),

  quoteNumber: 0,

  changeQuoteNumber: () => set(state => ({ quoteNumber: Math.floor(Math.random() * 1643) })),

  setAllComplete: () => set(state =>
  ({
    todoListState:
      state.todoListState.some(todo => todo.isComplete === false) ?
        state.todoListState.map(todo => { return { ...todo, isComplete: true } }) :
        state.todoListState.map(todo => { return { ...todo, isComplete: false } })
  })),

  checkBox: false,

  setCheckBox: () => set(state =>
  ({
    checkBox:
      state.todoListState.some(todo => todo.isComplete === false) ?
        false :
        true
  })),

  addTodoListItem: todo => set(state => ({ todoListState: [...state.todoListState, todo] })),

  deleteTodoListItem: id =>
    set(state => ({ todoListState: state.todoListState.filter(todo => todo.id !== id) })),

  editItemText: (text, id) => set(state => ({
    todoListState: state.todoListState.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: text };
      } else {
        return todo;
      };
    })
  })),

  toggleItemCompletion: id => set(state =>
  ({
    todoListState: state.todoListState.map(todo => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      } else {
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

  setSearchState: (searchTerm, priority) => set(state => {
    if (searchTerm === '') return { searchResultState: { ...state.searchResultState, [priority]: { searchTerm, results: [] } } };
    let results = [...state.todoListState].filter(todo => todo.text.includes(searchTerm));
    if (priority !== 'all') results = results.filter(todo => todo.priority === priority);
    return { searchResultState: { ...state.searchResultState, [priority]: { searchTerm, results } } };
  }),
}));


export default useToDoStore;


