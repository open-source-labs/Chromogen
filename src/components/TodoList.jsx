import React from 'react';
import { useRecoilValue } from 'recoil';
import { sortedTodoListState } from '../store/store';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import '../styles/styles.css';
import TodoListFilters from './TodoListFilters';

const TodoList = () => {
  const todoList = useRecoilValue(sortedTodoListState);

  return (
    <div className="mainContainer">
      <div className="row" />

      <div className="row todosDisplayRow">
        <h1>Totally Todos!</h1>

        <div className="todosContainer">
          <TodoItemCreator />
          {todoList.map((todoItem) => (
            <TodoItem key={todoItem.id} item={todoItem} />
          ))}
          <TodoListFilters />
        </div>
      </div>
      <div className="row" />
    </div>
  );
};

export default TodoList;
