/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../store/atoms';

// utility for creating unique Id
let id = 0;
const getId = () => {
  id += 1;
  return id;
};

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('low');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        priority: priorityValue,
        isComplete: false,
      },
    ]);
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
  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" size="small" {...props} />);

  const YellowRadio = withStyles({
    root: {
      color: yellow[400],
      '&$checked': {
        color: yellow[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" size="small" {...props} />);

  const RedRadio = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" size="small" {...props} />);

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
