import React from 'react';
import { Link } from 'gatsby';
export const MainMenu = ({ handleClick, active }) => {
  return (
    <nav className={`menu ${active && 'active-menu'}`}>
      <div className="row expanded">
        <button
          onClick={handleClick}
          className="menu__icon material-icons close-menu"
        >
          close
        </button>
        <Link to="/">
          {' '}
          <i className="menu__icon menu__icon--home material-icons">home</i>
        </Link>
        <div className="column large-3 medium-6 small-12">
          <a className="menu__title-link" href="https://application.oshwa.org">
            <span>Certify a project</span>
          </a>
          <div className="menu__link-container">
            <a href="https://application.oshwa.org/apply">Get Started</a>
            <Link to="/requirements">Requirements</Link>
            <Link to="/license-agreement">License Agreement</Link>
          </div>
        </div>
        <div className="column large-3 medium-6 small-12">
          <Link className="menu__title-link" to="/process">
            <span>The Certification Process</span>
          </Link>
          <div className="menu__link-container">
            <Link to="/process">Introduction</Link>
            <Link to="/process/hardware">Hardware</Link>
            <Link to="/process/software">Software</Link>
            <Link to="/process/documentation">Documentation</Link>
            <Link to="/process/branding">Branding</Link>
          </div>
        </div>
        <div className="column large-3 medium-6 small-12">
          <Link className="menu__title-link" to="/directory">
            <span>Projects</span>
          </Link>
          <div className="menu__link-container">
            <Link to="/list">Project Listing</Link>
            <a href="https://certificationapi.oshwa.org/documentation">API</a>
          </div>
        </div>
        <div className="column large-3 medium-6 small-12">
          <Link className="menu__title-link" to="/basics">
            <span>Open Source Hardware Basics</span>
          </Link>
          <div className="menu__link-container">
            <Link to="/basics/faq">Frequently Asked Questions</Link>
            <Link to="/about">About</Link>
            <a href="https://www.oshwa.org/">OSHWA</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
