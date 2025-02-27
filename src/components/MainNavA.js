import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

export const MainNavA = ({ handleClick, active }) => {
  const data = useStaticQuery(graphql`
    query MyQuery1 {
      contentfulNavMenu {
        menuItems {
          ... on ContentfulGenericPage {
            id
            title
            prettyUrl
          }
          ... on ContentfulProgramsPage {
            id
            title
          }
        }
      }
    }
  `);

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
        {data.contentfulNavMenu.menuItems.map(menuItem => (
          <Link
            className="main-nav__link link"
            key={menuItem.prettyUrl || kebabCase(menuItem.title)}
            to={
              menuItem.prettyUrl
                ? `/${menuItem.prettyUrl}`
                : `/${kebabCase(menuItem.title)}`
            }
          >
            {menuItem.title}
          </Link>
        ))}
        <Link className="main-nav__link link" to="/resources">
          Resources
        </Link>
        <Link className="main-nav__link link" to="/announcements">
          Announcements
        </Link>
      </div>
    </nav>
  );
};
