import React from 'react';

const SearchFilter = ({ filter, handleFilter }) => (
  <div>
    <form>
      <div>
        Search: <input 
          value={filter} 
          onChange={handleFilter}
        />
      </div>
    </form>
  </div>
)

export default SearchFilter;