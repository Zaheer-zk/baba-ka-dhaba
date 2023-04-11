import React, { useState } from 'react';
import { filterData } from '../utils/helper';

const SearchBar = (props) => {
  const [searchKey, setSearchKey] = useState('');

  const handleSearchInput = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault(); // Prevent form submission behavior

    let data = filterData(searchKey, props.data);

    // Set filtered data
    props.setRestaurantData(data);
  };

  return (
    <div className="flex px-2 justify-end mt-3">
      <form action="">
        <input
          type="text"
          name="search-input"
          id="search-input"
          className="p-3 m-3 shadow-md outline-none rounded-3xl focus:bg-violet-300 focus:text-white"
          placeholder="Search food here..."
          onChange={handleSearchInput}
          value={searchKey}
        />
        <button
          type="submit"
          className="p-3 bg-green-300 text-yellow-50 rounded-3xl hover:shadow-lg hover:bg-red-300"
          onClick={handleSearchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
