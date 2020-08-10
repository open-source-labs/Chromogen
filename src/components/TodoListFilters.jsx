import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListFilterState, todoListStatsState } from '../store/store';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useRecoilValue(
    todoListStatsState,
  );
  const updateFilter = ({ target: { value } }) => {
    console.log(value);
    setFilter(value);
  };
  return (
    <ul>
      <button
        style={{ color: filter === 'Show All' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show All"
        onClick={updateFilter}
      >
        All <span> {totalNum || ''}</span>
      </button>

      <button
        style={{ color: filter === 'Show Uncompleted' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show Uncompleted"
        onClick={updateFilter}
      >
        Uncompleted <span>{totalUncompletedNum || ''}</span>
      </button>

      <button
        style={{ color: filter === 'Show Completed' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show Completed"
        onClick={updateFilter}
      >
        Completed <span>{totalCompletedNum || ''}</span>
      </button>
    </ul>
  );
};

export default TodoListFilters;
