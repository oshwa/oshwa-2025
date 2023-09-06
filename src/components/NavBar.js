import React, { useState, useRef } from 'react';

import useOnClickOutside from '../helpers/onClickOutside';
import { Link } from 'gatsby';


export const NavBar = ({ handleClick, active }) => {
  return (
    <div className="navbar">
      <button
        onClick={handleClick}
        className={`navbar-button ${active && 'navbar-button--active'}`}
      >
        <span class="navbar-button__decorator material-icons">more_vert</span>{' '}
        <span class="navbar-button__text">menu</span>
      </button>
    </div>
  );
};
