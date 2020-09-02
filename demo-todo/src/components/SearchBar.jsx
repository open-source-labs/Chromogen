import React, { useState } from 'react';
import { searchBarSelectorFam } from '../store/store';
import { useRecoilState } from 'recoil';
import TodoItem from './TodoItem';

const SearchBar = () => {
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchState, setSearchState] = useRecoilState(searchBarSelectorFam(searchFilter));

  const onChange = (e) => {
    setSearchState(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        className="inputText"
        placeholder="Search for a Todo"
        type="text"
        value={searchState.searchTerm}
        onChange={onChange}
      />
      <select>
        <option value="all">All</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <div>
        {searchState.results.map((result, idx) => (
          <TodoItem key={idx} item={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
