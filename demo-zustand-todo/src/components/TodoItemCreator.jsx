/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import useToDoStore from '../store/store';
import shallow from 'zustand/shallow';


const selector = state => state.addTodoListItem;

// utility for creating unique Id
let id = 1;
const getId = () => {
  id += 1;
  return id;
};

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('low');
  const addTodoListItem = useToDoStore(selector);

  const addItem = () => {
    addTodoListItem(
      {
        id: getId(),
        text: inputValue,
        priority: priorityValue,
        isComplete: false,
      }
    );
    setInputValue('');
    setPriorityValue('low');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleChange = (event) => {
    setPriorityValue(event.target.value);
  };

  /* MUI Radio Button styles */
  const GreenRadio = (props) => <Radio style={{ color: 'green' }} size="small" {...props} />;

  const YellowRadio = (props) => <Radio style={{ color: 'yellow' }} size="small" {...props} />;

  const RedRadio = (props) => <Radio style={{ color: 'red' }} size="small" {...props} />;

  return (
    <div className="itemCreator">
      <input
        className="inputText"
        placeholder="What needs to be done?"
        type="text"
        value={inputValue}
        onChange={onChange}
      />
      <span id="radioContainer">
        <FormControl component="fieldset">
          <FormLabel color="secondary" component="label" />
          <RadioGroup
            row
            aria-label="priority"
            name="priority1"
            value={priorityValue}
            onChange={handleChange}
          >
            <FormControlLabel control={<RedRadio />} value="high" />
            <FormControlLabel control={<YellowRadio />} value="medium" />
            <FormControlLabel control={<GreenRadio />} value="low" />
          </RadioGroup>
        </FormControl>
      </span>

      <button type="submit" onClick={addItem}>
        Add
      </button>
    </div>
  );
};

export default TodoItemCreator;
