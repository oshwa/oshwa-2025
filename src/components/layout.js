/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
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
    console.log(active);
  };

  const navType = `left-push-nav`;

  return (
    <>
      <Header
        navType={navType}
        active={active}
        setActive={setActive}
        handleClick={handleClick}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <Main navType={navType} active={active} setActive={setActive}>
        {children}
      </Main>
      <div class="p-8 bg-amber-300">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            1
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            2
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            3
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            4
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            5
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            6
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            7
          </div>
          <div class="p-4 bg-cyan-400 rounded-md flex items-center justify-center">
            8
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
