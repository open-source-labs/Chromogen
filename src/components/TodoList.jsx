import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from '../store/atoms';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import '../styles/styles.css';
import TodoListFilters from './TodoListFilters';

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <div className="listContainer">
      <div className="row" />
      {/* <TodoListStats /> */}
      <div className="row listRow">
        <h1>Totally Todos!</h1>
    
        <div className="itemsContainer">
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
