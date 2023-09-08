import React, { useState, useRef } from 'react';

import useOnClickOutside from '../helpers/onClickOutside';
import { DarkModeToggle } from './DarkModeToggle';

export const NavBarB = ({ handleClick, active }) => {
  return (
    <div className="navbar-b open-nav">
      <button
        onClick={handleClick}
        className={`navbar-b-button ${active ? 'navbar-b-button--active' : ''}`}
      >
        <span className="navbar-b-button__decorator material-icons">menu</span>{' '}
        {/* <span className="navbar-a-button__text">menu</span> */}
      </button>
      <DarkModeToggle />
    </div>
  );
};
