import React, { useRef } from 'react';
import classNames from 'classnames';
import { NavBarA } from './NavBarA';
import { MainNavA } from './MainNavA';

import useOnClickOutside from '../helpers/onClickOutside';

const Header = ({ active, setActive, handleClick, navType }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setActive(false));

  const headerClassNames = [`p-8 pb-5`];

  return (
    <>
      <header
        ref={ref}
        className={`${active
          ? `${classNames(navType, headerClassNames, `nav-is-active`)}`
          : `${classNames(navType, headerClassNames)}`
          }`}
      >
        <NavBarA handleClick={handleClick} active={active} />
        <MainNavA handleClick={handleClick} active={active} />
      </header>
    </>
  );
};

export default Header;
