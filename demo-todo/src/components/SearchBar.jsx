import React, { useState } from 'react';
import { searchBarSelectorFam } from '../store/store';
import { useRecoilState } from 'recoil';

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
      <select></select>

      <ul>
        {searchState.results.map((result, idx) => (
          <li key={idx}>{result.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
