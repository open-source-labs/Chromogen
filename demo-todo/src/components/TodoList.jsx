import React from 'react';
import { useRecoilValue } from 'recoil';
import { sortedTodoListState } from '../store/store';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoListFilters from './TodoListFilters';
import TodoQuickCheck from './TodoQuickCheck';
import Quotes from './Quotes';
import SearchBar from './SearchBar';
import '../styles/styles.css';

const TodoList = () => {
  const todoList = useRecoilValue(sortedTodoListState);

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
