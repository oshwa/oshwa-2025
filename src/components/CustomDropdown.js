import React from 'react';

import camelCase from 'lodash.camelcase';

export default function CustomDropdown({ label, defaultLabel, options, handleSearchQuery }) {
  const onChange = event => {
    handleSearchQuery(event.target);
  };
  return (
    <>
      <div className="select-wrapper">
        <select id={camelCase(label)} onChange={onChange}>
          <option value="*">{defaultLabel}</option>
          {options.map((option, idx) => (
            <option key={`${label}-${idx}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
