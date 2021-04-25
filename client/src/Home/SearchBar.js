import React, { useState } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.onSubmit(search);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button onSubmit={onClickSubmit}>Search</button> */}
      </form>
    </div>
  );
};

export default SearchBar;
