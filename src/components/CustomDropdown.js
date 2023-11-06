import React from 'react';

import camelCase from 'lodash.camelcase';

export default function CustomDropdown({ label, options, handleSearchQuery }) {
  const onChange = event => {
    handleSearchQuery(event.target);
  };
  return (
    <>
      <select id={camelCase(label)} onChange={onChange}>
        <option value="all">{label}</option>
        {options.map((option, idx) => (
          <option key={`${label}-${idx}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
