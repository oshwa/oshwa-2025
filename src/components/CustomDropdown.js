import React from 'react';

export default function CustomDropdown({ label, options, handler }) {
  return (
    <>
      <select id={label}>
        <option value>- Select -</option>
        {options.map((option, idx) => (
          <option key={`${label}-${idx}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
