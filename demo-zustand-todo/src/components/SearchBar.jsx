import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchBarSelectorFam } from '../store/store';

import ReadOnlyTodoItem from './ReadOnlyTodoItem';

const SearchBar = () => {
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  // const [searchState, setSearchState] = useRecoilState(searchBarSelectorFam(searchFilter));
  const searchState = {
    searchTerm: '',
  };

  const onSearchTextChange = (e) => {
    console.log(e.target.value);
    // setSearchState(e.target.value);
  };
  const onSelectChange = (e) => {
    // setSearchText('');
    console.log(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        className="searchField"
        placeholder="Search for a Todo"
        type="text"
        value={searchText || searchState.searchTerm}
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
        {/* {searchState.results.map((result, idx) => (
          <ReadOnlyTodoItem key={idx} item={result} />
        ))} */}
      </div>
    </div>
  );
};

export default SearchBar;
