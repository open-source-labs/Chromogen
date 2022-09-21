import React from 'react';
// import { useRecoilState } from 'recoil';
import Checkbox from '@mui/material/Checkbox';
// import { todoListState } from '../store/atoms';
import '../styles/styles.css';

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const TodoItem = ({ item }) => {
  // const [todoList, setTodoList] = useRecoilState(todoListState);
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
  // const deleteItem = () => {
  //   const newList = removeItemAtIndex(todoList, index);
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
      <button type="submit" onClick={console.log}>
        X
      </button>
    </div>
  );
};
export default TodoItem;
