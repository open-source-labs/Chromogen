import React, { useState } from 'react';
import SortIcon from '@material-ui/icons/Sort';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  todoListFilterState,
  todoListStatsState,
  todoListSortState,
  todoListSortedStats,
} from '../store/store';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const { high, medium, low } = useRecoilValue(todoListSortedStats);
  const [sort, setSort] = useRecoilState(todoListSortState);
  const [displayStats, setDisplayStats] = useState(false);
  const { totalNum, totalCompletedNum, totalUncompletedNum } = useRecoilValue(todoListStatsState);
  const updateFilter = ({ target: { value } }) => setFilter(value);

  const toggleSort = () => setSort(!sort);
  const toggleDisplayStats = () => setDisplayStats(!displayStats);

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
    </ul>
  );
};

export default TodoListFilters;
