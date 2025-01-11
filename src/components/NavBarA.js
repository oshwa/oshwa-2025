import React from 'react';
import NavControls from './NavControls';

export const NavBarA = ({ handleClick, active }) => {
  return (
    <div className="navbar-a open-nav notched notched--border">
      <button
        onClick={handleClick}
        className={`navbar-a-button ${active ? 'navbar-a-button--active' : ''}`}
      >
        <span className="navbar-a-button__decorator material-icons">menu</span>{' '}
        <span className="navbar-a-button__text">menu</span>
      </button>
      <NavControls />
    </div>
  );
};
