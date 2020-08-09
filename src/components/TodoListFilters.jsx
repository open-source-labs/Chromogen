import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListFilterState } from '../store/atoms';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <ul>
      <button type="submit" value="Show All" onClick={updateFilter}>
        All
      </button>

      <button type="submit" value="Show Uncompleted" onClick={updateFilter}>
        Uncompleted
      </button>

      <button type="submit" value="Show Completed" onClick={updateFilter}>
        Completed
      </button>
    </ul>
  );
};

export default TodoListFilters;
