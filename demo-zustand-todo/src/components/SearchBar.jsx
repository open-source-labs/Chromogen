import React, { useState } from 'react';
import useToDoStore from '../store/store'
import shallow from 'zustand/shallow'

import ReadOnlyTodoItem from './ReadOnlyTodoItem';

const selector = (state) => ({
  searchResultState: state.searchResultState,
  setSearchState: state.setSearchState
})

const SearchBar = () => {
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const { searchResultState, setSearchState } = useToDoStore(selector, shallow)
  const searchResults = searchResultState[searchFilter];

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
    setSearchState(e.target.value, searchFilter);
  };
  const onSelectChange = (e) => {
    setSearchText('');
    setSearchFilter(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        className="searchField"
        placeholder="Search for a Todo"
        type="text"
        value={searchText || searchResults.searchTerm}
        onChange={onSearchTextChange}
        onLoad={onSearchTextChange}
      />
      <select className="prioritySelect" onChange={onSelectChange}>
        <option value="all">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <div className="searchResults">
        {searchResults.results.map((result, idx) => (
          <ReadOnlyTodoItem key={idx} item={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
