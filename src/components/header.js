import React, { useState, useRef } from 'react';

import { NavBar } from './NavBar';

import useOnClickOutside from '../helpers/onClickOutside';
import { Link } from 'gatsby';

import { DarkModeToggle } from './DarkModeToggle';

const Header = props => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log(active);
  };

  const ref = useRef();
  useOnClickOutside(ref, () => setActive(false));

  return (
    <>
      <header ref={ref} className={`top-bar top-bar--${props.pageTemplate}`}>
        <button
          onClick={handleClick}
          className={`menu-button top-bar__button top-bar__button--${
            props.pageTemplate
          } js-trigger-menu ${active && 'active-menu-button'}`}
        >
          menu
        </button>
        <NavBar handleClick={handleClick} active={active} />

        <DarkModeToggle />
      </header>
    </>
  );
};

export default Header;
