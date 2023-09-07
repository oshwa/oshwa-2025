import React, { useState, useRef } from 'react';

import useOnClickOutside from '../helpers/onClickOutside';
import { DarkModeToggle } from './DarkModeToggle';

export const NavBarA = ({ handleClick, active }) => {
  return (
    <div className="navbar-a open-nav">
      <button
        onClick={handleClick}
        className={`navbar-a-button ${active ? 'navbar-a-button--active' : ''}`}
      >
        <span className="navbar-a-button__decorator material-icons">more_vert</span>{' '}
        <span className="navbar-a-button__text">menu</span>
      </button>
      <DarkModeToggle />
    </div>
  );
};
