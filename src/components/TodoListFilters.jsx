import React, { useState } from 'react';
import SortIcon from '@material-ui/icons/Sort';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  todoListFilterState,
  todoListStatsState,
  todoListSortState,
  todoListSortedStats,
  refreshFilterState,
} from '../store/store';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  // selector - grabs totals for each category
  const { high, medium, low } = useRecoilValue(todoListSortedStats);
  // selector *writeable - resets sort and filter
  const resetFilters = useResetRecoilState(refreshFilterState);
  // selector - toggles sort on and off
  const [sort, setSort] = useRecoilState(todoListSortState);
  // toggle priority stats display
  const [displayStats, setDisplayStats] = useState(false);
  // selector - totals for each filter
  const { totalNum, totalCompletedNum, totalUncompletedNum } = useRecoilValue(todoListStatsState);
  const updateFilter = ({ target: { value } }) => setFilter(value);

  const toggleSort = () => setSort(!sort);
  const toggleDisplayStats = () => setDisplayStats(!displayStats);
  const reset = () => {
    setDisplayStats(false); // displayStats is local state
    resetFilters();
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
        style={{ color: filter === 'Show All' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show All"
        onClick={updateFilter}
      >
        All <span> {totalNum || ''}</span>
      </button>
      <button
        className="filter-button"
        id="filterBtn2"
        style={{ color: filter === 'Show Uncompleted' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show Uncompleted"
        onClick={updateFilter}
      >
        Active <span>{totalUncompletedNum || ''}</span>
      </button>
      <button
        className="filter-button"
        style={{ color: filter === 'Show Completed' ? '#af6358' : 'whitesmoke' }}
        type="submit"
        value="Show Completed"
        onClick={updateFilter}
      >
        Complete <span>{totalCompletedNum || ''}</span>
      </button>
      <button id={sortIconColor[sort]} type="submit" onClick={toggleSort}>
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
      {/* Reset icon button doesn't change color yet 
          bc I wanted do keep our code (esp state) 
          as simple as possible during development 
       – but I can implement this down the line */}
      <button id="unsortedGray" type="submit" onClick={reset}>
        <RefreshIcon />
      </button>
    </ul>
  );
};

export default TodoListFilters;
