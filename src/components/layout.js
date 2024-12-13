/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Main from './Main';
import Footer from './Footer';
import 'normalize.css';
import '../vendor/foundation.min.css';
// import '../vendor/styleguide-v2.1.css';
import '../styles/themes.scss';
import '../styles/styles.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navType = `left-push-nav fixed-to-top`;

  return (
    <>
      <Header
        navType={navType}
        active={active}
        setActive={setActive}
        handleClick={handleClick}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <Main navType={navType} active={active} >
        {children}
      </Main>
      <Footer active={active} />
    </>
  );
};

export default Layout;
