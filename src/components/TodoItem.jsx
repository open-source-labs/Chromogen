import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../store/atoms';
import '../styles/styles.css';


function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [arr.slice(0, index), ...arr.slice(index + 1)];
}

const TodoItem = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });
    setTodoList(newList);
  };
  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  };
  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  }
  return (
    <div className="itemContainer">
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        checked={item.isComplete}
        id="checkbox"
        type="checkbox"
        onChange={toggleItemCompletion}
      />
      <button type="submit" onClick={deleteItem}>X</button>
    </div>
  );
};
export default TodoItem;


