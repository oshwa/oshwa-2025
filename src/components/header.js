import React, { useState, useRef } from 'react';

import { NavBarA } from './NavBarA';
import { MainNavA } from './MainNavA';

import { NavBarB } from './NavBarB';
import { MainNavB } from './MainNavB';

import useOnClickOutside from '../helpers/onClickOutside';

const Header = ({ active, setActive, handleClick, navType }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setActive(false));

  return (
    <>
      <header
        ref={ref}
        className={`${active ? `${navType} nav-is-active` : `${navType}`}`}
      >
        <NavBarA handleClick={handleClick} active={active} />
        <MainNavA handleClick={handleClick} active={active} />

        {/* <NavBarB handleClick={handleClick} active={active}/>
        <MainNavB handleClick={handleClick} active={active} /> */}
      </header>
    </>
  );
};

export default Header;
