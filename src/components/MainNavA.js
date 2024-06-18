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
      <Link className="nav-link" to="/team">
        Team
      </Link>
      <Link className="nav-link" to="/team/alicia-seidle/">
        Individual People
      </Link>
      <Link className="nav-link" to="/programs">
        Programs
      </Link>
      <Link
        className="nav-link"
        to="/programs/open-hardware-creators-in-acadamia-fellows/"
      >
        Individual Program
      </Link>
      <Link
        className="nav-link"
        to="/programs/open-hardware-creators-in-acadamia-fellows/"
      >
        OHCA Fellows Page
      </Link>
      <Link className="nav-link" to="/programs/years/2022-2023/">
        Individual OHCA Fellows Page
      </Link>

      <Link className="nav-link" to="/people/carlotta-berry/">
        Individual Fellow
      </Link>

      <Link className="nav-link" to="/programs/summit-fellows/">
        Summit Fellows Page
      </Link>

      <Link className="nav-link" to="/programs/years/2015/">
        Individual Summit Fellows Page
      </Link>

      <Link className="nav-link" to="/resources">
        Resources
      </Link>
      <Link
        className="nav-link"
        to="/resources/the-evolving-aspects-of-a-welcoming-community/"
      >
        Individual Resource
      </Link>
      <Link
        className="nav-link"
        to="/resources/the-evolving-aspects-of-a-welcoming-community/"
      >
        Individual Resource with TOC
      </Link>

      <Link className="nav-link" to="/blog-posts">
        Blog Posts
      </Link>

      <Link
        className="nav-link"
        to="/blog-posts/the-2024-open-hardware-summit/"
      >
        Individual Blog Post
      </Link>

      <Link className="nav-link" to="/events">
        Events
      </Link>
      <Link className="nav-link" to="/events/upcoming-event-1-hardware-month/">
        Individual Event
      </Link>
    </nav>
  );
};
