import React from 'react';
import SearchBar from './search_bar/searchbar';
  
const Search = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Right',
        alignItems: 'Right',
        height: '100vh'
      }}
    >
      <SearchBar />
    </div>
  );
};
  
export default Search;