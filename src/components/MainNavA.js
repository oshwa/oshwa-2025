import React from 'react';
import { Link } from 'gatsby';

export const MainNavA = ({ handleClick, active }) => {
  return (
    <nav className={`main-nav ${active && 'nav-active'}`}>
      <button className="material-icons close-nav" onClick={handleClick}>
        chevron_left
      </button>
      <Link className="home-icon" to="/" aria-label="home">
        <span className="material-icons">home</span>
      </Link>

      <Link className="nav-link" to="/people-template">
        People Template
      </Link>
      {/* <Link className="nav-link" to="/resources">
        Resources
      </Link>
      <Link className="nav-link" to="/list-template">
        List Template
      </Link> */}
      <Link className="nav-link" to="/resources">
        Resources
      </Link>
      <Link className="nav-link" to="/blog-posts">
        Blog Posts
      </Link>
      <Link className="nav-link" to="/global-resources/pioneers-of-open/">
        Example Resource Language Selector
      </Link>
      <Link className="nav-link" to="/projects">
        Projects
      </Link>
      <Link className="nav-link" to="/programs">
        Programs
      </Link>
    </nav>
  );
};
