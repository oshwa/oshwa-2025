import React, { useState, useRef } from 'react';

import { NavBar } from './NavBar';
import { MainMenu } from './MainMenu';

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
      
      <header ref={ref} className={``}>
        <NavBar handleClick={handleClick} active={active}/>
        <MainMenu handleClick={handleClick} active={active} />
        <DarkModeToggle />
      </header>
    </>
  );
};

export default Header;
