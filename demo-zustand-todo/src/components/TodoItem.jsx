import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../styles/styles.css';
import shallow from 'zustand/shallow';
import useToDoStore from '../store/store';

const selector = (state) => ({
  todoListState: state.todoListState,
  deleteTodoListItem: state.deleteTodoListItem,
  editItemText: state.editItemText,
  toggleItemCompletion: state.toggleItemCompletion,
});

const TodoItem = ({ item }) => {
  const { deleteTodoListItem, editItemText, toggleItemCompletion } = useToDoStore(
    selector,
    shallow,
  );

  const checkBoxClasses = {
    low: 'lowPriority',
    medium: 'mediumPriority',
    high: 'highPriority',
  };

  return (
    <div className={checkBoxClasses[item.priority] || 'itemContainer'} id="todoItem">
      <input
        type="text"
        value={item.text}
        onChange={(e) => editItemText(e.target.value, item.id)}
      />
      <Checkbox
        disableRipple
        checked={item.isComplete}
        color="default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onClick={() => toggleItemCompletion(item.id)}
      />
      <button type="submit" onClick={() => deleteTodoListItem(item.id)}>
        X
      </button>
    </div>
  );
};
export default TodoItem;
