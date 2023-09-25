import React, { useRef } from 'react';

import { NavBarA } from './NavBarA';
import { MainNavA } from './MainNavA';

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
      </header>
    </>
  );
};

export default Header;
