import { atom, selector } from 'recoil';

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

const todoListSortState = atom({
  key: 'todoListSortState',
  default: false,
});

/* ----- SELECTORS ---- */

/* selector that gets two atoms */
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
/* selector that gets another selector */
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
/* selector that gets an atom */
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
export {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListStatsState,
  todoListSortState,
  sortedTodoListState,
  todoListSortedStats,
};
