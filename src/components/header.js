import React, { useState, useRef } from 'react';

import { NavBarA } from './NavBarA';
import { MainNavA } from './MainNavA';

import useOnClickOutside from '../helpers/onClickOutside';


const Header = ({active, setActive, handleClick}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setActive(false));

  return (
    <>
      
      <header ref={ref} className={`${ active ? 'nav-is-active' : ''}`}>
        <NavBarA handleClick={handleClick} active={active}/>
        <MainNavA handleClick={handleClick} active={active} />

      </header>
    </>
  );
};

export default Header;
