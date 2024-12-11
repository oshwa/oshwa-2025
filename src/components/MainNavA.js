import React from 'react';
import { Link } from 'gatsby';

export const MainNavA = ({ handleClick, active }) => {
  const openMenu = () => {
    handleClick();
  };
  return (
    <nav className={`main-nav ${active ? `active` : ``}`}>
      <div className="main-nav__top-row">
        <div className="top-row--right">
          <button className="material-icons close-nav" onClick={openMenu}>
            chevron_left
          </button>
          <Link className="home-icon" to="/" aria-label="home">
            <span className="material-icons">home</span>
          </Link>
        </div>
      </div>

      <div className="main-nav__links-wrapper">
        <Link className="main-nav__link link" to="/">
          Home
        </Link>
        <Link className="main-nav__link link" to="/about">
          About
        </Link>
        <Link className="main-nav__link link" to="/resources">
          Resources
        </Link>
        <Link className="main-nav__link link" to="/blog-posts">
          Blog Posts
        </Link>
        <Link className="main-nav__link link" to="/events">
          Events
        </Link>
        <Link className="main-nav__link link" to="/team">
          Team
        </Link>
      </div>
    </nav>
  );
};
