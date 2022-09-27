import React from 'react';
// import { useRecoilValue } from 'recoil';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoListFilters from './TodoListFilters';
import TodoQuickCheck from './TodoQuickCheck';
import Quotes from './Quotes';
import SearchBar from './SearchBar';
import '../styles/styles.css';
import shallow from 'zustand/shallow';
import useToDoStore from '../store/store';

const selector = state => ({
  todoListState: state.todoListState,
  todoListFilterState: state.todoListFilterState,
  todoListSortState: state.todoListSortState
});

const filterList = (list, filter) => {
  switch (filter) {
    case 'Show Completed':
      return list.filter((item) => item.isComplete);
    case 'Show Uncompleted':
      return list.filter((item) => !item.isComplete);
    default:
      return list;
  }
}

const sortList = (list, sortingMethod) => {
  if (!sortingMethod) return list;
  const high = list.filter((item) => item.priority === 'high');
  const medium = list.filter((item) => item.priority === 'medium');
  const low = list.filter((item) => item.priority === 'low');
  return [...high, ...medium, ...low];
}

const TodoList = () => {
  // const todoList = useRecoilValue(sortedTodoListState);
  const { todoListState, todoListFilterState, todoListSortState } = useToDoStore(selector, shallow);
  const todoList = sortList(filterList(todoListState, todoListFilterState), todoListSortState);



  return (
    <div className="mainContainer">
      <div className="row quoteBox">
        <React.Suspense fallback={<small>Loading...</small>}>
          <Quotes />
        </React.Suspense>
      </div>

      <div className="row todosDisplayRow">
        <h1>Totally Todos!</h1>

        <div className="todosContainer">
          <TodoQuickCheck />
          <TodoItemCreator />
          {todoList.map((todoItem) => (
            <TodoItem key={todoItem.id} item={todoItem} />
          ))}
          <TodoListFilters />
        </div>
        <SearchBar />
      </div>
      <div className="row" />
    </div>
  );
};

export default TodoList;
