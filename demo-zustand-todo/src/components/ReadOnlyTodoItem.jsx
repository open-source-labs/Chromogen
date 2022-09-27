import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../styles/styles.css';
// import { todoListState } from '../store/atoms';
// import { useRecoilValue } from 'recoil';
import useToDoStore from '../store/store';

const ReadOnlyTodoItem = ({ item }) => {
  const checkBoxClasses = {
    low: 'lowPriority',
    medium: 'mediumPriority',
    high: 'highPriority',
  };

  const todoList = useToDoStore((state) => state.todoListState);

  return todoList.find((todo) => todo.id === item.id) ? (
    <div className={checkBoxClasses[item.priority] || 'itemContainer'} id="todoItem">
      <input type="text" value={item.text} readOnly />
      <Checkbox
        disableRipple
        checked={todoList.find((todo) => todo.id === item.id).isComplete}
        color="default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        style={{ cursor: 'default' }}
      />
    </div>
  ) : null;
};
export default ReadOnlyTodoItem;
