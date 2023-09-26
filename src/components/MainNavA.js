import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

export const MainNavA = ({ handleClick, active }) => {
  
  return (
    <nav className={`main-nav ${active && 'nav-active'}`}>
      <button className="material-icons close-nav" onClick={handleClick}>
        chevron_left
      </button>
      <Link className="home-icon" to="/" aria-label="home">
        <span className="material-icons">home</span>
      </Link>
      <Link className="nav-link" to="/">
        Link One
      </Link>
      <Link className="nav-link" to="/">
        Link Two
      </Link>
      <Link className="nav-link" to="/">
        Link Three
      </Link>
    </nav>
  );
};
