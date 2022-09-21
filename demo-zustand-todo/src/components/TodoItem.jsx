import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../styles/styles.css';
import shallow from 'zustand/shallow';
import { useToDoStore } from '../store/store';

const selector = (state) => ({
  todoListState: state.todoListState,
  deleteTodoListItem: state.deleteTodoListItem,
});

const TodoItem = ({ item }) => {
  // const [todoList, setTodoList] = useRecoilState(todoListState);
  const { todoListState, deleteTodoListItem } = useToDoStore(selector, shallow);

  // const index = todoList.findIndex((listItem) => listItem === item);

  // const editItemText = ({ target: { value } }) => {
  //   const newList = replaceItemAtIndex(todoList, index, {
  //     ...item,
  //     text: value,
  //   });
  //   setTodoList(newList);
  // };
  // const toggleItemCompletion = () => {
  //   const newList = replaceItemAtIndex(todoList, index, {
  //     ...item,
  //     isComplete: !item.isComplete,
  //   });
  //   setTodoList(newList);
  // };

  const checkBoxClasses = {
    low: 'lowPriority',
    medium: 'mediumPriority',
    high: 'highPriority',
  };

  return (
    <div className={checkBoxClasses[item.priority] || 'itemContainer'} id="todoItem">
      <input type="text" value={item.text} onChange={console.log} />
      <Checkbox
        disableRipple
        checked={item.isComplete}
        color="default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onChange={console.log}
      />
      <button type="submit" onClick={() => deleteTodoListItem(item.id)}>
        X
      </button>
    </div>
  );
};
export default TodoItem;
