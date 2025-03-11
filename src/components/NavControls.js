import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import SavingsIcon from './SavingsIcon';
const NavControls = () => {
  return (
    <div className="nav-controls">
      <div className="donation-link-container">
        <a
          id="donation-link"
          href="https://secure.lglforms.com/form_engine/s/SpkKq95XVPOuQ2d-UNFtXQ"
          target="_blank"
          rel="noreferrer"
        >
          <SavingsIcon />
        </a>
      </div>
      <DarkModeToggle />
    </div>
  );
};

export default NavControls;
