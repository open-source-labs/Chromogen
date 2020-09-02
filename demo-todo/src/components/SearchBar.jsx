import React, { useState } from 'react';
import { atom } from 'chromogen';
import { searchResultState, todoListState } from '../store/atoms';
import { selectorFamily, useRecoilState } from 'recoil';

const searchBarSelectorFam = selectorFamily({
  key: 'searchBarSelectorFam',
  get: (searchFilter) => ({ get }) => {
    return get(searchResultState)[searchFilter];
  },
  set: (searchFilter) => ({ get, set }, searchTerm) => {
    set(searchResultState, (prevState) => {
      const newResults = get(todoListState).filter((todo) => {
        if (todo.text.includes(searchTerm)) {
          switch (searchFilter) {
            case 'all':
              return true;
            case 'complete':
              return todo.isComplete;
            case 'incomplete':
              return !todo.isComplete;
          }
        } else return false;
      });
      return { ...prevState, [searchFilter]: { searchTerm, results: newResults } };
    });
  },
});

const SearchBar = () => {
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchState, setSearchState] = useRecoilState(searchBarSelectorFam(searchFilter));

  const onChange = (e) => {
    setSearchState(e.target.value);
  };

  return (
    <div className="searchContainer">
      <span>
        <input
          className="inputText"
          placeholder="Search for a Todo"
          type="text"
          value={searchState.searchTerm}
          onChange={onChange}
        />
        <select></select>
      </span>
      <ul>
        {searchState.results.map((result, idx) => (
          <li key={idx}>{result.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
