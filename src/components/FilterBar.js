import React from 'react';

import CustomDropdown from './CustomDropdown';
export const FilterBar = () => {
  const handleClick = () => console.log('hello');
  return (
    <div className="col-span-10 notched notched--border filters">
      <CustomDropdown label={"one"} options={[{value: 'all', label: 'Filter One'}]} />
      <CustomDropdown label={"two"} options={[{value: 'all', label: 'Filter Two'}]} />
      <span className="filters__filter--clear">Clear filters</span>
    </div>
  );
};
