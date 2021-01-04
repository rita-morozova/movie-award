import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        onChange={onChange}
        className="search"
      />
    </div>
  );
};

export default SearchBar;
