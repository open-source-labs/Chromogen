import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../store/atoms';

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState); // sets TodoList atom state

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div className="itemCreator">
      <input type="text" value={inputValue} onChange={onChange} />
      <button type="submit" onClick={addItem}>
        Add
      </button>
    </div>
  );
};

export default TodoItemCreator;

// utility for creating unique Id
let id = 0;
const getId = () => id++;
