import React from 'react';

export const FilterBar = () => {
  return (
    <div className="col-span-10 notched notched--border filters">
      <span className="filters__filter">Filter 1</span>
      <span className="filters__filter">Filter 2</span>
      <span className="filters__filter--clear">Clear filters</span>
    </div>
  );
};