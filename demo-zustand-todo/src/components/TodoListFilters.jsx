import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useToDoStore } from '../store/store';
import shallow from 'zustand/shallow';

const selector = state => ({
  todoListFilterState: state.todoListFilterState,
  todoListState: state.todoListState,
  resetFiltersAndSorted: state.resetFiltersAndSorted,
  todoListSortState: state.todoListSortState,
  toggleSort: state.toggleSort,
  setFilter: state.setFilter,
})

const TodoListFilters = () => {
  const { todoListFilterState, todoListState, resetFiltersAndSorted, todoListSortState, toggleSort, setFilter } = useToDoStore(selector, shallow);
  // // selector - grabs totals for each category
  const { high, medium, low } = todoListState.reduce((acc, cur) => {
    acc[cur.priority] = (acc[cur.priority] ?? 0) + 1;
    return acc;
  }, {});
  // // toggle priority stats display
  const [displayStats, setDisplayStats] = useState(false);
  // // selector - totals for each filter
  const totalNum = todoListState.length;
  const totalCompletedNum = todoListState.filter(todo => todo.isComplete).length;
  const totalUncompletedNum = todoListState.filter(todo => !todo.isComplete).length

  const updateFilter = ({ target: { value } }) => setFilter(value);

  const toggleDisplayStats = () => setDisplayStats(!displayStats);
  const reset = () => {
    setDisplayStats(false); // displayStats is local state
    resetFiltersAndSorted();
  };

  const sortIconColor = {
    true: 'sortedWhite',
    false: 'unsortedGray',
  };

  return (
    <ul>
      <button
        className="filter-button"
        id="filterBtn1"
        style={{ color: todoListFilterState === 'Show All' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show All"
        onClick={updateFilter}
      >
        All <span> {totalNum || ''}</span>
      </button>
      <button
        className="filter-button"
        id="filterBtn2"
        style={{ color: todoListFilterState === 'Show Uncompleted' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show Uncompleted"
        onClick={updateFilter}
      >
        Active <span>{totalUncompletedNum || ''}</span>
      </button>
      <button
        className="filter-button"
        style={{ color: todoListFilterState === 'Show Completed' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show Completed"
        onClick={updateFilter}
      >
        Complete <span>{totalCompletedNum || ''}</span>
      </button>
      <button id={sortIconColor[todoListSortState]} type="submit" onClick={toggleSort}>
        <SortIcon />
      </button>

      <button id="unsortedGray" type="submit" onClick={toggleDisplayStats}>
        {displayStats && totalNum ? (
          <span id="statsSpan">
            <span id="highSpan">{high || 0}</span>
            <span id="mediumSpan">{medium || 0}</span>
            <span id="lowSpan">{low || 0}</span>
          </span>
        ) : (
          <EqualizerIcon />
        )}
      </button>
      <button id="unsortedGray" type="submit" onClick={reset}>
        <RefreshIcon />
      </button>
    </ul>
  );
};

export default TodoListFilters;
